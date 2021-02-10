package fr.antoine.myrecipes.dao;

import org.springframework.data.repository.PagingAndSortingRepository;

import fr.antoine.myrecipes.bean.Ingredient;

public interface IngredientDao extends PagingAndSortingRepository<Ingredient, Integer> {

	public Iterable<Ingredient> findByOrderByValue();

}
