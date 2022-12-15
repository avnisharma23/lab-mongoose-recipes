const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
      let myRecipe = Recipe.create({
        title:'Lentils Soup',
        level:'Easy Peasy',
        ingredients:'lentils,garlic,ginger,water',
        cuisine: 'indian',
        dishType: 'soup',
        image : 'https://images.media-allrecipes.com/images/75131.jpg',
        duration : 15,
        creator : 'Avni'
        
      })
      .then(myRecipe => console.log("myreceipe",myRecipe.title))

  })

  .then(()=>{
    let manyRecipe = Recipe.insertMany(data);
    for(let i = 0; i < data.length; i++){
      console.log(data[i])
    }
  })

  

 .then(() => {

    Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration: 100},{new: true})
    .then(updated => console.log('updateduration',updated )) 
    /* console.log('updated successfully') */
  })  

  .then(() => {

    Recipe.deleteOne({title :'Carrot Cake'})
    console.log("Deleted sucessfully")

  }) 
 .then(() => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      }); 
  }) 

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
