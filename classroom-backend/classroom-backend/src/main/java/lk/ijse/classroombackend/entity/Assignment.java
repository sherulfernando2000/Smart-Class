package lk.ijse.classroombackend.entity;


import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Auto-generate UUID
   private String assignmentId;
   private String title;
   @Column(columnDefinition = "LONGTEXT", nullable = false)
   private String description;
   private Date dueDate;

   @ManyToOne
   private CourseClass classId;

   @ManyToOne
   private Teacher uploadedBy;

   @OneToMany(mappedBy = "assignmentId")
   private List<Material> materials;

   @OneToMany(mappedBy = "submissionId")
   private List<Submission> submissions;

   public Assignment() {
   }

   public Assignment(String assignmentId, String title, String description, Date dueDate, CourseClass classId, Teacher uploadedBy, List<Material> materials) {
      this.assignmentId = assignmentId;
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.classId = classId;
      this.uploadedBy = uploadedBy;
      this.materials = materials;
   }

   public Assignment(String assignmentId, String title, String description, Date dueDate, CourseClass classId, Teacher uploadedBy, List<Material> materials, List<Submission> submissions) {
      this.assignmentId = assignmentId;
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.classId = classId;
      this.uploadedBy = uploadedBy;
      this.materials = materials;
      this.submissions = submissions;
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

   public List<Material> getMaterials() {
      return materials;
   }

   public void setMaterials(List<Material> materials) {
      this.materials = materials;
   }


   public List<Submission> getSubmissions() {
      return submissions;
   }

   public void setSubmissions(List<Submission> submissions) {
      this.submissions = submissions;
   }

   @Override
   public String toString() {
      return "Assignment{" +
              "assignmentId='" + assignmentId + '\'' +
              ", title='" + title + '\'' +
              ", description='" + description + '\'' +
              ", dueDate=" + dueDate +
              ", classId=" + classId +
              ", uploadedBy=" + uploadedBy +
              ", materials=" + materials +
              '}';
   }
}
