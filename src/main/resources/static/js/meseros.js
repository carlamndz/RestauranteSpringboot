const API = 'http://localhost:8080/api/v1/meseros';

document.addEventListener('DOMContentLoaded', () => {
    cargarMeseros();
    soloLetras('nombre');
    soloLetras('apellido');
    soloNumeros('cedula');
    soloNumeros('telefono');
});

function soloLetras(id) {
    document.getElementById(id).addEventListener('keypress', e => {
        if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/.test(String.fromCharCode(e.which))) e.preventDefault();
    });
}

function soloNumeros(id) {
    document.getElementById(id).addEventListener('keypress', e => {
        if (!/[0-9]/.test(String.fromCharCode(e.which))) e.preventDefault();
    });
}

function limpiarErrores() {
    ['nombre','apellido','cedula','telefono','salario','horaIngreso'].forEach(id => {
        document.getElementById(id).classList.remove('is-invalid','is-valid');
    });
    ['err-salario','err-horaIngreso'].forEach(id => {
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
    const apellido = document.getElementById('apellido').value.trim();
    const cedula = document.getElementById('cedula').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const salario = document.getElementById('salario').value;
    const horaIngreso = document.getElementById('horaIngreso').value;

    if (!nombre || nombre.length < 2) { marcarError('nombre', 'Nombre obligatorio, mínimo 2 letras'); ok = false; }
    else marcarOk('nombre');

    if (!apellido || apellido.length < 2) { marcarError('apellido', 'Apellido obligatorio, mínimo 2 letras'); ok = false; }
    else marcarOk('apellido');

    if (cedula && (cedula.length < 7 || cedula.length > 10)) { marcarError('cedula', 'DNI entre 7 y 10 dígitos'); ok = false; }
    else if (cedula) marcarOk('cedula');

    if (telefono && (telefono.length < 8 || telefono.length > 15)) { marcarError('telefono', 'Teléfono entre 8 y 15 dígitos'); ok = false; }
    else if (telefono) marcarOk('telefono');

    if (!salario || parseFloat(salario) < 0) { marcarError('salario', 'El salario es obligatorio y debe ser mayor a 0'); ok = false; }
    else marcarOk('salario');

    if (!horaIngreso) { marcarError('horaIngreso', 'La hora de ingreso es obligatoria'); ok = false; }
    else marcarOk('horaIngreso');

    return ok;
}

function mostrarToast(msg, error = false) {
    const toastEl = document.getElementById('toast');
    toastEl.classList.toggle('error', error);
    document.getElementById('toastMsg').textContent = msg;
    new bootstrap.Toast(toastEl, { delay: 3000 }).show();
}

async function cargarMeseros() {
    try {
        const res = await fetch(API);
        const meseros = await res.json();
        const tbody = document.getElementById('tablaMesseros');
        if (meseros.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted py-3">No hay meseros registrados</td></tr>';
            return;
        }
        tbody.innerHTML = '';
        meseros.forEach(m => {
            tbody.innerHTML += `
                <tr>
                    <td>${m.id}</td>
                    <td>${m.nombre}</td>
                    <td>${m.apellido}</td>
                    <td>${m.cedula ?? '-'}</td>
                    <td>${m.telefono ?? '-'}</td>
                    <td>$${m.salario?.toLocaleString('es-AR') ?? '-'}</td>
                    <td>${m.horaIngreso ?? '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-warning fw-semibold" onclick="editarMesero(${m.id})">Editar</button>
                        <button class="btn btn-sm btn-danger fw-semibold" onclick="eliminarMesero(${m.id})">Eliminar</button>
                    </td>
                </tr>`;
        });
    } catch {
        mostrarToast('Error al cargar meseros', true);
    }
}

async function guardarMesero() {
    if (!validar()) return;
    const id = document.getElementById('meseroId').value;
    const mesero = {
        nombre:      document.getElementById('nombre').value.trim(),
        apellido:    document.getElementById('apellido').value.trim(),
        cedula:      document.getElementById('cedula').value.trim(),
        telefono:    document.getElementById('telefono').value.trim(),
        salario:     parseFloat(document.getElementById('salario').value),
        horaIngreso: document.getElementById('horaIngreso').value
    };

    try {
        if (id) {
            await fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(mesero) });
            mostrarToast('Mesero actualizado correctamente');
        } else {
            await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(mesero) });
            mostrarToast('Mesero creado correctamente');
        }
        limpiarFormulario();
        cargarMeseros();
    } catch {
        mostrarToast('Error al guardar el mesero', true);
    }
}

async function editarMesero(id) {
    try {
        const res = await fetch(`${API}/${id}`);
        const m = await res.json();
        document.getElementById('meseroId').value    = m.id;
        document.getElementById('nombre').value      = m.nombre;
        document.getElementById('apellido').value    = m.apellido;
        document.getElementById('cedula').value      = m.cedula ?? '';
        document.getElementById('telefono').value    = m.telefono ?? '';
        document.getElementById('salario').value     = m.salario ?? '';
        document.getElementById('horaIngreso').value = m.horaIngreso ?? '';
        document.getElementById('formTitulo').textContent = '✏️ Editar mesero';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
        mostrarToast('Error al cargar el mesero', true);
    }
}

async function eliminarMesero(id) {
    if (!confirm('¿Seguro que querés eliminar este mesero?')) return;
    try {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
        mostrarToast('Mesero eliminado');
        cargarMeseros();
    } catch {
        mostrarToast('Error al eliminar', true);
    }
}

function limpiarFormulario() {
    document.getElementById('meseroId').value = '';
    ['nombre','apellido','cedula','telefono','salario','horaIngreso'].forEach(id => {
        document.getElementById(id).value = '';
    });
    limpiarErrores();
    document.getElementById('formTitulo').textContent = 'Nuevo mesero';
}
