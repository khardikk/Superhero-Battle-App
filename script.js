// https://superheroapi.com/api/access-token/character-id

const SUPERHERO_TOKEN = '10223569763528853'
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`
// new hero buttons for random input 
const newHeroButton1 = document.getElementById('newHeroButton1')
const newHeroButton2 = document.getElementById('newHeroButton2')

const heroImageDiv1 = document.getElementById('heroImage1')
const heroImageDiv2 = document.getElementById('heroImage2')

// search hero buttons for searched input 
const searchButton1 = document.getElementById('searchButton1')
const searchButton2 = document.getElementById('searchButton2')

// search inputs for the two heros
const searchInput1 = document.getElementById('searchInput1')
const searchInput2 = document.getElementById('searchInput2')

// fight button for the chosen fights
const fightButton = document.getElementById('fightButton');
fightButton.style.display = 'none';

// getting the value of our fight type when button is clicked 
newHeroButton1.addEventListener('click', () => {
  showFightButton();
});

newHeroButton2.addEventListener('click', () => {
  showFightButton();
});

searchButton1.addEventListener('click', () => {
  showFightButton();
});

searchButton2.addEventListener('click', () => {
  showFightButton();
});


const getSuperHero1 = (id, name) => {
  // name 👉 base_url/search/batman
  // json.results[0].image.url
  // id: 👉 base_url/id
  // json.image.url
  fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => {
      console.log(json.powerstats)
      const superHero = json
      showHeroInfo1(superHero) 
    })
}

const getSuperHero2 = (id, name) => {
  // name 👉 base_url/search/batman
  // json.results[0].image.url
  // id: 👉 base_url/id
  // json.image.url
  fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => {
      console.log(json.powerstats)
      const superHero = json
      showHeroInfo2(superHero) 
    })
}

const statToEmoji = {
  intelligence: '🧠',
  strength: '💪',
  speed: '⚡',
  durability: '🏋️‍♂️',
  power: '📊',
  combat: '⚔️',
}

let hero1 = null
let hero2 = null

const showHeroInfo1 = (character) => {
  const name = `<h2>${character.name}</h2>`
  const img = `<img src="${character.image.url}" height=200 width=200/>`
  const stats = Object.keys(character.powerstats).map(stat => {
    return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
  }).join('')
  heroImageDiv1.innerHTML = `${name}${img}${stats}`

  hero1 = character
}

const showHeroInfo2 = (character) => {
  const name = `<h2>${character.name}</h2>`
  const img = `<img src="${character.image.url}" height=200 width=200/>`
  const stats = Object.keys(character.powerstats).map(stat => {
    return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
  }).join('')
  heroImageDiv2.innerHTML = `${name}${img}${stats}`

  hero2 = character
}


// <p>💪 Strength: ${json.powerstats.strength}</p><p>🧠 Intelligence: ${json.powerstats.intelligence}</p><p>🧠 Combat: ${json.powerstats.intelligence}</p><p>🧠 Speed: ${json.powerstats.intelligence}</p><p>🧠 Durability: ${json.powerstats.intelligence}</p>

const getSearchSuperHero1 = (name) => {
  console.log(searchInput1.value)
  fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
      const hero = json.results[0]
      showHeroInfo1(hero) 
    })
}

const getSearchSuperHero2 = (name) => {
  console.log(searchInput2.value)
  fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
      const hero = json.results[0]
      showHeroInfo2(hero) 
    })
}

function showFightButton() {
 fightButton.style.display = 'block';
  fightButton.style.marginTop = '10px';
  fightButton.style.marginLeft = 'auto';
  fightButton.style.marginRight = 'auto';
}


const randomHero = () => {
  const numberOfHeroes = 731
  return Math.floor(Math.random() * numberOfHeroes) + 1
}

newHeroButton1.onclick = () => getSuperHero1(randomHero()) 
newHeroButton2.onclick = () => getSuperHero2(randomHero()) 

searchButton1.onclick = () => getSearchSuperHero1(searchInput1.value)
searchButton2.onclick = () => getSearchSuperHero2(searchInput2.value)
