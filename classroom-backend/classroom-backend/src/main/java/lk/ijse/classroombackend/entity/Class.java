package lk.ijse.classroombackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.List;

@Entity
public class Class {
    @Id
   private String class_id;
   private String class_name;
   private String subject;
   private Date created_at;

   @OneToMany(mappedBy = "aClass")
    private List<ClassTeacher> classTeacher;

   @OneToMany(mappedBy = "aClass")
    private List<Enrollment> enrollments;


   //private Teacher teacher;
}
