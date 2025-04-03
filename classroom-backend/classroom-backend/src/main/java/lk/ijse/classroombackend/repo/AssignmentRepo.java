package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.Announcement;
import lk.ijse.classroombackend.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 12:29 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */

@Repository
public interface AssignmentRepo extends JpaRepository<Assignment,String> {
    boolean existsByAssignmentId(String assignmentId);


    void deleteByAssignmentId(String assignmentId);

    Assignment findByAssignmentId(String assignmentId);

    @Transactional  // Add this annotation to ensure the query runs within a transaction
    @Modifying
    @Query(value = "INSERT INTO assignment (assignmentId, description, dueDate, title, classId_classId, uploadedBy_teacherId) " +
            "VALUES (:assignmentId, :description, :dueDate, :title, :classId, :teacherId)", nativeQuery = true)
    void saveAssignement(
            @Param("assignmentId") String assignmentId,
            @Param("description") String description,
            @Param("dueDate") Date dueDate,
            @Param("title") String title,
            @Param("classId") String classId,
            @Param("teacherId") String teacherId
    );

    List<Assignment> findByClassId_classId(String id);

    @Modifying
    @Query(value = "UPDATE assignment SET title = :title, description = :description, dueDate = :dueDate WHERE assignmentId = :assignmentId", nativeQuery = true)
    void update(@Param("assignmentId") String assignmentId,
                @Param("title") String title,
                @Param("description") String description,
                @Param("dueDate") Date dueDate);

}
