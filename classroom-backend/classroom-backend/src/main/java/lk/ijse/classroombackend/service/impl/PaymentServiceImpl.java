package lk.ijse.classroombackend.service.impl;

import lk.ijse.classroombackend.dto.PaymentDTO;
import lk.ijse.classroombackend.entity.Payment;
import lk.ijse.classroombackend.entity.Student;
import lk.ijse.classroombackend.repo.PaymentRepo;
import lk.ijse.classroombackend.repo.StudentRepo;
import lk.ijse.classroombackend.service.PaymentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 4/9/2025 1:02 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */
@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PaymentRepo paymentRepo;

    @Autowired
    private StudentRepo studentRepo;


    @Override
    public void savePayment(PaymentDTO paymentDTO) {
        //student aran dto ekata set karanna
        Student student = studentRepo.findByStudentId(paymentDTO.getStudent());
        Payment payment = modelMapper.map(paymentDTO, Payment.class);

        payment.setStudent(student);

        paymentRepo.save(payment);
    }
}
