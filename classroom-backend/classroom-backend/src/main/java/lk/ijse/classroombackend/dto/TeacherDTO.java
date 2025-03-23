package lk.ijse.classroombackend.dto;

public class TeacherDTO {
    String teacherId;
    String fullName;
    String address;
    String contact;
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
