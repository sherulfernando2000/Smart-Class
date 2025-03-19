package lk.ijse.classroombackend.entity;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class Student {
    @Id
    private String studentId;  // Custom student ID
    private String full_name;
    private String contact;
    private String gender;
    private String address;
    private String parent_name;
    private String parent_contact;
    private String image_url;
    private String email;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "uid", nullable = false)
    private User user;

    @OneToMany(mappedBy = "student")
    private List<Enrollment> enrollments;

    @OneToMany(mappedBy = "studentId")
    private List<Submission> submissions;

    @OneToMany(mappedBy = "studentId")
    private List<Attendance> attendances;

    @OneToMany(mappedBy = "paymentId")
    private List<Payment> payments;

   /* @PrePersist
    public void generateStudentId() {
        if (this.studentId == null) {
            this.studentId = StudentIdGenerator.generateStudentId();
        }
    }*/



    public Student() {
    }

    public Student(String studentId, String full_name, String contact, String gender, String address, String parent_name, String parent_contact, String image_url,String email, User user) {
        this.studentId = studentId;
        this.full_name = full_name;
        this.contact = contact;
        this.gender = gender;
        this.address = address;
        this.parent_name = parent_name;
        this.parent_contact = parent_contact;
        this.image_url = image_url;
        this.email = email;
        this.user = user;
    }

    public Student(String studentId, String full_name, String contact, String gender, String address, String parent_name, String parent_contact, String image_url) {
        this.studentId = studentId;
        this.full_name = full_name;
        this.contact = contact;
        this.gender = gender;
        this.address = address;
        this.parent_name = parent_name;
        this.parent_contact = parent_contact;
        this.image_url = image_url;
    }

    public Student(String studentId, String full_name, String contact, String gender, String address, String parent_name, String parent_contact, String image_url, String email, User user, List<Enrollment> enrollments, List<Submission> submissions, List<Attendance> attendances, List<Payment> payments) {
        this.studentId = studentId;
        this.full_name = full_name;
        this.contact = contact;
        this.gender = gender;
        this.address = address;
        this.parent_name = parent_name;
        this.parent_contact = parent_contact;
        this.image_url = image_url;
        this.email = email;
        this.user = user;
        this.enrollments = enrollments;
        this.submissions = submissions;
        this.attendances = attendances;
        this.payments = payments;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getParent_name() {
        return parent_name;
    }

    public void setParent_name(String parent_name) {
        this.parent_name = parent_name;
    }

    public String getParent_contact() {
        return parent_contact;
    }

    public void setParent_contact(String parent_contact) {
        this.parent_contact = parent_contact;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Enrollment> getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(List<Enrollment> enrollments) {
        this.enrollments = enrollments;
    }

    public List<Submission> getSubmissions() {
        return submissions;
    }

    public void setSubmissions(List<Submission> submissions) {
        this.submissions = submissions;
    }

    public List<Attendance> getAttendances() {
        return attendances;
    }

    public void setAttendances(List<Attendance> attendances) {
        this.attendances = attendances;
    }

    public List<Payment> getPayments() {
        return payments;
    }

    public void setPayments(List<Payment> payments) {
        this.payments = payments;
    }

    @Override
    public String toString() {
        return "Student{" +
                "studentId='" + studentId + '\'' +
                ", full_name='" + full_name + '\'' +
                ", contact='" + contact + '\'' +
                ", gender='" + gender + '\'' +
                ", address='" + address + '\'' +
                ", parent_name='" + parent_name + '\'' +
                ", parent_contact='" + parent_contact + '\'' +
                ", image_url='" + image_url + '\'' +
                ", email='" + email + '\'' +
                ", user=" + user +
                ", enrollments=" + enrollments +
                ", submissions=" + submissions +
                ", attendances=" + attendances +
                ", payments=" + payments +
                '}';
    }
}




