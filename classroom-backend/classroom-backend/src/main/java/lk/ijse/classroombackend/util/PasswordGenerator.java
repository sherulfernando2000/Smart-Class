package lk.ijse.classroombackend.util;

import java.security.SecureRandom;
import java.util.Base64;

public class PasswordGenerator {
    public static String generatePassword(int length) {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[length];
        random.nextBytes(bytes);
        return Base64.getEncoder().encodeToString(bytes).substring(0, length);
    }
}
