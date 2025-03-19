package lk.ijse.classroombackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

import java.util.List;

@Entity
public class Teacher {
    @Id

   private String teacherId;
   private String full_name;
   private String address;
   private String contact;
   private String email;
   private String specialization;

     @OneToMany(mappedBy = "teacher")
     private List<ClassTeacher> classTeachers;

     @OneToMany(mappedBy = "uploadedBy")
     private List<Assignment> assignments;

    @OneToOne
    private User user;

    public Teacher() {

    }

    public List<Assignment> getAssignments() {
        return assignments;
    }

    public void setAssignments(List<Assignment> assignments) {
        this.assignments = assignments;
    }

    public void setClassTeachers(List<ClassTeacher> classTeachers) {
        this.classTeachers = classTeachers;
    }

    public Teacher(String teacher_id, String full_name, String address, String contact, String email, String specialization) {
        this.teacherId = teacher_id;
        this.full_name = full_name;
        this.address = address;
        this.contact = contact;
        this.email = email;
        this.specialization = specialization;
    }

    public Teacher(String teacher_id, String full_name, String address, String contact, String email, String specialization, User user) {
        this.teacherId = teacher_id;
        this.full_name = full_name;
        this.address = address;
        this.contact = contact;
        this.email = email;
        this.specialization = specialization;
        this.user = user;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<ClassTeacher> getClassTeachers() {
        return classTeachers;
    }




    @Override
    public String toString() {
        return "Teacher{" +
                "teacher_id='" + teacherId + '\'' +
                ", full_name='" + full_name + '\'' +
                ", address='" + address + '\'' +
                ", contact='" + contact + '\'' +
                ", email='" + email + '\'' +
                ", specialization='" + specialization + '\'' +
                '}';
    }
}
