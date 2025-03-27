package lk.ijse.classroombackend.dto;

import java.util.Date;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/26/2025 3:52 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */


public class AnnouncementWithMaterialAndTeacherDTO {
    private String announcementId;
    private String message;
    private String postedAt;
    private String classId;

    private String teacherId;
    private String fullName;
    private String email;
    private String specialization;

    private String materialId;
    private String uploadedAt;
    private String fileUrl;

    public AnnouncementWithMaterialAndTeacherDTO(String announcementId, String message, String postedAt,
                                                 String classId, String teacherId, String fullName,
                                                 String email, String specialization, String materialId,
                                                 String uploadedAt, String fileUrl) {
        this.announcementId = announcementId;
        this.message = message;
        this.postedAt = postedAt;
        this.classId = classId;
        this.teacherId = teacherId;
        this.fullName = fullName;
        this.email = email;
        this.specialization = specialization;
        this.materialId = materialId;
        this.uploadedAt = uploadedAt;
        this.fileUrl = fileUrl;
    }

    public AnnouncementWithMaterialAndTeacherDTO() {
    }

    // Getters & Setters

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

    public String getPostedAt() {
        return postedAt;
    }

    public void setPostedAt(String postedAt) {
        this.postedAt = postedAt;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
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

    public String getMaterialId() {
        return materialId;
    }

    public void setMaterialId(String materialId) {
        this.materialId = materialId;
    }

    public String getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(String uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    @Override
    public String toString() {
        return "AnnouncementWithMaterialAndTeacherDTO{" +
                "announcementId='" + announcementId + '\'' +
                ", message='" + message + '\'' +
                ", postedAt=" + postedAt +
                ", classId='" + classId + '\'' +
                ", teacherId='" + teacherId + '\'' +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", specialization='" + specialization + '\'' +
                ", materialId='" + materialId + '\'' +
                ", uploadedAt=" + uploadedAt +
                ", fileUrl='" + fileUrl + '\'' +
                '}';
    }
}

