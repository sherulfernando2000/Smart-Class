package lk.ijse.classroombackend.controller;

import jakarta.validation.Valid;
import lk.ijse.classroombackend.dto.EnrollmentDTO;
import lk.ijse.classroombackend.entity.Enrollment;
import lk.ijse.classroombackend.service.EnrollementService;
import lk.ijse.classroombackend.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        enrollmentService.enrollStudent(enrollmentDTO.getEnrollmentId(), enrollmentDTO.getaCourseClass().getClassName());
        return "Student enrolled successfully!";
    }

    @GetMapping("getAll")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER','STUDENT')")
    public ResponseUtil getAll(){
        List<EnrollmentDTO> enrollments = enrollmentService.getAllEnrollment();
        return new ResponseUtil(200,"All Enrollments",enrollments);
    }

    @DeleteMapping("delete")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil deleteEnrollment(@Valid @RequestParam String enrollmentId){
        enrollmentService.deleteEnrollment(enrollmentId);
        return new ResponseUtil(200,"Enrollment deleted successfully!",null);
    }





}
