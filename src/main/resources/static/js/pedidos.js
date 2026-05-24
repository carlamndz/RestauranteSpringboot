const API           = 'http://localhost:8080/api/v1/pedidos';
const API_CLIENTES  = 'http://localhost:8080/api/v1/clientes';
const API_MESEROS   = 'http://localhost:8080/api/v1/meseros';
const API_ALIMENTOS = 'http://localhost:8080/api/v1/alimentos';

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('fecha').max = new Date().toISOString().split('T')[0];
    await cargarSelects();
    await cargarPedidos();
    document.getElementById('alimentos').addEventListener('change', calcularTotal);
});

// ── Selects dinámicos ─────────────────────────────────────────────────────────

async function cargarSelects() {
    try {
        const [clientes, meseros, alimentos] = await Promise.all([
            fetch(API_CLIENTES).then(r => r.json()),
            fetch(API_MESEROS).then(r => r.json()),
            fetch(API_ALIMENTOS).then(r => r.json())
        ]);

        const selCliente = document.getElementById('cliente');
        if (clientes.length === 0) {
            selCliente.innerHTML = '<option value="">⚠️ No hay clientes — ingresá uno primero</option>';
        } else {
            clientes.forEach(c => {
                selCliente.innerHTML += `<option value="${c.id}">${c.nombre} ${c.apellido}</option>`;
            });
        }

        const selMesero = document.getElementById('mesero');
        if (meseros.length === 0) {
            selMesero.innerHTML = '<option value="">⚠️ No hay meseros — ingresá uno primero</option>';
        } else {
            meseros.forEach(m => {
                selMesero.innerHTML += `<option value="${m.id}">${m.nombre} ${m.apellido}</option>`;
            });
        }

        const selAlimentos = document.getElementById('alimentos');
        if (alimentos.length === 0) {
            selAlimentos.innerHTML = '<option disabled>⚠️ No hay alimentos — ingresá uno primero</option>';
        } else {
            alimentos.forEach(a => {
                selAlimentos.innerHTML += `<option value="${a.id}" data-precio="${a.precio}">${a.nombre} — $${a.precio.toLocaleString('es-AR')}</option>`;
            });
        }
    } catch {
        mostrarToast('Error al cargar los datos del formulario', true);
    }
}

// ── Cálculo automático del total ──────────────────────────────────────────────

function calcularTotal() {
    const select = document.getElementById('alimentos');
    let total = 0;
    for (const opt of select.selectedOptions) {
        total += parseFloat(opt.dataset.precio);
    }
    document.getElementById('total').value = total.toFixed(2);
    document.getElementById('totalDisplay').textContent = '$' + total.toLocaleString('es-AR', { minimumFractionDigits: 2 });
}

// ── Validación ────────────────────────────────────────────────────────────────

function limpiarErrores() {
    ['cliente','mesero','fecha','hora','alimentos'].forEach(id => {
        document.getElementById(id).classList.remove('is-invalid','is-valid');
    });
    ['err-cliente','err-mesero','err-fecha','err-hora','err-alimentos'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '';
    });
}

function marcarError(id, msg) {
    document.getElementById(id).classList.add('is-invalid');
    const err = document.getElementById('err-' + id);
    if (err) err.textContent = msg;
}

function marcarOk(id) { document.getElementById(id).classList.add('is-valid'); }

function validar() {
    limpiarErrores();
    let ok = true;

    if (!document.getElementById('cliente').value) { marcarError('cliente', 'Seleccioná un cliente'); ok = false; }
    else marcarOk('cliente');

    if (!document.getElementById('mesero').value) { marcarError('mesero', 'Seleccioná un mesero'); ok = false; }
    else marcarOk('mesero');

    if (!document.getElementById('fecha').value) { marcarError('fecha', 'La fecha es obligatoria'); ok = false; }
    else marcarOk('fecha');

    if (!document.getElementById('hora').value) { marcarError('hora', 'La hora es obligatoria'); ok = false; }
    else marcarOk('hora');

    const alimentosSeleccionados = [...document.getElementById('alimentos').selectedOptions];
    if (alimentosSeleccionados.length === 0) { marcarError('alimentos', 'Seleccioná al menos un alimento'); ok = false; }
    else marcarOk('alimentos');

    return ok;
}

// ── Toast ─────────────────────────────────────────────────────────────────────

function mostrarToast(msg, error = false) {
    const toastEl = document.getElementById('toast');
    toastEl.classList.toggle('error', error);
    document.getElementById('toastMsg').textContent = msg;
    new bootstrap.Toast(toastEl, { delay: 3000 }).show();
}

// ── CRUD ──────────────────────────────────────────────────────────────────────

async function cargarPedidos() {
    try {
        const res = await fetch(API);
        const pedidos = await res.json();
        const tbody = document.getElementById('tablaPedidos');
        if (pedidos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted py-3">No hay pedidos registrados</td></tr>';
            return;
        }
        tbody.innerHTML = '';
        pedidos.forEach(p => {
            const alimentos = p.alimentos.map(a => a.nombre).join(', ');
            tbody.innerHTML += `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.cliente.nombre} ${p.cliente.apellido}</td>
                    <td>${p.mesero.nombre} ${p.mesero.apellido}</td>
                    <td>${p.fecha}</td>
                    <td>${p.hora}</td>
                    <td><small>${alimentos}</small></td>
                    <td><strong>$${p.total.toLocaleString('es-AR')}</strong></td>
                    <td>
                        <button class="btn btn-sm btn-warning fw-semibold" onclick="editarPedido(${p.id})">Editar</button>
                        <button class="btn btn-sm btn-danger fw-semibold" onclick="eliminarPedido(${p.id})">Eliminar</button>
                    </td>
                </tr>`;
        });
    } catch {
        mostrarToast('Error al cargar pedidos', true);
    }
}

async function guardarPedido() {
    if (!validar()) return;

    const id = document.getElementById('pedidoId').value;
    const alimentosSeleccionados = [...document.getElementById('alimentos').selectedOptions]
        .map(opt => ({ id: parseInt(opt.value) }));

    const pedido = {
        cliente:   { id: parseInt(document.getElementById('cliente').value) },
        mesero:    { id: parseInt(document.getElementById('mesero').value) },
        fecha:     document.getElementById('fecha').value,
        hora:      document.getElementById('hora').value,
        alimentos: alimentosSeleccionados,
        total:     parseFloat(document.getElementById('total').value)
    };

    try {
        if (id) {
            await fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pedido) });
            mostrarToast('Pedido actualizado correctamente');
        } else {
            await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pedido) });
            mostrarToast('Pedido creado correctamente');
        }
        limpiarFormulario();
        cargarPedidos();
    } catch {
        mostrarToast('Error al guardar el pedido', true);
    }
}

async function editarPedido(id) {
    try {
        const res = await fetch(`${API}/${id}`);
        const p = await res.json();

        document.getElementById('pedidoId').value = p.id;
        document.getElementById('cliente').value  = p.cliente.id;
        document.getElementById('mesero').value   = p.mesero.id;
        document.getElementById('fecha').value    = p.fecha;
        document.getElementById('hora').value     = p.hora;

        const select = document.getElementById('alimentos');
        const ids = p.alimentos.map(a => a.id);
        for (const option of select.options) {
            option.selected = ids.includes(parseInt(option.value));
        }

        calcularTotal();
        document.getElementById('formTitulo').textContent = '✏️ Editar pedido';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
        mostrarToast('Error al cargar el pedido', true);
    }
}

async function eliminarPedido(id) {
    if (!confirm('¿Seguro que querés eliminar este pedido?')) return;
    try {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
        mostrarToast('Pedido eliminado');
        cargarPedidos();
    } catch {
        mostrarToast('Error al eliminar', true);
    }
}

function limpiarFormulario() {
    document.getElementById('pedidoId').value = '';
    document.getElementById('cliente').selectedIndex = 0;
    document.getElementById('mesero').selectedIndex  = 0;
    document.getElementById('fecha').value = '';
    document.getElementById('hora').value  = '';
    document.getElementById('total').value = '0';
    document.getElementById('totalDisplay').textContent = '$0,00';
    const select = document.getElementById('alimentos');
    for (const opt of select.options) opt.selected = false;
    limpiarErrores();
    document.getElementById('formTitulo').textContent = 'Nuevo pedido';
}
