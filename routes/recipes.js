const express = require('express');
const router = express.Router();
//fs allows me to be able to use the read and write file methods
const fs = require('fs')

//establishes a connection to the users json database
const RECIPES_FILE = `./data/recipes.json`

//GET recipes listing. ALL RECIPES  /recipes
router.get('/', (req, res, next)=> {

    fs.readFile(RECIPES_FILE, 'utf8', (err,data) => {
      if(err){
        console.error(err)
        res.status(500).send('There was a problem reading this file.')
        return 
      }
      res.json(JSON.parse(data));
    })
});

//GET recipes by id /:id
router.get('/id/:id', (req, res, next)=> {

    const{id} = req.params

    fs.readFile(RECIPES_FILE, 'utf8', (err,data) => {
      if(err){
        console.error(err)
        res.status(500).send('There was a problem reading this file.')
        return 
      }
      //this changes data into an array so we can perform find() on it
      const recipes = JSON.parse(data)

      //this finds the recipe with the matching id 
      const recipe = recipes.find(recipe => recipe.id == id)

      //returns(displays) recipe with that id 
      res.json(recipe)
    })
});

//GET random recipe by /random
router.get('/random', (req, res, next)=> {

    
console.log(`random`)
    fs.readFile(RECIPES_FILE, 'utf8', (err,data) => {
      if(err){
        console.error(err)
        res.status(500).send('There was a problem reading this file.')
        return 
      }
      //this changes data into an array so we can perform find() on it
      const recipes = JSON.parse(data)

      const num = Math.floor(Math.random()* (recipes.length))
      console.log(num)

      //this finds the recipe with the matching id 
      const recipe = recipes.find(recipe => recipe.id == num+1)

      //returns(displays) recipe with that id 
      res.json(recipe)
    })
});

//POST a new recipe
router.post('/', (req, res, next)=> {

    
   
        fs.readFile(RECIPES_FILE, 'utf8', (err,data) => {
          if(err){
            console.error(err)
            res.status(500).send('There was a problem reading this file.')
            return 
          }
          //this changes data into an array so we can perform find() on it
          const recipes = JSON.parse(data)

          //new information is put into a variable
      const newRecipe = {
        id: (recipes.length + 1).toString(),
        name: req.body.name,
        style: req.body.style,
        prep_time: req.body.prep_time,
        cook_time: req.body.cook_time,
        instructions: req.body.instructions
      }
      console.log(newRecipe)
      //adding new info to user array
      recipes.push(newRecipe)
      console.log(recipes)
          
      fs.writeFile(RECIPES_FILE, JSON.stringify(recipes),err =>{
        if(err){
          console.error(err)
          res.status(500).send('There is a problem writing to the file.')
          return
        }
        
        res.json(newRecipe)
        })
    })
})





module.exports = router;
