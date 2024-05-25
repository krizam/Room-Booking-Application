package com.example.roombookingsystembackend.Service.Impl;

import com.example.roombookingsystembackend.Entity.Booking;
import com.example.roombookingsystembackend.Entity.Room;
import com.example.roombookingsystembackend.Entity.User;
import com.example.roombookingsystembackend.Pojo.BookingPojo;
import com.example.roombookingsystembackend.Repo.BookingRepo;
import com.example.roombookingsystembackend.Repo.RoomRepo;
import com.example.roombookingsystembackend.Repo.UserRepo;
import com.example.roombookingsystembackend.Service.BookingService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepo bookingRepo;
    private final RoomRepo roomRepo;
    private final UserRepo userRepo;

    @Override
    public void saveBooking(BookingPojo bookingPojo) {
        Long roomId = bookingPojo.getRoomId();
        Long userId = bookingPojo.getUserId();

        // Check if the room is already booked by any user
        boolean roomAlreadyBooked = bookingRepo.existsByRoomId(roomId);

        if (roomAlreadyBooked) {
            throw new IllegalStateException("Room is already booked by another user");
        }

        Booking booking = new Booking();

        Room room = roomRepo.findById(Math.toIntExact(roomId))
                .orElseThrow(() -> new EntityNotFoundException("Room not found with Id: " + roomId));
        booking.setRoom(room);

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with Id: " + userId));
        booking.setUser(user);

        booking.setFullName(bookingPojo.getFullName());
        booking.setEmail(bookingPojo.getEmail());
        booking.setPhoneNumber(bookingPojo.getPhoneNumber());
        booking.setStartDate(bookingPojo.getStartDate());
        booking.setEndDate(bookingPojo.getEndDate());

        bookingRepo.save(booking);
    }


    @Override
    public List<Booking> getAll() {
        return bookingRepo.findAll();
    }

    @Override
    public Optional<Booking> getById(Long id) {
        return bookingRepo.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        bookingRepo.deleteById(id);
    }

    @Override
    public String update(Long id, BookingPojo bookingPojo) {
        Booking existingBooking = bookingRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with Id : " + id));

        existingBooking.setFullName(bookingPojo.getFullName());
        existingBooking.setEmail(bookingPojo.getEmail());
        existingBooking.setPhoneNumber(bookingPojo.getPhoneNumber());
        existingBooking.setStartDate(bookingPojo.getStartDate());
        existingBooking.setEndDate(bookingPojo.getEndDate());

        bookingRepo.save(existingBooking);
        return "Updated Successfully";
    }
}
