package doan.vinhbui.service.impl;

import doan.vinhbui.dto.TourDTO;
import doan.vinhbui.model.Tour;
import doan.vinhbui.repository.TourRepository;
import doan.vinhbui.service.SearchService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
@RequiredArgsConstructor
@Service
public class SearchServiceImpl implements SearchService {
    private  final Logger logger = LoggerFactory.getLogger(SearchServiceImpl.class);

    private final TourRepository tourRepository;
    @Override
    public List<TourDTO> searchTours(String departureLocation, String destination, LocalDate startDate, Double maxPrice) {
        List<Tour> tours = tourRepository.searchTours(departureLocation, destination, startDate, maxPrice);
        if (tours.isEmpty()) {
            logger.info("No tours found for the given criteria");
        } else {
            logger.info("Found tours: {}", tours);
        }
        // Convert the list of Tour entities to a list of TourDTOs
        return tours.stream()
                .map(this::convertToDto)
                .toList();
    }

    private Tour convertToEntity(TourDTO tourDTO) {
        Tour tour = new Tour();
        tour.setTitle(tourDTO.getTitle());
        tour.setDescription(tourDTO.getDescription());
        tour.setPriceCurrency(tourDTO.getPriceCurrency());
        tour.setStartDate(LocalDate.from(LocalDateTime.parse(tourDTO.getStartDate())));
        tour.setEndDate(LocalDate.from(LocalDateTime.parse(tourDTO.getEndDate())));
        tour.setAboard(tourDTO.isAbroad());
        tour.setSchedule(tourDTO.getSchedule());
        tour.setImgUrl(tourDTO.getImgUrl());
        tour.setDeparture(tourDTO.getDeparture());
        tour.setDestination(tourDTO.getDestination());
        tour.setPrice(tourDTO.getPrice_aldults());
        return tour;
    }

    private TourDTO convertToDto(Tour tour) {
        TourDTO tourDTO = new TourDTO();
        tourDTO.setId(tour.getId());
        tourDTO.setDeparture(tour.getDeparture());
        tourDTO.setDestination(tour.getDestination());
        tourDTO.setAbroad(tour.isAboard());
        tourDTO.setDescription(tour.getDescription());
        tourDTO.setSchedule(tour.getSchedule());
        tourDTO.setStartDate(String.valueOf(tour.getStartDate()));
        tourDTO.setEndDate(String.valueOf(tour.getEndDate()));
        tourDTO.setImgUrl(tour.getImgUrl());
        tourDTO.setPriceCurrency(tour.getPriceCurrency());
        tourDTO.setPrice_aldults(tour.getPrice());
        tourDTO.setPrice_children(tour.getPrice() * 0.5);
        tourDTO.setTitle(tour.getTitle());
        return tourDTO;

    }
}
