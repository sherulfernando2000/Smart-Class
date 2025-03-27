package lk.ijse.classroombackend.util;

/**
 * ------------------------------------------------
 * Author: Sherul Fdo
 * GitHub: https://github.com/sherulfernando2000
 * Created: 3/25/2025 7:59 PM
 * Project: classroom-backend
 * ------------------------------------------------
 */
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class FileUploadUtil {
    public static String saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException {
//        String uploadPath1 = null;
        Path uploadPath = Paths.get( uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
//            uploadPath1 = String.valueOf(uploadPath);

        } catch (IOException ioException) {
            // Handle exception
        }finally {
            return fileName;
        }
    }
}
