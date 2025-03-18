package lk.ijse.classroombackend.service;

import lk.ijse.classroombackend.dto.TeacherDTO;
import lk.ijse.classroombackend.dto.UserDTO;

import java.util.List;

public interface TeacherService {

    List<TeacherDTO> getAllTeacher();

    UserDTO registerTeacher(TeacherDTO teacherDTO);

    void updateTeacher(TeacherDTO teacherDTO);

    void deleteTeacher(String id);
}
