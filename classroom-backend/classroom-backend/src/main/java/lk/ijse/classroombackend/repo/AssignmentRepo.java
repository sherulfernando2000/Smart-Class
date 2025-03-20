package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.Announcement;
import lk.ijse.classroombackend.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

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
}
