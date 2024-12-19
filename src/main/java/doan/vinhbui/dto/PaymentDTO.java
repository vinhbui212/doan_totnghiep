package doan.vinhbui.dto;

import doan.vinhbui.model.Booking;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {
    private Long id;
    private LocalDateTime payDate;
    private String status;
    private Double amount;
    private String payment_type;
    private Long booking_id;
}
