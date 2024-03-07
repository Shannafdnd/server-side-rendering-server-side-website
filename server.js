// *** Express setup en start ***


// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})



//*** Data ***
let res = await fetch("https://redpers.nl/wp-json/wp/v2/categories/");
let categories = await res.json();

// *** Routes ***

// Maak een GET route voor de index
app.get('/', function (request, response){
    // Haal alle data uit de API op
  
    fetchJson( 'https://redpers.nl/wp-json/wp/v2/posts').then((apiData) => {
      
     // Je zou dat hier kunnen filteren, sorteren, of zelfs aanpassen, voordat je het doorgeeft aan de view
  
      // Render index.ejs uit de views map en geef de opgehaalde data mee als variabele
      response.render('index', 
      {posts: apiData, categories});
    })
  })

// Maak een GET route voor author
app.get('/author/:id', function (request, response){

  fetchJson( `https://redpers.nl/wp-json/wp/v2/posts?author=${request.params.id}`).then((apiData) => {
 
     // Render index.ejs uit de views map en geef de opgehaalde data mee als variabele
     response.render('index', 
     {posts: apiData});
   })
})

// Maak een GET route voor de posts 
app.get('/post/:id', function (request, response){

  fetchJson( `https://redpers.nl/wp-json/wp/v2/posts/${request.params.id}`).then((apiData) => {
     // Render post.ejs uit de views map en geef de opgehaalde data mee als variabele
     response.render('post', 
     {post: apiData});
   })
})

// Maak een GET route voor de catogorie
app.get('/catogorie', function (request, response) {
  fetchJson().then((apiData) => {
    
    // Render catogorie.ejs uit de views map en geef de opgehaalde data mee als variabele
    // HTML maken op basis van JSON data
    response.render('catogorie', {})
  })
})