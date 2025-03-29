package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.CourseClass;
import lk.ijse.classroombackend.entity.Enrollment;
import lk.ijse.classroombackend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface EnrollmentRepo extends JpaRepository<Enrollment,String> {
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO enrollment (enrollmentId, aCourseClass_classId, student_studentId) VALUES (:id, :classId, :studentId )", nativeQuery = true)
    void saveEnrollment(@Param("id") String id,
                        @Param("classId") String classId,
                        @Param("studentId") String studentId);

    boolean existsByEnrollmentId(String enrollmentId);

    void deleteByEnrollmentId(String enrollmentId);

    Enrollment findByEnrollmentId(String enrollmentId);
}
