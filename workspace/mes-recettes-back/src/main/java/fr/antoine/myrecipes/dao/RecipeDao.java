package fr.antoine.myrecipes.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import fr.antoine.myrecipes.bean.Recipe;

public interface RecipeDao extends PagingAndSortingRepository<Recipe, Integer> {

	Page<Recipe> findByUserIdOrderByName(int idUser, Pageable pageable);

	Page<Recipe> findByRecipePublicOrderByName(boolean b, Pageable pageable);

	Page<Recipe> findByUserIdAndNameContainingOrRecipePublicAndNameContainingOrderByName(int idUser,
			String recipeSearch, boolean b, String recipeSearch2, Pageable pageable);

	Page<Recipe> findByRecipePublicAndNameContainingOrderByName(boolean b, String recipeSearch, Pageable pageable);

	Iterable<Recipe> findFirst4ByRecipePublicAndImageRecipeIdNotNullOrderByDateDesc(boolean b);

}
