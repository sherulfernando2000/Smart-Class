package lk.ijse.classroombackend.entity;

import jakarta.persistence.*;

@Entity
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Auto-generate UUID
    private String enrollmentId;

    @ManyToOne
    private CourseClass aCourseClass;

    @ManyToOne
    private Student student;

    String enrollmentDate;

    public Enrollment() {
    }

    public Enrollment(String enrollment_id, CourseClass aCourseClass, Student student, String enrollment_date) {
        this.enrollmentId = enrollment_id;
        this.aCourseClass = aCourseClass;
        this.student = student;
        this.enrollmentDate = enrollment_date;
    }

    public CourseClass getaCourseClass() {
        return aCourseClass;
    }

    public void setaCourseClass(CourseClass aCourseClass) {
        this.aCourseClass = aCourseClass;
    }

    public String getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(String enrollment_id) {
        this.enrollmentId = enrollment_id;
    }

    public CourseClass getaClass() {
        return aCourseClass;
    }

    public void setaClass(CourseClass aCourseClass) {
        this.aCourseClass = aCourseClass;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public String getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollment_date(String enrollment_date) {
        this.enrollmentDate = enrollment_date;
    }

    @Override
    public String toString() {
        return "Enrollment{" +
                "enrollment_id='" + enrollmentId + '\'' +
                ", aClass=" + aCourseClass +
                ", student=" + student +
                ", enrollment_date='" + enrollmentDate + '\'' +
                '}';
    }
}
