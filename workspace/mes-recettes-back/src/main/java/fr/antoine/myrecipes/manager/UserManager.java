package fr.antoine.myrecipes.manager;

import fr.antoine.myrecipes.bean.User;

public interface UserManager {

	User save(User user);

	User find(User user);


}
