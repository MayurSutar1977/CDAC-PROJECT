package com.rsys.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rsys.pojos.entity.Category;

public interface ICategoryRepository extends JpaRepository<Category, Integer> {

	Optional<Category> findByCategoryName( String catName);

}
