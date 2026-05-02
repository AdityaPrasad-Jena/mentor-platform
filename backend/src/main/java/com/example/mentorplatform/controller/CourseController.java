package com.example.mentorplatform.controller;

import com.example.mentorplatform.model.UserCourse;
import com.example.mentorplatform.repository.UserCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin
public class CourseController {

    @Autowired
    private UserCourseRepository repository;

    // ✅ Add Course
    @PostMapping("/add")
    public UserCourse addCourse(@RequestBody UserCourse course) {
        return repository.save(course);
    }

    // ✅ Get Courses
    @GetMapping("/get")
    public List<UserCourse> getCourses(@RequestParam String email) {
        return repository.findByUserEmail(email);
    }

    // ✅ Remove Course
    @DeleteMapping("/remove")
    public String removeCourse(@RequestParam String email,
                               @RequestParam String courseName) {

        repository.deleteByUserEmailAndCourseName(email, courseName);
        return "Course removed";
    }
}