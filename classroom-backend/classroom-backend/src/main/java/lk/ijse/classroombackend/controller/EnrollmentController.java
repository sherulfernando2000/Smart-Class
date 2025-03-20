package lk.ijse.classroombackend.controller;

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
        enrollmentService.enrollStudent(email, className);
        return "Student enrolled successfully!";
    }
}
