package com.example.roombookingsystembackend;

import com.example.roombookingsystembackend.Entity.Category;
import com.example.roombookingsystembackend.Entity.Room;
import com.example.roombookingsystembackend.Repo.CategoryRepo;
import com.example.roombookingsystembackend.Repo.RoomRepo;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class RoomTest{

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveRoomTest() {
        Category category = Category.builder()
                .name("Test Category")
                .build();
        categoryRepo.save(category);

        Room room = Room.builder()
                .roomName("Test Room")
                .category(category)
                .roomPrice(100.00)
                .build();

        roomRepo.save(room);

        Assertions.assertThat(room.getId()).isNotNull();
    }

    @Test
    @Order(2)
    public void getRoomTest() {
        Optional<Room> roomOptional = roomRepo.findById(1);
        Assertions.assertThat(roomOptional).isNotEmpty();
    }

    @Test
    @Order(3)
    public void getListOfRoomsTest() {
        List<Room> rooms = roomRepo.findAll();
        Assertions.assertThat(rooms).isNotEmpty();
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateRoomTest() {
        Room room = roomRepo.findById(1).orElse(null);
        Assertions.assertThat(room).isNotNull();
        room.setRoomName("Updated Room Name");
        roomRepo.save(room);
        Room updatedRoom = roomRepo.findById(1).orElse(null);
        Assertions.assertThat(updatedRoom).isNotNull();
        Assertions.assertThat(updatedRoom.getRoomName()).isEqualTo("Updated Room Name");
    }

    @Test
    @Order(5)
    @Rollback(value = false)
    public void deleteRoomTest() {
        Room room = roomRepo.findById(1).orElse(null);
        Assertions.assertThat(room).isNotNull();
        roomRepo.delete(room);
        Room deletedRoom = roomRepo.findById(1).orElse(null);
        Assertions.assertThat(deletedRoom).isNull();
    }
}
