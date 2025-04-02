package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 12:32 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */

@Repository
public interface SubmissionRepo extends JpaRepository<Submission,String> {
    boolean existsBySubmissionId(String submissionId);

    void deleteBySubmissionId(String submissionId);

    Optional<Object> findByAssignmentId_assignmentIdAndStudentId_StudentId(String assignmentId, String studentId);
}
