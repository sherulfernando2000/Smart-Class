package lk.ijse.classroombackend.service;


import lk.ijse.classroombackend.dto.UserDTO;

public interface UserService {
    int saveUser(UserDTO userDTO);
    UserDTO searchUser(String username);
}