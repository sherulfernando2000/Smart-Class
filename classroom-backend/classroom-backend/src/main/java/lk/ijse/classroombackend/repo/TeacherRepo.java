package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepo extends JpaRepository<Teacher,String> {

    @Query("SELECT t.teacherId FROM Teacher t WHERE t.teacherId LIKE CONCAT('T'+:year, '%') ORDER BY t.teacherId DESC LIMIT 1")
    String findLastTeacherId(String year);

    boolean existsByTeacherId(String teacherId);
}
