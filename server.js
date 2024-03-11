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
const apiUrl = 'https://redpers.nl/wp-json/wp/v2/'
const postsUrl = apiUrl + 'posts'
const categoriesUrl = apiUrl+ 'categories'
// const usersUrl = apiUrl + 'users'
const categories = [
  {"id": 9, "name": "Binnenland", "slug": "binnenland"},
  {"id": 1010, "name": "Buitenland", "slug": "buitenland"}, 
  {"id": 10, "name": "Columns", "slug": "columns"},
  {"id": 6, "name": "Economie", "slug": "economie"},
  {"id": 4, "name": "Kunst & Media", "slug": "kunst-media"},
  {"id": 3211, "name": "Podcasts", "slug": "podcast"},
  {"id": 63, "name": "Politiek", "slug": "politiek"},
  {"id": 94, "name": "Wetenshap", "slug": "wetenschap"},
];

// *** Routes ***

// Maak een GET route voor de index
app.get('/', function (request, response){
    // Haal alle data uit de API op
  
    fetchJson( `${apiUrl}posts`).then((apiData) => {
      
     // Je zou dat hier kunnen filteren, sorteren, of zelfs aanpassen, voordat je het doorgeeft aan de view
  
      // Render index.ejs uit de views map en geef de opgehaalde data mee als variabele
      response.render('index', 
      {posts: apiData, categories, title: "Red pers - Podium voor de Journalistiek"});
    })
  })

// Maak een GET route voor de author page
app.get('/author/:id', function (request, response){

  fetchJson( `${apiUrl}posts?author=${request.params.id}`).then((apiData) => {
 
     // Render index.ejs uit de views map en geef de opgehaalde data mee als variabele
     response.render('index', 
     {posts: apiData, categories, title: `Red pers - artikelen door ${apiData[0].yoast_head_json.author}`});
   })
})

// Maak een GET route voor de post pagina
app.get('/post/:slug', function (request, response){

  fetchJson( `${apiUrl}posts?slug=${request.params.slug}`).then((apiData) => {
     // Render post.ejs uit de views map en geef de opgehaalde data mee als variabele
     response.render('post', 
     {post: apiData[0], categories, yoast_head: apiData[0].yoast_head});
   })
})

// Maak een GET route voor de catogoriepagina
app.get('/categorie/:slug', function (request, response) {
  const category = categories.find((c) => c.slug == request.params.slug);
  fetchJson(`${apiUrl}posts?categories=${category.id}`).then((apiData) => {
    
    // Render catogorie.ejs uit de views map en geef de opgehaalde data mee als variabele
    // HTML maken op basis van JSON data
    response.render('index', {posts: apiData, categories, title: `Red pers - ${category.name} archieven`});
  })
})