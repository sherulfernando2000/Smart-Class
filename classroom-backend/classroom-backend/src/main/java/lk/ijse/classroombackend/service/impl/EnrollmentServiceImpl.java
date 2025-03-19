package lk.ijse.classroombackend.service.impl;

import lk.ijse.classroombackend.entity.CourseClass;
import lk.ijse.classroombackend.entity.Enrollment;
import lk.ijse.classroombackend.entity.Student;
import lk.ijse.classroombackend.repo.CourseClassRepo;
import lk.ijse.classroombackend.repo.EnrollmentRepo;
import lk.ijse.classroombackend.repo.StudentRepo;
import lk.ijse.classroombackend.service.EnrollementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
public class EnrollmentServiceImpl implements EnrollementService {

    @Autowired
    private CourseClassRepo classRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private EnrollmentRepo enrollmentRepo;

    public void enrollStudent(String email, String className) {
        // Step 1: Find the class by class name
        CourseClass aCourseClass = classRepo.findByClassName(className);
        if (aCourseClass == null) {
            throw new RuntimeException("Class not found with name: " + className);
        }

        // Step 2: Find the student by email
        Student student = studentRepo.findByEmail(email);
        if (student == null) {
            throw new RuntimeException("Student not found with email: " + email);
        }

        // Step 3: Generate a unique enrollment ID (if needed)
        String enrollmentId = "ENR-" + UUID.randomUUID().toString();

        // Step 4: Set the enrollment date (current date)
        String enrollmentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // Step 5: Create a new Enrollment object
        Enrollment enrollment = new Enrollment();
        enrollment.setEnrollment_id(enrollmentId);
        enrollment.setaClass(aCourseClass);
        enrollment.setStudent(student);
        enrollment.setEnrollment_date(enrollmentDate);

        // Step 6: Save the enrollment
        enrollmentRepo.save(enrollment);
    }
}