package com.ginseng.scoring.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ginseng.scoring.domain.Ginseng;
import com.ginseng.scoring.persistence.GinsengRepository;

@Service
public class GinsengService {

    @Autowired
    GinsengRepository ginsengRepo;

    public List<Ginseng> labelPhoto(MultipartFile imageFile) throws IOException {
        byte[] imageData = imageFile.getBytes(); // Convert the image to byte[]

        ginsengRepo.save(Ginseng.builder().originalPhoto(imageData).build());
        List<Ginseng> list = ginsengRepo.findAll();
        return list;
    }
}
