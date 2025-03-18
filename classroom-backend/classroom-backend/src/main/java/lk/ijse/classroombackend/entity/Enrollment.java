package lk.ijse.classroombackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Enrollment {
    @Id
    private String enrollment_id;

    @ManyToOne
    private Class aClass;

    @ManyToOne
    private Student student;

    String enrollment_date;

    public Enrollment() {
    }

    public Enrollment(String enrollment_id, Class aClass, Student student, String enrollment_date) {
        this.enrollment_id = enrollment_id;
        this.aClass = aClass;
        this.student = student;
        this.enrollment_date = enrollment_date;
    }

    public String getEnrollment_id() {
        return enrollment_id;
    }

    public void setEnrollment_id(String enrollment_id) {
        this.enrollment_id = enrollment_id;
    }

    public Class getaClass() {
        return aClass;
    }

    public void setaClass(Class aClass) {
        this.aClass = aClass;
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
                ", aClass=" + aClass +
                ", student=" + student +
                ", enrollment_date='" + enrollment_date + '\'' +
                '}';
    }
}
