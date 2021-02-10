package fr.antoine.myrecipes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.antoine.myrecipes.bean.Difficulty;
import fr.antoine.myrecipes.manager.DifficultyManager;

@RestController
@RequestMapping("/difficulty")
public class DifficultyController {
	
	@Autowired
	DifficultyManager difficultyManager;
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, path = ("/getAll/"))
	public Iterable<Difficulty> getAllDifficultys() {
		return difficultyManager.findByOrderByValueDifficulty();
	}

}
