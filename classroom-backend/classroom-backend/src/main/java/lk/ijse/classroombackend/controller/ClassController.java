package lk.ijse.classroombackend.controller;


import lk.ijse.classroombackend.dto.ClassDTO;
import lk.ijse.classroombackend.dto.StudentDTO;
import lk.ijse.classroombackend.dto.TeacherDTO;
import lk.ijse.classroombackend.entity.Teacher;
import lk.ijse.classroombackend.service.ClassService;
import lk.ijse.classroombackend.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/class")
@CrossOrigin
public class ClassController {
    @Autowired
    private ClassService classService;

    @GetMapping("get")
    public String get(){
        return "Class";
    }

    @PostMapping("save")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseUtil save(@RequestBody ClassDTO classDTO){
        ClassDTO classDTO1 = classService.saveClass(classDTO);
        return new ResponseUtil(201,"Class saved.",classDTO1);
    }

    @GetMapping("getAll")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseUtil getAllClass(){
        List<ClassDTO> allClass = classService.getAllClass();
        return  new ResponseUtil(201,"All Classes",allClass);
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseUtil delte(@PathVariable String id){
        classService.deleteClass(id);
        return new ResponseUtil(201,"Class deleted.",null);

    }

    @PutMapping("update")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseUtil update(@RequestBody ClassDTO classDTO){
        classService.updateClass(classDTO);
        return new ResponseUtil(201,"Class updated.",null);
    }



}
