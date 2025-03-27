package lk.ijse.classroombackend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Auto-generate UUID
    private String attendanceId;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
    private String status;
    @ManyToOne
    private Student studentId;

    public Attendance() {
    }

    public Attendance(String attendanceId, Date date, String status, Student studentId) {
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
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
}
