package lk.ijse.classroombackend.service.impl;


import lk.ijse.classroombackend.dto.AnnouncementDTO;
import lk.ijse.classroombackend.dto.SubmissionDTO;
import lk.ijse.classroombackend.entity.Announcement;
import lk.ijse.classroombackend.entity.Submission;
import lk.ijse.classroombackend.repo.SubmissionRepo;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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


    @Override
    public List<SubmissionDTO> getAllSubmissions() {
        return modelMapper.map(submissionRepo.findAll(),new TypeToken<List<SubmissionDTO>>(){}.getType());
    }

    @Override
    public SubmissionDTO saveSubmission(SubmissionDTO submissionDTO) {
        submissionRepo.save(modelMapper.map(submissionDTO, Submission.class));
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
}
