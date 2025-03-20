package lk.ijse.classroombackend.service.impl;

import lk.ijse.classroombackend.dto.AnnouncementDTO;
import lk.ijse.classroombackend.dto.MaterialDTO;
import lk.ijse.classroombackend.entity.Announcement;
import lk.ijse.classroombackend.entity.Material;
import lk.ijse.classroombackend.repo.AnnouncementRepo;
import lk.ijse.classroombackend.repo.MaterialRepo;
import lk.ijse.classroombackend.service.MaterialService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/20/2025 5:43 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */

@Service
public class MaterialServiceImpl implements MaterialService {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private MaterialRepo materialRepo;


    @Override
    public List<MaterialDTO> getAllMaterial() {
        return modelMapper.map(materialRepo.findAll(),new TypeToken<List<MaterialDTO>>(){}.getType());
    }

    @Override
    public MaterialDTO saveMaterial(MaterialDTO materialDTO) {
        materialRepo.save(modelMapper.map(materialDTO, Material.class));
        return materialDTO;
    }

    @Override
    public void updateMaterial(MaterialDTO materialDTO) {
        if (materialRepo.existsByMaterialId(materialDTO.getMaterialId())) {
            materialRepo.save(modelMapper.map(materialDTO, Material.class));
        }
        throw new RuntimeException("Material does not exist");

    }

    @Override
    public void deleteMaterial(String id) {
        if (materialRepo.existsByMaterialId(id)) {
            materialRepo.deleteByMaterialId(id);
        }
        throw new RuntimeException("Material does not exist");

    }
}
