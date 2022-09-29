package com.rsys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.rsys.dto.ResponseDTO;
import com.rsys.services.interfaces.ICloudinaryService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class FileUploadController {

    @Autowired
    private ICloudinaryService cloudinaryService;

    @PostMapping("/upload")
    public ResponseDTO<?> uploadFile(@RequestParam("file") MultipartFile file) {
    	try {
    		System.out.println("File is invoked");
        String url = cloudinaryService.uploadFile(file);
        System.out.println(url+"   Uploaded");
        return new ResponseDTO<>(HttpStatus.OK, url, "User profile detrails added successfully........");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, e.getMessage());
		}
    }
}