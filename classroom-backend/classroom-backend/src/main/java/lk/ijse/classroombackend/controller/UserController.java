/*---web security dependency eka uncomment karala meka un comment karanna---*/
package lk.ijse.classroombackend.controller;

import jakarta.validation.Valid;

import lk.ijse.classroombackend.dto.AuthDTO;
import lk.ijse.classroombackend.dto.ResponseDTO;
import lk.ijse.classroombackend.dto.UserDTO;
import lk.ijse.classroombackend.service.UserService;
import lk.ijse.classroombackend.util.JwtUtil;
import lk.ijse.classroombackend.util.VarList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/v1/user")
@CrossOrigin
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    //constructor injection
    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }
    @PostMapping(value = "/register")
    public ResponseEntity<ResponseDTO> registerUser(@RequestBody @Valid UserDTO userDTO) {
        try {
            int res = userService.saveUser(userDTO);
            switch (res) {
                case VarList.Created -> {
                    String token = jwtUtil.generateToken(userDTO);
                    AuthDTO authDTO = new AuthDTO();
                    authDTO.setEmail(userDTO.getEmail());
                    authDTO.setToken(token);
                    return ResponseEntity.status(HttpStatus.CREATED)
                            .body(new ResponseDTO(VarList.Created, "Success", authDTO));
                }
                case VarList.Not_Acceptable -> {
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                            .body(new ResponseDTO(VarList.Not_Acceptable, "Email Already Used", null));
                }
                default -> {
                    return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                            .body(new ResponseDTO(VarList.Bad_Gateway, "Error", null));
                }
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

    @GetMapping(value = "/get/{email}")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER','STUDENT')")
    public ResponseEntity<ResponseDTO> getUser(@PathVariable String email) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDTO(VarList.OK, "Success", userService.loadUserDetailsByUsername(email)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String currentPassword = body.get("currentPassword");
        String newPassword = body.get("newPassword");

        // Validate and process password change
        userService.changePassword(email,currentPassword,newPassword);

        return ResponseEntity.ok("Password changed successfully.");
    }


}
