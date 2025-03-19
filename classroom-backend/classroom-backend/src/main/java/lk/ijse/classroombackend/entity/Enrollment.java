package lk.ijse.classroombackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Enrollment {
    @Id
    private String enrollment_id;

    @ManyToOne
    private CourseClass aCourseClass;

    @ManyToOne
    private Student student;

    String enrollment_date;

    public Enrollment() {
    }

    public Enrollment(String enrollment_id, CourseClass aCourseClass, Student student, String enrollment_date) {
        this.enrollment_id = enrollment_id;
        this.aCourseClass = aCourseClass;
        this.student = student;
        this.enrollment_date = enrollment_date;
    }

    public CourseClass getaCourseClass() {
        return aCourseClass;
    }

    public void setaCourseClass(CourseClass aCourseClass) {
        this.aCourseClass = aCourseClass;
    }

    public String getEnrollment_id() {
        return enrollment_id;
    }

    public void setEnrollment_id(String enrollment_id) {
        this.enrollment_id = enrollment_id;
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

    public String getEnrollment_date() {
        return enrollment_date;
    }

    public void setEnrollment_date(String enrollment_date) {
        this.enrollment_date = enrollment_date;
    }

    @Override
    public String toString() {
        return "Enrollment{" +
                "enrollment_id='" + enrollment_id + '\'' +
                ", aClass=" + aCourseClass +
                ", student=" + student +
                ", enrollment_date='" + enrollment_date + '\'' +
                '}';
    }
}
