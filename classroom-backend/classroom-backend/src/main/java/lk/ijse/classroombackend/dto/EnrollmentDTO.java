package lk.ijse.classroombackend.dto;

import jakarta.persistence.ManyToOne;
import lk.ijse.classroombackend.entity.CourseClass;
import lk.ijse.classroombackend.entity.Student;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 2:38 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */
public class EnrollmentDTO {
    private String enrollment_id;
    private CourseClass aCourseClass;
    private Student student;
    String enrollment_date;
}
