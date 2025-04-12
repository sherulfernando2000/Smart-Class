package lk.ijse.classroombackend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class TeacherDTO {

    String teacherId;
    @NotBlank(message = "Full name is required")
    String fullName;
    @NotBlank(message = "Address is required")
    String address;
    @NotBlank(message = "Contact number is required")
    @Pattern(regexp = "^(\\+\\d{1,3}[- ]?)?\\d{10}$", message = "Invalid contact number format")
    String contact;
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    String email;
    String specialization;

    public TeacherDTO() {
    }

    public TeacherDTO(String teacher_id, String full_name, String address, String contact, String email, String specialization) {
        this.teacherId = teacher_id;
        this.fullName = full_name;
        this.address = address;
        this.contact = contact;
        this.email = email;
        this.specialization = specialization;
    }

    public String getTeacherId() {

        return teacherId;
    }

    public void setTeacherId(String teacher_id) {
        this.teacherId = teacher_id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String full_name) {
        this.fullName = full_name;
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


    @Override
    public String toString() {
        return "TeacherDTO{" +
                "teacher_id='" + teacherId + '\'' +
                ", full_name='" + fullName + '\'' +
                ", address='" + address + '\'' +
                ", contact='" + contact + '\'' +
                ", email='" + email + '\'' +
                ", specialization='" + specialization + '\'' +
                '}';
    }
}
