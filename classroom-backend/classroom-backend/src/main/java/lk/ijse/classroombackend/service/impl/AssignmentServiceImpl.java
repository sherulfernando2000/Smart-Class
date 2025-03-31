package lk.ijse.classroombackend.service.impl;

import lk.ijse.classroombackend.dto.AssignmentDTO;
import lk.ijse.classroombackend.dto.TeacherDTO;
import lk.ijse.classroombackend.entity.Assignment;
import lk.ijse.classroombackend.entity.Material;
import lk.ijse.classroombackend.entity.Teacher;
import lk.ijse.classroombackend.repo.AssignmentRepo;
import lk.ijse.classroombackend.repo.MaterialRepo;
import lk.ijse.classroombackend.repo.TeacherRepo;
import lk.ijse.classroombackend.repo.UserRepository;
import lk.ijse.classroombackend.service.AssignmentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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

    @Autowired
    private MaterialRepo materialRepo;

    @Autowired
    private TeacherRepo teacherRepo;


    @Override
    public List<AssignmentDTO> getAllAssignments() {
        return modelMapper.map(assignmentRepo.findAll(),new TypeToken<List<AssignmentService>>() {}.getType());
    }

    @Override
    @Transactional
    public AssignmentDTO saveAssignment(AssignmentDTO assignmentDTO) {
        System.out.println("assignmentDTO"+assignmentDTO);
        String assignmentId = "AS-" + UUID.randomUUID().toString();

        Teacher teacher = teacherRepo.findByEmail(assignmentDTO.getUploadedBy());

        assignmentRepo.saveAssignement(assignmentId,assignmentDTO.getDescription(),assignmentDTO.getDueDate(),assignmentDTO.getTitle(),assignmentDTO.getClassId(),teacher.getTeacherId());

        Material material = new Material();
//        material.setFileUrl(assignmentDTO.getUrl());

        materialRepo.saveMaterialAss(material.getMaterialId(), assignmentDTO.getUrl(),assignmentId );

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

    @Override
    public List<AssignmentDTO> getAssignmentForClass(String id) {
        List<Assignment> assignmentsForClass = assignmentRepo.findByClassId_classId(id);
        List<AssignmentDTO> assignmentDTOS = new ArrayList<>();
        System.out.println(assignmentsForClass.get(0).getAssignmentId());
        for (Assignment assignment: assignmentsForClass){
            AssignmentDTO assignmentDTO = new AssignmentDTO();
            assignmentDTO.setAssignmentId(assignment.getAssignmentId());
            assignmentDTO.setDescription(assignment.getDescription());
            assignmentDTO.setDueDate(assignment.getDueDate());
            assignmentDTO.setTitle(assignment.getTitle());
            assignmentDTO.setUploadedBy(assignment.getUploadedBy().getEmail());
            // assignmentDTO.setUrl();
            Material material = materialRepo.findByAssignmentId_assignmentId(assignment.getAssignmentId());
            assignmentDTO.setUrl(material.getFileUrl());

            assignmentDTOS.add(assignmentDTO);
        }
        return assignmentDTOS;
    }
}
