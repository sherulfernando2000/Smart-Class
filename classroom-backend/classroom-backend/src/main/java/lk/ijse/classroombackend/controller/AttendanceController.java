package lk.ijse.classroombackend.controller;

import lk.ijse.classroombackend.dto.AttendanceDTO;
import lk.ijse.classroombackend.service.AttendanceService;
import lk.ijse.classroombackend.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 1:19 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */

@RestController
@RequestMapping("api/v1/attendance")
@CrossOrigin
public class AttendanceController {

    @Autowired
    public AttendanceService attendanceService;


    @GetMapping("get")
    public String getAttendance(){
        return "Attendance";
    }

    @GetMapping("getAll")
    public ResponseUtil getAll(){
        List<AttendanceDTO> allAttendance = attendanceService.getAllAttendance();
        return new ResponseUtil(200,"Success",allAttendance);
    }

    @PostMapping("save")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil save(@RequestBody AttendanceDTO attendanceDTO){
        AttendanceDTO attendance = attendanceService.saveAttendance(attendanceDTO);
        return new ResponseUtil(201,"Attendance saved successfully",attendance);
    }

    @PutMapping("update")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil update(@RequestBody AttendanceDTO attendanceDTO){
        AttendanceDTO attendance = attendanceService.updateAttendance(attendanceDTO);
        return new ResponseUtil(201,"Attendance updated successfully",attendance);
    }

    @DeleteMapping("delete")
    public ResponseUtil deleteAttendance(@RequestBody AttendanceDTO attendanceDTO){
        attendanceService.deleteAttendance(attendanceDTO);
        return new ResponseUtil(201,"Attendance deleted",null);
    }






}
