package com.example.roombookingsystembackend.Controller;

import com.example.roombookingsystembackend.Entity.Room;
import com.example.roombookingsystembackend.Pojo.RoomPojo;
import com.example.roombookingsystembackend.Service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("room")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/save")
    public String saveRoom(@RequestBody RoomPojo roomPojo) throws IOException {
        roomService.saveRoom(roomPojo);
        return "Saved successfully";
    }

    @GetMapping("/findAll")
    public List<Room> findAll() {
        return roomService.findAll();
    }

    @GetMapping("/findById/{id}")
    public Optional<Room> getRoomById(@PathVariable("id") Integer id) {
        return roomService.getRoomById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteRoomById(@PathVariable("id") Integer id) {
        roomService.deleteRoomById(id);
    }
}
