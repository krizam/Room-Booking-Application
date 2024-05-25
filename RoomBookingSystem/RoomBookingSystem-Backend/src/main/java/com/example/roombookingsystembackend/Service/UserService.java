package com.example.roombookingsystembackend.Service;


import com.example.roombookingsystembackend.Entity.User;
import com.example.roombookingsystembackend.Pojo.UserPojo;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(UserPojo userPojo);
    List<User> getAllData();
    Optional<User> getUserById(long id);
    void deleteUserById(long id);
    User loginUser(String email, String password);

    void resetPassword(String email, String securityQuestion, String password);
}
