package lk.ijse.classroombackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;


/*@AllArgsConstructor
@NoArgsConstructor
@Data*/
@Component
public class AuthDTO {
    private String email;
    private String token;
    private String role;

    public AuthDTO() {
    }

    public AuthDTO(String email, String token) {
        this.email = email;
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "AuthDTO{" +
                "email='" + email + '\'' +
                ", token='" + token + '\'' +
                '}';
    }
}