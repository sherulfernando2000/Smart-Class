package lk.ijse.classroombackend.dto;

import org.springframework.stereotype.Component;

@Component
public class ResponseDTO {
    private int status;
   private String message;
   private Object data;

    public ResponseDTO() {
    }

    public ResponseDTO(int status, String message, Object data) {
        this.message = message;
        this.status = status;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "ResponseDTO{" +
                "message='" + message + '\'' +
                ", status=" + status +
                ", data=" + data +
                '}';
    }
}
