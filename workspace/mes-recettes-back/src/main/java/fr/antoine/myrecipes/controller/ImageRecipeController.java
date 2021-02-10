package fr.antoine.myrecipes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.antoine.myrecipes.bean.ImageRecipe;
import fr.antoine.myrecipes.manager.ImageRecipeManager;

@RestController
@RequestMapping("/imagerecipe")
public class ImageRecipeController {
	
	@Autowired
	ImageRecipeManager imageRecipeManager;
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, path = ("/getdefaultimage/"))
	public ImageRecipe getDefaultImage() {
		return imageRecipeManager.findById(1);
	}
	

}
