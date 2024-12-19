package doan.vinhbui.controller;


import doan.vinhbui.Middleware.Permissions;
import doan.vinhbui.dto.PaymentDTO;
import doan.vinhbui.service.impl.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/payment")
@Slf4j
@CrossOrigin(origins = {"http://localhost:5173/","http://localhost:3000/"})
public class VNPAYController {
    @Autowired
    private VNPayService vnPayService;
    @Autowired
    private Permissions permissions;
    public String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7); // Skip "Bearer " prefix
        } else {
            throw new IllegalArgumentException("Authorization header doesn't exist or is in the wrong format");
        }
    }
    @GetMapping("/submitOrder")
    public String submitOrder(@RequestParam("id") long orderId,
                            HttpServletRequest request,
                            HttpServletResponse response) throws IOException {
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = vnPayService.createOrder(orderId, baseUrl);

        // Redirect the user to the VNPAY payment gateway
        return vnpayUrl;
    }


    @GetMapping("/vnpay-payment")
    public String vnpayPayment(HttpServletRequest request,Model model,HttpServletResponse response) throws IOException {
        int paymentStatus = vnPayService.orderReturn(request);
        log.info(String.valueOf(paymentStatus));
        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");

        model.addAttribute("orderId", orderInfo);
        model.addAttribute("totalPrice", totalPrice);
        model.addAttribute("paymentTime", paymentTime);
        model.addAttribute("transactionId", transactionId);

        if (paymentStatus == 1) {
            // Chuyển hướng đến trang khác
            response.sendRedirect("http://localhost:5173/");  // Sử dụng sendRedirect trực tiếp

            return "redirect:http://localhost:5173";
        } else {
            return "Failed"; // Trả về trang thất bại
        }

    }
    @GetMapping("/all")
    public ResponseEntity<?> getAllPayments(@RequestHeader("Authorization") String authorizationHeader) {
        if (!permissions.checkToken(authorizationHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }

        String token = authorizationHeader.substring(7);
        try {
            // Kiểm tra quyền truy cập
            if (!permissions.checkAdmin(token)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
            }
            List<PaymentDTO> list = vnPayService.getAllPayment();
            return ResponseEntity.status(HttpStatus.OK).body(list);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
}
