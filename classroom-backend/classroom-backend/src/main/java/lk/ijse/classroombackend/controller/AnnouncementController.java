package lk.ijse.classroombackend.controller;

import lk.ijse.classroombackend.dto.AnnouncementDTO;
import lk.ijse.classroombackend.dto.TeacherDTO;
import lk.ijse.classroombackend.entity.Announcement;
import lk.ijse.classroombackend.service.AnnouncementService;
import lk.ijse.classroombackend.service.impl.AnnouncementServiceImpl;
import lk.ijse.classroombackend.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/20/2025 2:53 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */
@RestController
@RequestMapping("api/v1/announcement")
@CrossOrigin
public class AnnouncementController {
    @Autowired
    private AnnouncementService announcementService;

    public AnnouncementController(AnnouncementServiceImpl announcementServiceImpl) {
    }

    @GetMapping("get")
    public String get(){
        return "announce";
    }

    @GetMapping("getAll")
    public ResponseUtil getAll(){
        List<AnnouncementDTO> announcements =  announcementService.getAllAnnouncements();
        return new ResponseUtil(200,"Load Announcement",announcements);
    }

    @PostMapping("save")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil save(@RequestBody AnnouncementDTO announcementDTO){
        AnnouncementDTO announcement1 = announcementService.saveAnnouncement(announcementDTO);
        return new ResponseUtil(201,"Announcement saved successfully",announcement1);
    }

    @PutMapping("update")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil update(@RequestBody AnnouncementDTO announcementDTO){
        announcementService.updateAnnouncement(announcementDTO);
        return new ResponseUtil(201,"Announcement updated.",null);
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil deleteAnnouncement(@PathVariable String id){
        announcementService.deleteAnnouncement(id);
        return new ResponseUtil(201,"Announcement deleted.",null);
    }

}
