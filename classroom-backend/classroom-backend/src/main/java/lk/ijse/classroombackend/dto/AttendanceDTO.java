package lk.ijse.classroombackend.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message = "Date is required")
    private String date;
    @NotBlank(message = "Status is required")
    private String status;
    @NotBlank(message = "Student ID is required")
    private String studentId;
    @NotBlank(message = "Class ID is required")
    private String classId;
    private String studentName;

    public AttendanceDTO() {
    }

    public AttendanceDTO(String attendanceId, String date, String status, String studentId) {
        this.attendanceId = attendanceId;
        this.date = date;
        this.status = status;
        this.studentId = studentId;
    }

    public AttendanceDTO(String attendanceId, String date, String status, String studentId, String classId) {
        this.attendanceId = attendanceId;
        this.date = date;
        this.status = status;
        this.studentId = studentId;
        this.classId = classId;
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

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    @Override
    public String toString() {
        return "AttendanceDTO{" +
                "attendanceId='" + attendanceId + '\'' +
                ", date='" + date + '\'' +
                ", status='" + status + '\'' +
                ", studentId='" + studentId + '\'' +
                '}';
    }
}
