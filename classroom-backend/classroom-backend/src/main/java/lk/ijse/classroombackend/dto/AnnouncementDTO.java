package lk.ijse.classroombackend.dto;

import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
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
    private String message;
    private LocalDateTime postedAt;
    private CourseClass classId;
    private Teacher postedBy;

    public AnnouncementDTO() {
    }

    public AnnouncementDTO(String announcementId, String message, LocalDateTime postedAt, CourseClass classId, Teacher postedBy) {
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

    public LocalDateTime getPostedAt() {
        return postedAt;
    }

    public void setPostedAt(LocalDateTime postedAt) {
        this.postedAt = postedAt;
    }

    public CourseClass getClassId() {
        return classId;
    }

    public void setClassId(CourseClass classId) {
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
