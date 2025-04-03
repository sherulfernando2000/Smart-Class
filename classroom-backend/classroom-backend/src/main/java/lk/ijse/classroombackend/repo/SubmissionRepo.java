package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
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

    @Modifying
    @Transactional
    void deleteBySubmissionId(String submissionId);

    Optional<Object> findByAssignmentId_assignmentIdAndStudentId_StudentId(String assignmentId, String studentId);

    <Optional>Submission findBySubmissionId(String id);

    @Modifying
    @Query(value = "INSERT INTO submission (submissionId, grade, assignmentId_assignmentId, studentId_studentId, url) " +
            "VALUES (:submissionId, :grade, :assignmentId, :studentId, :url)",
            nativeQuery = true)
    void saveSubmission(@Param("submissionId") String submissionId,
                        @Param("grade") String grade,
                        @Param("assignmentId") String assignmentId,
                        @Param("studentId") String studentId,
                        @Param("url") String url);


    List<Submission> findAllByAssignmentId_assignmentId(String assignmentId);
}
