package lk.ijse.classroombackend.controller;


import lk.ijse.classroombackend.service.impl.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * --------------------------------------------
 * Author: Shamodha Sahan
 * GitHub: https://github.com/shamodhas
 * Website: https://shamodha.live
 * --------------------------------------------
 * Created: 3/22/2025 11:52 AM
 * Project: demo
 * --------------------------------------------
 **/

@RestController
@RequestMapping("/api/mail")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/send")
    public String sendMail() {

        return emailService.sendSimpleMail("sherul.dhanushka@gmail.com", "SmartClass", "Hi");
    }

    @GetMapping("/get")
    public String getMail() {
        return "Mail sent successfully to " + "";
    }
}
