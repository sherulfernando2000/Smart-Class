package lk.ijse.classroombackend.controller;

import jakarta.validation.Valid;
import lk.ijse.classroombackend.dto.ClassTeacherDTO;
import lk.ijse.classroombackend.service.ClassTeacherService;
import lk.ijse.classroombackend.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/30/2025 5:14 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */
@RestController
@RequestMapping("api/v1/classTeachers")
public class ClassTeacherController {
    @Autowired
    private ClassTeacherService classTeacherService;

    @PostMapping("/teacher/enroll")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public String enrollTeacher(@RequestParam String email,@RequestParam String className){
        System.out.println("email = " + email+", className = " + className);
        classTeacherService.enrollTeacher(email,className);
        return "Teacher enrolled successfully!";
    }

    @GetMapping("getAll")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER','STUDENT')")
    public ResponseUtil getAll(){
        List<ClassTeacherDTO> teacherEnrolls = classTeacherService.getAllTeacherEnrollments();
        return new ResponseUtil(200,"All Teacher Enrollments",teacherEnrolls);
    }

    @DeleteMapping("delete")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil deleteTeacherEnrollment(@Valid @RequestParam String teacherEnrollId){
        classTeacherService.deleteTeacherEnrollment(teacherEnrollId);
        return new ResponseUtil(200,"Teacher Enrollment deleted successfully!",null);
    }
}
