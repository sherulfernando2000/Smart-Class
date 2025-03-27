package lk.ijse.classroombackend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

/**
 * --------------------------------------------
 * Author: Shamodha Sahan
 * GitHub: https://github.com/shamodhas
 * Website: https://shamodha.live
 * --------------------------------------------
 * Created: 3/22/2025 11:51 AM
 * Project: demo
 * --------------------------------------------
 **/

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // Send plain text email
    public String sendSimpleMail(String toEmail, String subject, String body) {
        try {
            // Check authentication
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            System.out.println("Authenticated user: " + (auth != null ? auth.getName() : "NO AUTH"));

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("sherulfernando11@gmail.com");
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);
            return "Mail sent successfully to " + toEmail;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error while sending mail: " + e.getMessage();
        }
    }

}
