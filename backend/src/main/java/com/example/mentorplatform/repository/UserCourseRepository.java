package com.example.mentorplatform.repository;

import com.example.mentorplatform.model.UserCourse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserCourseRepository extends JpaRepository<UserCourse, Long> {

    List<UserCourse> findByUserEmail(String userEmail);

    void deleteByUserEmailAndCourseName(String userEmail, String courseName);
}