package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.CourseClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseClassRepo extends JpaRepository<CourseClass, String> {
    CourseClass findByClassName(String className); // Find class by class name
}
