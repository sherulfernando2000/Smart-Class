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

        String htmlMsg = "<html>" +
                "<body style=\"font-family: Arial, sans-serif; color: #202124;\">" +
                "<h2>Hi " + user.getName() + ",</h2>" +
                "<p>You are now registered to <b>Smart Class</b> 🎓</p>" +
                "<p>Your user account has been created. Use the details below to log in:</p>" +

                "<table style=\"margin: 20px 0;\">" +
                "<tr><td><strong>Email:</strong></td><td>" + user.getEmail() + "</td></tr>" +
                "<tr><td><strong>Password:</strong></td><td>" + randomPassword + "</td></tr>" +
                "</table>" +

                "<a href=\"http://localhost:5173/login\" style=\"" +
                "background-color: #1a73e8;" +
                "color: white;" +
                "padding: 10px 20px;" +
                "text-decoration: none;" +
                "border-radius: 4px;" +
                "display: inline-block;\">" +
                "Login Now</a>" +

                "<p style=\"margin-top: 20px;\">Please change your password after logging in.</p>" +
                "<p style=\"font-size: 0.9em; color: #5f6368;\">Do not share this email with anyone.</p>" +
                "</body>" +
                "</html>";



        // Send email with password
        emailService.sendSimpleMail(user.getEmail(), "Registered and Your Account Credentials", htmlMsg);

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
