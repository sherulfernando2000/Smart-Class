package lk.ijse.classroombackend.service.impl;

import lk.ijse.classroombackend.dto.PayDTO;
import lk.ijse.classroombackend.dto.PaymentDTO;
import lk.ijse.classroombackend.entity.Payment;
import lk.ijse.classroombackend.entity.Student;
import lk.ijse.classroombackend.repo.PaymentRepo;
import lk.ijse.classroombackend.repo.StudentRepo;
import lk.ijse.classroombackend.service.PaymentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

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

    @Override
    public void saveAllPayment(List<PayDTO> payments)  {

        System.out.println("payments"+payments);
        Date date = new Date(); // current date
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String formattedDate = formatter.format(date); // "2015-11-12"

// If your entity expects a Date object:
        Date parsedDate = null;
        try {
            parsedDate = formatter.parse(formattedDate);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }


        // modelMapper.map(studentRepo.findAll(),new TypeToken<List<StudentDTO>>() {}.getType());
        for (PayDTO paymentDTO : payments) {
            Payment payment = new Payment();

            String payId = "PAY-" + UUID.randomUUID().toString();
            payment.setPaymentId(payId);
            payment.setAmount(paymentDTO.getFees());
            payment.setClassName(paymentDTO.getClassId());

            payment.setDate(parsedDate);
            payment.setStatus("paid");


            paymentRepo.savePayments(payment.getPaymentId(),payment.getAmount(),payment.getDate(),payment.getStatus(),paymentDTO.getStudentId(),payment.getClassName());

        }
    }

    @Override
    public List<PaymentDTO> getAllPayments() {
        return paymentRepo.findAll().stream().map(payment -> {
            PaymentDTO dto = new PaymentDTO();
            dto.setPaymentId(payment.getPaymentId());
            dto.setAmount(payment.getAmount());
            dto.setClassName(payment.getClassName());
            dto.setDate(payment.getDate());
            dto.setStatus(payment.getStatus());
            dto.setStudent(payment.getStudent().getStudentId()); // assuming student object exists
            return dto;
        }).collect(Collectors.toList());
    }

}
