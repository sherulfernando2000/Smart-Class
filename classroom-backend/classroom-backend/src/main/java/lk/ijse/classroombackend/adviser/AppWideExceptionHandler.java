package lk.ijse.classroombackend.adviser;

import lk.ijse.classroombackend.dto.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AppWideExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseDTO> exceptionHandler(Exception ex){
        ex.printStackTrace();
        ResponseDTO responseDTO = new ResponseDTO(
                500,
                "Internal Server Error",
                ex.getMessage()
        );

        return new ResponseEntity<>(responseDTO, HttpStatus.BAD_REQUEST);
    }

}
