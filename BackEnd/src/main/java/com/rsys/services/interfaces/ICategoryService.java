package com.rsys.services.interfaces;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.rsys.pojos.entity.Category;

public interface ICategoryService {

	List<Category> getAllCategory();

	Category getCategoryById(int catId);

	Category addNewCategory(Category category);

	Category removeCategory(int catId);

	Category getCategoryByName(@NotNull String catName);

	Category addNewCategory(String catName, String url);

}
