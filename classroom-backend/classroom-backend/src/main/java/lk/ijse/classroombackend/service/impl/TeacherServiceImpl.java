package lk.ijse.classroombackend.service.impl;

import lk.ijse.classroombackend.dto.StudentDTO;
import lk.ijse.classroombackend.dto.TeacherDTO;
import lk.ijse.classroombackend.dto.UserDTO;
import lk.ijse.classroombackend.entity.Student;
import lk.ijse.classroombackend.entity.Teacher;
import lk.ijse.classroombackend.entity.User;
import lk.ijse.classroombackend.repo.TeacherRepo;
import lk.ijse.classroombackend.repo.UserRepository;
import lk.ijse.classroombackend.service.TeacherService;
import lk.ijse.classroombackend.util.PasswordGenerator;
import lk.ijse.classroombackend.util.StudentIdGenerator;
import lk.ijse.classroombackend.util.TeacherIdGenerator;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherServiceImpl implements TeacherService {

    @Autowired
    public TeacherRepo teacherRepo;

    @Autowired
    public ModelMapper modelMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    public StudentIdGenerator studentIdGenerator;
    @Autowired
    private TeacherIdGenerator teacherIdGenerator;


    @Override
    public List<TeacherDTO> getAllTeacher() {
        return modelMapper.map(teacherRepo.findAll(),new TypeToken<List<TeacherDTO>>() {}.getType());
    }

    @Override
    public UserDTO registerTeacher(TeacherDTO teacherDTO) {
        //
        String randomPass = PasswordGenerator.generatePassword(6);

        //create and save user
        User user = new User();
        user.setEmail(teacherDTO.getEmail());

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(randomPass));

        user.setName(teacherDTO.getFull_name());
        user.setRole("TEACHER");

        user = userRepository.save(user);


        String teacherId = teacherIdGenerator.generateTeacherId();

        Teacher teacher = new Teacher(teacherId, teacherDTO.getFull_name(),teacherDTO.getAddress(), teacherDTO.getContact(),
                teacherDTO.getEmail(), teacherDTO.getSpecialization(), user);

        teacherRepo.save(teacher);
        return new UserDTO(user.getEmail(), randomPass, user.getName(), user.getRole());
    }

    @Override
    public void updateTeacher(TeacherDTO teacherDTO) {
        if (teacherRepo.existsByTeacherId(teacherDTO.getTeacher_id())) {
            teacherRepo.save(modelMapper.map(teacherDTO, Teacher.class));
        }
        throw new RuntimeException("Teacher does not exist");
    }

    @Override
    public void deleteTeacher(String id) {
        if (teacherRepo.existsByTeacherId(id)) {
            teacherRepo.deleteById(id);
        }
        throw new RuntimeException("Teacher does not exist");
    }


}
