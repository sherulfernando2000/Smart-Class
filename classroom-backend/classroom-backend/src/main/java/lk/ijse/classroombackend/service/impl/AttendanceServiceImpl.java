package lk.ijse.classroombackend.service.impl;

import lk.ijse.classroombackend.dto.AttendanceDTO;
import lk.ijse.classroombackend.entity.Assignment;
import lk.ijse.classroombackend.entity.Attendance;
import lk.ijse.classroombackend.entity.Student;
import lk.ijse.classroombackend.repo.AttendanceRepo;
import lk.ijse.classroombackend.repo.StudentRepo;
import lk.ijse.classroombackend.service.AttendanceService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/20/2025 1:04 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */

@Service
public class AttendanceServiceImpl implements AttendanceService {

    @Autowired
    private AttendanceRepo attendanceRepo;

    @Autowired
    private ModelMapper mapper;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private StudentRepo studentRepo;

    @Override
    public List<AttendanceDTO> getAllAttendance() {
        //List<Attendance> all = attendanceRepo.findAll();
        return modelMapper.map(attendanceRepo.findAll(),new TypeToken<List<AttendanceDTO>>(){}.getType());

    }

    @Override
    public AttendanceDTO saveAttendance(AttendanceDTO attendanceDTO) {
        Attendance attendance = modelMapper.map(attendanceDTO, Attendance.class);
        return attendanceDTO;
    }

    @Override
    public AttendanceDTO updateAttendance(AttendanceDTO attendanceDTO) {
        if (attendanceRepo.existsAttendance(attendanceDTO.getStudentId(),attendanceDTO.getDate())){
            attendanceRepo.save(modelMapper.map(attendanceDTO,Attendance.class));
            return attendanceDTO;
        }
        throw new RuntimeException("Attendance does not exist");
    }

    @Override
    public void deleteAttendance(AttendanceDTO attendanceDTO) {
        if (attendanceRepo.existsAttendance(attendanceDTO.getStudentId(),attendanceDTO.getDate())){
            attendanceRepo.deleteAttendance(attendanceDTO.getStudentId(),attendanceDTO.getDate());

        }
        throw new RuntimeException("Attendance does not exist");

    }


}
