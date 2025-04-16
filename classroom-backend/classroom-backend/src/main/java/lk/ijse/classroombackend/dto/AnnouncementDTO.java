package lk.ijse.classroombackend.dto;

import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lk.ijse.classroombackend.entity.CourseClass;
import lk.ijse.classroombackend.entity.Teacher;

import java.time.LocalDateTime;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 2:31 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */


public class AnnouncementDTO {

    private String announcementId;
    @NotBlank(message = "Message must not be blank")
    private String message;
    @NotBlank(message = "Email is required")
    private String email;
    private String url;
    private LocalDateTime postedAt;
    @NotBlank(message = "Class ID is required")
    private String classId;
    private Teacher postedBy;

    public AnnouncementDTO() {
    }

    public AnnouncementDTO( String message, String classId, String url, String email) {
        this.message = message;
        this.classId = classId;
        this.url = url;
        this.email = email;
    }

    public AnnouncementDTO(String announcementId, String message, LocalDateTime postedAt, String classId, Teacher postedBy) {
        this.announcementId = announcementId;
        this.message = message;
        this.postedAt = postedAt;
        this.classId = classId;
        this.postedBy = postedBy;
    }

    public String getAnnouncementId() {
        return announcementId;
    }

    public void setAnnouncementId(String announcementId) {
        this.announcementId = announcementId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public LocalDateTime getPostedAt() {
        return postedAt;
    }

    public void setPostedAt(LocalDateTime postedAt) {
        this.postedAt = postedAt;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public Teacher getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(Teacher postedBy) {
        this.postedBy = postedBy;
    }

    @Override
    public String toString() {
        return "AnnouncementDTO{" +
                "announcementId='" + announcementId + '\'' +
                ", message='" + message + '\'' +
                ", postedAt=" + postedAt +
                ", classId=" + classId +
                ", postedBy=" + postedBy +
                '}';
    }

}
