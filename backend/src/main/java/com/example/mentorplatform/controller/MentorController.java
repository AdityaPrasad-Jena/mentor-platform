package com.example.mentorplatform.controller;

import com.example.mentorplatform.model.Mentor;
import com.example.mentorplatform.repository.MentorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentors")
@CrossOrigin
public class MentorController {

    @Autowired
    private MentorRepository repository;

    // 🔹 Add mentor (for testing)
    @PostMapping("/add")
    public Mentor addMentor(@RequestBody Mentor mentor) {
        return repository.save(mentor);
    }

    // 🔹 Get mentors by course (sorted by rating)
    @GetMapping("/get")
    public List<Mentor> getMentors(@RequestParam String course) {
        return repository.findBySkillsContainingIgnoreCaseOrderByRatingDesc(course);
    }
}