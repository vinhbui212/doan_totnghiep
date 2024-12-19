package doan.vinhbui.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlightDTO {
    private Long id;
    private String startPoint;
    private String endPoint;
    private LocalDate startTime;
    private LocalDate endTime;
    private String classOfService;
    private Double fltPrice;
    private String fltPriceCurrency;
    private String status;
    private Long customerId;
    private LocalDate bookingDate;

}
