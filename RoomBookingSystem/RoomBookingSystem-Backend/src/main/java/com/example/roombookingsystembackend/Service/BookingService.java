package com.example.roombookingsystembackend.Service;

import com.example.roombookingsystembackend.Entity.Booking;
import com.example.roombookingsystembackend.Pojo.BookingPojo;

import java.util.List;
import java.util.Optional;

public interface BookingService {
    void saveBooking(BookingPojo BookingPojo);
    List<Booking> getAll();

    Optional<Booking> getById(Long id);

    void deleteById(Long id);

    String update(Long id, BookingPojo BookingPojo);
}
