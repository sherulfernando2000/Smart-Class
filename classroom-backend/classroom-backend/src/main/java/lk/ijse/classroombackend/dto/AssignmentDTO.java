package lk.ijse.classroombackend.dto;

import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lk.ijse.classroombackend.entity.CourseClass;
import lk.ijse.classroombackend.entity.Material;
import lk.ijse.classroombackend.entity.Submission;
import lk.ijse.classroombackend.entity.Teacher;

import java.util.Date;
import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 2:33 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */

public class AssignmentDTO {
    private String assignmentId;
    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title must be less than 100 characters")
    private String title;
    private String description;
    @NotNull(message = "Due date is required")
    @Future(message = "Due date must be in the future")
    private Date dueDate;
    private String url;
    private String classId;
    private String uploadedBy;

    public AssignmentDTO() {
    }

    public AssignmentDTO(String assignmentId, String title, String description, Date dueDate, String url, String classId, String uploadedBy) {
        this.assignmentId = assignmentId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.url = url;
        this.classId = classId;
        this.uploadedBy = uploadedBy;
    }

    public String getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(String assignmentId) {
        this.assignmentId = assignmentId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public String getUploadedBy() {
        return uploadedBy;
    }

    public void setUploadedBy(String uploadedBy) {
        this.uploadedBy = uploadedBy;
    }

    @Override
    public String toString() {
        return "AssignmentDTO{" +
                "assignmentId='" + assignmentId + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", dueDate=" + dueDate +
                ", url='" + url + '\'' +
                ", classId='" + classId + '\'' +
                ", uploadedBy='" + uploadedBy + '\'' +
                '}';
    }
}
