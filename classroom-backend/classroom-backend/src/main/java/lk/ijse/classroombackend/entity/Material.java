package lk.ijse.classroombackend.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Auto-generate UUID
    String materialId;
    Date uploadedAt;
    String fileUrl;

    @ManyToOne
    Assignment assignmentId;

    @ManyToOne
    Announcement announcementId;

    public Material() {
    }

    public Material(String materialId, Date uploadedAt, String fileUrl, Assignment assignmentId, Announcement announcementId) {
        this.materialId = materialId;
        this.uploadedAt = uploadedAt;
        this.fileUrl = fileUrl;
        this.assignmentId = assignmentId;
        this.announcementId = announcementId;
    }

    public String getMaterialId() {
        return materialId;
    }

    public void setMaterialId(String materialId) {
        this.materialId = materialId;
    }

    public Date getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(Date uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public Assignment getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(Assignment assignmentId) {
        this.assignmentId = assignmentId;
    }

    public Announcement getAnnouncementId() {
        return announcementId;
    }

    public void setAnnouncementId(Announcement announcementId) {
        this.announcementId = announcementId;
    }

    @Override
    public String toString() {
        return "Material{" +
                "materialId='" + materialId + '\'' +
                ", uploadedAt=" + uploadedAt +
                ", fileUrl='" + fileUrl + '\'' +
                ", assignmentId=" + assignmentId +
                ", announcementId=" + announcementId +
                '}';
    }
}
