package doan.vinhbui.service.impl;


import doan.vinhbui.config.JwtService;
import doan.vinhbui.dto.AuthenticationResponse;
import doan.vinhbui.dto.LoginRequest;
import doan.vinhbui.dto.RegisterRequest;
import doan.vinhbui.model.Admin;
import doan.vinhbui.model.Customer;
import doan.vinhbui.repository.AdminRepository;
import doan.vinhbui.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {

    private final AdminRepository adminRepository;
    private final CustomerRepository customerRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private Logger logger= Logger.getLogger(String.valueOf(AuthenticationService.class));


    public AuthenticationResponse customerRegister(RegisterRequest request) {
        try {
            Optional<Customer> customerCheck = customerRepository.findByEmail(request.getEmail());
            Optional<Admin> adminCheck = adminRepository.findByEmail(request.getEmail());

            if (adminCheck.isPresent()) {
                return AuthenticationResponse.builder().token("Already Exist").build();
            }
            String jwtToken = null;
            if (customerCheck.isPresent()) {
                Customer customer1 = customerCheck.get();
                if (customer1.getIsVerified() || customer1.getIsGmail()) {
                    return AuthenticationResponse.builder().token("Already Exist").build();
                }
                customer1.setFirstName(request.getFirstName());
                customer1.setLastName(request.getLastName());
                customer1.setPassword(passwordEncoder.encode(request.getPassword()));
                customerRepository.save(customer1);
//                setupVerification(customer1);
            } else {
                Customer customer = new Customer(request.getEmail(), passwordEncoder.encode(request.getPassword()), false
                        , false, request.getFirstName(), request.getLastName());
                customerRepository.save(customer);
//                setupVerification(customer);
                jwtToken = jwtService.generateToken(customer);
            }
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return AuthenticationResponse.builder().token(e.getMessage()).build();
        }
    }


    public AuthenticationResponse authenticate(LoginRequest request) throws NoSuchElementException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()

                    )
            );
        } catch (Exception e) {
            return AuthenticationResponse.builder().token("Unauthorized").build();
        }

        Optional<Customer> customer = customerRepository.findByEmail(request.getEmail());
        Optional<Admin> admin = adminRepository.findByEmail(request.getEmail());
        if (customer.isPresent() ) {
            var jwtToken = jwtService.generateToken(customer.get());
            String name= customer.get().getFirstName()+ " " +customer.get().getLastName();
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .customerId(customer.get().getId())
                    .customerName(name)
                    .build();
        } else if (admin.isPresent()) {
            var jwtToken = jwtService.generateToken(admin.get());
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .customerId(admin.get().getId())
                    .build();
        } else {
            return AuthenticationResponse.builder()
                    .token("Unauthorized")
                    .build();
        }
    }

}