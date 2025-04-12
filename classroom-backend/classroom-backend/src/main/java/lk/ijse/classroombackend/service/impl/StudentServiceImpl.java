package lk.ijse.classroombackend.service.impl;

import lk.ijse.classroombackend.dto.StudentDTO;
import lk.ijse.classroombackend.dto.UserDTO;
import lk.ijse.classroombackend.entity.Student;
import lk.ijse.classroombackend.service.StudentService;
import lk.ijse.classroombackend.util.StudentIdGenerator;
import lk.ijse.classroombackend.entity.User;
import lk.ijse.classroombackend.repo.StudentRepo;
import lk.ijse.classroombackend.repo.UserRepository;
import lk.ijse.classroombackend.util.PasswordGenerator;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    public StudentRepo studentRepo;

    @Autowired
    UserRepository userRepository;

    @Autowired
    public ModelMapper modelMapper;

    @Autowired
    private EmailService emailService;

    @Autowired
    public StudentIdGenerator studentIdGenerator;

    @Override
    public UserDTO registerStudent(StudentDTO studentDTO){   //user --> void
        // Generate a random password
        String randomPassword = PasswordGenerator.generatePassword(6);

        // Create and save User
        User user = new User();
        user.setEmail(studentDTO.getEmail());

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(randomPassword));


        user.setName(studentDTO.getFullName());
        user.setRole("STUDENT");

        user = userRepository.save(user);  //


        // Generate Student ID

        String studentId = studentIdGenerator.generateStudentId();
        System.out.println(studentId);

        // Create and save Student
        Student student = new Student(studentId, studentDTO.getFullName(), studentDTO.getContact(),
                studentDTO.getGender(), studentDTO.getAddress(), studentDTO.getParent_name(),
                studentDTO.getParent_contact(), studentDTO.getImage_url(),studentDTO.getEmail(), user);

        studentRepo.save(student); // Save student after user

        String htmlContent = "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<body style=\"font-family: Arial, sans-serif; color: #202124; background-color: #f4f4f4; padding: 20px;\">\n" +
                "<div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 10px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);\">\n" +
                "    <img src=\"https://res.cloudinary.com/dzkqfsaxo/image/upload/v1744253393/samples/food/fish-vegetables.png\" alt=\"Smart Class Logo\" style=\"width: 55px; height: auto; display: block; margin: 0 auto;\">\n" +
                "    <h2 style=\"text-align: center; color: #276e04; margin: 10px 0;\">WELCOME TO SMART CLASS</h2>\n" +

                "    <h3 style=\"margin: 10px 0;\">Hi " + user.getName() + ",</h3>\n" +
                "    <p style=\"font-size: 15px; margin: 5px 0; color: #202124;\">You are now registered to <b style=\"color: #276e04;\">Smart Class</b> 🎓</p>\n" +
                "    <p style=\"margin: 5px 0; color: #202124;\">Your user account has been created. Use the details below to log in:</p>\n" +

                "    <table style=\"margin: 10px 0; font-size: 15px;\">\n" +
                "        <tr>\n" +
                "            <td style=\"padding: 4px 10px 4px 0;\"><strong>Email:</strong></td>\n" +
                "            <td>" + user.getEmail() + "</td>\n" +
                "        </tr>\n" +
                "        <tr>\n" +
                "            <td style=\"padding: 4px 10px 4px 0;\"><strong>Password:</strong></td>\n" +
                "            <td>" + randomPassword + "</td>\n" +
                "        </tr>\n" +
                "    </table>\n" +

                "    <div style=\"text-align: center; margin-top: 20px;\">\n" +
                "        <a href=\"http://localhost:5173/login\" style=\"background-color: #2a8f03; color: white; padding: 10px 22px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px;\">Login Now</a>\n" +
                "    </div>\n" +

                "    <p style=\"margin-top: 20px; font-size: 13px; color: #832020;\">Please change your password after logging in.</p>\n" +
                "    <p style=\"font-size: 11px; color: #832020;\">Do not share this email with anyone.</p>\n" +
                "</div>\n" +
                "</body>\n" +
                "</html>";




        // Send email with password
        emailService.sendSimpleMail(user.getEmail(), "Registered and Your Account Credentials", htmlContent);

        return new UserDTO(user.getEmail(), randomPassword, user.getName(), user.getRole());

    }

    @Override
    public List<StudentDTO> getAllStudent() {
        return modelMapper.map(studentRepo.findAll(),new TypeToken<List<StudentDTO>>() {}.getType());


    }

    @Override
    public StudentDTO getStudentById(String id) {
        return modelMapper.map(studentRepo.findByStudentId(id),StudentDTO.class);
    }

    @Override
    @Transactional
    public void updateStudent(StudentDTO studentDTO) {
        Student getStudent = studentRepo.findByStudentId(studentDTO.getStudentId());

        try {
            if (getStudent != null) {
                System.out.println("Student exists");

                getStudent.setFullName(studentDTO.getFullName());
                getStudent.setContact(studentDTO.getContact());
                getStudent.setParent_name(studentDTO.getParent_name());
                getStudent.setParent_contact(studentDTO.getParent_contact());
                getStudent.setEmail(studentDTO.getEmail());
                getStudent.setAddress(studentDTO.getAddress());
                /*Student student = modelMapper.map(studentDTO, Student.class);
                student.setUser(getStudent.getUser());
                System.out.println("Student: " + student.getStudentId());*/
                studentRepo.save(getStudent);
            }
        } catch (Exception e) {
            throw new RuntimeException("Student does not exist");
        }
    }

    @Override
    @Transactional
    public void deleteStudent(String studentId) {
        Student student = studentRepo.findByStudentId(studentId);

        if (student == null) {  // Correct null check
            throw new RuntimeException("Student does not exist");
        }

        studentRepo.delete(student);
    }

    @Override
    public StudentDTO getStudentByEmail(String email) {
        return modelMapper.map(studentRepo.findByEmail(email),StudentDTO.class);
    }


}
