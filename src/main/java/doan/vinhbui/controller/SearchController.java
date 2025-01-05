package doan.vinhbui.controller;

import doan.vinhbui.dto.TourDTO;
import doan.vinhbui.model.Tour;
import doan.vinhbui.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
@CrossOrigin(origins = {"http://localhost:5173/","http://localhost:3000/"})

public class SearchController {
    private final SearchService searchService;
    @GetMapping("")
    public ResponseEntity<List<TourDTO>> searchTours(
            @RequestParam(required = false) String departureLocation,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) Double maxPrice) {

        List<TourDTO> tours = searchService.searchTours(departureLocation, destination, startDate, maxPrice);
        return ResponseEntity.ok(tours);
    }

}
