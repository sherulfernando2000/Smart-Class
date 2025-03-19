package lk.ijse.classroombackend.dto;

import jakarta.persistence.ManyToOne;
import lk.ijse.classroombackend.entity.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 4:51 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */

/*@AllArgsConstructor
@NoArgsConstructor
@Data*/
public class PaymentDTO {
  private String paymentId;
  private String status;
  private Date date;
  private Double amount;
  private Student student;

    public PaymentDTO() {
    }

    public PaymentDTO(String paymentId, String status, Date date, Double amount, Student student) {
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
        return "PaymentDTO{" +
                "paymentId='" + paymentId + '\'' +
                ", status='" + status + '\'' +
                ", date=" + date +
                ", amount=" + amount +
                ", student=" + student +
                '}';
    }
}
