package lk.ijse.classroombackend.controller;

import jakarta.servlet.http.HttpServletRequest;
import lk.ijse.classroombackend.dto.PaymentRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
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

    private final String merchantId = "1230062"; // Replace with your test merchant ID
    private final String merchantSecret = "MjIwODk2NzgyMzE1Mjk5MzA2MDczNDEzOTI5OTk1MzI1MTA0MTA0Mg=="; // From PayHere sandbox
    private final String currency = "LKR";

    @PostMapping("/payhere")
    public Map<String, String> initiatePayment(@RequestBody PaymentRequest request) {
        String orderId = UUID.randomUUID().toString();
        String amountFormatted = String.format("%.2f", request.getAmount());

        String hash = generateHash(merchantId, orderId, amountFormatted, currency, merchantSecret);

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
    public ResponseEntity<String> handleNotification(HttpServletRequest req) {
        // Here you can verify the hash and save payment status
        return ResponseEntity.ok("Notification received");
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
