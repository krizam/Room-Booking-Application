package com.example.roombookingsystembackend.Repo;

import com.example.roombookingsystembackend.Entity.Booking;
import com.example.roombookingsystembackend.Pojo.BookingPojo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {
    boolean existsByRoomId(Long roomId);

}
