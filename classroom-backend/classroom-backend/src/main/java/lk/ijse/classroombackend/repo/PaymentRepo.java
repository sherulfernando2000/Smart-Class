package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 12:31 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */
@Repository
public interface PaymentRepo extends JpaRepository<Payment,String> {
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO payment (paymentId, amount, date, status, student_studentId, className) " +
            "VALUES (:paymentId, :amount, :date, :status, :studentId, :className)", nativeQuery = true)
    void savePayments(
            @Param("paymentId") String paymentId,
            @Param("amount") Double amount,
            @Param("date") Date date,
            @Param("status") String status,
            @Param("studentId") String studentId,
            @Param("className") String className
    );
}
