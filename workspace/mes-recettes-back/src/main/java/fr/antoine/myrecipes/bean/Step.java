package fr.antoine.myrecipes.bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Step {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int orderStep;
	private String description;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getOrderStep() {
		return orderStep;
	}

	public void setOrderStep(int orderStep) {
		this.orderStep = orderStep;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "Step [id=" + id + ", orderStep=" + orderStep + ", description=" + description + "]";
	}
	
	

}
