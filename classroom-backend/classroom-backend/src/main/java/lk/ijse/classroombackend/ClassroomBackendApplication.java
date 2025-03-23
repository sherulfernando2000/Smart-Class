package lk.ijse.classroombackend;

//import lk.ijse.classroombackend.service.impl.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "lk.ijse.classroombackend.repo")
public class ClassroomBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClassroomBackendApplication.class, args);

    }

}
