package lk.ijse.classroombackend.controller;

import lk.ijse.classroombackend.dto.AnnouncementDTO;
import lk.ijse.classroombackend.dto.AnnouncementWithMaterialAndTeacherDTO;
import lk.ijse.classroombackend.dto.TeacherDTO;
import lk.ijse.classroombackend.entity.Announcement;
import lk.ijse.classroombackend.service.AnnouncementService;
import lk.ijse.classroombackend.service.impl.AnnouncementServiceImpl;
import lk.ijse.classroombackend.util.FileUploadUtil;
import lk.ijse.classroombackend.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;


import org.springframework.http.HttpStatus;

import org.springframework.http.MediaTypeFactory;

import java.util.Optional;

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

    private static final String UPLOAD_DIR = "src/main/resources/static/uploads/";

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

/*
    @GetMapping("/byClass/{classId}")
    public ResponseEntity<List<AnnouncementWithMaterialAndTeacherDTO>> getAnnouncementsByClass(@PathVariable String classId) {
        List<AnnouncementWithMaterialAndTeacherDTO> announcements = announcementService.getAnnouncementsWithMaterialsAndTeacher(classId);
        return ResponseEntity.ok(announcements);
    }
*/

    @GetMapping("/byClass/{classId}")
    public ResponseUtil getAnnouncementsByClass(@PathVariable String classId) {
        List<AnnouncementWithMaterialAndTeacherDTO> announcements = announcementService.getAnnouncementsWithMaterialsAndTeacher(classId);
        return new ResponseUtil(201, "Load Announcement", announcements);
    }

    /*@PostMapping("save")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil save(@RequestBody AnnouncementDTO announcementDTO){
        AnnouncementDTO announcement1 = announcementService.saveAnnouncement(announcementDTO);
        return new ResponseUtil(201,"Announcement saved successfully",announcement1);
    }*/
    @GetMapping("file/{fileName}")
    public ResponseEntity<Resource> serveFile(@PathVariable String fileName) {
        try {
            // Get file path
            Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);
            System.out.println("filePath: " + filePath);
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Set content type based on file extension
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream"; // Default fallback
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType)) // Set correct MIME type
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline") // Ensure inline display
                    .body(resource);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping("save")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil save(@RequestParam("text") String text,
                             @RequestParam("classId") String classId,
                             @RequestParam("email") String email,
                             @RequestParam(value = "file", required = false) MultipartFile[] files) throws IOException {

        String uploadDir = "src/main/resources/static/uploads/";
        String fileUrl = null;

        if (files != null && files.length > 0) { // Check if files exist
            StringBuilder filePaths = new StringBuilder();
            for (MultipartFile file : files) {
                String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
                String savedPath = FileUploadUtil.saveFile(uploadDir, fileName, file);
                filePaths.append(savedPath).append(",");
            }
            // Remove the last comma
            fileUrl = filePaths.length() > 0 ? filePaths.substring(0, filePaths.length() - 1) : null;
        }

        // Save the announcement
        AnnouncementDTO announcementDTO = announcementService.saveAnnouncement(new AnnouncementDTO(text, classId, fileUrl, email));
        System.out.println("before return");

        return new ResponseUtil(201, "Announcement saved successfully", announcementDTO);
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
