package lk.ijse.classroombackend.dto;

import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
    private String title;
    private String description;
    private Date dueDate;
    private CourseClass classId;
    private Teacher uploadedBy;

    public AssignmentDTO() {
    }

    public AssignmentDTO(String assignmentId, String title, String description, Date dueDate, CourseClass classId, Teacher uploadedBy) {
        this.assignmentId = assignmentId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
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

    public CourseClass getClassId() {
        return classId;
    }

    public void setClassId(CourseClass classId) {
        this.classId = classId;
    }

    public Teacher getUploadedBy() {
        return uploadedBy;
    }

    public void setUploadedBy(Teacher uploadedBy) {
        this.uploadedBy = uploadedBy;
    }

    @Override
    public String toString() {
        return "AssignmentDTO{" +
                "assignmentId='" + assignmentId + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", dueDate=" + dueDate +
                ", classId=" + classId +
                ", uploadedBy=" + uploadedBy +
                '}';
    }
}
