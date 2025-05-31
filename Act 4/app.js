const restaurante = {
    mesasDisponibles: 5,
};

function verificarDisponibilidad(mesasSolicitadas) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        if (mesasSolicitadas <= restaurante.mesasDisponibles) {
            resolve('Mesas disponibles. Procediendo con la reserva...');
        } else {
            reject('Lo sentimos, no hay suficientes mesas disponibles.');
        }
        }, 1000);
    });
}

function enviarConfirmacionReserva(nombreCliente) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        const exito = Math.random() > 0.2;
        if (exito) {
            resolve(`Correo de confirmación enviado a ${nombreCliente}.`);
        } else {
            reject('Error al enviar el correo de confirmación.');
        }
        }, 1000);
    });
}

async function hacerReserva(nombreCliente, mesasSolicitadas) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = 'Procesando reserva...';
    
    try {
        const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);
        resultadoDiv.textContent = disponibilidad;

        restaurante.mesasDisponibles -= mesasSolicitadas;

        const confirmacion = await enviarConfirmacionReserva(nombreCliente);
        resultadoDiv.textContent = confirmacion + '\n🎉 Reserva completada con éxito.';
    } catch (error) {
        resultadoDiv.textContent = `❌ ${error}`;
    }
}

document.getElementById('reservaForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = e.target.nombre.value.trim();
    const mesas = parseInt(e.target.mesas.value);

    if (!nombre) {
        alert('Por favor, ingresa tu nombre.');
        return;
    }

    if (mesas <= 0 || isNaN(mesas)) {
        alert('Por favor, ingresa un número válido de mesas.');
        return;
    }

    hacerReserva(nombre, mesas);

    // Limpiar formulario
    e.target.reset();
});
