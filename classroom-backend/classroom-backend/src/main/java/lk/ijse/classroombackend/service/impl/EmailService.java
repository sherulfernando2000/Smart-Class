package lk.ijse.classroombackend.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // Send HTML email
    public String sendSimpleMail(String toEmail, String subject, String htmlBody) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            System.out.println("Authenticated user: " + (auth != null ? auth.getName() : "NO AUTH"));

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("sherulfernando11@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(htmlBody, true); // true = enables HTML

            mailSender.send(message);
            return "HTML mail sent successfully to " + toEmail;
        } catch (MessagingException e) {
            e.printStackTrace();
            return "Error while sending HTML mail: " + e.getMessage();
        }
    }
}
