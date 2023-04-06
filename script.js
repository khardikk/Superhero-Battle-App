// https://superheroapi.com/api/access-token/character-id

let superHero_1 = {};
let superHero_2 = {};

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

//winner-div
const winnerelement = document.querySelector(".winner");
const heroImage1 = document.getElementById("heroImage1");
const heroImage2 = document.getElementById("heroImage2");




newHeroButton1.addEventListener('click', () => {
  showFightButton();
  resetdefault();
});

newHeroButton2.addEventListener('click', () => {
  showFightButton();
  resetdefault();
});

searchButton1.addEventListener('click', () => {
  showFightButton();
  resetdefault();
});

searchButton2.addEventListener('click', () => {
  showFightButton();
  resetdefault();
});

fightButton.addEventListener('click', () => {
  const fightType = document.getElementById("fight-type");
  fightbegins(fightType);


})

const fightbegins = (fightType) => {
  const selectedValue = fightType.value;
  const statshero1 = parseInt(superHero_1.powerstats[selectedValue]);
  const statshero2 = parseInt(superHero_2.powerstats[selectedValue]);
  const nameHero1 = superHero_1.name;
  const nameHero2 = superHero_2.name;

  if (isNaN(statshero1) || isNaN(statshero2)) {
    alert("Select the NULL super hero again");
  } else {
    const winner = (statshero1 > statshero2) ? nameHero1 : (statshero1 < statshero2) ? nameHero2 : "Tie";
    const loserImage = (statshero1 > statshero2) ? heroImage2 : heroImage1;
    const winnerImage = (statshero1 > statshero2) ? heroImage1 : heroImage2;

    winnerelement.textContent = `${winner} Wins`;
    winnerelement.style.display = "block";
    loserImage.classList.add("transparency");
    winnerImage.classList.remove("transparency");
  }
};

const resetdefault = () => {
  winnerelement.style.display = "none";
  heroImage2.classList.remove("transparency");
  heroImage1.classList.remove("transparency");
};



const getSuperHero1 = (id) => {
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
      superHero_1 = superHero;
    })
}

const getSuperHero2 = (id) => {
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
      superHero_2 = superHero;
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
      superHero_1 = hero;

    })
}

const getSearchSuperHero2 = (name) => {
  console.log(searchInput2.value)
  fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
      const hero = json.results[0]
      showHeroInfo2(hero)
      superHero_2 = hero;
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

