package lk.ijse.classroombackend.entity;

import jakarta.persistence.*;

import java.util.Date;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 10:49 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Auto-generate UUID
    String paymentId;
    String status;
    Date date;
    Double amount;

    @ManyToOne
    Student student;

    public Payment() {
    }

    public Payment(String paymentId, String status, Date date, Double amount, Student student) {
        this.paymentId = paymentId;
        this.status = status;
        this.date = date;
        this.amount = amount;
        this.student = student;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    @Override
    public String toString() {
        return "Payment{" +
                "paymentId='" + paymentId + '\'' +
                ", status='" + status + '\'' +
                ", date=" + date +
                ", amount=" + amount +
                ", student=" + student +
                '}';
    }
}
