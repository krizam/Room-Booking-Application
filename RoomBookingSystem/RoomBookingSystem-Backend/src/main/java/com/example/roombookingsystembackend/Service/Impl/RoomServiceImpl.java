package com.example.roombookingsystembackend.Service.Impl;

import com.example.roombookingsystembackend.Entity.Category;
import com.example.roombookingsystembackend.Entity.Room;
import com.example.roombookingsystembackend.Pojo.RoomPojo;
import com.example.roombookingsystembackend.Repo.CategoryRepo;
import com.example.roombookingsystembackend.Repo.RoomRepo;
import com.example.roombookingsystembackend.Service.RoomService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {
    private static final Logger logger = LoggerFactory.getLogger(RoomServiceImpl.class);

    private final RoomRepo roomRepo;
    private final CategoryRepo categoryRepository;

    @Override
    public void saveRoom(RoomPojo roomPojo) throws IOException {
        logger.info("Received request to save room with data: {}", roomPojo);

        Room room;
        if (roomPojo.getId() != null) {
            room = roomRepo.findById(roomPojo.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Room not found with ID: " + roomPojo.getId()));
        } else {
            room = new Room();
        }

        logger.info("Room object before setting attributes: {}", room);

        room.setRoomName(roomPojo.getRoomName());
        room.setRoomPrice(roomPojo.getRoomPrice());

        logger.info("Room object after setting name and price: {}", room);

        Category category = categoryRepository.findById(roomPojo.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found with ID: " + roomPojo.getCategoryId()));

        room.setRoomImage(roomPojo.getRoomImage()); // Set room image URL directly

        room.setCategory(category);
        roomRepo.save(room);
    }

    @Override
    public List<Room> findAll(){
        return roomRepo.findAll();
    }

    @Override
    public Optional<Room> getRoomById(Integer id) {
        return roomRepo.findById(id);
    }

    @Override
    public void deleteRoomById(Integer id) {
        roomRepo.deleteById(id);
    }
}
