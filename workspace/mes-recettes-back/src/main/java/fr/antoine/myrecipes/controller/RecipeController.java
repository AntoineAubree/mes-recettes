package fr.antoine.myrecipes.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.antoine.myrecipes.bean.Recipe;
import fr.antoine.myrecipes.manager.RecipeManager;

@RestController
@RequestMapping("/recipe")
public class RecipeController {

	@Autowired
	RecipeManager recipeManager;
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, path = ("/getlast/"))
	public Iterable<Recipe> getLastRecipes() {
		return recipeManager.findFirst4ByOrderByDateDesc();
	}

	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, path = ("/getall/{indexPage}/{idUser}/"))
	public Page<Recipe> getAllMyRecipes(@PathVariable String indexPage, @PathVariable String idUser) {
		return recipeManager.findByUserIdOrderByName(indexPage, idUser);
	}

	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, path = ("/public/getall/{indexPage}/"))
	public Page<Recipe> getAllPublicRecipes(@PathVariable String indexPage) {
		return recipeManager.findByRecipePublicOrderByName(indexPage);
	}

	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, path = ("/getsought/{recipeSearch}/{indexPage}/{idUser}/"))
	public Page<Recipe> getRecipesSought(@PathVariable String recipeSearch, @PathVariable String indexPage,
			@PathVariable String idUser) {
		return recipeManager.findByUserIdAndNameContainingOrRecipePublicAndNameContainingOrderByName(recipeSearch,
				idUser, indexPage);
	}

	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, path = ("/getsought/{recipeSearch}/{indexPage}/"))
	public Page<Recipe> getRecipesPublicSought(@PathVariable String recipeSearch, @PathVariable String indexPage) {
		return recipeManager.findByRecipePublicAndNameContainingOrderByName(recipeSearch, indexPage);
	}

	@CrossOrigin
	@RequestMapping(method = RequestMethod.POST, path = ("/add/"))
	public Recipe addRecipe(@RequestParam(value = "recipe", required = false) String recipeString,
			@RequestParam(value = "imageFile", required = false) MultipartFile imageFile) throws IOException {
		if (imageFile == null) {
			return recipeManager.save(recipeString);
		} else {			
			return recipeManager.save(recipeString, imageFile);
		}
	}

}
