package com.ginseng.scoring.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ginseng.scoring.domain.Ginseng;
import com.ginseng.scoring.domain.ResponseDTO;
import com.ginseng.scoring.service.GinsengService;

@RestController
public class ginsengController {
    @Autowired
    GinsengService ginsengService;

    @PostMapping("/main/submit")
    public ResponseEntity<?> labelPhoto(@RequestPart MultipartFile imageFile)
            throws IOException {
        if (imageFile == null) {
            // Handle the case where no image is uploaded
            return ResponseEntity.badRequest().body("No image uploaded.");
        }

        List<Ginseng> list = ginsengService.labelPhoto(imageFile);
        ResponseDTO<Ginseng> response = ResponseDTO.<Ginseng>builder().data(list).build();
        return ResponseEntity.ok().body(response);
    }
}
