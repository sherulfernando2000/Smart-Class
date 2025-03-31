package lk.ijse.classroombackend.service;

import lk.ijse.classroombackend.dto.ClassTeacherDTO;

import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/30/2025 5:16 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */
public interface ClassTeacherService {
    void enrollTeacher(String email, String className);

    List<ClassTeacherDTO> getAllTeacherEnrollments();

    void deleteTeacherEnrollment(String teacherEnrollId);
}
