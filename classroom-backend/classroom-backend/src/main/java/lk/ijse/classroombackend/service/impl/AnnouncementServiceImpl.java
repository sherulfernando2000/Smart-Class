package lk.ijse.classroombackend.service.impl;

import lk.ijse.classroombackend.dto.AnnouncementDTO;
import lk.ijse.classroombackend.entity.Announcement;
import lk.ijse.classroombackend.entity.Teacher;
import lk.ijse.classroombackend.repo.AnnouncementRepo;
import lk.ijse.classroombackend.service.AnnouncementService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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



    @Override
    public List<AnnouncementDTO> getAllAnnouncements() {

        return modelMapper.map(announcementRepo.findAll(),new TypeToken<List<AnnouncementDTO>>(){}.getType());
    }

    @Override
    public AnnouncementDTO saveAnnouncement(AnnouncementDTO announcementDTO) {
         announcementRepo.save(modelMapper.map(announcementDTO,Announcement.class));
         return announcementDTO;
    }

    @Override
    public void updateAnnouncement(AnnouncementDTO announcementDTO) {
        if (announcementRepo.existsByAnnouncementId(announcementDTO.getAnnouncementId())) {
            announcementRepo.save(modelMapper.map(announcementDTO, Announcement.class));
        }
        throw new RuntimeException("Announcement does not exist");

    }

    @Override
    public void deleteAnnouncement(String id) {
        if (announcementRepo.existsByAnnouncementId(id)) {
            announcementRepo.deleteByAnnouncementId(id);
        }
        throw new RuntimeException("Announcement does not exist");

    }
}
