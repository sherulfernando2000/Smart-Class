package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.Assignment;
import lk.ijse.classroombackend.entity.Attendance;
import lk.ijse.classroombackend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
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
public interface AttendanceRepo extends JpaRepository<Attendance,String> {
    @Query("SELECT COUNT(a) > 0 FROM Attendance a WHERE a.studentId = :student AND a.date = :date")
    boolean existsAttendance(@Param("student") Student student, @Param("date") String date);

    @Modifying
    @Query("DELETE FROM Attendance a WHERE a.studentId = :student AND a.date = :date")
    void deleteAttendance(Student student, String date);

    @Modifying
    @Query(
            value = "INSERT INTO attendance (attendanceId, date, status, studentId_studentId, classId_classId) " +
                    "VALUES (:attendanceId, :date, :status, :studentId, :classId)",
            nativeQuery = true
    )
    void saveAttendance(
            @Param("attendanceId") String attendanceId,
            @Param("date") Date date,
            @Param("status") String status,
            @Param("studentId") String studentId,
            @Param("classId") String classId
    );


    @Query(value = """
        SELECT a.attendanceId, a.date, a.status, 
               s.studentId, s.fullName, s.email, s.contact,
               c.classId as classId
        FROM attendance a
        JOIN student s ON a.studentId_studentId = s.studentId
        LEFT JOIN courseclass c ON a.classId_classId = c.classId
        WHERE a.classId_classId = :classId
        ORDER BY a.date DESC
        """, nativeQuery = true)
    List<Object[]> findAllAttendanceWithStudentDetails(@Param("classId") String classId);
}
