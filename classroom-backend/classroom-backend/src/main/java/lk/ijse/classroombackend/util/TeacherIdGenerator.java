package lk.ijse.classroombackend.util;

import lk.ijse.classroombackend.repo.StudentRepo;
import lk.ijse.classroombackend.repo.TeacherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class TeacherIdGenerator {

    @Autowired
    private TeacherRepo teacherRepo;

    public  String generateTeacherId() {
        // Get current year
        String year = String.valueOf(LocalDate.now().getYear());

        // Find the last inserted student ID
        String lastId = teacherRepo.findLastTeacherId(year);

        int nextNumber;
        if (lastId != null && lastId.startsWith("T"+year)) {
            // Extract numeric part and increment
            nextNumber = Integer.parseInt(lastId.substring(5)) + 1;
        } else {
            // Start new series for the year
            nextNumber = 1001;
        }

        return "T"+ year + nextNumber;
    }

}
