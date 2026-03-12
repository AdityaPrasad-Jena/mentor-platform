package com.example.mentorplatform.controller;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.mentorplatform.model.User;
import com.example.mentorplatform.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;



    // ================= REGISTER API =================
    // This API creates a new user account

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {

        // check if email already exists
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            return "Email already registered";
        }

        // create password encoder
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // convert plain password into hashed password
        String hashedPassword = encoder.encode(user.getPassword());

        // replace original password with hashed password
        user.setPassword(hashedPassword);

        // save user to database
        userRepository.save(user);

        return "User registered successfully";
    }



    // ================= LOGIN API =================
    // This API verifies user login credentials

    @PostMapping("/login")
    public String loginUser(@RequestBody User loginUser){

        Optional<User> userOptional = userRepository.findByEmail(loginUser.getEmail());

        if(userOptional.isEmpty()){
            return "Email not registered";
        }

        User user = userOptional.get();

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if(encoder.matches(loginUser.getPassword(), user.getPassword())){

            return user.getRole(); // return role instead of message
        }

        return "Invalid password";
    }

}