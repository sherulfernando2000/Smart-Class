package lk.ijse.classroombackend.service.impl;

import lk.ijse.classroombackend.dto.ClassDTO;
import lk.ijse.classroombackend.entity.Class;
import lk.ijse.classroombackend.repo.ClassRepo;
import lk.ijse.classroombackend.service.ClassService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ClassServiceImpl implements ClassService {

    @Autowired
    private ClassRepo classRepo;
    @Autowired
    private ModelMapper modelMapper;


    @Override
    public ClassDTO saveClass(ClassDTO classDTO) {
        classDTO.setClass_id("C-" + UUID.randomUUID().toString());

        Class aclass = modelMapper.map(classDTO, Class.class);
        ClassDTO aclassDTO = modelMapper.map(classRepo.save(aclass), ClassDTO.class);
        return aclassDTO;
    }

    @Override
    public List<ClassDTO> getAllClass() {
        return modelMapper.map(classRepo.findAll(), new TypeToken<List<ClassDTO>>() {}.getType());
    }

    @Override
    public void deleteClass(String id) {
        classRepo.deleteById(id);
    }

    @Override
    public void updateClass(ClassDTO classDTO) {
        classRepo.save(modelMapper.map(classDTO, Class.class));
    }


    public ClassDTO getClassById(String id) {
        return modelMapper.map(classRepo.findById(id).get(), ClassDTO.class);
    }



}
