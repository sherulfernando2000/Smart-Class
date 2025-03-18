package lk.ijse.classroombackend.controller;

import lk.ijse.classroombackend.dto.StudentDTO;
import lk.ijse.classroombackend.dto.UserDTO;
import lk.ijse.classroombackend.entity.User;
import lk.ijse.classroombackend.service.StudentService;
//import lk.ijse.classroombackend.service.impl.StudentServiceImpl;
import lk.ijse.classroombackend.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/student")
@CrossOrigin
public class StudentController {

    @Autowired
    public StudentService studentService;

    @GetMapping("get")
    public String getStudent(){
        return "Students";
    }

    @GetMapping("getAll")
    public List<StudentDTO> getAllStudent(){
       return studentService.getAllStudent();
    }

    @GetMapping("get/{id}")
    public StudentDTO getStudentById(@PathVariable String id){
        return studentService.getStudentById(id);
    }

    @PostMapping("save")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseUtil addUserAndSave(@RequestBody StudentDTO studentDTO){
            UserDTO user = studentService.registerStudent(studentDTO);
            return new ResponseUtil(201,"Student Registered and Email send Succussfully.",user);
    }


    @PutMapping("update")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil updateStudent(@RequestBody  StudentDTO studentDTO){
        studentService.updateStudent(studentDTO);
        return new ResponseUtil(201,"Student updated.",null);
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil deleteStudent(@PathVariable String id){
        studentService.deleteStudent(id);
        return new ResponseUtil(201,"Student deleted.",null);
    }

}
