package doan.vinhbui.service.impl;


import doan.vinhbui.Middleware.Permissions;
import doan.vinhbui.dto.TourDTO;
import doan.vinhbui.exception.DataNotFoundException;
import doan.vinhbui.model.Tour;
import doan.vinhbui.repository.TourRepository;
import doan.vinhbui.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TourServiceImpl implements TourService {

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private Permissions permissions;

    // Chuyển đổi DTO sang Entity
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

    @Override
    public ResponseEntity<String> createTour(TourDTO tourDTO, String authorizationHeader) {
        if (permissions.checkToken(authorizationHeader)) {
            String token = authorizationHeader.substring(7);
            try {
                // Kiểm tra quyền admin
                if (!permissions.checkAdmin(token)) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
                }

                // Tạo đối tượng Tour từ DTO
                Tour newTour = new Tour();
                newTour.setTitle(tourDTO.getTitle());
                newTour.setDescription(tourDTO.getDescription());
                newTour.setPriceCurrency(tourDTO.getPriceCurrency());
                newTour.setStartDate(LocalDate.from(LocalDateTime.parse(tourDTO.getStartDate())));
                newTour.setEndDate(LocalDate.from(LocalDateTime.parse(tourDTO.getEndDate())));
                newTour.setAboard(tourDTO.isAbroad());
                newTour.setSchedule(tourDTO.getSchedule());
                newTour.setImgUrl(tourDTO.getImgUrl());
                newTour.setPrice(tourDTO.getPrice_aldults());
                newTour.setDeparture(tourDTO.getDeparture());
                newTour.setDestination(tourDTO.getDestination());

                // Lưu đối tượng Tour vào cơ sở dữ liệu
                tourRepository.save(newTour);
                return ResponseEntity.status(HttpStatus.OK).body("Add tour successful");

            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }



    @Override
    public Tour updateTour(TourDTO tourDTO, long tourId) throws DataNotFoundException {
        // Tìm tour theo id
        Tour existingTour = tourRepository.findById(tourId)
                .orElseThrow(() -> new DataNotFoundException("Tour not found with id: " + tourId));

        // Cập nhật thông tin tour từ DTO
        existingTour.setTitle(tourDTO.getTitle());
        existingTour.setDescription(tourDTO.getDescription());
        existingTour.setPriceCurrency(tourDTO.getPriceCurrency());
        existingTour.setStartDate(LocalDate.from(LocalDateTime.parse(tourDTO.getStartDate())));
        existingTour.setEndDate(LocalDate.from(LocalDateTime.parse(tourDTO.getEndDate())));
        existingTour.setAboard(tourDTO.isAbroad());
        existingTour.setSchedule(tourDTO.getSchedule());
        existingTour.setImgUrl(tourDTO.getImgUrl());
        existingTour.setPrice(tourDTO.getPrice_aldults());
        existingTour.setDeparture(tourDTO.getDeparture());
        existingTour.setDestination(tourDTO.getDestination());
        return tourRepository.save(existingTour);
    }

    @Override
    public String deleteTour(long tourId) {
        // Kiểm tra sự tồn tại của tour trước khi xóa
        Optional<Tour> tourOptional = tourRepository.findById(tourId);
        if (tourOptional.isPresent()) {
            tourRepository.deleteById(tourId);
            return "Tour deleted successfully.";
        } else {
            return "Tour not found with id: " + tourId;
        }
    }

    @Override
    public TourDTO getTourById(long tour_id) {
        Tour tour = tourRepository.findById(tour_id).orElseThrow();

        return convertToDto(tour);
    }

    @Override
    public List<TourDTO> getToursByIds(List<Long> tourIds) {
        // Lấy danh sách các Tour từ repository dựa trên danh sách tourIds
        List<Tour> tours = tourRepository.findAllById(tourIds);

        // Chuyển đổi danh sách Tour thành danh sách TourDTO
        List<TourDTO> tourDTOs = tours.stream()
                .map(this::convertToDto) // Giả sử bạn có phương thức convertToDto(Tour tour)
                .collect(Collectors.toList());

        return tourDTOs;
    }


    @Override
    public Page<TourDTO> findAllTour(Pageable pageable) {
        // Lấy tất cả các tour theo trang
        Page<Tour> tours = tourRepository.findAll(pageable);

        // Chuyển đổi từ Page<Tour> sang Page<TourDTO> bằng cách sử dụng hàm convertToDto
        Page<TourDTO> tourDTOPage = tours.map(this::convertToDto);

        return tourDTOPage;
    }

    @Override
    public Page<TourDTO> findAllTourAbroad(Pageable pageable) {
        // Lấy tất cả các tour có is_abroad = 1 theo trang
        Page<Tour> tours = tourRepository.findAllByIsAboard(true, pageable);

        // Chuyển đổi từ Page<Tour> sang Page<TourDTO> bằng cách sử dụng hàm convertToDto
        Page<TourDTO> tourDTOPage = tours.map(this::convertToDto);

        return tourDTOPage;
    }

    @Override
    public List<TourDTO> getToursByTop() {
        List<Tour> topTours = tourRepository.findTop7ByHighestRating()
                .stream()
                .limit(7)
                .collect(Collectors.toList());
        return topTours.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }


}
