package lk.ijse.classroombackend.service;

import lk.ijse.classroombackend.dto.ClassDTO;

import java.util.List;

public interface ClassService {
    
    ClassDTO saveClass(ClassDTO classDTO);

    List<ClassDTO> getAllClass();

    void deleteClass(String id);

    void updateClass(ClassDTO classDTO);
}
