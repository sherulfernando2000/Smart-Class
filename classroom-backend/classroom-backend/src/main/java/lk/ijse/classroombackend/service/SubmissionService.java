package lk.ijse.classroombackend.service;

import lk.ijse.classroombackend.dto.SubmissionDTO;

import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/20/2025 5:59 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */

public interface SubmissionService {
    List<SubmissionDTO> getAllSubmissions();

    SubmissionDTO saveSubmission(SubmissionDTO submissionDTO);

    void updateSubmission(SubmissionDTO submissionDTO);

    void deleteSubmission(String id);
}
