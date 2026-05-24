const API = 'http://localhost:8080/api/v1/alimentos';

document.addEventListener('DOMContentLoaded', cargarAlimentos);

function limpiarErrores() {
    ['nombre','precio'].forEach(id => {
        document.getElementById(id).classList.remove('is-invalid','is-valid');
    });
    ['err-nombre','err-precio'].forEach(id => {
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
    const nombre = document.getElementById('nombre').value.trim();
    const precio = document.getElementById('precio').value;

    if (!nombre || nombre.length < 2) { marcarError('nombre', 'El nombre es obligatorio, mínimo 2 caracteres'); ok = false; }
    else marcarOk('nombre');

    if (!precio || parseFloat(precio) < 0) { marcarError('precio', 'El precio es obligatorio y debe ser mayor o igual a 0'); ok = false; }
    else marcarOk('precio');

    return ok;
}

function mostrarToast(msg, error = false) {
    const toastEl = document.getElementById('toast');
    toastEl.classList.toggle('error', error);
    document.getElementById('toastMsg').textContent = msg;
    new bootstrap.Toast(toastEl, { delay: 3000 }).show();
}

async function cargarAlimentos() {
    try {
        const res = await fetch(API);
        const alimentos = await res.json();
        const tbody = document.getElementById('tablaAlimentos');
        if (alimentos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-3">No hay alimentos registrados</td></tr>';
            return;
        }
        tbody.innerHTML = '';
        alimentos.forEach(a => {
            tbody.innerHTML += `
                <tr>
                    <td>${a.id}</td>
                    <td>${a.nombre}</td>
                    <td>$${a.precio.toLocaleString('es-AR')}</td>
                    <td>
                        <button class="btn btn-sm btn-warning fw-semibold" onclick="editarAlimento(${a.id})">Editar</button>
                        <button class="btn btn-sm btn-danger fw-semibold" onclick="eliminarAlimento(${a.id})">Eliminar</button>
                    </td>
                </tr>`;
        });
    } catch {
        mostrarToast('Error al cargar alimentos', true);
    }
}

async function guardarAlimento() {
    if (!validar()) return;
    const id = document.getElementById('alimentoId').value;
    const alimento = {
        nombre: document.getElementById('nombre').value.trim(),
        precio: parseFloat(document.getElementById('precio').value)
    };

    try {
        if (id) {
            await fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(alimento) });
            mostrarToast('Alimento actualizado correctamente');
        } else {
            await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(alimento) });
            mostrarToast('Alimento creado correctamente');
        }
        limpiarFormulario();
        cargarAlimentos();
    } catch {
        mostrarToast('Error al guardar el alimento', true);
    }
}

async function editarAlimento(id) {
    try {
        const res = await fetch(`${API}/${id}`);
        const a = await res.json();
        document.getElementById('alimentoId').value = a.id;
        document.getElementById('nombre').value     = a.nombre;
        document.getElementById('precio').value     = a.precio;
        document.getElementById('formTitulo').textContent = '✏️ Editar alimento';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
        mostrarToast('Error al cargar el alimento', true);
    }
}

async function eliminarAlimento(id) {
    if (!confirm('¿Seguro que querés eliminar este alimento?')) return;
    try {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
        mostrarToast('Alimento eliminado');
        cargarAlimentos();
    } catch {
        mostrarToast('Error al eliminar', true);
    }
}

function limpiarFormulario() {
    document.getElementById('alimentoId').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    limpiarErrores();
    document.getElementById('formTitulo').textContent = 'Nuevo alimento';
}
