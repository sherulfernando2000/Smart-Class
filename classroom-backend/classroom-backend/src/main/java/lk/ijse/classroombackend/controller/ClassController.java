package lk.ijse.classroombackend.controller;


import jakarta.validation.Valid;
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
import java.util.UUID;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

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

    @GetMapping("get/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER','STUDENT')")
    public ClassDTO getClassById(@PathVariable String id){
        System.out.println("id"+id);
        return classService.getClassById(id);
    }


    @PostMapping("save")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseUtil save(@Valid @RequestBody ClassDTO classDTO){
        String classId = "C-" + UUID.randomUUID().toString();

        classDTO.setClassId(classId);
        System.out.println(classDTO.getClassName());
        ClassDTO classDTO1 = classService.saveClass(classDTO);
        return new ResponseUtil(201,"Class saved.",classDTO1);
    }

    @GetMapping("getAll")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER','STUDENT')")
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
        System.out.println("classDTO"+classDTO);
        classService.updateClass(classDTO);
        return new ResponseUtil(201,"Class updated.",classDTO);
    }

    @GetMapping("getByEmail/{email}")
    @PreAuthorize("hasAnyAuthority('ADMIN','STUDENT','TEACHER')")
    public ResponseUtil getClassByEmail(@PathVariable String email){
        System.out.println("id"+email);
        List<ClassDTO> classes= classService.getClassByEmail(email);
        return new ResponseUtil(201,"All Classes",classes);

    }

    @GetMapping("getByEmailT/{email}")
    @PreAuthorize("hasAnyAuthority('ADMIN','STUDENT','TEACHER')")
    public ResponseUtil getClassByEmailT(@PathVariable String email){
        System.out.println("id"+email);
        List<ClassDTO> classes= classService.getClassByEmailT(email);
        return new ResponseUtil(201,"All Classes",classes);

    }



}
