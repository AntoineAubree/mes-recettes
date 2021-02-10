package fr.antoine.myrecipes.manager;

import fr.antoine.myrecipes.bean.Ingredient;

public interface IngredientManager {

	Iterable<Ingredient> findByOrderByValue();

}
