package com.example.roombookingsystembackend.Controller;

import com.example.roombookingsystembackend.Entity.Booking;
import com.example.roombookingsystembackend.Pojo.BookingPojo;
import com.example.roombookingsystembackend.Service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4004")
@RequestMapping("/booking")
public class BookingController {
    private final BookingService bookingService;

    @PostMapping("/save")
    public String saveBooking(@Valid @RequestBody BookingPojo bookingPojo) {
        bookingService.saveBooking(bookingPojo);
        return "Saved";
    }

    @GetMapping("/getAll")
    public List<Booking> getAll() {
        return bookingService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Booking> getById(@PathVariable("id") Long id) {
        return bookingService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        bookingService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public String update(@PathVariable("id") Long id, @RequestBody BookingPojo bookingPojo) {
        return bookingService.update(id, bookingPojo);
    }
}
