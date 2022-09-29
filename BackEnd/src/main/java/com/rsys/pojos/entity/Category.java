package com.rsys.pojos.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "equipement_category")
public class Category extends BaseEntity {

	@Column(length = 30, nullable = false)
	private String categoryName;
	@Column(length = 200, nullable = true)
	private String categoryImage;
	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<RentalEquipment> equipments;

	public Category() {

	}

	public Category(String categoryName, String categoryImage) {
		super();
		this.categoryName = categoryName;
		this.categoryImage = categoryImage;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getCategoryImage() {
		return categoryImage;
	}

	public void setCategoryImage(String categoryImage) {
		this.categoryImage = categoryImage;
	}

	public List<RentalEquipment> getEquipments() {
		return equipments;
	}

	public void setEquipments(List<RentalEquipment> equipments) {
		this.equipments = equipments;
	}

	@Override
	public String toString() {
		return "Category [categoryName=" + categoryName + ", categoryImage=" + categoryImage + "]";
	}

}
