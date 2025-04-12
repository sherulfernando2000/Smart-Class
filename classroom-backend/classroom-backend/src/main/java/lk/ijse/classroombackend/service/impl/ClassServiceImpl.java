package lk.ijse.classroombackend.service.impl;

import lk.ijse.classroombackend.dto.ClassDTO;
import lk.ijse.classroombackend.entity.*;
import lk.ijse.classroombackend.repo.*;
import lk.ijse.classroombackend.repo.CourseClassRepo;
import lk.ijse.classroombackend.service.ClassService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClassServiceImpl implements ClassService {

    @Autowired
    private CourseClassRepo classRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private StudentRepo studentRepo;
    @Autowired
    private EnrollmentRepo enrollmentRepo;
    @Autowired
    private TeacherRepo teacherRepo;
    @Autowired
    private ClassTeacherRepo classTeacherRepo;


    @Override
    public ClassDTO saveClass(ClassDTO classDTO) {
        classDTO.setClassId("C-" + UUID.randomUUID().toString());

        CourseClass aclass = modelMapper.map(classDTO, CourseClass.class);
        ClassDTO aclassDTO = modelMapper.map(classRepo.save(aclass), ClassDTO.class);
        return aclassDTO;
    }

    @Override
    public List<ClassDTO> getAllClass() {
        return modelMapper.map(classRepo.findAll(), new TypeToken<List<ClassDTO>>() {}.getType());
    }

    @Override
    public void deleteClass(String id) {
        classRepo.deleteById(id);
    }

    @Override
    public void updateClass(ClassDTO classDTO) {
        classRepo.save(modelMapper.map(classDTO, CourseClass.class));
    }


    public ClassDTO getClassById(String id) {
        return modelMapper.map(classRepo.findByClassId(id), ClassDTO.class);
    }

    @Override
    public List<ClassDTO> getClassByEmail(String email) {
        Student student = studentRepo.findByEmail(email);
        List<Enrollment> enrollments = enrollmentRepo.findByStudent_studentId(student.getStudentId());
        List<CourseClass> classes = new ArrayList<>();

        for (Enrollment enrollment:enrollments){
            CourseClass aClass = classRepo.findByClassId(enrollment.getaCourseClass().getClassId());
            classes.add(aClass);
        }

        System.out.println(classes.get(0).getClassName());
        return modelMapper.map(classes, new TypeToken<List<ClassDTO>>() {}.getType());
    }


    @Override
    public List<ClassDTO> getClassByEmailT(String email) {
        Teacher teacher = teacherRepo.findByEmail(email);
        List<ClassTeacher> enrollments = classTeacherRepo.findByTeacher_teacherId(teacher.getTeacherId());

        List<CourseClass> classes = new ArrayList<>();

        for (ClassTeacher enrollment:enrollments){
            CourseClass aClass = classRepo.findByClassId(enrollment.getaCourseClass().getClassId());
            classes.add(aClass);
        }

        System.out.println(classes.get(0).getClassName());
        return modelMapper.map(classes, new TypeToken<List<ClassDTO>>() {}.getType());
    }


}
