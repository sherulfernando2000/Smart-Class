package lk.ijse.classroombackend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Auto-generate UUID
    String submissionId;
    String grade;
    String url;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date submittedAt;

    @ManyToOne
    Assignment assignmentId;

    @ManyToOne
    Student studentId;

    public Submission() {
    }

    public Submission(String submissionId, String grade, String url, Date submittedAt, Assignment assignmentId, Student studentId) {
        this.submissionId = submissionId;
        this.grade = grade;
        this.url = url;
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
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
        return "Submission{" +
                "submissionId='" + submissionId + '\'' +
                ", grade='" + grade + '\'' +
                ", url='" + url + '\'' +
                ", submittedAt=" + submittedAt +
                ", assignmentId=" + assignmentId +
                ", studentId=" + studentId +
                '}';
    }
}
