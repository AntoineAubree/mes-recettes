package fr.antoine.myrecipes.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.antoine.myrecipes.bean.User;
import fr.antoine.myrecipes.dao.UserDao;

@Service
public class UserManagerImpl implements UserManager, checkIfPseudoAvailable {
	
	@Autowired
	UserDao userDao;

	@Override
	public User save(User user) {
		if (!checkIfPseudoAvailable(user)) {
			user.setId(-1);
		} else {
			userDao.save(user);
		}
		return user;
	}
	
	public boolean checkIfPseudoAvailable (User user) {
		if (userDao.findByPseudo(user.getPseudo()) == null) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public User find(User user) {
		if (!checkIfExist(user)) {
			user.setId(-1);
		} else {
			user = userDao.findByPseudo(user.getPseudo());
		}
		return user;
	}
	
	public boolean checkIfExist (User user) {
		if (userDao.findByPseudoAndPassword(user.getPseudo(), user.getPassword()) != null) {
			return true;
		} else {
			return false;
		}
	}

}
