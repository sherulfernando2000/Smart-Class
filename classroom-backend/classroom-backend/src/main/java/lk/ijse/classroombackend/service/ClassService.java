package lk.ijse.classroombackend.service;

import lk.ijse.classroombackend.dto.ClassDTO;
import lk.ijse.classroombackend.dto.StudentDTO;

import java.util.List;

public interface ClassService {
    
    ClassDTO saveClass(ClassDTO classDTO);

    List<ClassDTO> getAllClass();

    void deleteClass(String id);

    void updateClass(ClassDTO classDTO);

    ClassDTO getClassById(String id);

    List<ClassDTO> getClassByEmail(String email);
}
