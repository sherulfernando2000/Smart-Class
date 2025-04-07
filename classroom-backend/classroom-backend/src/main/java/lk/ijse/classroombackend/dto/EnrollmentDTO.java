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
    private String enrollmentId;
    private CourseClass aCourseClass;
    private String name;
    private String studentId;
    private String studentName;
    private Student student;
    private String className;
    String enrollmentDate;
    private String classId;

    public EnrollmentDTO() {
    }

    public EnrollmentDTO(String enrollmentId, CourseClass aCourseClass, String name, String studentId, String studentName, Student student, String className, String enrollmentDate, String classId) {
        this.enrollmentId = enrollmentId;
        this.aCourseClass = aCourseClass;
        this.name = name;
        this.studentId = studentId;
        this.studentName = studentName;
        this.student = student;
        this.className = className;
        this.enrollmentDate = enrollmentDate;
        this.classId = classId;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(String enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }
}
