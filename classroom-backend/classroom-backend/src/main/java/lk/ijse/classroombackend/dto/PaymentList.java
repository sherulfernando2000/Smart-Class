package lk.ijse.classroombackend.dto;

import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 4/12/2025 10:40 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */
public class PaymentList {
    private List<PayDTO> paymentDetails;

    public PaymentList() {
    }

    public List<PayDTO> getPaymentDetails() {
        return paymentDetails;
    }

    public void setPaymentDetails(List<PayDTO> paymentDetails) {
        this.paymentDetails = paymentDetails;
    }
}
