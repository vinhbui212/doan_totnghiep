package doan.vinhbui.repository;

import doan.vinhbui.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight,Long> {
    List<Flight> findByCustomerId(long customerId);
}
