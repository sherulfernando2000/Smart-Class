package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnrollmentRepo extends JpaRepository<Enrollment,String> {
}
