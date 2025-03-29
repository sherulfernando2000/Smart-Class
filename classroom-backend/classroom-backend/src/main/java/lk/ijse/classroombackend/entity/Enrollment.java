package lk.ijse.classroombackend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Auto-generate UUID
    private String enrollmentId;

    @ManyToOne
    private CourseClass aCourseClass;

    @ManyToOne
    private Student student;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date enrollmentDate;

    public Enrollment() {
    }

    public Enrollment(String enrollmentId, CourseClass aCourseClass, Student student, Date enrollmentDate) {
        this.enrollmentId = enrollmentId;
        this.aCourseClass = aCourseClass;
        this.student = student;
        this.enrollmentDate = enrollmentDate;
    }

    public String getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(String enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public CourseClass getaCourseClass() {
        return aCourseClass;
    }

    public void setaCourseClass(CourseClass aCourseClass) {
        this.aCourseClass = aCourseClass;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Date getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(Date enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }


}
