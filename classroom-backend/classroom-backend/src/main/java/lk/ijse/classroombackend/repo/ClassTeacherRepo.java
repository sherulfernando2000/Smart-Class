package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.ClassTeacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 12:31 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */
@Repository
public interface ClassTeacherRepo extends JpaRepository<ClassTeacher,String> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO classteacher (classTeacherId, aCourseClass_classId, teacher_teacherId) VALUES (:teacherEnrollId, :classId, :teacherId)", nativeQuery = true)
    void saveTeacherEnrollment(@Param("teacherEnrollId") String teacherEnrollId, @Param("classId") String classId, @Param("teacherId") String teacherId);

    boolean existsByClassTeacherId(String teacherEnrollId);

    ClassTeacher findByClassTeacherId(String teacherEnrollId);

    List<ClassTeacher> findByTeacher_teacherId(String teacherEnrollId);

}
