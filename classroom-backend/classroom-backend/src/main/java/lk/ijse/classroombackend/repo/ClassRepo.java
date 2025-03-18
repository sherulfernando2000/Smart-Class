package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.Class;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRepo extends JpaRepository<Class, String> {
    Class findByClassName(String className); // Find class by class name
}
