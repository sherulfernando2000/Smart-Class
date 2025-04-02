package lk.ijse.classroombackend.service.impl;


import lk.ijse.classroombackend.dto.SubmissionDTO;
import lk.ijse.classroombackend.entity.Assignment;
import lk.ijse.classroombackend.entity.Student;
import lk.ijse.classroombackend.entity.Submission;
import lk.ijse.classroombackend.repo.AssignmentRepo;
import lk.ijse.classroombackend.repo.StudentRepo;
import lk.ijse.classroombackend.repo.SubmissionRepo;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/20/2025 5:58 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */
@Service
public class SubmissionServiceImpl implements lk.ijse.classroombackend.service.SubmissionService {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private SubmissionRepo submissionRepo;

    @Autowired
    private AssignmentRepo assignmentRepo;

    @Autowired
    private StudentRepo studentRepo;


    @Override
    public List<SubmissionDTO> getAllSubmissions() {
        return modelMapper.map(submissionRepo.findAll(),new TypeToken<List<SubmissionDTO>>(){}.getType());
    }

    @Override
    @Transactional
    public SubmissionDTO saveSubmission(SubmissionDTO submissionDTO) {

        String submitId = "SUB-" + UUID.randomUUID().toString();
        Assignment assignment = assignmentRepo.findByAssignmentId(submissionDTO.getAssignmentId());
        Student student = studentRepo.findByStudentId(submissionDTO.getStudentId());



        Submission submission = new Submission();
        submission.setSubmissionId(submitId);
        submission.setAssignmentId(assignment);
        submission.setStudentId(student);
        submission.setUrl(submissionDTO.getUrl());


        submissionRepo.save(submission);
        return submissionDTO;
    }

    @Override
    public void updateSubmission(SubmissionDTO submissionDTO) {
        if (submissionRepo.existsBySubmissionId(submissionDTO.getSubmissionId())) {
            submissionRepo.save(modelMapper.map(submissionDTO,Submission.class));
        }
        throw new RuntimeException("Submission does not exist");

    }

    @Override
    public void deleteSubmission(String id) {
        if (submissionRepo.existsBySubmissionId(id)) {
            submissionRepo.deleteBySubmissionId(id);
        }
        throw new RuntimeException("Submission does not exist");

    }

    @Override
    public SubmissionDTO getSubmissionDetails(String assignmentId, String studentId) {
        Submission submission = (Submission) submissionRepo.findByAssignmentId_assignmentIdAndStudentId_StudentId(assignmentId, studentId)
                .orElseThrow(() -> new RuntimeException("Submission does not exist"));

        return modelMapper.map(submission, SubmissionDTO.class);
    }

}
