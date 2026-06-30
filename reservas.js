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
            + '<td>'+ (reserva.pagado? '<span class="amarillo">✅ Pagado</span>': '<button class="botonEliminar" style="border-color:var(--celeste); color:var(--celeste);" onclick="pagar(' + indice + ')">💳 Pagar</button>') + ' <button class="botonEliminar" onclick="eliminar(' + indice + ')">✕ Quitar</button>' + '</td>'
            + '</tr>'
    })
}

let reservaSeleccionada  = null
let billeteraSeleccionada = null

function pagar(indice) {
    reservaSeleccionada = indice
    document.getElementById('seccionPago').style.display = 'block'
    document.getElementById('datosPago').style.display = 'none'
    document.getElementById('codigoVerificacion').value = ''
    document.getElementById('seccionPago').scrollIntoView({ behavior: 'smooth' })
}

function elegirBilletera(tipo) {
    billeteraSeleccionada = tipo
    document.getElementById('telefonoPago').textContent = reservas[reservaSeleccionada].telefono
    document.getElementById('datosPago').style.display = 'block'
}

document.getElementById('codigoVerificacion').addEventListener('input', (e) => {
    let valor = e.target.value

    if (/^\d{6}$/.test(valor)) {
        confirmarPago()
    }
})

function confirmarPago() {
    let reserva = reservas[reservaSeleccionada]
    let compras = JSON.parse(localStorage.getItem('compras')) || []

    let compra = {
        'emisor'     : 'FAMILY PARK S.A.C.',
        'ruc'        : '20555297018',
        'tipo'       : 'Boleta de Venta',
        'serie'      : '01',
        'correlativo': String(compras.length + 1).padStart(2, '0'),
        'fecha'      : new Date().toLocaleString('es-PE', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        }),
        'items'      : reserva.items,
        'total'      : reserva.total,
        'moneda'     : 'SOLES',
        'billetera'  : billeteraSeleccionada
    }

    compras.push(compra)
    localStorage.setItem('compras', JSON.stringify(compras))

    reserva.pagado = true
    localStorage.setItem('reservas', JSON.stringify(reservas))

    document.getElementById('seccionPago').style.display = 'none'
    mostrarReservas()
    mostrarAlerta('¡Pago confirmado con ' + billeteraSeleccionada + '! Revisa "Mis Compras" 🚀', 'success')
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