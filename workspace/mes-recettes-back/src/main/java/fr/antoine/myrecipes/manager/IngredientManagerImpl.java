package fr.antoine.myrecipes.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.antoine.myrecipes.bean.Ingredient;
import fr.antoine.myrecipes.dao.IngredientDao;

@Service
public class IngredientManagerImpl implements IngredientManager {
	
	@Autowired
	IngredientDao ingredientDao;

	@Override
	public Iterable<Ingredient> findByOrderByValue() {
		return ingredientDao.findByOrderByValue();
	}

}
