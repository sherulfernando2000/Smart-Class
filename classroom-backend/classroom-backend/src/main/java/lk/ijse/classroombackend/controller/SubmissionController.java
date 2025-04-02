package lk.ijse.classroombackend.controller;

import lk.ijse.classroombackend.dto.AnnouncementDTO;
import lk.ijse.classroombackend.dto.SubmissionDTO;
import lk.ijse.classroombackend.service.AnnouncementService;
import lk.ijse.classroombackend.service.SubmissionService;
import lk.ijse.classroombackend.service.impl.AnnouncementServiceImpl;
import lk.ijse.classroombackend.util.FileUploadUtil;
import lk.ijse.classroombackend.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/20/2025 5:58 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */

@RestController
@RequestMapping("api/v1/submission")
@CrossOrigin
public class SubmissionController {
    @Autowired
    private SubmissionService submissionService;


    @GetMapping("details")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER','STUDENT')")
    public ResponseUtil getSubmissionDetails(
            @RequestParam String assignmentId,
            @RequestParam String studentId) {

        SubmissionDTO submissionDTO = submissionService.getSubmissionDetails(assignmentId, studentId);
        return new ResponseUtil(200, "Submission details fetched successfully", submissionDTO);
    }


    @GetMapping("getAll")
    public ResponseUtil getAll(){
        List<SubmissionDTO> submissionDTOS =  submissionService.getAllSubmissions();
        return new ResponseUtil(200,"Load Submssion",submissionDTOS);
    }

    @PostMapping("save")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER','STUDENT')")
    public ResponseUtil save(
            @RequestParam("file") MultipartFile[] files,
            @RequestParam("assignmentId") String assignmentId,
            @RequestParam("studentId") String studentId) throws IOException {

        String uploadDir = "src/main/resources/static/uploads/submissions/";
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

        SubmissionDTO submissionDTO = new SubmissionDTO();
        submissionDTO.setAssignmentId(assignmentId);
        submissionDTO.setStudentId(studentId);
        submissionDTO.setUrl(fileUrl); // Set file URLs in DTO

        SubmissionDTO savedSubmission = submissionService.saveSubmission(submissionDTO);

        return new ResponseUtil(201, "Submission saved successfully", savedSubmission);
    }


    @PutMapping("update")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil update(@RequestBody SubmissionDTO submissionDTO){
        submissionService.updateSubmission(submissionDTO);
        return new ResponseUtil(201,"Submission updated.",null);
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER','STUDENT')")
    public ResponseUtil deleteAnnouncement(@PathVariable String id){
        submissionService.deleteSubmission(id);
        return new ResponseUtil(201,"Submission deleted.",null);
    }

}
