package fr.antoine.myrecipes.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.antoine.myrecipes.bean.Difficulty;
import fr.antoine.myrecipes.dao.DifficultyDao;

@Service
public class DifficultyManagerImpl implements DifficultyManager {
	
	@Autowired
	DifficultyDao difficultyDao;

	@Override
	public Iterable<Difficulty> findByOrderByValueDifficulty() {
		return difficultyDao.findByOrderByValueDifficulty();
	}

}
