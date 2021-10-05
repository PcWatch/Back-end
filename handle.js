"use strict";
const Recipe = require("./model/recipe.js");
const axios = require("axios");


class shortRecipe {
  constructor(name, image, id) {
    this.name = name;
    this.image = image;
    this.id = id;
  };
}


const getFavRecipe = async (req, res) => {
  const filterQuery = {};
  if (req.query.title) {
    filterQuery.title = req.query.title;
  }

  const recipes = await Recipe.find(filterQuery);
  res.send(recipes);
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

    res.send(newRecipe);
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
}

const deleteRecipe = async (req, res) => {
  const id = req.params.id;
  const email = req.query.email;

  try {
    await Recipe.findByIdAndDelete(id);
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

    let responseDataList = response.data.meals.map(meal =>{
      console.log(meal.strMeal);
      resultsArray.push(new shortRecipe(meal.strMeal, meal.strMealThumb, meal.idMeal))
    })
    res.status(200).send(resultsArray);
  } catch(error) {
    res.status(500).send("Error: " + error);  
  }
}

const getFullRecipe = async (req, res) => {
  try {
    const id = req.params.id;
    const longRecipeURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    const apiResponse = await axios.get(longRecipeURL);
    const recipeData = apiResponse.data.meals[0];
    console.log(recipeData);

    const newRecipe = {
      title: recipeData.strMeal,
      type: recipeData.strCategory,
      description: `${recipeData.strArea} ${recipeData.strCategory}`,
      recipe: recipeData.strInstructions,
      email: "email@email.com",
      image: recipeData.strMealThumb,
      ingredients: [
        `${recipeData.strMeasure1} ${recipeData.strIngredient1}`,
        `${recipeData.strMeasure2} ${recipeData.strIngredient2}`,
        `${recipeData.strMeasure3} ${recipeData.strIngredient3}`,
        `${recipeData.strMeasure4} ${recipeData.strIngredient4}`,
        `${recipeData.strMeasure5} ${recipeData.strIngredient5}`,
        `${recipeData.strMeasure6} ${recipeData.strIngredient6}`,
        `${recipeData.strMeasure7} ${recipeData.strIngredient7}`,
        `${recipeData.strMeasure8} ${recipeData.strIngredient8}`,
        `${recipeData.strMeasure9} ${recipeData.strIngredient9}`,
        `${recipeData.strMeasure10} ${recipeData.strIngredient10}`,
        `${recipeData.strMeasure11} ${recipeData.strIngredient11}`,
        `${recipeData.strMeasure12} ${recipeData.strIngredient12}`,
        `${recipeData.strMeasure13} ${recipeData.strIngredient13}`,
        `${recipeData.strMeasure14} ${recipeData.strIngredient14}`,
        `${recipeData.strMeasure15} ${recipeData.strIngredient15}`,
        `${recipeData.strMeasure16} ${recipeData.strIngredient16}`,
        `${recipeData.strMeasure17} ${recipeData.strIngredient17}`,
        `${recipeData.strMeasure18} ${recipeData.strIngredient18}`,
        `${recipeData.strMeasure19} ${recipeData.strIngredient19}`,
        `${recipeData.strMeasure20} ${recipeData.strIngredient20}`,
      ],
      price: 0,
      tags: recipeData.strTags,
      id: recipeData.idMeal,
    };

  
    res.send(newRecipe);

  } catch (error) {
    res.status(500).send("Error: " + error);  
  }
}

module.exports = { getFavRecipe, addRecipe, deleteRecipe, getShortList, getFullRecipe };
