package lk.ijse.classroombackend.service.impl;

import lk.ijse.classroombackend.dto.AssignmentDTO;
import lk.ijse.classroombackend.dto.TeacherDTO;
import lk.ijse.classroombackend.entity.Assignment;
import lk.ijse.classroombackend.repo.AssignmentRepo;
import lk.ijse.classroombackend.repo.TeacherRepo;
import lk.ijse.classroombackend.repo.UserRepository;
import lk.ijse.classroombackend.service.AssignmentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/20/2025 5:20 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */
@Service
public class AssignmentServiceImpl implements AssignmentService {

    @Autowired
    public AssignmentRepo assignmentRepo;

    @Autowired
    public ModelMapper modelMapper;


    @Override
    public List<AssignmentDTO> getAllAssignments() {
        return modelMapper.map(assignmentRepo.findAll(),new TypeToken<List<AssignmentService>>() {}.getType());
    }

    @Override
    public AssignmentDTO saveAssignment(AssignmentDTO assignmentDTO) {
        assignmentRepo.save(modelMapper.map(assignmentDTO, Assignment.class));
        return assignmentDTO;
    }

    @Override
    public void updateAssignment(AssignmentDTO assignmentDTO) {
        if (assignmentRepo.existsByAssignmentId(assignmentDTO.getAssignmentId())){
            assignmentRepo.save(modelMapper.map(assignmentDTO,Assignment.class));
        }
        throw new RuntimeException("Assignment does not exist");
    }

    @Override
    public void deleteAssignment(String id) {
        if (assignmentRepo.existsByAssignmentId(id)){
            assignmentRepo.deleteByAssignmentId(id);
        }
        throw new RuntimeException("Assignment does not exist");
    }
}
