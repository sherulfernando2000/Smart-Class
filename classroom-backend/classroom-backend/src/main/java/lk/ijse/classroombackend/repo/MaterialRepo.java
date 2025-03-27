package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.Announcement;
import lk.ijse.classroombackend.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 12:31 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */

@Repository
public interface MaterialRepo extends JpaRepository<Material, String> {
    boolean existsByMaterialId(String materialId);

    void deleteByMaterialId(String  materialId);

    @Modifying
    @Query(value = "INSERT INTO material(materialId, fileUrl, announcementId_announcementId) VALUES (:materialId, :fileUrl, :announcementId_announcementId)", nativeQuery = true)
    @Transactional
    void saveMaterial(@Param("materialId") String materialId,
                      @Param("fileUrl") String fileUrl,
                      @Param("announcementId_announcementId") String announcementId_announcementId);


    void deleteByAnnouncementId_announcementId(String id);
}
