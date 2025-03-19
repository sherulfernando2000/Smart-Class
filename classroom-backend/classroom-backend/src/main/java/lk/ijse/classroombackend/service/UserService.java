package lk.ijse.classroombackend.service;


import lk.ijse.classroombackend.dto.UserDTO;
import org.springframework.stereotype.Service;


public interface UserService {
    int saveUser(UserDTO userDTO);
    UserDTO searchUser(String username);
}