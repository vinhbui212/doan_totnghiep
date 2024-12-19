package doan.vinhbui.controller;

import doan.vinhbui.Middleware.Permissions;
import doan.vinhbui.dto.CustomerDTO;
import doan.vinhbui.service.impl.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173/","http://localhost:3000/"})
@Slf4j
public class CustomerController {

    private final CustomerService customerService;
    @Autowired
    private Permissions permissions;

    public String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7); // Skip "Bearer " prefix
        } else {
            throw new IllegalArgumentException("Authorization header doesn't exist or is in the wrong format");
        }
    }

    @PutMapping("/update-info")
    public ResponseEntity<CustomerDTO> updateCustomerInfo(@RequestHeader("Authorization") String authorizationHeader, @RequestBody CustomerDTO updatedInfo) {
        String token = extractToken(authorizationHeader);
        CustomerDTO updatedCustomer = customerService.updateCustomerInfo(token, updatedInfo);
        return ResponseEntity.ok(updatedCustomer);
    }

    @PutMapping("/update-password")
    public ResponseEntity<String> updatePassword(
            @RequestParam String email,
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {
        String response = customerService.updatePassword(email, oldPassword, newPassword);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/info")
    public ResponseEntity<CustomerDTO> getCustomerInfo(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = extractToken(authorizationHeader);
            CustomerDTO customerDTO = customerService.getCustomerInfo(token);
            log.info(String.valueOf(customerDTO));
            return ResponseEntity.ok(customerDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(403).body(null);  // Trả về 404 nếu không tìm thấy người dùng
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> gettAll(@RequestHeader("Authorization") String authorizationHeader) {
        if (!permissions.checkToken(authorizationHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }

        String token = authorizationHeader.substring(7);
        try {
            // Kiểm tra quyền truy cập
            if ( !permissions.checkAdmin(token)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
            }
                List<CustomerDTO> customerDTO = customerService.getAllUsers();
                return ResponseEntity.status(HttpStatus.OK).body(customerDTO);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
            }
        }
    }

