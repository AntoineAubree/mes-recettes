package fr.antoine.myrecipes.dao;

import org.springframework.data.repository.CrudRepository;

import fr.antoine.myrecipes.bean.User;

public interface UserDao extends CrudRepository<User, Integer> {

	User findByPseudo(String pseudo);

	User findByPseudoAndPassword(String pseudo, String password);

}
