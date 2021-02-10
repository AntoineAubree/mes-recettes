package fr.antoine.myrecipes.dao;

import org.springframework.data.repository.PagingAndSortingRepository;

import fr.antoine.myrecipes.bean.ImageRecipe;

public interface ImageRecipeDao extends PagingAndSortingRepository<ImageRecipe, Integer> {
	
	public ImageRecipe findById(int i);

}
