package lk.ijse.classroombackend.entity;

import jakarta.persistence.*;

@Entity
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Auto-generate UUID
    private String attendanceId;
    private String date;
    private String status;
    @ManyToOne
    private Student studentId;

    public Attendance() {
    }

    public Attendance(String attendanceId, String date, String status, Student studentId) {
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
        return "Attendance{" +
                "attendanceId='" + attendanceId + '\'' +
                ", date='" + date + '\'' +
                ", status='" + status + '\'' +
                ", studentId=" + studentId +
                '}';
    }
}
