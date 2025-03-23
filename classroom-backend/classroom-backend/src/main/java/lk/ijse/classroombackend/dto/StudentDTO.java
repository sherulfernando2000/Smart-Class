package lk.ijse.classroombackend.dto;

public class StudentDTO {
    private String studentId;
   private String fullName;
   private String contact;
   private String gender;
   private String address;
   private String parent_name;
   private String parent_contact;
   private String image_url;
   public String email;

    public StudentDTO() {
    }

    public StudentDTO(String studentId,String full_name, String contact, String gender, String address, String parent_name, String parent_contact, String image_url,String email) {
        this.studentId = studentId;
        this.fullName = full_name;
        this.contact = contact;
        this.gender = gender;
        this.address = address;
        this.parent_name = parent_name;
        this.parent_contact = parent_contact;
        this.image_url = image_url;
        this.email = email;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String full_name) {
        this.fullName = full_name;
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

    @Override
    public String toString() {
        return "StudentDTO{" +
                "full_name='" + fullName + '\'' +
                ", contact='" + contact + '\'' +
                ", gender='" + gender + '\'' +
                ", address='" + address + '\'' +
                ", parent_name='" + parent_name + '\'' +
                ", parent_contact='" + parent_contact + '\'' +
                ", image_url='" + image_url + '\'' +
                '}';
    }
}
