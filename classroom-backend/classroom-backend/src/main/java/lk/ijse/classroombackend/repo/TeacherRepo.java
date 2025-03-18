package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepo extends JpaRepository<Teacher,String> {

    @Query("SELECT t.teacher_id FROM Teacher t WHERE t.teacher_id LIKE CONCAT('T'+:year, '%') ORDER BY t.teacher_id DESC LIMIT 1")
    String findLastTeacherId(String year);

    boolean existsByTeacher_id(String teacherId);
}
