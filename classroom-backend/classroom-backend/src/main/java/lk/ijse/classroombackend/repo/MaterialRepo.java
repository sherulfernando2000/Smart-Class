package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.Announcement;
import lk.ijse.classroombackend.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 12:31 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */

@Repository
public interface MaterialRepo extends JpaRepository<Material,String> {
    boolean existsByMaterialId(String materialId);

    void deleteByMaterialId(String materialId);
}
