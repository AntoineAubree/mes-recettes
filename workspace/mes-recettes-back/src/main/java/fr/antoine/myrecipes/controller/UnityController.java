package fr.antoine.myrecipes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.antoine.myrecipes.bean.Unity;
import fr.antoine.myrecipes.manager.UnityManager;

@RestController
@RequestMapping("/unity")
public class UnityController {
	
	@Autowired
	UnityManager unityManager;

	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, path = ("/getAll/"))
	public Iterable<Unity> getAllUnitys() {
		return unityManager.findByOrderByUnityValue();
	}

}
