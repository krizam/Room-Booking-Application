package com.example.roombookingsystembackend;

import com.example.roombookingsystembackend.Entity.Booking;
import com.example.roombookingsystembackend.Entity.Room;
import com.example.roombookingsystembackend.Repo.BookingRepo;
import com.example.roombookingsystembackend.Repo.RoomRepo;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class BookingTest {

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private RoomRepo roomRepo;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveBookingTest() {
        Room room = roomRepo.findById(1).orElse(null);
        Assertions.assertThat(room).isNotNull();

        Booking booking = new Booking();
        booking.setRoom(room);
        booking.setFullName("John Doe");
        booking.setEmail("john@example.com");
        booking.setPhoneNumber("1234567890");
        booking.setStartDate(LocalDate.of(2024, 3, 1));
        booking.setEndDate(LocalDate.of(2024, 3, 5));

        bookingRepo.save(booking);

        Assertions.assertThat(booking.getId()).isNotNull();
    }

    @Test
    @Order(2)
    public void getBookingTest() {
        Optional<Booking> bookingOptional = bookingRepo.findById(1L);
        Assertions.assertThat(bookingOptional).isNotEmpty();
    }

    @Test
    @Order(3)
    public void getListOfBookingsTest() {
        List<Booking> bookings = bookingRepo.findAll();
        Assertions.assertThat(bookings).isNotEmpty();
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateBookingTest() {
        Booking booking = bookingRepo.findById(1L).orElse(null);
        Assertions.assertThat(booking).isNotNull();
        booking.setFullName("Updated John Doe");
        bookingRepo.save(booking);
        Booking updatedBooking = bookingRepo.findById(1L).orElse(null);
        Assertions.assertThat(updatedBooking).isNotNull();
        Assertions.assertThat(updatedBooking.getFullName()).isEqualTo("Updated John Doe");
    }

    @Test
    @Order(5)
    @Rollback(value = false)
    public void deleteBookingTest() {
        Booking booking = bookingRepo.findById(1L).orElse(null);
        Assertions.assertThat(booking).isNotNull();
        bookingRepo.delete(booking);
        Booking deletedBooking = bookingRepo.findById(1L).orElse(null);
        Assertions.assertThat(deletedBooking).isNull();
    }
}
