// admin.js — Star Park

let reservas = JSON.parse(localStorage.getItem('reservas')) || []
let cuerpo   = document.getElementById('cuerpoTabla')
let alertContainer = document.getElementById('alertContainer')

function mostrarReservas() {
    cuerpo.innerHTML = ''

    if (reservas.length === 0) {
        cuerpo.innerHTML = '<tr><td colspan="8" style="text-align:center; color:var(--gris); padding:20px;">No hay reservas aún.</td></tr>'
        mostrarAlerta('No hay reservas aún.', 'info')
        return
    }

    reservas.forEach((reserva, indice) => {
        cuerpo.innerHTML += '<tr>'
            + '<td>' + (indice + 1) + '</td>'
            + '<td>' + reserva.nombre + '</td>'
            + '<td>' + reserva.correo + '</td>'
            + '<td>' + reserva.telefono + '</td>'
            + '<td>' + reserva.fecha + '</td>'
            + '<td class="amarillo">' + reserva.total + '</td>'
            + '<td>' + reserva.fechaRegistro + '</td>'
            + '<td><button class="botonEliminar" onclick="eliminar(' + indice + ')">✕ Quitar</button></td>'
            + '</tr>'
    })
}

function eliminar(indice) {
    reservas.splice(indice, 1)
    localStorage.setItem('reservas', JSON.stringify(reservas))
    mostrarReservas()
    mostrarAlerta('Reserva eliminada correctamente.', 'success')
}

function mostrarAlerta(mensaje, tipo = 'info') {
    if (!alertContainer) return
    // Limpiar alertas previas
    alertContainer.innerHTML = ''
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `\n        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">\n            ${mensaje}\n            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\n        </div>\n    `
    alertContainer.appendChild(wrapper)
    // Auto-dismiss después de 3.5s
    setTimeout(() => {
        const alertNode = wrapper.querySelector('.alert')
        if (alertNode) alertNode.classList.remove('show')
        // dejar tiempo para la animación
        setTimeout(() => alertContainer.innerHTML = '', 150)
    }, 3500)
}

mostrarReservas()