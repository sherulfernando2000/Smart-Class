package lk.ijse.classroombackend.repo;

import lk.ijse.classroombackend.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.scheduling.support.SimpleTriggerContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/19/2025 12:28 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */

@Repository
public interface AnnouncementRepo extends JpaRepository<Announcement, String> {

    boolean existsByAnnouncementId(String announcementId);

    void deleteByAnnouncementId(String id);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO announcement (announcementId,message, classId_classId, postedBy_teacherId) VALUES (:announcementId,:message, :classId, :postedBy)", nativeQuery = true)
    void saveAnnouncement(@Param("announcementId") String announcementId,
                            @Param("message") String message,
                            @Param("classId") String classId,
                            @Param("postedBy") String postedBy);

    @Query(value = "SELECT a.*, m.*, t.* " +
            "FROM announcement a " +
            "LEFT JOIN material m ON m.announcementId_announcementId = a.announcementId " +
            "LEFT JOIN teacher t ON t.teacherId = a.postedBy_teacherId " +
            "WHERE a.classId_classId = :classId ORDER BY a.postedAt DESC",
            nativeQuery = true)
    List<Object[]> findAnnouncementsWithMaterialsAndTeacherByClass(@Param("classId") String classId);

    Announcement findByAnnouncementId(String announcementId);


//    @Query
//    void saveAnnouncement(Announcement announcement);
}
