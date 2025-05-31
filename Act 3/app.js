const container = document.getElementById('data-container');
const fetchBtn = document.getElementById('fetchBtn');
const axiosBtn = document.getElementById('axiosBtn');

const API_URL = 'https://rickandmortyapi.com/api/character';

// Función para mostrar personajes
function renderCharacters(characters) {
    container.innerHTML = '';
    characters.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
        `;
        container.appendChild(card);
    });
}

// 🚀 Fetch
async function loadWithFetch() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al cargar con Fetch');
        const data = await response.json();
        renderCharacters(data.results);
    } catch (error) {
        console.error('Fetch error:', error);
        container.innerHTML = `<p>Error al cargar personajes con Fetch 😢</p>`;
    }
}

// 🚀 Axios
async function loadWithAxios() {
    try {
        const response = await axios.get(API_URL);
        renderCharacters(response.data.results);
    } catch (error) {
        console.error('Axios error:', error);
        container.innerHTML = `<p>Error al cargar personajes con Axios 😢</p>`;
    }
}

fetchBtn.addEventListener('click', loadWithFetch);
axiosBtn.addEventListener('click', loadWithAxios);
