package fr.antoine.myrecipes.dao;

import org.springframework.data.repository.PagingAndSortingRepository;

import fr.antoine.myrecipes.bean.Difficulty;

public interface DifficultyDao  extends PagingAndSortingRepository<Difficulty, Integer>  {

	Iterable<Difficulty> findByOrderByValueDifficulty();

}
