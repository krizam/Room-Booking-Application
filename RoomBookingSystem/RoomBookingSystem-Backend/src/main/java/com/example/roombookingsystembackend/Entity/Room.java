package com.example.roombookingsystembackend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "room")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Room {
    @Id
    @SequenceGenerator(name = "room_seq_gen", sequenceName = "room_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "room_seq_gen", strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "room_name", nullable = false)
    private String roomName;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "room_image")
    private String roomImage; // Store the URL of the image directly

    @Column(name = "roomPrice", nullable = false)
    private double roomPrice;
}
