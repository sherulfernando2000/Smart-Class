package lk.ijse.classroombackend.controller;

import lk.ijse.classroombackend.dto.AssignmentDTO;
import lk.ijse.classroombackend.dto.TeacherDTO;
import lk.ijse.classroombackend.dto.UserDTO;
import lk.ijse.classroombackend.entity.Assignment;
import lk.ijse.classroombackend.service.AssignmentService;
import lk.ijse.classroombackend.service.TeacherService;
import lk.ijse.classroombackend.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/20/2025 5:18 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */
@RestController
@RequestMapping("api/v1/assignment")
@CrossOrigin
public class AssignmentController {
    @Autowired
    public AssignmentService assignementService;

    @GetMapping("get")
    public String get(){
        return "assignment";
    }

    @GetMapping("getAll")
    public ResponseUtil getAll(){
        List<AssignmentDTO> assignmentDTOS =  assignementService.getAllAssignments();
        return new ResponseUtil(200,"Assignment loaded successfully",assignmentDTOS);
    }

    @PostMapping("save")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil save(@RequestBody AssignmentDTO assignmentDTO){
        AssignmentDTO assignmentDTO1 = assignementService.saveAssignment(assignmentDTO);
        return new ResponseUtil(201,"Assignment saved successfully",assignmentDTO1);
    }

    @PutMapping("update")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil updateAssignment(@RequestBody AssignmentDTO assignmentDTO){
        assignementService.updateAssignment(assignmentDTO);
        return new ResponseUtil(201,"Assignment updated.",null);
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil deleteAssignment(@PathVariable String id){
        assignementService.deleteAssignment(id);
        return new ResponseUtil(201,"Assignment deleted.",null);
    }


}
