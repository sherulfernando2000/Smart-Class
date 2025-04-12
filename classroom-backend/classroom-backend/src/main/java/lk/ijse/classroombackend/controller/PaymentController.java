package lk.ijse.classroombackend.controller;

import jakarta.servlet.http.HttpServletRequest;
import lk.ijse.classroombackend.dto.PayDTO;
import lk.ijse.classroombackend.dto.PaymentDTO;
import lk.ijse.classroombackend.dto.PaymentList;
import lk.ijse.classroombackend.dto.PaymentRequest;
import lk.ijse.classroombackend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 4/9/2025 4:29 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */


@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    private final String merchantId = "1230062"; // Replace with your test merchant ID
    private final String merchantSecret = "MjIwODk2NzgyMzE1Mjk5MzA2MDczNDEzOTI5OTk1MzI1MTA0MTA0Mg=="; // From PayHere sandbox
    private final String currency = "LKR";
    private  String studentId = "";

    @PostMapping("/payhere")
    public Map<String, String> initiatePayment(@RequestBody PaymentRequest request) {
        String orderId = UUID.randomUUID().toString();
        String amountFormatted = String.format("%.2f", request.getAmount());

        String hash = generateHash(merchantId, orderId, amountFormatted, currency, merchantSecret);

        studentId = request.getStudentId();

        Map<String, String> paymentData = new HashMap<>();
        paymentData.put("merchant_id", merchantId);
        paymentData.put("return_url", "http://localhost:5173/payment-success");
        paymentData.put("cancel_url", "http://localhost:5173/payment-cancel");
        paymentData.put("notify_url", "http://localhost:8080/api/payment/notify"); // Needs to be publicly accessible if you want payment status updates
        paymentData.put("first_name", request.getFirstName());
        paymentData.put("last_name", request.getLastName());
        paymentData.put("email", request.getEmail());
        paymentData.put("phone", request.getPhone());
        paymentData.put("address", request.getAddress());
        paymentData.put("city", request.getCity());
        paymentData.put("country", "Sri Lanka");
        paymentData.put("order_id", orderId);
        paymentData.put("items", request.getItemName());
        paymentData.put("currency", currency);
        paymentData.put("amount", amountFormatted);
        paymentData.put("hash", hash);

        return paymentData;
    }

    private String generateHash(String merchantId, String orderId, String amount, String currency, String merchantSecret) {
        String hashedSecret = DigestUtils.md5DigestAsHex(merchantSecret.getBytes()).toUpperCase();
        String raw = merchantId + orderId + amount + currency + hashedSecret;
        return DigestUtils.md5DigestAsHex(raw.getBytes()).toUpperCase();
    }

    @PostMapping("/notify")
    public ResponseEntity<String> handleNotification(HttpServletRequest request) {
        // Here you can verify the hash and save payment status

        System.out.println("Notification received");
        String payherePaymentId = request.getParameter("payment_id");
        String payhereAmount = request.getParameter("payhere_amount");
        String status = request.getParameter("status"); // 2 = success
        String md5sig = request.getParameter("md5sig");
        String firstName = request.getParameter("first_name");
        String email = request.getParameter("email");

        PaymentDTO paymentDTO = new PaymentDTO();
        paymentDTO.setPaymentId(payherePaymentId);
        paymentDTO.setAmount(Double.parseDouble(payhereAmount));
        paymentDTO.setStatus(status);
        paymentDTO.setStudent(studentId); // Assuming you have a method to get student by ID


        if ("2".equals(status)) {
            System.out.println("Payment successful");
            paymentService.savePayment(paymentDTO);
        }// 2 = SUCCESS


        return ResponseEntity.ok("Notification received");
    }

    @PostMapping("/save")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseEntity<String> savePayment(@RequestBody PaymentList request){
        // Access list of payment details
        System.out.println("payments"+ request.getPaymentDetails());
        List<PayDTO> payments = request.getPaymentDetails();
        paymentService.saveAllPayment(payments);
        return ResponseEntity.ok("Payments processed successfully.");
    }

    @GetMapping("/getAll")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'TEACHER')")
    public ResponseEntity<List<PaymentDTO>> getAllPayments() {
        List<PaymentDTO> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }
}

















/*
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @PostMapping("/payhere")
    public ResponseEntity<Map<String, Object>> createPayHerePayment(@RequestBody PaymentRequest request) {
        Map<String, Object> response = new HashMap<>();

        response.put("merchant_id", "1230062"); // your test merchant ID
        response.put("return_url", "http://localhost:5173/studentindexclass/studentpayment");
        response.put("cancel_url", "http://localhost:5173/studentindexclass/studentpayment");
        response.put("notify_url", "http://localhost:8080/api/payment/notify");

        response.put("order_id", UUID.randomUUID().toString());
        response.put("items", "Tuition Payment");
        response.put("amount", request.getAmount());
        response.put("currency", "LKR");

        response.put("first_name", request.getFirstName());
        response.put("last_name", request.getLastName());
        response.put("email", request.getEmail());
        response.put("phone", request.getPhone());
        response.put("address", "Colombo");
        response.put("city", "Colombo");
        response.put("country", "Sri Lanka");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/notify")
    public ResponseEntity<String> handleNotification(HttpServletRequest req) {
        // Here you can verify the hash and save payment status
        return ResponseEntity.ok("Notification received");
    }
}

*/
