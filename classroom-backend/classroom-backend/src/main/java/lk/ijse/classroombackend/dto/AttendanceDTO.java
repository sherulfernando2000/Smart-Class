package lk.ijse.classroombackend.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lk.ijse.classroombackend.entity.Student;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 2:23 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */


public class AttendanceDTO {
    private String attendanceId;
    private String date;
    private String status;
    private Student studentId;

    public AttendanceDTO() {
    }

    public AttendanceDTO(String attendanceId, String date, String status, Student studentId) {
        this.attendanceId = attendanceId;
        this.date = date;
        this.status = status;
        this.studentId = studentId;
    }

    public String getAttendanceId() {
        return attendanceId;
    }

    public void setAttendanceId(String attendanceId) {
        this.attendanceId = attendanceId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Student getStudentId() {
        return studentId;
    }

    public void setStudentId(Student studentId) {
        this.studentId = studentId;
    }

    @Override
    public String toString() {
        return "AttendanceDTO{" +
                "attendanceId='" + attendanceId + '\'' +
                ", date='" + date + '\'' +
                ", status='" + status + '\'' +
                ", studentId=" + studentId +
                '}';
    }
}
