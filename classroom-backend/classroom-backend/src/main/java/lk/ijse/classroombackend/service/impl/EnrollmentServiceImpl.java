package lk.ijse.classroombackend.service.impl;

import jakarta.persistence.EntityManager;
import lk.ijse.classroombackend.dto.EnrollmentDTO;
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
import java.util.*;

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
        System.out.println("className"+className);
        CourseClass aCourseClass = classRepo.findByClassName(className);
        System.out.println("course"+aCourseClass.toString());
        if (aCourseClass == null) {
            throw new RuntimeException("Class not found with name: " + className);
        }




        Student student = studentRepo.findByEmail(email);
        if (student == null) {
            throw new RuntimeException("Student not found with email: " + email);
        }



        String enrollmentId = "ENR-" + UUID.randomUUID().toString();





        Enrollment enrollment = new Enrollment();
        enrollment.setEnrollmentId(enrollmentId);
        enrollment.setaCourseClass(aCourseClass);
        enrollment.setStudent(student);


        System.out.println("course"+aCourseClass.toString());
        System.out.println("student"+student.toString());


        enrollmentRepo.saveEnrollment(enrollmentId, aCourseClass.getClassId(), student.getStudentId());
    }

    @Override
    public List<EnrollmentDTO> getAllEnrollment() {
        List<Enrollment> enrollments = enrollmentRepo.findAll();
        List<EnrollmentDTO> enrollmentDTOS = new ArrayList<>();
        for(Enrollment enrollment: enrollments){
            String classId = enrollment.getaCourseClass().getClassId();
            System.out.println("classId"+classId);
            String studentId = enrollment.getStudent().getStudentId();
            System.out.println("studentId"+studentId);
            Student student = studentRepo.findByStudentId(studentId);
            CourseClass classById = classRepo.findByClassId(classId);

            EnrollmentDTO enrollmentDTO = new EnrollmentDTO();
            enrollmentDTO.setEnrollmentId(enrollment.getEnrollmentId());
            enrollmentDTO.setStudentId(student.getStudentId());
            enrollmentDTO.setStudentName(student.getFullName());
            enrollmentDTO.setClassName(classById.getClassName());
            enrollmentDTO.setEnrollmentDate(enrollment.getEnrollmentDate().toString());
            enrollmentDTOS.add(enrollmentDTO);

        }
        return enrollmentDTOS;
    }

    @Override
    public void deleteEnrollment(String enrollmentId) {
        if (!enrollmentRepo.existsByEnrollmentId(enrollmentId)) {
            throw new RuntimeException("No enrollment found with id: " + enrollmentId);
        }
        Enrollment enrollment = enrollmentRepo.findByEnrollmentId(enrollmentId);
        System.out.println("enrollment"+enrollment.getEnrollmentId());
        enrollmentRepo.delete(enrollment);
    }
}