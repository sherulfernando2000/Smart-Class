package lk.ijse.classroombackend.service;


import lk.ijse.classroombackend.dto.UserDTO;
import org.springframework.stereotype.Service;


public interface UserService {
    int saveUser(UserDTO userDTO);
    UserDTO searchUser(String username);

    UserDTO getUser(String email);

    UserDTO loadUserDetailsByUsername(String username);

    void changePassword(String email, String currentPassword, String newPassword);
}