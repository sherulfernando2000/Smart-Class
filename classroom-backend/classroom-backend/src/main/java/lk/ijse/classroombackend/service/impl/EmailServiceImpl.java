/*
package lk.ijse.classroombackend.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

//import javax.mail.MessagingException;
//import javax.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String text) {
        try {
//            MimeMessage message = mailSender.createMimeMessage();
//            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            SimpleMailMessage helper = new SimpleMailMessage();

            helper.setFrom("sherulfernando11@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);

            mailSender.send(helper);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
*/
