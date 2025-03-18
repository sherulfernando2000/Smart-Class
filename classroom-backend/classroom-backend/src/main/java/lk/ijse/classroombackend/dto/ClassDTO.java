package lk.ijse.classroombackend.dto;


import java.util.Date;

public class ClassDTO {

    private String class_id;
    private String class_name;
    private String subject;
    private Date created_at;

    public ClassDTO() {
    }

    public ClassDTO(String class_id, String class_name, String subject, Date created_at) {
        this.class_id = class_id;
        this.class_name = class_name;
        this.subject = subject;
        this.created_at = created_at;
    }

    public String getClass_id() {
        return class_id;
    }

    public void setClass_id(String class_id) {
        this.class_id = class_id;
    }

    public String getClass_name() {
        return class_name;
    }

    public void setClass_name(String class_name) {
        this.class_name = class_name;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    @Override
    public String toString() {
        return "ClassDTO{" +
                "class_id='" + class_id + '\'' +
                ", class_name='" + class_name + '\'' +
                ", subject='" + subject + '\'' +
                ", created_at=" + created_at +
                '}';
    }
}
