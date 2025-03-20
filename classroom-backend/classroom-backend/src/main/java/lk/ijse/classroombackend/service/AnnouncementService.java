package lk.ijse.classroombackend.service;

import lk.ijse.classroombackend.dto.AnnouncementDTO;
import lk.ijse.classroombackend.entity.Announcement;

import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/20/2025 2:54 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */
public interface AnnouncementService {
    List<AnnouncementDTO> getAllAnnouncements();

    AnnouncementDTO saveAnnouncement(AnnouncementDTO announcement);

    void updateAnnouncement(AnnouncementDTO announcementDTO);

    void deleteAnnouncement(String id);
}
