import React, { Component } from 'react';
import RandomSprout from '../components/RandomSprout';
import SproutsIndex from '../components/SproutsIndex';
import LongestSprout from '../components/LongestSprout';

class SproutsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: "",
      recipes: [],
      longest: ""
    }
    this.getRandomRecipe = this.getRandomRecipe.bind(this)
    this.getAllRecipes = this.getAllRecipes.bind(this)
    this.getLongestRecipe = this.getLongestRecipe.bind(this)
  }

  getRandomRecipe(){
    fetch('/api/v1/random-recipe')
    .then(response => response.json())
    .then(data => this.setState({
      recipe: data,
      recipes: [],
      longest: ""
    }))

  }

  getAllRecipes(){
    fetch('/api/v1/recipes')
    .then(response => response.json())
    .then(data => this.setState({
      recipe: '',
      recipes: data,
      longest: ""
    }))
  }

  getLongestRecipe(){
    fetch('/api/v1/longest-recipe')
    .then(response => response.json())
    .then(data => {
      debugger;
      this.setState({
      recipe: '',
      recipes: [],
      longest: data
    })
  })
  }

  render(){

    let handleRandomClick = () => {
      this.getRandomRecipe();
    }

    let handleIndexClick = () => {
      this.getAllRecipes();
    }

    let handleLongestClick = () => {
      this.getLongestRecipe();
    }

    return(
      <div className="container">
        <h1>Sprout Fetcher</h1>
        <RandomSprout
          recipe={this.state.recipe}
          handleClick = {handleRandomClick}
        />
        <SproutsIndex
          recipes={this.state.recipes}
          handleClick={handleIndexClick}
        />
        <LongestSprout
          recipe={this.state.longest}
          handleClick={handleLongestClick}
        />

        <div className="buttons">
          <button onClick={handleRandomClick} className="btn">Get Random Recipe</button>

          <button onClick={handleIndexClick} className="btn">See All Recipes</button>

          <button onClick={handleLongestClick} className="btn">See Longest Recipe</button>
        </div>
      </div>
    )
  }
}

export default SproutsContainer;
