// miscompras.js — Star Park
let compras = JSON.parse(localStorage.getItem('compras')) || []
let contenedor = document.getElementById('listaCompras')

function mostrarCompras() {
    contenedor.innerHTML = ''

    if (compras.length === 0) {
        contenedor.innerHTML = '<p>No has realizado ninguna compra todavía</p>'
        return
    }

    compras.forEach(function(compra, indice) {
        let detalleItems = ''
        compra.items.forEach(function(item) {
            detalleItems += '<li>' + item.nombre + ' — S/ ' + item.precio + '.00</li>'
        })

        contenedor.innerHTML +=
            '<div class="glass tarjetaInfo" style="margin-bottom:28px;">' +
                '<div class="infoFila">' +
                    '<p class="em">👽</p>' +
                    '<div>' +
                        '<h3 class="celeste">Compra ' + ((indice + 1) < 10 ? '0' + (indice + 1) : (indice + 1)) + '</h3>' +
                        '<p>' + compra.tipo + ' — Serie ' + compra.serie + '-' + compra.correlativo + '</p>' +
                    '</div>' +
                '</div>' +
                '<div class="infoFila">' +
                    '<p class="em">🧑‍🚀</p>' +
                    '<div>' +
                        '<h3>' + compra.emisor + '</h3>' +
                        '<p>RUC: ' + compra.ruc + '</p>' +
                    '</div>' +
                '</div>' +
                '<div class="infoFila">' +
                    '<div>' +
                        '<h3>Fecha de emisión</h3>' +
                        '<p>' + compra.fecha + '</p>' +
                    '</div>' +
                '</div>' +
                '<div class="infoFila">' +
                    '<div>' +
                        '<h3>Servicios adquiridos</h3>' +
                        '<ul>' + detalleItems + '</ul>' +
                    '</div>' +
                '</div>' +
                '<div class="infoFila" style="justify-content:space-between; align-items:center; border-top:1px solid var(--borde); padding-top:16px;">' +
                    '<h3 class="celeste">TOTAL</h3>' +
                    '<p class="amarillo" style="font-size:20px; font-weight:700;">' + compra.total + '</p>' +
                '</div>' +
                '<div class="infoFila">' +
                    '<div>' +
                        '<h3>Pagado con</h3>' +
                        '<p>' + compra.billetera + '</p>' +
                        '<p>Moneda: ' + compra.moneda + '</p>' +
                    '</div>' +
                '</div>' +
                '<p>¡Gracias por tu preferencia! 🚀</p>' +
            '</div>'
    })
}

mostrarCompras()