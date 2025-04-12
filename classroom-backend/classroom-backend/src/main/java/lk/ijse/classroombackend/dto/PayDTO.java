package lk.ijse.classroombackend.dto;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 4/12/2025 11:28 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */
public class PayDTO {
    private String studentId;
    private String classId;
    private double fees;

    public PayDTO() {
    }

    public PayDTO(String studentId, String classId, double fees) {
        this.studentId = studentId;
        this.classId = classId;
        this.fees = fees;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public double getFees() {
        return fees;
    }

    public void setFees(double fees) {
        this.fees = fees;
    }
}
