package lk.ijse.classroombackend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.Date;
import java.util.List;

@Entity
public class CourseClass {
    @Id
   private String class_id;
    private String className;
   private String subject;
   private Date created_at;

   @OneToMany(mappedBy = "aCourseClass")
    private List<ClassTeacher> classTeacher;

   @OneToMany(mappedBy = "aCourseClass")
    private List<Enrollment> enrollments;

    public CourseClass() {
    }

    public CourseClass(String class_id, String class_name, String subject, Date created_at, List<ClassTeacher> classTeacher, List<Enrollment> enrollments) {
        this.class_id = class_id;
        this.className = class_name;
        this.subject = subject;
        this.created_at = created_at;
        this.classTeacher = classTeacher;
        this.enrollments = enrollments;
    }

    public String getClass_id() {
        return class_id;
    }

    public void setClass_id(String class_id) {
        this.class_id = class_id;
    }


    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public List<ClassTeacher> getClassTeacher() {
        return classTeacher;
    }

    public void setClassTeacher(List<ClassTeacher> classTeacher) {
        this.classTeacher = classTeacher;
    }

    public List<Enrollment> getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(List<Enrollment> enrollments) {
        this.enrollments = enrollments;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    @Override
    public String toString() {
        return "CourseClass{" +
                "class_id='" + class_id + '\'' +
                ", class_name='" + className + '\'' +
                ", subject='" + subject + '\'' +
                ", created_at=" + created_at +
                ", classTeacher=" + classTeacher +
                ", enrollments=" + enrollments +
                '}';
    }

    //private Teacher teacher;
}
