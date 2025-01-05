package doan.vinhbui.repository;

import doan.vinhbui.model.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TourRepository extends JpaRepository<Tour,Long> {
    @Query("SELECT t FROM Tour t " +
            "WHERE (:departureLocation IS NULL OR LOWER(t.departure) LIKE LOWER(CONCAT('%', :departureLocation, '%'))) " +
            "AND (:destination IS NULL OR LOWER(t.destination) LIKE LOWER(CONCAT('%', :destination, '%'))) " +
            "AND (:date IS NULL OR (:date BETWEEN t.startDate AND t.endDate)) " +
            "AND (:maxPrice IS NULL OR t.price <= :maxPrice)")
    List<Tour> searchTours(
            @Param("departureLocation") String departureLocation,
            @Param("destination") String destination,
            @Param("date") LocalDate date,
            @Param("maxPrice") Double maxPrice);




    Page<Tour> findAllByIsAboard(boolean isAboard, Pageable pageable);

    @Query(value = "SELECT t FROM Tour t JOIN t.reviews r GROUP BY t.id ORDER BY AVG(r.rating) DESC LIMIT 7")
    List<Tour> findTop7ByHighestRating();


}
