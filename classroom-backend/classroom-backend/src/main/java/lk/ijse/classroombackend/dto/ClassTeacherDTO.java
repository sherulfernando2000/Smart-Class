package lk.ijse.classroombackend.dto;

import jakarta.persistence.ManyToOne;
import lk.ijse.classroombackend.entity.CourseClass;
import lk.ijse.classroombackend.entity.Teacher;

import java.util.Date;
import java.util.UUID;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 2:35 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */

public class ClassTeacherDTO {
    private UUID class_teacher_id;
    private CourseClass aCourseClass;
    private Teacher teacher;
    private Date date;

    public ClassTeacherDTO() {
    }

    public ClassTeacherDTO(UUID class_teacher_id, CourseClass aCourseClass, Teacher teacher, Date date) {
        this.class_teacher_id = class_teacher_id;
        this.aCourseClass = aCourseClass;
        this.teacher = teacher;
        this.date = date;
    }

    public UUID getClass_teacher_id() {
        return class_teacher_id;
    }

    public void setClass_teacher_id(UUID class_teacher_id) {
        this.class_teacher_id = class_teacher_id;
    }

    public CourseClass getaCourseClass() {
        return aCourseClass;
    }

    public void setaCourseClass(CourseClass aCourseClass) {
        this.aCourseClass = aCourseClass;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "ClassTeacherDTO{" +
                "class_teacher_id=" + class_teacher_id +
                ", aCourseClass=" + aCourseClass +
                ", teacher=" + teacher +
                ", date=" + date +
                '}';
    }
}
