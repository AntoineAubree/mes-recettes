package fr.antoine.myrecipes.bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Difficulty {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int valueDifficulty;
	private String nameDifficulty;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getValueDifficulty() {
		return valueDifficulty;
	}

	public void setValueDifficulty(int valueDifficulty) {
		this.valueDifficulty = valueDifficulty;
	}

	public String getNameDifficulty() {
		return nameDifficulty;
	}

	public void setNameDifficulty(String nameDifficulty) {
		this.nameDifficulty = nameDifficulty;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Difficulty [id=");
		builder.append(id);
		builder.append(", valueDifficulty=");
		builder.append(valueDifficulty);
		builder.append(", nameDifficulty=");
		builder.append(nameDifficulty);
		builder.append("]");
		return builder.toString();
	}

}
