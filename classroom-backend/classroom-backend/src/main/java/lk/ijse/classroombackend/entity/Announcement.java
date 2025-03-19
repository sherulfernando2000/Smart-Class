package lk.ijse.classroombackend.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Announcement {
      @Id
      @GeneratedValue(strategy = GenerationType.UUID) // Auto-generate UUID
      private String announcementId;

      @Column(columnDefinition = "LONGTEXT", nullable = false)
      private String message;

      @Temporal(TemporalType.TIMESTAMP)
      private  LocalDateTime postedAt;

      @ManyToOne
      private  CourseClass classId;

      @ManyToOne
      private  Teacher postedBy;

    public Announcement() {
    }

    public Announcement(String announcementId, String message, LocalDateTime postedAt, CourseClass classId, Teacher postedBy) {
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
        return "Announcement{" +
                "announcementId='" + announcementId + '\'' +
                ", message='" + message + '\'' +
                ", postedAt=" + postedAt +
                ", classId=" + classId +
                ", postedBy=" + postedBy +
                '}';
    }
}
