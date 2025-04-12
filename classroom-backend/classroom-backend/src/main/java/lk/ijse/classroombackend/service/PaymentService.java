package lk.ijse.classroombackend.service;

import lk.ijse.classroombackend.dto.PayDTO;
import lk.ijse.classroombackend.dto.PaymentDTO;

import java.text.ParseException;
import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 4/9/2025 1:01 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */

public interface PaymentService {

    void savePayment(PaymentDTO paymentDTO);

    void saveAllPayment(List<PayDTO> payments);

    List<PaymentDTO> getAllPayments();
}
