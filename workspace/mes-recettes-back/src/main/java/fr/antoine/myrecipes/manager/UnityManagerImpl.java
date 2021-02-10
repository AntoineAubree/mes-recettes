package fr.antoine.myrecipes.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.antoine.myrecipes.bean.Unity;
import fr.antoine.myrecipes.dao.UnityDao;

@Service
public class UnityManagerImpl implements UnityManager {
	
	@Autowired
	UnityDao unityDao;

	@Override
	public Iterable<Unity> findByOrderByUnityValue() {
		return unityDao.findByOrderByUnityValue();
	}

}
