package fr.antoine.myrecipes.manager;

import java.io.IOException;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import fr.antoine.myrecipes.bean.ImageRecipe;
import fr.antoine.myrecipes.bean.Recipe;
import fr.antoine.myrecipes.dao.RecipeDao;

@Service
public class RecipeManagerImpl implements RecipeManager {

	@Autowired
	RecipeDao recipeDao;

	@Override
	public Page<Recipe> findByUserIdOrderByName(String indexPage, String idUser) {
		Pageable pageable = createPaginable(indexPage);
		return recipeDao.findByUserIdOrderByName(Integer.parseInt(idUser), pageable);
	}

	@Override
	public Page<Recipe> findByRecipePublicOrderByName(String indexPage) {
		Pageable pageable = createPaginable(indexPage);
		return recipeDao.findByRecipePublicOrderByName(true, pageable);
	}

	@Override
	public Page<Recipe> findByUserIdAndNameContainingOrRecipePublicAndNameContainingOrderByName(String recipeSearch,
			String idUser, String indexPage) {
		Pageable pageable = createPaginable(indexPage);
		return recipeDao.findByUserIdAndNameContainingOrRecipePublicAndNameContainingOrderByName(
				Integer.parseInt(idUser), recipeSearch, true, recipeSearch, pageable);
	}

	@Override
	public Page<Recipe> findByRecipePublicAndNameContainingOrderByName(String recipeSearch, String indexPage) {
		Pageable pageable = createPaginable(indexPage);
		return recipeDao.findByRecipePublicAndNameContainingOrderByName(true, recipeSearch, pageable);
	}

	private Pageable createPaginable(String indexPage) {
		int indexPageInt = Integer.parseInt(indexPage);
		Pageable pageable = PageRequest.of(indexPageInt, 10);
		return pageable;
	}
	
	@Override
	public Recipe save(String recipeString) {
		System.out.println("test");
		Recipe recipe = convertRecipeStringToObject(recipeString);
		if (recipe.getId() == 0) {			
			recipe.setDate(new Date());
		}
		return recipeDao.save(recipe);
	}

	@Override
	public Recipe save(String recipeString, MultipartFile imageFile) {
		Recipe recipe = convertRecipeStringToObject(recipeString);
		if (recipe.getId() == 0) {			
			recipe.setDate(new Date());
		}
		createImageRecipe(imageFile, recipe);
		return recipeDao.save(recipe);
	}

	private void createImageRecipe(MultipartFile imageFile, Recipe recipe) {
		ImageRecipe imageRecipe = new ImageRecipe();
		recipe.setImageRecipe(imageRecipe);
		recipe.getImageRecipe().setName(imageFile.getOriginalFilename());
		recipe.getImageRecipe().setType(imageFile.getContentType());
		try {
			recipe.getImageRecipe().setPicByte(imageFile.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private Recipe convertRecipeStringToObject(String recipeString) {
		Recipe recipe = new Recipe();
		ObjectMapper mapper = new ObjectMapper();
		try {
			recipe = mapper.readValue(recipeString, Recipe.class);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return recipe;
	}

	@Override
	public Iterable<Recipe> findFirst4ByOrderByDateDesc() {
		return recipeDao.findFirst4ByRecipePublicAndImageRecipeIdNotNullOrderByDateDesc(true);
	}

}
