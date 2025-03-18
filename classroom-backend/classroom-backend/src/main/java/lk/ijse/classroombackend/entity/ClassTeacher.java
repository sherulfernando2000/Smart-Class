package lk.ijse.classroombackend.entity;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
public class ClassTeacher {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID class_teacher_id;

    @ManyToOne
    private Class aClass;

    @ManyToOne
    private Teacher teacher;

    private Date date;

    public ClassTeacher() {
    }

    public ClassTeacher(UUID class_teacher_id, Class aClass, Teacher teacher, Date date) {
        this.class_teacher_id = class_teacher_id;
        this.aClass = aClass;
        this.teacher = teacher;
        this.date = date;
    }


    public UUID getClass_teacher_id() {
        return class_teacher_id;
    }

    public void setClass_teacher_id(UUID class_teacher_id) {
        this.class_teacher_id = class_teacher_id;
    }

    public Class getaClass() {
        return aClass;
    }

    public void setaClass(Class aClass) {
        this.aClass = aClass;
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
                ", aClass=" + aClass +
                ", teacher=" + teacher +
                ", date=" + date +
                '}';
    }
}
