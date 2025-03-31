package lk.ijse.classroombackend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.lang.String;

@Entity
public class ClassTeacher {
    @Id
    private String classTeacherId;

    @ManyToOne
    private CourseClass aCourseClass;

    @ManyToOne
    private Teacher teacher;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    public ClassTeacher() {
    }

    public ClassTeacher(String class_teacher_id, CourseClass aCourseClass, Teacher teacher, Date date) {
        this.classTeacherId = class_teacher_id;
        this.aCourseClass = aCourseClass;
        this.teacher = teacher;
        this.date = date;
    }

    public String getClassTeacherId() {
        return classTeacherId;
    }

    public void setClassTeacherId(String classTeacherId) {
        this.classTeacherId = classTeacherId;
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
                "class_teacher_id=" + classTeacherId +
                ", aClass=" + aCourseClass +
                ", teacher=" + teacher +
                ", date=" + date +
                '}';
    }
}
