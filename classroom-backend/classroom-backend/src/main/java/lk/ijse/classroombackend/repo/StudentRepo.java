package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo extends JpaRepository<Student, String> {

    @Query("SELECT s.studentId FROM Student s WHERE s.studentId LIKE CONCAT(:year, '%') ORDER BY s.studentId DESC LIMIT 1")
    String findLastStudentId(@Param("year") String year);

    Student findByStudentId(String id);

    boolean existsByStudentId(String studentId);

    Student findByEmail(String email);


}
