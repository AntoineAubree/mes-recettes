package fr.antoine.myrecipes.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.antoine.myrecipes.bean.ImageRecipe;
import fr.antoine.myrecipes.dao.ImageRecipeDao;

@Service
public class ImageRecipeManagerImpl implements ImageRecipeManager {
	
	@Autowired
	ImageRecipeDao imageRecipeDao;

	@Override
	public ImageRecipe findById(int i) {
		return imageRecipeDao.findById(1);
	}

}
