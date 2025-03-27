//package lk.ijse.classroombackend.controller;
//
///**
// * ------------------------------------------------
// * Author: Sherul Fdo
// * GitHub: https://github.com/sherulfernando2000
// * Created: 3/24/2025 11:55 AM
// * Project: classroom-backend
// * ------------------------------------------------
// */
//import org.springframework.core.env.Environment;
//import org.springframework.stereotype.Component;
//import jakarta.annotation.PostConstruct;
//
//@Component
//public class MailConfigDebugger {
//    private final Environment environment;
//
//    public MailConfigDebugger(Environment environment) {
//        this.environment = environment;
//    }
//
//    @PostConstruct
//    public void printMailProperties() {
//        System.out.println("SMTP Host: " + environment.getProperty("spring.mail.host"));
//        System.out.println("SMTP Port: " + environment.getProperty("spring.mail.port"));
//        System.out.println("SMTP Username: " + environment.getProperty("spring.mail.username"));
//        System.out.println("SMTP Auth: " + environment.getProperty("spring.mail.properties.mail.smtp.auth"));
//        System.out.println("SMTP TLS: " + environment.getProperty("spring.mail.properties.mail.smtp.starttls.enable"));
//    }
//}
