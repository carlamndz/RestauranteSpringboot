const API = 'http://localhost:8080/api/v1/clientes';

document.addEventListener('DOMContentLoaded', () => {
    cargarClientes();
    soloLetras('nombre');
    soloLetras('apellido');
    soloNumeros('cedula');
    soloNumeros('telefono');
});

// ── Restricciones de teclado ──────────────────────────────────────────────────

function soloLetras(id) {
    document.getElementById(id).addEventListener('keypress', e => {
        const char = String.fromCharCode(e.which);
        if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/.test(char)) e.preventDefault();
    });
}

function soloNumeros(id) {
    document.getElementById(id).addEventListener('keypress', e => {
        if (!/[0-9]/.test(String.fromCharCode(e.which))) e.preventDefault();
    });
}

// ── Validación ────────────────────────────────────────────────────────────────

function limpiarErrores() {
    ['nombre','apellido','cedula','telefono','correo'].forEach(id => {
        const el = document.getElementById(id);
        el.classList.remove('is-invalid', 'is-valid');
    });
}

function marcarError(id, msg) {
    const el = document.getElementById(id);
    el.classList.add('is-invalid');
    document.getElementById('err-' + id).textContent = msg;
}

function marcarOk(id) {
    document.getElementById(id).classList.add('is-valid');
}

function validar() {
    limpiarErrores();
    let ok = true;

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const cedula = document.getElementById('cedula').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();

    if (!nombre) {
        marcarError('nombre', 'El nombre es obligatorio'); ok = false;
    } else if (nombre.length < 2) {
        marcarError('nombre', 'Mínimo 2 caracteres'); ok = false;
    } else marcarOk('nombre');

    if (!apellido) {
        marcarError('apellido', 'El apellido es obligatorio'); ok = false;
    } else if (apellido.length < 2) {
        marcarError('apellido', 'Mínimo 2 caracteres'); ok = false;
    } else marcarOk('apellido');

    if (cedula && (cedula.length < 7 || cedula.length > 10)) {
        marcarError('cedula', 'El DNI debe tener entre 7 y 10 dígitos'); ok = false;
    } else if (cedula) marcarOk('cedula');

    if (telefono && (telefono.length < 8 || telefono.length > 15)) {
        marcarError('telefono', 'El teléfono debe tener entre 8 y 15 dígitos'); ok = false;
    } else if (telefono) marcarOk('telefono');

    if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        marcarError('correo', 'Formato de correo inválido'); ok = false;
    } else if (correo) marcarOk('correo');

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

async function cargarClientes() {
    try {
        const res = await fetch(API);
        const clientes = await res.json();
        const tbody = document.getElementById('tablaClientes');
        if (clientes.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-3">No hay clientes registrados</td></tr>';
            return;
        }
        tbody.innerHTML = '';
        clientes.forEach(c => {
            tbody.innerHTML += `
                <tr>
                    <td>${c.id}</td>
                    <td>${c.nombre}</td>
                    <td>${c.apellido}</td>
                    <td>${c.cedula ?? '-'}</td>
                    <td>${c.telefono ?? '-'}</td>
                    <td>${c.correo ?? '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-warning fw-semibold" onclick="editarCliente(${c.id})">Editar</button>
                        <button class="btn btn-sm btn-danger fw-semibold" onclick="eliminarCliente(${c.id})">Eliminar</button>
                    </td>
                </tr>`;
        });
    } catch {
        mostrarToast('Error al cargar clientes', true);
    }
}

async function guardarCliente() {
    if (!validar()) return;

    const id = document.getElementById('clienteId').value;
    const cliente = {
        nombre:   document.getElementById('nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        cedula:   document.getElementById('cedula').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        correo:   document.getElementById('correo').value.trim()
    };

    try {
        if (id) {
            await fetch(`${API}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cliente)
            });
            mostrarToast('Cliente actualizado correctamente');
        } else {
            await fetch(API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cliente)
            });
            mostrarToast('Cliente creado correctamente');
        }
        limpiarFormulario();
        cargarClientes();
    } catch {
        mostrarToast('Error al guardar el cliente', true);
    }
}

async function editarCliente(id) {
    try {
        const res = await fetch(`${API}/${id}`);
        const c = await res.json();
        document.getElementById('clienteId').value  = c.id;
        document.getElementById('nombre').value     = c.nombre;
        document.getElementById('apellido').value   = c.apellido;
        document.getElementById('cedula').value     = c.cedula ?? '';
        document.getElementById('telefono').value   = c.telefono ?? '';
        document.getElementById('correo').value     = c.correo ?? '';
        document.getElementById('formTitulo').textContent = '✏️ Editar cliente';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
        mostrarToast('Error al cargar el cliente', true);
    }
}

async function eliminarCliente(id) {
    if (!confirm('¿Seguro que querés eliminar este cliente?')) return;
    try {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
        mostrarToast('Cliente eliminado');
        cargarClientes();
    } catch {
        mostrarToast('Error al eliminar el cliente', true);
    }
}

function limpiarFormulario() {
    document.getElementById('clienteId').value = '';
    ['nombre','apellido','cedula','telefono','correo'].forEach(id => {
        document.getElementById(id).value = '';
    });
    limpiarErrores();
    document.getElementById('formTitulo').textContent = 'Nuevo cliente';
}
