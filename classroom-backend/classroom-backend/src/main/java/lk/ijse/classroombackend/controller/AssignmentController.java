package lk.ijse.classroombackend.controller;

import lk.ijse.classroombackend.dto.AssignmentDTO;
import lk.ijse.classroombackend.dto.TeacherDTO;
import lk.ijse.classroombackend.dto.UserDTO;
import lk.ijse.classroombackend.entity.Assignment;
import lk.ijse.classroombackend.service.AssignmentService;
import lk.ijse.classroombackend.service.TeacherService;
import lk.ijse.classroombackend.util.FileUploadUtil;
import lk.ijse.classroombackend.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/20/2025 5:18 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */
@RestController
@RequestMapping("api/v1/assignment")
@CrossOrigin
public class AssignmentController {
    @Autowired
    public AssignmentService assignementService;

    private static final String UPLOAD_DIR = "src/main/resources/static/uploads/assignment";

    @GetMapping("get")
    public String get(){
        return "assignment";
    }

    @GetMapping("getAll/{id}")
    public ResponseUtil getAll(@PathVariable String id){
        List<AssignmentDTO> assignmentDTOS =  assignementService.getAssignmentForClass(id);
        return new ResponseUtil(200,"Assignment loaded successfully",assignmentDTOS);
    }

    @PostMapping("save")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil save(
            @RequestParam("title") String title,
            @RequestParam("instructions") String description,
            @RequestParam("dueDate") String dueDate,
            @RequestParam("uploadedBy") String uploadedBy,
            @RequestParam("classId") String classId,
            @RequestParam(value = "file", required = false) MultipartFile[] files) throws IOException {

        // File upload handling
        String uploadDir = "src/main/resources/static/uploads/assignment";
        String fileUrl = null;
        if (files != null && files.length > 0) {
            StringBuilder filePaths = new StringBuilder();
            for (MultipartFile file : files) {
                String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
                String savedPath = FileUploadUtil.saveFile(uploadDir, fileName, file);
                filePaths.append(savedPath).append(",");
            }
            // Remove the last comma
            fileUrl = filePaths.length() > 0 ? filePaths.substring(0, filePaths.length() - 1) : null;
        }

        // Create AssignmentDTO object with the file URL
        AssignmentDTO assignmentDTO = new AssignmentDTO();
        assignmentDTO.setTitle(title);
        assignmentDTO.setDescription(description);

        // Parse the due date string to Date
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date parsedDueDate = dateFormat.parse(dueDate);
            assignmentDTO.setDueDate(parsedDueDate);
        } catch (ParseException e) {
            return new ResponseUtil(400, "Invalid date format", null);
        }

        // Set the file URL in the DTO
        assignmentDTO.setUrl(fileUrl);

        // Set the class ID directly as a string
        assignmentDTO.setClassId(classId);

        // Set the uploaded by directly as a string
        assignmentDTO.setUploadedBy(uploadedBy);

        // Save the assignment
        AssignmentDTO savedAssignment = assignementService.saveAssignment(assignmentDTO);
        return new ResponseUtil(201, "Assignment saved successfully", savedAssignment);
    }

    @PutMapping("update")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil updateAssignment(@RequestBody AssignmentDTO assignmentDTO){
        assignementService.updateAssignment(assignmentDTO);
        return new ResponseUtil(201,"Assignment updated.",null);
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil deleteAssignment(@PathVariable String id){
        assignementService.deleteAssignment(id);
        return new ResponseUtil(201,"Assignment deleted.",null);
    }

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



}
