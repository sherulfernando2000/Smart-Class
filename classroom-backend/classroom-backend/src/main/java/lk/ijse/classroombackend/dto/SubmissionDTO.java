package lk.ijse.classroombackend.dto;

import jakarta.persistence.ManyToOne;
import lk.ijse.classroombackend.entity.Assignment;
import lk.ijse.classroombackend.entity.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 4:52 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */

/*@AllArgsConstructor
@NoArgsConstructor
@Data*/
public class SubmissionDTO {
   private String submissionId;
   private String grade;
   private Date submittedAt;
   private String assignmentId;
   private String studentId;
   private String url;

    public SubmissionDTO() {
    }

    public SubmissionDTO(String submissionId, String grade, Date submittedAt, String assignmentId, String studentId, String url) {
        this.submissionId = submissionId;
        this.grade = grade;
        this.submittedAt = submittedAt;
        this.assignmentId = assignmentId;
        this.studentId = studentId;
        this.url = url;
    }


    public String getSubmissionId() {
        return submissionId;
    }

    public void setSubmissionId(String submissionId) {
        this.submissionId = submissionId;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public Date getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(Date submittedAt) {
        this.submittedAt = submittedAt;
    }

    public String getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(String assignmentId) {
        this.assignmentId = assignmentId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "SubmissionDTO{" +
                "submissionId='" + submissionId + '\'' +
                ", grade='" + grade + '\'' +
                ", submittedAt=" + submittedAt +
                ", assignmentId='" + assignmentId + '\'' +
                ", studentId='" + studentId + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
