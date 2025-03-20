package lk.ijse.classroombackend.service;

import lk.ijse.classroombackend.dto.AttendanceDTO;

import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/20/2025 1:04 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */
public interface AttendanceService {
    List<AttendanceDTO> getAllAttendance();

    AttendanceDTO saveAttendance(AttendanceDTO attendanceDTO);

    AttendanceDTO updateAttendance(AttendanceDTO attendanceDTO);

    void deleteAttendance(AttendanceDTO attendanceDTO);
}
