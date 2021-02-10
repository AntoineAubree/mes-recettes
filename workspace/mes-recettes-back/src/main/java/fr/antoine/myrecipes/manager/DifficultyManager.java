package fr.antoine.myrecipes.manager;

import fr.antoine.myrecipes.bean.Difficulty;

public interface DifficultyManager {

	Iterable<Difficulty> findByOrderByValueDifficulty();

}
