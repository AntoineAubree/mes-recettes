package fr.antoine.myrecipes.manager;

import fr.antoine.myrecipes.bean.Unity;

public interface UnityManager {

	Iterable<Unity> findByOrderByUnityValue();

}
