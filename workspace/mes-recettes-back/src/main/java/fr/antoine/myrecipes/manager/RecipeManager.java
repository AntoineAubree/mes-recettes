package fr.antoine.myrecipes.manager;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import fr.antoine.myrecipes.bean.Recipe;

public interface RecipeManager {

	Page<Recipe> findByUserIdOrderByName(String indexPage, String idUser);

	Page<Recipe> findByRecipePublicOrderByName(String indexPage);

	Page<Recipe> findByUserIdAndNameContainingOrRecipePublicAndNameContainingOrderByName(String recipeSearch, String idUser, String indexPage);

	Page<Recipe> findByRecipePublicAndNameContainingOrderByName(String recipeSearch, String indexPage);
	
	Recipe save(String recipeString);

	Recipe save(String recipeString, MultipartFile imageFile);

	Iterable<Recipe> findFirst4ByOrderByDateDesc();

}
