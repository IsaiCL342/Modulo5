document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const mensajesDiv = document.getElementById('mensajes');
    mensajesDiv.textContent = '';

    // Obtener valores
    const nombre = this.nombre.value.trim();
    const correo = this.correo.value.trim();
    const telefono = this.telefono.value.trim();
    const intereses = Array.from(this.querySelectorAll('input[name="intereses"]:checked')).map(el => el.value);
    const horario = this.horario.value;
    const fechaEvento = this.fechaEvento.value;
    const archivo = this.archivo.files[0];

    // Validaciones básicas + 3 validaciones extras

    const errores = [];

    // 1. Nombre: no vacío, al menos 3 caracteres
    if (nombre.length < 3) {
        errores.push('El nombre debe tener al menos 3 caracteres.');
    }

    // 2. Correo: formato válido (HTML5 ya lo valida pero reforzamos)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        errores.push('Correo electrónico inválido.');
    }

    // 3. Teléfono: solo números y longitud mínima de 10
    const telefonoRegex = /^\d{10,}$/;
    if (!telefonoRegex.test(telefono)) {
        errores.push('El teléfono debe tener al menos 10 dígitos numéricos.');
    }

    // 4. Al menos un interés debe estar seleccionado (validación extra)
    if (intereses.length === 0) {
        errores.push('Debe seleccionar al menos un interés.');
    }

    // 5. Fecha del evento: no puede ser pasada (validación extra)
    if (!fechaEvento) {
        errores.push('Debe seleccionar una fecha para el evento.');
    } else {
        const hoy = new Date();
        const fechaSelec = new Date(fechaEvento + 'T00:00:00');
        if (fechaSelec < hoy.setHours(0, 0, 0, 0)) {
        errores.push('La fecha del evento no puede ser pasada.');
        }
    }

    // 6. Archivo: si hay archivo, debe pesar menos de 2MB (validación extra)
    if (archivo && archivo.size > 2 * 1024 * 1024) {
        errores.push('El archivo debe ser menor a 2MB.');
    }

    // 7. Horario: requerido (HTML5 required, pero reforzamos)
    if (!horario) {
        errores.push('Debe seleccionar un horario preferido.');
    }

    if (errores.length > 0) {
        mensajesDiv.style.color = 'red';
        mensajesDiv.textContent = errores.join('\n');
        return;
    }

    // Si pasa validaciones, mostramos éxito
    mensajesDiv.style.color = 'green';
    mensajesDiv.textContent = `¡Registro exitoso!\nGracias, ${nombre}, por registrarte para el evento el ${fechaEvento} en el horario de ${horario}.\nIntereses: ${intereses.join(', ')}`;
    this.reset();
});
