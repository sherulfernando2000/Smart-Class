package lk.ijse.classroombackend.controller;

import lk.ijse.classroombackend.dto.AnnouncementDTO;
import lk.ijse.classroombackend.dto.SubmissionDTO;
import lk.ijse.classroombackend.service.AnnouncementService;
import lk.ijse.classroombackend.service.SubmissionService;
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


    @GetMapping("get")
    public String get(){
        return "submission";
    }

    @GetMapping("getAll")
    public ResponseUtil getAll(){
        List<SubmissionDTO> submissionDTOS =  submissionService.getAllSubmissions();
        return new ResponseUtil(200,"Load Submssion",submissionDTOS);
    }

    @PostMapping("save")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil save(@RequestBody SubmissionDTO submissionDTO){
        SubmissionDTO submissionDTO1 = submissionService.saveSubmission(submissionDTO);
        return new ResponseUtil(201,"Submission saved successfully",submissionDTO1);
    }

    @PutMapping("update")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil update(@RequestBody SubmissionDTO submissionDTO){
        submissionService.updateSubmission(submissionDTO);
        return new ResponseUtil(201,"Submission updated.",null);
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil deleteAnnouncement(@PathVariable String id){
        submissionService.deleteSubmission(id);
        return new ResponseUtil(201,"Submission deleted.",null);
    }

}
