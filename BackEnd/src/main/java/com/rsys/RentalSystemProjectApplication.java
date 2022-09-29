package com.rsys;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.cloudinary.Cloudinary;

@SpringBootApplication
public class RentalSystemProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(RentalSystemProjectApplication.class, args);
	}

}

