"use strict";
const Recipe = require("./model/recipe.js");
const Ingredient = require("./model/ing.js");
const axios = require("axios");

class shortRecipe {
  constructor(name, image, id) {
    this.name = name;
    this.image = image;
    this.id = id;
  }
}

class IngredientClass {
  constructor(item, quantity, email) {
    this.item = item;
    this.quantity = quantity;
    this.email = email;
  }
}

class longRecipe {
  constructor(data, email) {
    this.title = data.strMeal;
    this.type = data.strCategory;
    this.description = `${data.strArea} ${data.strCategory}`;
    this.recipe = data.strInstructions;
    this.email = email;
    this.image = data.strMealThumb;
    this.ingredients = [
      `${data.strMeasure1} ${data.strIngredient1}`,
      `${data.strMeasure2} ${data.strIngredient2}`,
      `${data.strMeasure3} ${data.strIngredient3}`,
      `${data.strMeasure4} ${data.strIngredient4}`,
      `${data.strMeasure5} ${data.strIngredient5}`,
      `${data.strMeasure6} ${data.strIngredient6}`,
      `${data.strMeasure7} ${data.strIngredient7}`,
      `${data.strMeasure8} ${data.strIngredient8}`,
      `${data.strMeasure9} ${data.strIngredient9}`,
      `${data.strMeasure10} ${data.strIngredient10}`,
      `${data.strMeasure11} ${data.strIngredient11}`,
      `${data.strMeasure12} ${data.strIngredient12}`,
      `${data.strMeasure13} ${data.strIngredient13}`,
      `${data.strMeasure14} ${data.strIngredient14}`,
      `${data.strMeasure15} ${data.strIngredient15}`,
      `${data.strMeasure16} ${data.strIngredient16}`,
      `${data.strMeasure17} ${data.strIngredient17}`,
      `${data.strMeasure18} ${data.strIngredient18}`,
      `${data.strMeasure19} ${data.strIngredient19}`,
      `${data.strMeasure20} ${data.strIngredient20}`,
    ];
    this.price = 0;
    this.tags = data.strTags;
    this.id = data.idMeal;
  }
}

const getFavRecipe = async (req, res) => {
  try {
    const filterQuery = {};

    if (req.query.email) {
      filterQuery.email = req.query.email;
    }
    
    const recipes = await Recipe.find(filterQuery);
    res.status(200).send(recipes);

  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};

const addRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      title: "test",
      type: "test type",
      description: "lots of testing bc its the description",
      recipe: "more testing",
      email: "email@email.com",
      image: "place-hold.it",
      ingredients: ["idk", "yes", "yup"],
      price: 23,
    });

    res.status(201).send(newRecipe);
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};

const deleteRecipe = async (req, res) => {
  const id = req.params.id;
  const email = req.query.email;

  try {
    await Recipe.findOneAndDelete({id: id, email: email})
    // await Recipe.findByIdAndDelete(id);
    res.status(204).send("Recipe deleted");
  } catch (error) {
    res.status(404).send("Error, Cannot delete Recipe with ID: " + id);
  }
};

const getShortList = async (req, res) => {
  try {
    let resultsArray = [];
    let search = req.query.search;

    let shortListAPI = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;

    let response = await axios.get(shortListAPI);

    let responseDataList = response.data.meals.map((meal) => {
      console.log(meal.strMeal);
      resultsArray.push(
        new shortRecipe(meal.strMeal, meal.strMealThumb, meal.idMeal)
      );
    });
    res.status(200).send(resultsArray);
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};

const getFullRecipe = async (req, res) => {
  try {
    const id = req.params.id;
    const email = req.query.email;
    const longRecipeURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    const apiResponse = await axios.get(longRecipeURL);
    const recipeData = apiResponse.data.meals[0];

    const newRecipe = new longRecipe(recipeData, email);

    res.status(200).send(newRecipe);
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};

const addFavRecipe = async (req, res) => {
  try {
    const id = req.params.id;
    const email = req.query.email;
    const longRecipeURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    const apiResponse = await axios.get(longRecipeURL);
    const recipeData = apiResponse.data.meals[0];

    const newRecipe = new longRecipe(recipeData, email);

    const favRecipe = await Recipe.create(newRecipe);

    res.status(201).send("Added to favorites");
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};


const getIngredients = async (req, res) => {
  try {
    const filterQuery = {};

    if (req.query.email) {
      filterQuery.email = req.query.email;
    }

    const ingredients = await Ingredient.find(filterQuery);
    res.status(200).send(ingredients);
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};

const deleteIngredient = async (req, res) => {
  const id = req.params.id;
  const email = req.query.email;

  try {
    await Ingredient.findOneAndDelete({ id: id, email: email });

    res.status(204).send("Ingredient deleted");
  } catch (error) {
    res.status(404).send("Error, Cannot delete Ingredient with ID: " + id);
  }
};

const addIngredient = async (req, res) => {
  try {
    const email = req.query.email;
    const item = req.query.item;
    const quantity = req.query.quantity;
 
    const newIngredient = new IngredientClass(item, quantity, email)

    const newIngredientAdded = await Ingredient.create(newIngredient);

    res.status(201).send("Added to favorites");
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};

module.exports = {
  getFavRecipe,
  addRecipe,
  deleteRecipe,
  getShortList,
  getFullRecipe,
  addFavRecipe,
  addIngredient,
  deleteIngredient,
  getIngredients,
};
