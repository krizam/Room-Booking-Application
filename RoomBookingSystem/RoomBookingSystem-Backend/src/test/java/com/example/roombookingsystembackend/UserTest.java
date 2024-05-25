package com.example.roombookingsystembackend;

import com.example.roombookingsystembackend.Entity.User;
import com.example.roombookingsystembackend.Repo.UserRepo;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserTest {

    @Autowired
    private UserRepo userRepo;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveUserTest() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("test123");
        user.setFullName("Test User");
        user.setSecurityQuestion("What is your favorite color?");
        user.setConfirmPassword("test123");

        userRepo.save(user);

        Assertions.assertThat(user.getId()).isNotNull();
    }

    @Test
    @Order(2)
    public void getUserTest() {
        User userGet = userRepo.findById(1L).orElse(null);
        Assertions.assertThat(userGet).isNotNull();
        Assertions.assertThat(userGet.getId()).isEqualTo(1L);
    }

    @Test
    @Order(3)
    public void getListOfUserTest() {
        List<User> users = userRepo.findAll();
        Assertions.assertThat(users.size()).isGreaterThan(0);
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateUserTest() {
        User user = userRepo.findById(1L).orElse(null);
        Assertions.assertThat(user).isNotNull();

        user.setFullName("Updated Name");
        User userUpdated = userRepo.save(user);

        Assertions.assertThat(userUpdated.getFullName()).isEqualTo("Updated Name");
    }

    @Test
    @Order(5)
    @Rollback(value = false)
    public void deleteUserTest() {
        User user = userRepo.findById(1L).orElse(null);
        Assertions.assertThat(user).isNotNull();

        userRepo.delete(user);

        Optional<User> optionalUser = userRepo.findById(1L);
        Assertions.assertThat(optionalUser).isEmpty();
    }
}
