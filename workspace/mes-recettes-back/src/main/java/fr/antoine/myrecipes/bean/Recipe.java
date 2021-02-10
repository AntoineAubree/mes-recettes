package fr.antoine.myrecipes.bean;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Recipe {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	private User user;
	private boolean recipePublic;
	private String name;
	private int cookingTime;
	private int preparationTime;
	private int numberOfPeople;
	@ManyToOne(cascade = CascadeType.ALL)
	private ImageRecipe imageRecipe;
	private Date date;
	@ManyToOne
	private Difficulty difficulty;
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "recipe_id")
	private List<Step> steps;
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "recipe_id")
	private List<IngredientRecipe> ingredientsRecipe;

	public Recipe() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getCookingTime() {
		return cookingTime;
	}

	public void setCookingTime(int cookingTime) {
		this.cookingTime = cookingTime;
	}

	public int getPreparationTime() {
		return preparationTime;
	}

	public void setPreparationTime(int preparationTime) {
		this.preparationTime = preparationTime;
	}

	public int getNumberOfPeople() {
		return numberOfPeople;
	}

	public void setNumberOfPeople(int numberOfPeople) {
		this.numberOfPeople = numberOfPeople;
	}

	public Difficulty getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(Difficulty difficulty) {
		this.difficulty = difficulty;
	}

	public List<Step> getSteps() {
		return steps;
	}

	public void setSteps(List<Step> steps) {
		this.steps = steps;
	}

	public List<IngredientRecipe> getIngredientsRecipe() {
		return ingredientsRecipe;
	}

	public void setIngredientsRecipe(List<IngredientRecipe> ingredientsRecipe) {
		this.ingredientsRecipe = ingredientsRecipe;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public boolean isRecipePublic() {
		return recipePublic;
	}

	public void setRecipePublic(boolean recipePublic) {
		this.recipePublic = recipePublic;
	}

	public ImageRecipe getImageRecipe() {
		return imageRecipe;
	}

	public void setImageRecipe(ImageRecipe imageRecipe) {
		this.imageRecipe = imageRecipe;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Recipe [id=");
		builder.append(id);
		builder.append(", user=");
		builder.append(user);
		builder.append(", recipePublic=");
		builder.append(recipePublic);
		builder.append(", name=");
		builder.append(name);
		builder.append(", cookingTime=");
		builder.append(cookingTime);
		builder.append(", preparationTime=");
		builder.append(preparationTime);
		builder.append(", numberOfPeople=");
		builder.append(numberOfPeople);
		builder.append(", imageRecipe=");
		builder.append(imageRecipe);
		builder.append(", date=");
		builder.append(date);
		builder.append(", difficulty=");
		builder.append(difficulty);
		builder.append(", steps=");
		builder.append(steps);
		builder.append(", ingredientsRecipe=");
		builder.append(ingredientsRecipe);
		builder.append("]");
		return builder.toString();
	}

}
