package lk.ijse.classroombackend.util;

import lk.ijse.classroombackend.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class StudentIdGenerator {

    @Autowired
    private  StudentRepo studentRepo;  // Inject repository to get last student ID

    public  String generateStudentId() {
        // Get current year
        String year = String.valueOf(LocalDate.now().getYear());

        // Find the last inserted student ID
        String lastId = studentRepo.findLastStudentId(year);

        int nextNumber;
        if (lastId != null && lastId.startsWith(year)) {
            // Extract numeric part and increment
            nextNumber = Integer.parseInt(lastId.substring(4)) + 1;
        } else {
            // Start new series for the year
            nextNumber = 1001;
        }

        return year + nextNumber;
    }
}

