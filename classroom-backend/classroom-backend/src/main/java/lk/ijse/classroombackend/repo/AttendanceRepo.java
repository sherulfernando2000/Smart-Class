package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.Assignment;
import lk.ijse.classroombackend.entity.Attendance;
import lk.ijse.classroombackend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 12:31 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */

@Repository
public interface AttendanceRepo extends JpaRepository<Attendance,String> {
    @Query("SELECT COUNT(a) > 0 FROM Attendance a WHERE a.studentId = :student AND a.date = :date")
    boolean existsAttendance(@Param("student") Student student, @Param("date") String date);

    @Modifying
    @Query("DELETE FROM Attendance a WHERE a.studentId = :student AND a.date = :date")
    void deleteAttendance(Student student, String date);
}
