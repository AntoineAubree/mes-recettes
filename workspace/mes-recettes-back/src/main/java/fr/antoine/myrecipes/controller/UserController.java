package fr.antoine.myrecipes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.antoine.myrecipes.bean.User;
import fr.antoine.myrecipes.manager.UserManager;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserManager userManager;

	@CrossOrigin
	@RequestMapping(method = RequestMethod.POST, path = ("/add/"))
	public User addUser(@RequestBody User user) {
		return userManager.save(user);
	}
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.POST, path = ("/get/"))
	public User getUser(@RequestBody User user) {
		return userManager.find(user);
	}

}
