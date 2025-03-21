package lk.ijse.classroombackend.controller;

import lk.ijse.classroombackend.dto.AnnouncementDTO;
import lk.ijse.classroombackend.dto.MaterialDTO;
import lk.ijse.classroombackend.service.AnnouncementService;
import lk.ijse.classroombackend.service.MaterialService;
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
 * Created: 3/19/2025 4:57 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */

@RestController
@RequestMapping("api/v1/material")
@CrossOrigin
public class MaterailController {
    @Autowired
    private MaterialService materialService;


    @GetMapping("get")
    public String get(){
        return "material";
    }

    @GetMapping("getAll")

    public ResponseUtil getAll(){
        List<MaterialDTO> materials =  materialService.getAllMaterial();
        return new ResponseUtil(200,"Load Material",materials);
    }

    @PostMapping("save")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil save(@RequestBody MaterialDTO materialDTO){
        MaterialDTO materialDTO1 = materialService.saveMaterial(materialDTO);
        return new ResponseUtil(201,"Material saved successfully",materialDTO1);
    }

    @PutMapping("update")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil updateMaterial(@RequestBody MaterialDTO materialDTO){
        materialService.updateMaterial(materialDTO);
        return new ResponseUtil(201,"Material updated.",null);
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseUtil deleteMaterial(@PathVariable String id){
        materialService.deleteMaterial(id);
        return new ResponseUtil(201,"Material deleted.",null);
    }



}
