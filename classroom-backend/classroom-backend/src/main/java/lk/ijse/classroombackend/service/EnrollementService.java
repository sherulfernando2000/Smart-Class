package lk.ijse.classroombackend.service;

import lk.ijse.classroombackend.dto.EnrollmentDTO;
import lk.ijse.classroombackend.entity.Enrollment;

import java.util.List;

public interface EnrollementService {
    public void enrollStudent(String email, String className);

    List<EnrollmentDTO> getAllEnrollment();

    void deleteEnrollment(String enrollmentId);
}
