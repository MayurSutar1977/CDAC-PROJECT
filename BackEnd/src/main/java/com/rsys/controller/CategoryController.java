package com.rsys.controller;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.rsys.dto.ResponseDTO;
import com.rsys.pojos.entity.Category;
import com.rsys.services.interfaces.ICategoryService;
import com.rsys.services.interfaces.ICloudinaryService;

@RestController
@RequestMapping("/api/category")
@CrossOrigin
public class CategoryController {
	@Autowired
	private ICategoryService categoryService;
	@Autowired
	private ICloudinaryService cloudinaryService;

	public CategoryController() {

	}

	@GetMapping("/fetch-category")
	public ResponseDTO<?> getAllCategory() {
		try {
			return new ResponseDTO<>(HttpStatus.OK, categoryService.getAllCategory(),
					"This are all avilable categories");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Unable to load categories");
		}
	}

	@GetMapping("/find-category-by-id/{catId}")
	public ResponseDTO<?> getCategoryById(@PathVariable int catId) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, categoryService.getCategoryById(catId),
					"This is the details of category.............");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Unable to find category");
		}
	}

	@GetMapping("/find-category-by-name/{catName}")
	public ResponseDTO<?> getCategoryByName(@NotNull @PathVariable String catName) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, categoryService.getCategoryByName(catName),
					"This is the details of category.............");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Unable to find category");
		}
	}
	/*
	 * @PostMapping("/add-category") public ResponseDTO<?>
	 * addNewCategory(@RequestBody Category category) { try { return new
	 * ResponseDTO<>(HttpStatus.OK, categoryService.addNewCategory(category),
	 * "Category added sucessfully"); } catch (Exception e) { return new
	 * ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null,
	 * "Unable to add category......"); } }
	 */

	@PostMapping("/add-category/{catName}")
	public ResponseDTO<?> addNewCategory(@PathVariable String catName, @RequestParam("file") MultipartFile file) {
		try {
			System.out.println("File is invoked");
			String url = cloudinaryService.uploadFile(file);
			return new ResponseDTO<>(HttpStatus.OK, categoryService.addNewCategory(catName,url),
					"Category added sucessfully");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Unable to add category......");
		}
	}

	@DeleteMapping("remove-category/{catId}")
	public ResponseDTO<?> removeCategory(@PathVariable int catId) {
		try {
			return new ResponseDTO<>(HttpStatus.OK, categoryService.removeCategory(catId),
					"Category removed successfully...........");
		} catch (Exception e) {
			return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR, null, "Unable to remove categories");
		}
	}

}
