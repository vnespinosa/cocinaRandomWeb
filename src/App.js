import React, {useEffect, useState} from 'react';
import Recipe from './component/Recipe';
import DropdownCategory from './component/DropdownCategory';
import './App.css';

const App = () => {

  //const URL = "https://cocina-random-backend.herokuapp.com";
  const URL = "http://127.0.0.1:8000/"

  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [query_name, setQueryName] = useState("");

  const [query, setQuery] = useState("");

  const [query_categories, setQueryCategories] = useState([]);


  useEffect(() => {
    getRecipes();
  }, [query])

  useEffect(() => {
    setCategoriesQ(selected);
  }, [selected])

  useEffect(() => {
    getCategories();
  }, [])

  const getRecipes = async () => {
    const response = await fetch(`${URL}/recipes_paginated/?page_size=20&${query}`);
    const data = await response.json();
    setRecipes(data.data);
  };

  var setCategoriesQ = (selected) => {
    var categories = [];
    {selected.map(category=>(
      categories.push(category.value)
    ))}
    setQueryCategories(categories);
  }

  const getCategories = async () => {
    const categories_response = await fetch(`${URL}/categories`);
    const categories_data = await categories_response.json();
    setCategories(categories_data);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQueryName(search);
    setQuery(`&categories=${query_categories}&ingredients=&name=${query_name}`)
    setSearch("");
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">

        <DropdownCategory
          categories={categories}
          selected={selected}
          setSelected={setSelected}
        />

        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Buscar
        </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe=>(
        <Recipe
          key={recipe.id}
          title={recipe.name}
          description={recipe.description}
          image={recipe.image}
          ingredients={recipe.ingredients}
          categories={recipe.categories}
          links={recipe.links}
        />
      ))}
      </div>
    </div>
  );
};


export default App;
