package lk.ijse.classroombackend.entity;

import jakarta.persistence.*;

import java.util.Date;
import java.util.UUID;

@Entity
public class ClassTeacher {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID class_teacher_id;

    @ManyToOne
    private CourseClass aCourseClass;

    @ManyToOne
    private Teacher teacher;

    private Date date;

    public ClassTeacher() {
    }

    public ClassTeacher(UUID class_teacher_id, CourseClass aCourseClass, Teacher teacher, Date date) {
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
        return "ClassTeacher{" +
                "class_teacher_id=" + class_teacher_id +
                ", aClass=" + aCourseClass +
                ", teacher=" + teacher +
                ", date=" + date +
                '}';
    }
}
