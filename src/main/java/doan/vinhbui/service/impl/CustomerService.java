package doan.vinhbui.service.impl;

import doan.vinhbui.config.JwtService;
import doan.vinhbui.dto.CustomerDTO;
import doan.vinhbui.model.Customer;
import doan.vinhbui.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerService {

    private final CustomerRepository customerRepository;
    private  BCryptPasswordEncoder passwordEncoder; // Inject BCryptPasswordEncoder
    private final JwtService jwtService;
    @Transactional
    public Customer getCustomer(String token){
        String username = jwtService.extractUsername(token);
        return customerRepository.findByEmail(username).orElse(null);
    }
    // Đổi thông tin người dùng
    public CustomerDTO updateCustomerInfo(String token, CustomerDTO updatedInfo) {

        Customer customer= getCustomer(token);

        // Cập nhật thông tin
        customer.setFirstName(updatedInfo.getFirstName());
        customer.setLastName(updatedInfo.getLastName());
        customer.setPhoneNumber(updatedInfo.getPhoneNumber());
        customer.setAddress(updatedInfo.getAddress());

        // Lưu lại thông tin
        customer = customerRepository.save(customer);

        // Chuyển đổi Entity sang DTO
        return mapToDTO(customer);
    }

    // Đổi mật khẩu
    public String updatePassword(String token, String oldPassword, String newPassword) {
        Customer customer= getCustomer(token);

        // Kiểm tra mật khẩu cũ
        if (!customer.getPassword().equals(oldPassword)) {
            throw new RuntimeException("Mật khẩu cũ không đúng!");
        }

        // Cập nhật mật khẩu
        customer.setPassword(passwordEncoder.encode(newPassword));
        customerRepository.save(customer);

        return "Đổi mật khẩu thành công!";
    }

    public CustomerDTO getCustomerInfo(String token) {
        Customer customer= getCustomer(token);
        return mapToDTO(customer);
    }

    public List<CustomerDTO> getAllUsers() {
        List<Customer> customers = customerRepository.findAll(); // Lấy tất cả customer từ cơ sở dữ liệu
        return customers.stream() // Chuyển đổi từ List<Customer> sang List<CustomerDTO>
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Phương thức chuyển đổi từ Entity sang DTO
    private CustomerDTO mapToDTO(Customer customer) {
        return new CustomerDTO(
                customer.getId(),
                customer.getEmail(),
                null, // Không trả về mật khẩu
                customer.getFirstName(),
                customer.getLastName(),
                customer.getPhoneNumber(),
                customer.getAddress()
        );
    }
}

