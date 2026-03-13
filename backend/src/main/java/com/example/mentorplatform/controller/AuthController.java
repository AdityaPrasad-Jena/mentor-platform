package com.example.mentorplatform.controller;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.mentorplatform.model.User;
import com.example.mentorplatform.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.*;
import java.io.IOException;
import java.util.UUID;

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
    public Object loginUser(@RequestBody User loginUser){

        Optional<User> userOptional = userRepository.findByEmail(loginUser.getEmail());

        if(userOptional.isEmpty()){
            return "Email not registered";
        }

        User user = userOptional.get();

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if(encoder.matches(loginUser.getPassword(), user.getPassword())){

            // create response object
            java.util.Map<String, String> response = new java.util.HashMap<>();

            response.put("firstName", user.getFirstName());
            response.put("lastName", user.getLastName());
            response.put("role", user.getRole());

            return response;
        }

        return "Invalid password";
    }

    // ================= PROFILE IMAGE UPLOAD =================

    @PostMapping("/uploadProfileImage")
    public String uploadProfileImage(@RequestParam("image") MultipartFile file) throws IOException {

        // generate unique filename
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        // folder where images will be stored
        Path uploadPath = Paths.get("uploads");

        // create folder if not exists
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // save file
        Files.copy(file.getInputStream(), uploadPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

        return fileName;
    }

}

