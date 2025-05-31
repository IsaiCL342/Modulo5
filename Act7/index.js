const planetas = require('./planetas');
const { mostrarPlaneta } = require('./utils');

console.log("⭐ Planetas Favoritos ⭐");
planetas.forEach(mostrarPlaneta);
