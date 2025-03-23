package lk.ijse.classroombackend.controller;

import lk.ijse.classroombackend.dto.StudentDTO;
import lk.ijse.classroombackend.dto.TeacherDTO;
import lk.ijse.classroombackend.dto.UserDTO;
import lk.ijse.classroombackend.service.TeacherService;
import lk.ijse.classroombackend.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/teacher")
@CrossOrigin
public class TeacherController {

    @Autowired
    public TeacherService teacherService;

    /*@Autowired
    private EmailServiceImpl emailService;*/

    /*@GetMapping("test")
    public String test(){
        emailService.sendEmail("shamodha7@gmail.com", "Test", "Test");

        return "teacher";
    }*/

    @GetMapping("get")
    public String get(){
        return "teacher";
    }

    @GetMapping("get/{id}")
    public TeacherDTO getTeacherById(@PathVariable String id){

        return teacherService.getTeacherById(id);
    }

    @GetMapping("getAll")
    public ResponseUtil getAll(){
          List<TeacherDTO> teacherDTOS =  teacherService.getAllTeacher();
        System.out.println(teacherDTOS.get(0).getTeacherId());
            return new ResponseUtil(200,"Teachers loaded successfully",teacherDTOS);
    }

    @PostMapping("save")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseUtil save(@RequestBody TeacherDTO teacherDTO){
        UserDTO userDTO = teacherService.registerTeacher(teacherDTO);
        return new ResponseUtil(201,"Teacher saved successfully",userDTO);
    }

    @PutMapping("update")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseUtil updateTeacher(@RequestBody TeacherDTO teacherDTO){
        System.out.println("teachercontroller, teacherId"+teacherDTO.getTeacherId());
        System.out.println("teachercontroller, teacherId"+teacherDTO);
        teacherService.updateTeacher(teacherDTO);
        return new ResponseUtil(201,"Teacher updated.",null);
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil deleteTeacher(@PathVariable String id){
        teacherService.deleteTeacher(id);
        return new ResponseUtil(201,"Teacher deleted.",null);
    }



}
