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
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

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
    public List<AttendanceDTO> getAllAttendance(String id) {
        List<Object[]> results = attendanceRepo.findAllAttendanceWithStudentDetails(id);
        return results.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private AttendanceDTO mapToDTO(Object[] result) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"); // Format the Timestamp
        AttendanceDTO dto = new AttendanceDTO();
        // Indexes correspond to SELECT clause order
        String date = (result[1] instanceof Timestamp) ?
                ((Timestamp) result[1]).toLocalDateTime().format(formatter) : null;
        dto.setAttendanceId((String) result[0]);
        dto.setDate(date);
        dto.setStatus((String) result[2]);

        dto.setStudentId((String) result[3]);
        dto.setStudentName((String) result[4]);

        return dto;

    }

    @Override
    public AttendanceDTO saveAttendance(AttendanceDTO attendanceDTO) {
        Attendance attendance = modelMapper.map(attendanceDTO, Attendance.class);
        return attendanceDTO;
    }

//    @Override
//    public AttendanceDTO updateAttendance(AttendanceDTO attendanceDTO) {
//        if (attendanceRepo.existsAttendance(attendanceDTO.getStudentId(),attendanceDTO.getDate())){
//            attendanceRepo.save(modelMapper.map(attendanceDTO,Attendance.class));
//            return attendanceDTO;
//        }
//        throw new RuntimeException("Attendance does not exist");
//    }
//
//    @Override
//    public void deleteAttendance(AttendanceDTO attendanceDTO) {
//        if (attendanceRepo.existsAttendance(attendanceDTO.getStudentId(),attendanceDTO.getDate())){
//            attendanceRepo.deleteAttendance(attendanceDTO.getStudentId(),attendanceDTO.getDate());
//
//        }
//        throw new RuntimeException("Attendance does not exist");
//
//    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void saveAllAttendance(List<AttendanceDTO> attendanceDTOs) {
        List<Attendance> attendances = new ArrayList<>();
        for (AttendanceDTO attendanceDTO : attendanceDTOs) {
            Attendance attendance = modelMapper.map(attendanceDTO, Attendance.class);
            System.out.println("attendanceDTO"+attendanceDTO);
            String attendanceId = "At-" + UUID.randomUUID().toString();
            attendance.setAttendanceId(attendanceId);


            Optional<Student> student = studentRepo.findById(attendanceDTO.getStudentId());
            if (student.isPresent()) {

                attendance.setStudentId(student.get());
                attendanceRepo.saveAttendance(attendance.getAttendanceId(),attendance.getDate(),attendance.getStatus(),attendance.getStudentId().getStudentId(),attendanceDTO.getClassId());
            } else {
                throw new RuntimeException("Student not found");
            }

        }




    }


}
