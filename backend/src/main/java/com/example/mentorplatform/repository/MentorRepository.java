package com.example.mentorplatform.repository;

import com.example.mentorplatform.model.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MentorRepository extends JpaRepository<Mentor, Long> {

    List<Mentor> findBySkillsContainingIgnoreCaseOrderByRatingDesc(String course);
}