package com.example.roombookingsystembackend.Service;

import com.example.roombookingsystembackend.Entity.Room;
import com.example.roombookingsystembackend.Pojo.RoomPojo;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface RoomService {

    void saveRoom(RoomPojo roomPojo) throws IOException;
    List<Room> findAll();
    Optional<Room> getRoomById(Integer id);
    void deleteRoomById(Integer id);
}
