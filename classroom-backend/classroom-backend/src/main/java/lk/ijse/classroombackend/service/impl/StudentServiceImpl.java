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
    private EmailServiceImpl emailService;

    @Autowired
    public StudentIdGenerator studentIdGenerator;

    @Override
    public UserDTO registerStudent(StudentDTO studentDTO){   //user --> void
//        Student student = modelMapper.map(studentDTO, Student.class);

        // Generate a random password
        String randomPassword = PasswordGenerator.generatePassword(6);

        // Create and save User
        User user = new User();
        user.setEmail(studentDTO.getEmail());
        user.setPassword(randomPassword);  // Save raw password
        user.setName(studentDTO.getFull_name());
        user.setRole("STUDENT");

        user = userRepository.save(user);  //


        // Generate Student ID

        String studentId = studentIdGenerator.generateStudentId();

        // Create and save Student
        Student student = new Student(studentId, studentDTO.getFull_name(), studentDTO.getContact(),
                studentDTO.getGender(), studentDTO.getAddress(), studentDTO.getParent_name(),
                studentDTO.getParent_contact(), studentDTO.getImage_url(),studentDTO.getEmail(), user);

        studentRepo.save(student); // Save student after user

        // Send email with password
       /* emailService.sendEmail(user.getEmail(), "Your Account Credentials",
                "Dear " + user.getName() + ",\n\nYour account has been created.\n\nEmail: " +
                        user.getEmail() + "\nPassword: " + randomPassword + "\n\nPlease change your password after login.");*/

        return new UserDTO(user.getEmail(), user.getPassword(), user.getName(), user.getRole());

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
    public void updateStudent(StudentDTO studentDTO) {
        if (studentRepo.existsByStudentId(studentDTO.getStudentId())) {
            studentRepo.save(modelMapper.map(studentDTO, Student.class));
        }
        throw new RuntimeException("Student does not exist");
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


}
