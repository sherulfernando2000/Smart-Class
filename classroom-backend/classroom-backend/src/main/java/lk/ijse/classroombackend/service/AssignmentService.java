package lk.ijse.classroombackend.service;

import lk.ijse.classroombackend.dto.AssignmentDTO;
import lk.ijse.classroombackend.dto.UserDTO;

import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/20/2025 5:20 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */
public interface AssignmentService {
    List<AssignmentDTO> getAllAssignments();

    AssignmentDTO saveAssignment(AssignmentDTO assignmentDTO);

    void updateAssignment(AssignmentDTO assignmentDTO);

    void deleteAssignment(String id);
}
