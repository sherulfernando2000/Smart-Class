package lk.ijse.classroombackend.service.impl;

import lk.ijse.classroombackend.dto.AnnouncementDTO;
import lk.ijse.classroombackend.dto.AnnouncementWithMaterialAndTeacherDTO;
import lk.ijse.classroombackend.entity.Announcement;
import lk.ijse.classroombackend.entity.CourseClass;
import lk.ijse.classroombackend.entity.Material;
import lk.ijse.classroombackend.entity.Teacher;
import lk.ijse.classroombackend.repo.*;
import lk.ijse.classroombackend.service.AnnouncementService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/20/2025 2:54 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */
@Service
public class AnnouncementServiceImpl implements AnnouncementService {

    @Autowired
    private  ModelMapper modelMapper;

    @Autowired
    private AnnouncementRepo announcementRepo;

    @Autowired
    private CourseClassRepo courseClassRepo;

    @Autowired
    private TeacherRepo teacherRepo;
    @Autowired
    private MaterialRepo materialRepo;


    @Override
    public List<AnnouncementDTO> getAllAnnouncements() {

        return modelMapper.map(announcementRepo.findAll(),new TypeToken<List<AnnouncementDTO>>(){}.getType());
        //announcement with material relevant to class and teacher


    }

    @Override
    @Transactional
    public AnnouncementDTO saveAnnouncement(AnnouncementDTO announcementDTO) {
        //save to announcement table
        //save to material table
        //take the teacher object from teacher table
        //take the class object
        CourseClass courseClass = courseClassRepo.findByClassId(announcementDTO.getClassId());
        Teacher teacher = teacherRepo.findByEmail(announcementDTO.getEmail());
        Announcement announcement = new Announcement();
        announcement.setMessage(announcementDTO.getMessage());
        announcement.setClassId(courseClass);
        announcement.setPostedBy(teacher);

        announcementRepo.saveAnnouncement(announcement.getAnnouncementId(),announcement.getMessage(),courseClass.getClassId(),teacher.getTeacherId());

        Material material = new Material();

        material.setFileUrl(announcementDTO.getUrl());
        material.setAnnouncementId(announcement);


        materialRepo.saveMaterial(material.getMaterialId(),material.getFileUrl(),announcement.getAnnouncementId());


        //announcementRepo.save(modelMapper.map(announcementDTO,Announcement.class));
         return announcementDTO;
    }

    @Override
    public void updateAnnouncement(AnnouncementDTO announcementDTO) {
        System.out.println("announce id: "+announcementDTO.getAnnouncementId());
        System.out.println("announcement "+ announcementRepo.findByAnnouncementId(announcementDTO.getAnnouncementId()));


        if (announcementRepo.findByAnnouncementId(announcementDTO.getAnnouncementId()) != null) {
            Announcement announcement = announcementRepo.findByAnnouncementId(announcementDTO.getAnnouncementId());
            announcement.setMessage(announcementDTO.getMessage());
            announcementRepo.save(announcement);
        }else{
            throw new RuntimeException("Announcement does not exist");
        }


    }

    @Override
    @Transactional
    public void deleteAnnouncement(String id) {
        System.out.println("announce id: "+id);
        Announcement announcement = announcementRepo.findByAnnouncementId(id);
        System.out.println("announcement "+ announcement);


        if (announcement != null) {
            materialRepo.deleteByAnnouncementId_announcementId(announcement.getAnnouncementId());
            announcementRepo.delete(announcement);
        }else{
            throw new RuntimeException("Announcement does not exist");
        }

    }


    public List<AnnouncementWithMaterialAndTeacherDTO> getAnnouncementsWithMaterialsAndTeacher(String classId) {
        List<Object[]> results = announcementRepo.findAnnouncementsWithMaterialsAndTeacherByClass(classId);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"); // Format the Timestamp
        List<AnnouncementWithMaterialAndTeacherDTO> dtoList = new ArrayList<>();
        for (Object[] row : results) {
            String postedAt = (row[2] instanceof Timestamp) ?
                    ((Timestamp) row[2]).toLocalDateTime().format(formatter) : null;

            String uploadedAt = (row[7] instanceof Timestamp) ?
                    ((Timestamp) row[7]).toLocalDateTime().format(formatter) : null;

            AnnouncementWithMaterialAndTeacherDTO dto = new AnnouncementWithMaterialAndTeacherDTO(
                    (String) row[0],  // announcementId
                    (String) row[1],  // message
                    postedAt,    // postedAt
                    (String) row[3],  // classId

                    (String) row[10],  // teacherId
                    (String) row[14],  // fullName
                    (String) row[13], // email
                    (String) row[11], // specialization

                    (String) row[5],  // materialId (nullable)
                    uploadedAt,    // uploadedAt (nullable)
                    (String) row[6]   // fileUrl (nullable)
            );
            dtoList.add(dto);
        }
        return dtoList;
    }
}


