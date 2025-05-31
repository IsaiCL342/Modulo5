let contadorPedidos = 0;

document.getElementById('formularioPedido').addEventListener('submit', (e) => {
    e.preventDefault();

    const cliente = document.getElementById('cliente').value.trim();
    const bebida = document.getElementById('bebida').value;

    if (!cliente || !bebida) return;

    const pedidoId = ++contadorPedidos;

    recibirPedido({ id: pedidoId, cliente, bebida });

    // Limpiar campos
    document.getElementById('formularioPedido').reset();
});

function recibirPedido({ id, cliente, bebida }) {
    const pedidoElemento = document.createElement('div');
    pedidoElemento.id = `pedido-${id}`;
    pedidoElemento.className = 'pedido en-proceso';
    pedidoElemento.innerHTML = `<strong>#${id}</strong> ${cliente} - ${bebida}<br><em>En proceso...</em>`;

    document.getElementById('listaEnProceso').appendChild(pedidoElemento);

    procesarPedido(id).then(() => {
        actualizarEstadoPedido(id, cliente, bebida);
    });
}

function procesarPedido(id) {
    return new Promise((resolve) => {
        const tiempoPreparacion = Math.floor(Math.random() * 5000) + 3000; // entre 3 y 8 segundos
        setTimeout(resolve, tiempoPreparacion);
    });
    }

async function actualizarEstadoPedido(id, cliente, bebida) {
    const pedidoElemento = document.getElementById(`pedido-${id}`);
    if (pedidoElemento) {
        pedidoElemento.remove(); // eliminar de pedidos en proceso

        const completadoElemento = document.createElement('div');
        completadoElemento.className = 'pedido completado';
        completadoElemento.innerHTML = `<strong>#${id}</strong> ${cliente} - ${bebida}<br><em>✅ Completado</em>`;

        document.getElementById('listaCompletados').appendChild(completadoElemento);
    }
}
