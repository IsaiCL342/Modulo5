// Simulación de base de datos JSON
let libros = [
    { titulo: "Cien Años de Soledad", autor: "Gabriel García Márquez", genero: "Novela", disponible: true },
    { titulo: "1984", autor: "George Orwell", genero: "Ciencia Ficción", disponible: false },
    { titulo: "El Principito", autor: "Antoine de Saint-Exupéry", genero: "Fábula", disponible: true },
];

// Funciones asincrónicas con callbacks
function leerLibros(callback) {
    setTimeout(() => {
        callback(libros);
    }, 1000);
}

function escribirLibros(nuevosLibros, callback) {
    setTimeout(() => {
        libros = nuevosLibros;
        callback("✅ Cambios guardados correctamente.");
    }, 1000);
}

function consultarLibros() {
    console.log("📖 Consultando libros...");
    leerLibros((datos) => {
        console.table(datos);
        mostrarMenu();
    });
}

function agregarLibro(nuevoLibro) {
    console.log("➕ Agregando nuevo libro...");
    leerLibros((datos) => {
        datos.push(nuevoLibro);
        escribirLibros(datos, (mensaje) => {
        console.log(mensaje);
        mostrarMenu();
        });
    });
}

function actualizarDisponibilidad(titulo, nuevaDisponibilidad) {
    console.log(`🔁 Actualizando estado de "${titulo}"...`);
    leerLibros((datos) => {
    const libro = datos.find(libro => libro.titulo === titulo);
    if (libro) {
        libro.disponible = nuevaDisponibilidad;
        escribirLibros(datos, (mensaje) => {
            console.log(mensaje);
            mostrarMenu();
        });
        } else {
        console.log("❌ Libro no encontrado.");
        mostrarMenu();
        }
    });
}

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu() {
    console.log(`
=============================
📚 Biblioteca - Menú
1. Consultar libros
2. Agregar libro
3. Cambiar disponibilidad
4. Salir
=============================
`);
    rl.question("Selecciona una opción: ", (opcion) => {
        switch (opcion) {
        case "1":
            consultarLibros();
            break;
        case "2":
            rl.question("Título: ", (titulo) => {
            rl.question("Autor: ", (autor) => {
                rl.question("Género: ", (genero) => {
                rl.question("¿Está disponible? (si/no): ", (disp) => {
                    const disponible = disp.toLowerCase() === "si";
                    agregarLibro({ titulo, autor, genero, disponible });
                });
                });
            });
            });
            break;
        case "3":
            rl.question("Título del libro: ", (titulo) => {
            rl.question("Nuevo estado (si = disponible, no = prestado): ", (disp) => {
                const disponible = disp.toLowerCase() === "si";
                actualizarDisponibilidad(titulo, disponible);
            });
            });
            break;
        case "4":
            rl.close();
            break;
        default:
            console.log("❌ Opción no válida");
            mostrarMenu();
            break;
        }
    });
}

// Iniciar el programa
mostrarMenu();
