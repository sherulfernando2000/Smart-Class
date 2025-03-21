package lk.ijse.classroombackend.controller;

import lk.ijse.classroombackend.dto.EnrollmentDTO;
import lk.ijse.classroombackend.service.EnrollementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/enrollments")
@CrossOrigin
public class EnrollmentController {

    @Autowired
    private EnrollementService enrollmentService;

    @PostMapping("/student/enroll")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public String enrollStudent(@RequestParam String email, @RequestParam String className) {
        System.out.println("email = " + email+", className = " + className);
        enrollmentService.enrollStudent(email, className);
        return "Student enrolled successfully!";
    }

    @PostMapping("save")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public String saveEnrollment(@RequestBody EnrollmentDTO enrollmentDTO) {
        enrollmentService.enrollStudent(enrollmentDTO.getEnrollment_id(), enrollmentDTO.getaCourseClass().getClassName());
        return "Student enrolled successfully!";
    }



}
