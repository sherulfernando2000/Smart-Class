package lk.ijse.classroombackend.dto;

import jakarta.persistence.ManyToOne;
import lk.ijse.classroombackend.entity.CourseClass;
import lk.ijse.classroombackend.entity.Student;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 2:38 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */
public class EnrollmentDTO {
    private String enrollment_id;
    private CourseClass aCourseClass;
    private Student student;
    String enrollment_date;

    public EnrollmentDTO() {
    }

    public EnrollmentDTO(String enrollment_id, CourseClass aCourseClass, Student student, String enrollment_date) {
        this.enrollment_id = enrollment_id;
        this.aCourseClass = aCourseClass;
        this.student = student;
        this.enrollment_date = enrollment_date;
    }

    public String getEnrollment_id() {
        return enrollment_id;
    }

    public void setEnrollment_id(String enrollment_id) {
        this.enrollment_id = enrollment_id;
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

    public String getEnrollment_date() {
        return enrollment_date;
    }

    public void setEnrollment_date(String enrollment_date) {
        this.enrollment_date = enrollment_date;
    }

    @Override
    public String toString() {
        return "EnrollmentDTO{" +
                "enrollment_id='" + enrollment_id + '\'' +
                ", aCourseClass=" + aCourseClass +
                ", student=" + student +
                ", enrollment_date='" + enrollment_date + '\'' +
                '}';
    }
}
