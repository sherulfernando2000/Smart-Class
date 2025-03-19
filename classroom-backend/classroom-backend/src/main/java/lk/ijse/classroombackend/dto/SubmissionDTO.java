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
   private Assignment assignmentId;
   private Student studentId;

    public SubmissionDTO() {
    }

    public SubmissionDTO(String submissionId, String grade, Date submittedAt, Assignment assignmentId, Student studentId) {
        this.submissionId = submissionId;
        this.grade = grade;
        this.submittedAt = submittedAt;
        this.assignmentId = assignmentId;
        this.studentId = studentId;
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

    public Assignment getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(Assignment assignmentId) {
        this.assignmentId = assignmentId;
    }

    public Student getStudentId() {
        return studentId;
    }

    public void setStudentId(Student studentId) {
        this.studentId = studentId;
    }

    @Override
    public String toString() {
        return "SubmissionDTO{" +
                "submissionId='" + submissionId + '\'' +
                ", grade='" + grade + '\'' +
                ", submittedAt=" + submittedAt +
                ", assignmentId=" + assignmentId +
                ", studentId=" + studentId +
                '}';
    }
}
