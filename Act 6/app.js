const { z } = window.Zod;

const schema = z.object({
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    correo: z.string().email("Correo electrónico inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const form = document.getElementById('registroForm');
const errorNombre = document.getElementById('error-nombre');
const errorCorreo = document.getElementById('error-correo');
const errorPassword = document.getElementById('error-password');
const successMessage = document.getElementById('success-message');

function limpiarErrores() {
    errorNombre.textContent = '';
    errorCorreo.textContent = '';
    errorPassword.textContent = '';
    successMessage.textContent = '';
}

function mostrarErrores(errores) {
    limpiarErrores();
    for (const err of errores) {
        if (err.path.includes('nombre')) {
        errorNombre.textContent = err.message;
        }
        if (err.path.includes('correo')) {
        errorCorreo.textContent = err.message;
        }
        if (err.path.includes('password')) {
        errorPassword.textContent = err.message;
        }
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    limpiarErrores();

    const datos = {
        nombre: form.nombre.value.trim(),
        correo: form.correo.value.trim(),
        password: form.password.value,
    };

    const resultado = schema.safeParse(datos);

    if (!resultado.success) {
        mostrarErrores(resultado.error.errors);
        successMessage.textContent = '';
    } else {
        successMessage.textContent = `¡Registro exitoso! Bienvenido, ${datos.nombre}.`;
        form.reset();
    }
});

// Validación en tiempo real
form.nombre.addEventListener('input', () => {
    const value = form.nombre.value.trim();
    const valid = schema.shape.nombre.safeParse(value);
    errorNombre.textContent = valid.success ? '' : valid.error.errors[0].message;
});

form.correo.addEventListener('input', () => {
    const value = form.correo.value.trim();
    const valid = schema.shape.correo.safeParse(value);
    errorCorreo.textContent = valid.success ? '' : valid.error.errors[0].message;
});

form.password.addEventListener('input', () => {
    const value = form.password.value;
    const valid = schema.shape.password.safeParse(value);
    errorPassword.textContent = valid.success ? '' : valid.error.errors[0].message;
});
