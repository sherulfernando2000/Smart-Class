package lk.ijse.classroombackend.service.impl;

import jakarta.persistence.EntityManager;
import lk.ijse.classroombackend.entity.CourseClass;
import lk.ijse.classroombackend.entity.Enrollment;
import lk.ijse.classroombackend.entity.Student;
import lk.ijse.classroombackend.repo.CourseClassRepo;
import lk.ijse.classroombackend.repo.EnrollmentRepo;
import lk.ijse.classroombackend.repo.StudentRepo;
import lk.ijse.classroombackend.service.EnrollementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public void enrollStudent(String email, String className) {

        CourseClass aCourseClass = classRepo.findByClassName(className);
        if (aCourseClass == null) {
            throw new RuntimeException("Class not found with name: " + className);
        }




        Student student = studentRepo.findByEmail(email);
        if (student == null) {
            throw new RuntimeException("Student not found with email: " + email);
        }



        String enrollmentId = "ENR-" + UUID.randomUUID().toString();


        String enrollmentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));


        Enrollment enrollment = new Enrollment();
        enrollment.setEnrollment_id(enrollmentId);
        enrollment.setaClass(aCourseClass);
        enrollment.setStudent(student);
        enrollment.setEnrollment_date(enrollmentDate);

        System.out.println("course"+aCourseClass.toString());
        System.out.println("student"+student.toString());


        enrollmentRepo.saveEnrollment(enrollmentId, aCourseClass.getClass_id(), student.getStudentId(), enrollmentDate);
    }
}