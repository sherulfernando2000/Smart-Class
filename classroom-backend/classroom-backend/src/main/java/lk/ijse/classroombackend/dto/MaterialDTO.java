package lk.ijse.classroombackend.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lk.ijse.classroombackend.entity.Announcement;
import lk.ijse.classroombackend.entity.Assignment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 4:46 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */
/*@AllArgsConstructor
@NoArgsConstructor
@Data*/
public class MaterialDTO {
    String materialId;
    Date uploadedAt;
    String fileUrl;
    Assignment assignmentId;
    Announcement announcementId;

    public MaterialDTO() {
    }

    public MaterialDTO(String materialId, Date uploadedAt, String fileUrl, Assignment assignmentId, Announcement announcementId) {
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
        return "MaterialDTO{" +
                "materialId='" + materialId + '\'' +
                ", uploadedAt=" + uploadedAt +
                ", fileUrl='" + fileUrl + '\'' +
                ", assignmentId=" + assignmentId +
                ", announcementId=" + announcementId +
                '}';
    }
}
