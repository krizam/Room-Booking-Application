package com.example.roombookingsystembackend.Pojo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomPojo {

    private Integer id;

    @NotNull
    private String roomName;

    @NotNull
    private Integer categoryId;

    private String roomImage; // New field for image URL

    @NotNull
    private double roomPrice;
}
