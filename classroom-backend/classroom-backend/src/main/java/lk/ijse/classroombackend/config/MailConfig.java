//package lk.ijse.classroombackend.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.JavaMailSenderImpl;
//import org.springframework.stereotype.Component;
//
//import java.util.Properties;
//
///**
// * ------------------------------------------------
// * Author: Sherul Fdo
// * GitHub: https://github.com/sherulfernando2000
// * Created: 3/24/2025 12:25 PM
// * Project: classroom-backend
// * ------------------------------------------------
// */
//
//@Component
//public class MailConfig {
//
//    @Bean
//    public JavaMailSender javaMailSender() {
//        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
//        mailSender.setHost("smtp.gmail.com");
//        mailSender.setPort(587);
//        mailSender.setUsername("sherulfernando11@gmail.com");
//        mailSender.setPassword("jrlg yvew hzah nlix");
//
//        Properties props = mailSender.getJavaMailProperties();
//        props.put("mail.transport.protocol", "smtp");
//        props.put("mail.smtp.auth", "true");
//        props.put("mail.smtp.starttls.enable", "true");
//        props.put("mail.smtp.starttls.required", "true");
//        props.put("mail.debug", "true");
//
//        return mailSender;
//    }
//}
