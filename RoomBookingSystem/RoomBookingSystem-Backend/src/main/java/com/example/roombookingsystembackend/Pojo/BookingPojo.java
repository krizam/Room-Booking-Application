package com.example.roombookingsystembackend.Pojo;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
public class BookingPojo {
    private Long userId;
    private Long roomId;
    private String fullName;
    private String email;
    private String phoneNumber;
    private LocalDate startDate;
    private LocalDate endDate;

}
