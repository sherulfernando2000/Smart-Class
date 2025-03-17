package lk.ijse.classroombackend.service;

import lk.ijse.classroombackend.dto.StudentDTO;
import lk.ijse.classroombackend.dto.UserDTO;
import lk.ijse.classroombackend.entity.User;

import java.util.List;

public interface StudentService {

    //user -> void
    public UserDTO registerStudent(StudentDTO studentDTO);

    List<StudentDTO> getAllStudent();

    StudentDTO getStudentById(String id);

    void updateStudent(StudentDTO studentDTO);


    void deleteStudent(String id);
}
