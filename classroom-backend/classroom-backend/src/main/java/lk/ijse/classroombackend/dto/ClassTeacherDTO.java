package lk.ijse.classroombackend.dto;

import jakarta.persistence.ManyToOne;
import lk.ijse.classroombackend.entity.CourseClass;
import lk.ijse.classroombackend.entity.Teacher;



/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 2:35 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */

public class ClassTeacherDTO {
    private String classTeacherId;
    private String teacherId;
    private String teacherName;
    private String className;
    private String aCourseClass;
    private Teacher teacher;
    private String date;

    public ClassTeacherDTO() {
    }

    public ClassTeacherDTO(String classTeacherId, String teacherId, String teacherName, String className, String aCourseClass, Teacher teacher, String date) {
        this.classTeacherId = classTeacherId;
        this.teacherId = teacherId;
        this.teacherName = teacherName;
        this.className = className;
        this.aCourseClass = aCourseClass;
        this.teacher = teacher;
        this.date = date;
    }

    public ClassTeacherDTO(String classTeacherId) {
        this.classTeacherId = classTeacherId;
    }

    public String getClassTeacherId() {
        return classTeacherId;
    }

    public void setClassTeacherId(String classTeacherId) {
        this.classTeacherId = classTeacherId;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getaCourseClass() {
        return aCourseClass;
    }

    public void setaCourseClass(String aCourseClass) {
        this.aCourseClass = aCourseClass;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "ClassTeacherDTO{" +
                "classTeacherId='" + classTeacherId + '\'' +
                ", teacherId='" + teacherId + '\'' +
                ", teacherName='" + teacherName + '\'' +
                ", className='" + className + '\'' +
                ", aCourseClass='" + aCourseClass + '\'' +
                ", teacher=" + teacher +
                ", date='" + date + '\'' +
                '}';
    }
}
