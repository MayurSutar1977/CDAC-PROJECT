package com.rsys.services.impls;

import java.util.List;
import java.util.Optional;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rsys.dao.ICategoryRepository;
import com.rsys.exception.UserException;
import com.rsys.pojos.entity.Category;
import com.rsys.services.interfaces.ICategoryService;

@Service
@Transactional
public class CategoryServiceImpl implements ICategoryService {

	@Autowired
	private ICategoryRepository categoryRepository;

	public CategoryServiceImpl() {

	}

	@Override
	public List<Category> getAllCategory() {
		return categoryRepository.findAll();
	}

	@Override
	public Category getCategoryById(int catId) {
		Optional<Category> optionalUser = categoryRepository.findById(catId);
		Category category = optionalUser.orElseThrow(() -> new UserException("Category is not found with id " + catId));
		return category;
	}

	@Override
	public Category addNewCategory(Category category) {
		return categoryRepository.saveAndFlush(category);
	}

	@Override
	public Category removeCategory(int catId) {
		Optional<Category> optionalUser = categoryRepository.findById(catId);
		Category category = optionalUser.orElseThrow(() -> new UserException("Category is not found with id " + catId));
		categoryRepository.deleteById(catId);
		return category;
	}

	@Override
	public Category getCategoryByName(@NotNull String catName) {
		Optional<Category> optionalUser = categoryRepository.findByCategoryName(catName);
		Category category = optionalUser
				.orElseThrow(() -> new UserException("Category is not found with name " + catName));
		return category;
	}

	@Override
	public Category addNewCategory(String catName, String categoryImage) {
		Category category=new Category(catName, categoryImage);
		return categoryRepository.save(category);
	}

}
