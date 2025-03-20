package lk.ijse.classroombackend.service;

import lk.ijse.classroombackend.dto.MaterialDTO;

import java.util.List;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/20/2025 5:44 AM
 * Project: classroom-backend
 * ------------------------------------------------
 */
public interface MaterialService {
    List<MaterialDTO> getAllMaterial();

    MaterialDTO saveMaterial(MaterialDTO materialDTO);

    void updateMaterial(MaterialDTO materialDTO);

    void deleteMaterial(String id);
}
