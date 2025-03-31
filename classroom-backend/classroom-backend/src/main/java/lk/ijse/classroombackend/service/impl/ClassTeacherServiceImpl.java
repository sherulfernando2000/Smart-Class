package lk.ijse.classroombackend.service.impl;

import lk.ijse.classroombackend.dto.ClassTeacherDTO;
import lk.ijse.classroombackend.entity.ClassTeacher;
import lk.ijse.classroombackend.entity.CourseClass;
import lk.ijse.classroombackend.entity.Enrollment;
import lk.ijse.classroombackend.entity.Teacher;
import lk.ijse.classroombackend.repo.ClassTeacherRepo;
import lk.ijse.classroombackend.repo.CourseClassRepo;
import lk.ijse.classroombackend.repo.TeacherRepo;
import lk.ijse.classroombackend.service.ClassTeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/30/2025 5:16 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */
@Service
public class ClassTeacherServiceImpl implements ClassTeacherService {

    @Autowired
    private ClassTeacherRepo classTeacherRepo;

    @Autowired
    private CourseClassRepo classRepo;

    @Autowired
    private TeacherRepo teacherRepo;



    @Override
    @Transactional
    public void enrollTeacher(String email, String className) {
        CourseClass aCourseClass = classRepo.findByClassName(className);
        System.out.println("course"+aCourseClass.getClassId());
        if (aCourseClass == null){
            throw new RuntimeException("Class not found with name: " + className);
        }

        Teacher teacher = teacherRepo.findByEmail(email);
        System.out.println("teacher"+teacher.getTeacherId());
        if (teacher == null){
            throw new RuntimeException("Teacher not found with email: " + email);
        }

        String teacherEnrollId = "TENR-" + UUID.randomUUID().toString();

        classTeacherRepo.saveTeacherEnrollment(teacherEnrollId, aCourseClass.getClassId(), teacher.getTeacherId());


    }

    @Override
    public List<ClassTeacherDTO> getAllTeacherEnrollments() {
        List<ClassTeacher> teacherEnrolls = classTeacherRepo.findAll();
        List<ClassTeacherDTO> teacherEnrollDTOs = new ArrayList<>();

        for (ClassTeacher teacherEnroll : teacherEnrolls) {
            String classId = teacherEnroll.getaCourseClass().getClassId();
            System.out.println("classId"+classId);
            String teacherId = teacherEnroll.getTeacher().getTeacherId();
            System.out.println("teacherId"+teacherId);
            Teacher teacher = teacherRepo.findByTeacherId(teacherId);
            CourseClass classById = classRepo.findByClassId(classId);

            ClassTeacherDTO teacherEnrollDTO = new ClassTeacherDTO();
            teacherEnrollDTO.setClassTeacherId(teacherEnroll.getClassTeacherId());
            teacherEnrollDTO.setTeacherId(teacher.getTeacherId());
            teacherEnrollDTO.setTeacherName(teacher.getFullName());
            teacherEnrollDTO.setClassName(classById.getClassName());
            teacherEnrollDTO.setDate(teacherEnroll.getDate().toString());
            teacherEnrollDTOs.add(teacherEnrollDTO);
        }
        return teacherEnrollDTOs;
    }

    @Override
    public void deleteTeacherEnrollment(String teacherEnrollId) {
        if (!classTeacherRepo.existsByClassTeacherId(teacherEnrollId)){
            throw new RuntimeException("Teacher Enrollment not found with id: " + teacherEnrollId);
        }

        ClassTeacher teacherEnroll = classTeacherRepo.findByClassTeacherId(teacherEnrollId);
        classTeacherRepo.delete(teacherEnroll);
    }
}
