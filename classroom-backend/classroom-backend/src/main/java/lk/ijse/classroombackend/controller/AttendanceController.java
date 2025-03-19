package lk.ijse.classroombackend.controller;

import lk.ijse.classroombackend.util.ResponseUtil;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


    @GetMapping("get")
    public String getAttendance(){
        return "Attendance";
    }

//    @GetMapping("getAll")
//    public ResponseUtil getAll(){
//       // List<AttendanceDTO> attendanceDTOs = attendanceService.getAllAttendance();
//    }



}
