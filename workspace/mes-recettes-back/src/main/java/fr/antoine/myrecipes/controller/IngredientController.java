package fr.antoine.myrecipes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.antoine.myrecipes.bean.Ingredient;
import fr.antoine.myrecipes.manager.IngredientManager;

@RestController
@RequestMapping("/ingredient")
public class IngredientController {
	
	@Autowired
	IngredientManager ingredientManager;

	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, path = ("/getAll/"))
	public Iterable<Ingredient> getAllIngredients() {
		return ingredientManager.findByOrderByValue();
	}

}
