package fr.antoine.myrecipes.dao;

import org.springframework.data.repository.PagingAndSortingRepository;

import fr.antoine.myrecipes.bean.Unity;

public interface UnityDao extends PagingAndSortingRepository<Unity, Integer> {

	Iterable<Unity> findByOrderByUnityValue();

}
