package lk.ijse.classroombackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

import java.util.List;

@Entity
public class Teacher {
    @Id
   private String teacher_id;
   private String full_name;
   private String address;
   private String contact;
   private String email;
   private String specialization;

     @OneToMany(mappedBy = "teacher")
     private List<ClassTeacher> classTeachers;

    @OneToOne
    private User user;

    public Teacher() {

    }

    public Teacher(String teacher_id, String full_name, String address, String contact, String email, String specialization) {
        this.teacher_id = teacher_id;
        this.full_name = full_name;
        this.address = address;
        this.contact = contact;
        this.email = email;
        this.specialization = specialization;
    }

    public Teacher(String teacher_id, String full_name, String address, String contact, String email, String specialization, User user) {
        this.teacher_id = teacher_id;
        this.full_name = full_name;
        this.address = address;
        this.contact = contact;
        this.email = email;
        this.specialization = specialization;
        this.user = user;
    }

    public String getTeacher_id() {
        return teacher_id;
    }

    public void setTeacher_id(String teacher_id) {
        this.teacher_id = teacher_id;
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



    @Override
    public String toString() {
        return "Teacher{" +
                "teacher_id='" + teacher_id + '\'' +
                ", full_name='" + full_name + '\'' +
                ", address='" + address + '\'' +
                ", contact='" + contact + '\'' +
                ", email='" + email + '\'' +
                ", specialization='" + specialization + '\'' +
                '}';
    }
}
