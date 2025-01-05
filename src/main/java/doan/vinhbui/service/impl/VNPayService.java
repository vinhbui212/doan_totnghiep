package doan.vinhbui.service.impl;




import doan.vinhbui.config.VNPayConfig;
import doan.vinhbui.dto.PaymentDTO;
import doan.vinhbui.model.Booking;
import doan.vinhbui.model.Payment;
import doan.vinhbui.repository.BookingRepository;
import doan.vinhbui.repository.CustomerRepository;
import doan.vinhbui.repository.PaymentRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class VNPayService {
    @Autowired
    public CustomerRepository customerRepository;
    @Autowired
    public BookingRepository bookingRepository;
    @Autowired
    public PaymentRepository paymentRepository;
    public String createOrder(Long orderId, String urlReturn){
        float total=0;
        Optional<Booking> orderOptional=bookingRepository.findById(orderId);

        if(orderOptional.isPresent()){
            Booking booking = orderOptional.get();
            Long id= booking.getId();
            total = booking.getPrice()*100;
        }
        String totalString = String.format("%.0f", total);
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_TxnRef = VNPayConfig.getRandomNumber(8);
        String vnp_IpAddr = "127.0.0.1";
        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;
        String orderType = "order-type";

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", totalString);
        vnp_Params.put("vnp_CurrCode", "VND");

        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", String.valueOf(orderId));
        vnp_Params.put("vnp_OrderType", orderType);

        String locate = "vn";
        vnp_Params.put("vnp_Locale", locate);

        urlReturn = VNPayConfig.vnp_Returnurl;
        vnp_Params.put("vnp_ReturnUrl", urlReturn);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                try {
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    //Build query
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;
        return paymentUrl;
    }

    public int orderReturn(HttpServletRequest request) {
        Map fields = new HashMap();
        for (Enumeration params = request.getParameterNames(); params.hasMoreElements(); ) {
            String fieldName = null;
            String fieldValue = null;
            try {
                fieldName = URLEncoder.encode((String) params.nextElement(), StandardCharsets.US_ASCII.toString());
                fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII.toString());
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                fields.put(fieldName, fieldValue);
            }
        }

        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
        if (fields.containsKey("vnp_SecureHashType")) {
            fields.remove("vnp_SecureHashType");
        }
        if (fields.containsKey("vnp_SecureHash")) {
            fields.remove("vnp_SecureHash");
        }
        String amount = request.getParameter("vnp_Amount");
        String signValue = VNPayConfig.hashAllFields(fields);
        if (signValue.equals(vnp_SecureHash)) {
            if ("00".equals(request.getParameter("vnp_TransactionStatus"))) {
                String orderId = request.getParameter("vnp_OrderInfo");
                log.info(orderId);
                Booking order = bookingRepository.findById(Long.valueOf(orderId)).orElseThrow();
                if (order != null) {
                    order.setBookingDate(LocalDate.from(LocalDateTime.now()));
                    order.setStatus("Paid");
                    bookingRepository.save(order);
                    //3 500 000 00
                    Payment payment = new Payment();
                    payment.setBooking(order);
                    payment.setStatus("Paid");
                    payment.setPayment_type("ATM");
                    payment.setPayDate(LocalDateTime.now());
                    payment.setAmount(Double.valueOf(amount)/100);
                    paymentRepository.save(payment);
                    return 1;
                }
            } else {
                return 0;
            }
        } else {
            return -1;
        }
        return 22;
    }
    public List<PaymentDTO> getAllPayment() {
        // Lấy tất cả các payment từ paymentRepository
        List<Payment> payments = paymentRepository.findAll();

        // Chuyển đổi từng Payment thành PaymentDTO
        List<PaymentDTO> paymentDTOs = payments.stream()
                .map(this::maptoDTO) // Sử dụng phương thức maptoDTO để chuyển đổi
                .collect(Collectors.toList()); // Thu thập thành List

        return paymentDTOs;
    }

    public PaymentDTO maptoDTO(Payment payment) {
        PaymentDTO paymentDTO = new PaymentDTO();
        paymentDTO.setId(payment.getId());
        paymentDTO.setAmount(payment.getAmount());
        paymentDTO.setPayDate(payment.getPayDate());
        paymentDTO.setPayment_type(payment.getPayment_type());
        paymentDTO.setBooking_id(payment.getBooking().getId());
        paymentDTO.setStatus(payment.getStatus());
        return paymentDTO;
    }
}
