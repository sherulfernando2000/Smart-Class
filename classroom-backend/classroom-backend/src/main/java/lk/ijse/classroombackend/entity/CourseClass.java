package lk.ijse.classroombackend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Entity
public class CourseClass {
    @Id
   private String classId;
    private String className;
   private String subject;


    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;

   @OneToMany(mappedBy = "aCourseClass")
    private List<ClassTeacher> classTeacher;

   @OneToMany(mappedBy = "aCourseClass")
    private List<Enrollment> enrollments;

   @OneToMany(mappedBy = "assignmentId")
   private List<Assignment> assignments;

    @OneToMany(mappedBy = "announcementId")
    private List<Announcement> annoncements;

    @OneToMany(mappedBy = "classId")
    private List<Attendance> attendances;



    public CourseClass() {
    }

    public CourseClass(String class_id, String class_name, String subject, Date created_at, List<ClassTeacher> classTeacher, List<Enrollment> enrollments) {
        this.classId = class_id;
        this.className = class_name;
        this.subject = subject;
        this.created_at = created_at;
        this.classTeacher = classTeacher;
        this.enrollments = enrollments;
    }

    public CourseClass(String class_id, String className, String subject, Date created_at, List<ClassTeacher> classTeacher, List<Enrollment> enrollments, List<Assignment> assignments, List<Announcement> annoncements) {
        this.classId = class_id;
        this.className = className;
        this.subject = subject;
        this.created_at = created_at;
        this.classTeacher = classTeacher;
        this.enrollments = enrollments;
        this.assignments = assignments;
        this.annoncements = annoncements;
    }

    public CourseClass(String classId, String className, String subject, Date created_at, List<ClassTeacher> classTeacher, List<Enrollment> enrollments, List<Assignment> assignments, List<Announcement> annoncements, List<Attendance> attendances) {
        this.classId = classId;
        this.className = className;
        this.subject = subject;
        this.created_at = created_at;
        this.classTeacher = classTeacher;
        this.enrollments = enrollments;
        this.assignments = assignments;
        this.annoncements = annoncements;
        this.attendances = attendances;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String class_id) {
        this.classId = class_id;
    }


    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public List<ClassTeacher> getClassTeacher() {
        return classTeacher;
    }

    public void setClassTeacher(List<ClassTeacher> classTeacher) {
        this.classTeacher = classTeacher;
    }

    public List<Enrollment> getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(List<Enrollment> enrollments) {
        this.enrollments = enrollments;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public List<Assignment> getAssignments() {
        return assignments;
    }

    public void setAssignments(List<Assignment> assignments) {
        this.assignments = assignments;
    }

    public List<Announcement> getAnnoncements() {
        return annoncements;
    }

    public void setAnnoncements(List<Announcement> annoncements) {
        this.annoncements = annoncements;
    }

    public List<Attendance> getAttendances() {
        return attendances;
    }

    public void setAttendances(List<Attendance> attendances) {
        this.attendances = attendances;
    }

    //private Teacher teacher;
}
