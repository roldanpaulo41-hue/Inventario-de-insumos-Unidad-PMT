// =====================================================
// SISTEMA DE INVENTARIO DE INSUMOS
// =====================================================


// =====================================================
// BASE DE DATOS LOCAL
// =====================================================

const CLAVE_DATOS = "inventario-insumos-v1";

let inventario =
    JSON.parse(localStorage.getItem(CLAVE_DATOS)) || {

        insumos: [

            {
                id: 1,
                codigo: "INS-001",
                nombre: "Asistin Galon",
                categoria: "Limpieza",
                unidad: "Galon",
                stock: 8,
                
            },

            {
                id: 2,
                codigo: "INS-002",
                nombre: "Cloro Galon",
                categoria: "Limpieza",
                unidad: "Galon",
                stock: 15,
                
            },

            {
                id: 3,
                codigo: "INS-003",
                nombre: "Litros de Asistin",
                categoria: "Limpieza",
                unidad: "Litros",
                stock: 30,
    
            },

            {
                id: 4,
                codigo: "INS-004",
                nombre: "Toallas Limpiadoras",
                categoria: "Limpieza",
                unidad: "unidad",
                stock: 25,
            },

            {
                id: 5,
                codigo: "INS-005",
                nombre: "Pashtes",
                categoria: "Limpieza",
                unidad: "unidad",
                stock: 8,  
            },

            {
                id: 6,
                codigo: "INS-006",
                nombre: "Escobas",
                categoria: "Limpieza",
                unidad: "unidad",
                stock: 8,  
            },

            {
                id: 7,
                codigo: "INS-007",
                nombre: "Bolsa de Jabon en Polvo (Grande)",
                categoria: "Limpieza",
                unidad: "unidad",
                stock: 8,  
            },

            {
                id: 8,
                codigo: "INS-008",
                nombre: "Bolsa de Jabon en Polvo (Mediana)",
                categoria: "Limpieza",
                unidad: "unidad",
                stock: 5,  
            },

            {
                id: 9,
                codigo: "INS-009",
                nombre: "Bolsa de Jabon en Polvo (Pequeña)",
                categoria: "Limpieza",
                unidad: "unidad",
                stock: 4,  
            },

            {
                id: 10,
                codigo: "INS-010",
                nombre: "Bolsas de basura (Grande) ",
                categoria: "Limpieza",
                unidad: "Paquete de 50",
                stock: 4,
            },

            {
                id: 11,
                codigo: "INS-011",
                nombre: "Jabon Lavaplatos",
                categoria: "Limpieza",
                unidad: "Unidad",
                stock: 10,
            },

            {
                id: 12,
                codigo: "INS-012",
                nombre: "Ambientales (Grandes)",
                categoria: "Limpieza",
                unidad: "Unidad",
                stock: 8,
            },

            {
                id: 13,
                codigo: "INS-013",
                nombre: "Ambientales (Pequeños)",
                categoria: "Limpieza",
                unidad: "Unidad",
                stock: 4,
            },

            {
                id: 14,
                codigo: "INS-014",
                nombre: "Trapeadores",
                categoria: "Limpieza",
                unidad: "Unidad",
                stock: 8,
            },

        ],

        entradas: [],

        salidas: []

    };



// =====================================================
// GUARDAR DATOS
// =====================================================

function guardarDatos() {

    localStorage.setItem(
        CLAVE_DATOS,
        JSON.stringify(inventario)
    );

}



// =====================================================
// MOSTRAR SECCIONES
// =====================================================

function mostrarSeccion(nombre) {

    const secciones =
        document.querySelectorAll(".seccion");


    secciones.forEach(function(seccion) {

        seccion.classList.add("oculto");

    });


    document
        .getElementById(nombre)
        .classList.remove("oculto");


    const titulos = {

        inicio: "Dashboard",

        insumos: "Insumos",

        entradas: "Entradas",

        salidas: "Salidas",

        movimientos: "Movimientos"

    };


    document.getElementById(
        "tituloPagina"
    ).textContent = titulos[nombre];


    actualizarTodo();

}



// =====================================================
// ACTUALIZAR TODO
// =====================================================

function actualizarTodo() {

    mostrarDashboard();

    mostrarInsumos();

    mostrarEntradas();

    mostrarSalidas();

    mostrarMovimientos();

}



// =====================================================
// DASHBOARD
// =====================================================

function mostrarDashboard() {


    document.getElementById(
        "totalInsumos"
    ).textContent =
        inventario.insumos.length;


    let stockTotal = 0;


    inventario.insumos.forEach(function(insumo) {

        stockTotal += insumo.stock;

    });


    document.getElementById(
        "totalStock"
    ).textContent = stockTotal;


    let entradas = 0;


    inventario.entradas.forEach(function(entrada) {

        entradas += entrada.cantidad;

    });


    document.getElementById(
        "totalEntradas"
    ).textContent = entradas;


    let salidas = 0;


    inventario.salidas.forEach(function(salida) {

        salidas += salida.cantidad;

    });


    document.getElementById(
        "totalSalidas"
    ).textContent = salidas;



    // INSUMOS AGOTADOS

    const agotados =
        inventario.insumos.filter(function(insumo) {

            return insumo.stock <= 0;

        });


    const contenedor =
        document.getElementById(
            "listaStockBajo"
        );


    if (agotados.length === 0) {

        contenedor.innerHTML =
            "<p>✅ No hay insumos agotados.</p>";

        return;

    }


    let html = "<table>";

    html += `
        <tr>
            <th>Código</th>
            <th>Insumo</th>
            <th>Stock</th>
        </tr>
    `;


    agotados.forEach(function(insumo) {

        html += `

            <tr>

                <td>
                    ${insumo.codigo}
                </td>

                <td>
                    ${insumo.nombre}
                </td>

                <td>
                    ${insumo.stock}
                </td>

            </tr>

        `;

    });


    html += "</table>";


    contenedor.innerHTML = html;

}



// =====================================================
// MOSTRAR INSUMOS
// =====================================================

function mostrarInsumos() {


    const texto =
        document
            .getElementById("buscar")
            .value
            .toLowerCase();


    const tabla =
        document.getElementById(
            "tablaInsumos"
        );


    tabla.innerHTML = "";


    inventario.insumos

        .filter(function(insumo) {

            return (

                insumo.nombre
                    .toLowerCase()
                    .includes(texto)

                ||

                insumo.codigo
                    .toLowerCase()
                    .includes(texto)

                ||

                insumo.categoria
                    .toLowerCase()
                    .includes(texto)

            );

        })

        .forEach(function(insumo) {


            let estado = "";

            let clase = "";


            if (insumo.stock <= 0) {

                estado = "AGOTADO";

                clase = "agotado";

            }

            else {

                estado = "EN STOCK";

                clase = "normal";

            }


            tabla.innerHTML += `

                <tr>

                    <td>
                        ${insumo.codigo}
                    </td>

                    <td>
                        ${insumo.nombre}
                    </td>

                    <td>
                        ${insumo.categoria}
                    </td>

                    <td>
                        ${insumo.unidad}
                    </td>

                    <td>
                        <strong>
                            ${insumo.stock}
                        </strong>
                    </td>

                    <td>

                        <span
                            class="estado ${clase}"
                        >

                            ${estado}

                        </span>

                    </td>

                </tr>

            `;

        });

}



// =====================================================
// FORMULARIO NUEVO INSUMO
// =====================================================

function abrirFormularioInsumo() {


    document.getElementById(
        "tituloModal"
    ).textContent =
        "Nuevo insumo";


    document.getElementById(
        "formulario"
    ).innerHTML = `

        <div class="formulario-grupo">

            <label>
                Código
            </label>

            <input
                type="text"
                id="codigo"
                placeholder="INS-005"
                required
            >

        </div>

        <div class="formulario-grupo">

            <label>
                Nombre del insumo
            </label>

            <input
                type="text"
                id="nombre"
                placeholder="Ej. Papel bond"
                required
            >

        </div>


        <div class="formulario-grupo">

            <label>
                Categoría
            </label>

            <input
                type="text"
                id="categoria"
                placeholder="Papelería"
            >

        </div>


        <div class="formulario-grupo">

            <label>
                Unidad de medida
            </label>

            <select id="unidad">

                <option>Unidad</option>

                <option>Caja</option>

                <option>Resma</option>

                <option>Paquete</option>

                <option>Cartucho</option>

                <option>Galón</option>

                <option>Litro</option>

            </select>

        </div>


        <div class="formulario-grupo">

            <label>
                Stock inicial
            </label>

            <input
                type="number"
                id="stock"
                min="0"
                value="0"
            >

        </div>


        <div class="formulario-botones">

            <button
                type="button"
                class="btn-cancelar"
                onclick="cerrarModal()"
            >

                Cancelar

            </button>


            <button
                type="button"
                class="btn-principal"
                onclick="guardarInsumo()"
            >

                Guardar

            </button>

        </div>

    `;


    document
        .getElementById("modal")
        .classList.remove("oculto");

}



// =====================================================
// GUARDAR INSUMO
// =====================================================

function guardarInsumo() {


    const codigo =
        document.getElementById(
            "codigo"
        ).value.trim();


    const nombre =
        document.getElementById(
            "nombre"
        ).value.trim();


    const categoria =
        document.getElementById(
            "categoria"
        ).value.trim();


    const unidad =
        document.getElementById(
            "unidad"
        ).value;


    const stock =
        Number(
            document.getElementById(
                "stock"
            ).value
        );


    if (!codigo || !nombre) {

        alert(
            "Debes ingresar código y nombre."
        );

        return;

    }



    // Comprobar código repetido

    const existe =
        inventario.insumos.some(
            function(insumo) {

                return insumo.codigo
                    .toLowerCase()
                    === codigo.toLowerCase();

            }
        );


    if (existe) {

        alert(
            "Ese código ya existe."
        );

        return;

    }



    const nuevo = {

        id: Date.now(),

        codigo: codigo,

        nombre: nombre,

        categoria: categoria,

        unidad: unidad,

        stock: stock

    };


    inventario.insumos.push(nuevo);


    guardarDatos();


    cerrarModal();


    actualizarTodo();


    alert(
        "Insumo guardado correctamente."
    );

}



// =====================================================
// ENTRADA
// =====================================================

function abrirEntrada() {


    if (inventario.insumos.length === 0) {

        alert(
            "Primero debes registrar un insumo."
        );

        return;

    }


    document.getElementById(
        "tituloModal"
    ).textContent =
        "Registrar entrada";


    let opciones = "";


    inventario.insumos.forEach(
        function(insumo) {

            opciones += `

                <option value="${insumo.id}">

                    ${insumo.codigo}
                    -
                    ${insumo.nombre}

                </option>

            `;

        }
    );


    document.getElementById(
        "formulario"
    ).innerHTML = `

        <div class="formulario-grupo">

            <label>Fecha del reporte</label>

            <input
                type="date"
                id="fechaEntrada"
                value="${new Date().toISOString().slice(0, 10)}"
                required
            >

        </div>

        <div class="formulario-grupo">

            <label>Referencia del reporte</label>

            <input
                type="text"
                id="referenciaEntrada"
                placeholder="Factura, orden o documento"
            >

        </div>

        <div id="lineasEntrada" class="lineas-reporte">
            <div class="linea-reporte">
                <select class="insumo-entrada">${opciones}</select>
                <input class="cantidad-entrada" type="number" min="1" placeholder="Cantidad" required>
                <button type="button" class="btn-quitar" onclick="this.parentElement.remove()">✕</button>
            </div>
        </div>

        <button type="button" class="btn-secundario btn-agregar" onclick="agregarLineaEntrada()">+ Agregar producto</button>


        <div class="formulario-grupo">

            <label>
                Proveedor
            </label>

            <input
                type="text"
                id="proveedor"
            >

        </div>

        <div class="formulario-grupo">

            <label>Recibido por</label>

            <input
                type="text"
                id="recibidoPor"
                placeholder="Nombre del responsable"
            >

        </div>


        <div class="formulario-botones">

            <button
                type="button"
                class="btn-cancelar"
                onclick="cerrarModal()"
            >

                Cancelar

            </button>


            <button
                type="button"
                class="btn-principal"
                onclick="guardarEntrada()"
            >

                Registrar

            </button>

        </div>

    `;


    document
        .getElementById("modal")
        .classList.remove("oculto");

}



// =====================================================
// GUARDAR ENTRADA
// =====================================================

function guardarEntrada() {
    const fecha = document.getElementById("fechaEntrada").value;
    const referencia = document.getElementById("referenciaEntrada").value.trim();
    const proveedor = document.getElementById("proveedor").value;
    const recibidoPor = document.getElementById("recibidoPor").value.trim();
    const lineas = Array.from(document.querySelectorAll("#lineasEntrada .linea-reporte")).map(function(linea) {
        return {
            id: Number(linea.querySelector(".insumo-entrada").value),
            cantidad: Number(linea.querySelector(".cantidad-entrada").value)
        };
    });

    if (lineas.length === 0 || lineas.some(function(linea) {
        return linea.cantidad <= 0;
    })) {
        alert("Agrega al menos un producto con una cantidad válida.");
        return;
    }

    lineas.forEach(function(linea, indice) {
        const insumo = inventario.insumos.find(function(item) {
            return item.id === linea.id;
        });
        insumo.stock += linea.cantidad;
        inventario.entradas.push({
            id: Date.now() + indice,
            fecha: fecha,
            referencia: referencia,
            insumoId: linea.id,
            cantidad: linea.cantidad,
            proveedor: proveedor,
            recibidoPor: recibidoPor
        });
    });


    guardarDatos();


    cerrarModal();


    actualizarTodo();


    alert(
        "Entrada registrada correctamente."
    );

}


function agregarLineaEntrada() {

    const opciones = inventario.insumos.map(function(insumo) {
        return `<option value="${insumo.id}">${insumo.codigo} - ${insumo.nombre}</option>`;
    }).join("");

    document.getElementById("lineasEntrada").insertAdjacentHTML("beforeend", `
        <div class="linea-reporte">
            <select class="insumo-entrada">${opciones}</select>
            <input class="cantidad-entrada" type="number" min="1" placeholder="Cantidad" required>
            <button type="button" class="btn-quitar" onclick="this.parentElement.remove()">✕</button>
        </div>
    `);

}



// =====================================================
// SALIDA
// =====================================================

function abrirSalida() {


    if (inventario.insumos.length === 0) {

        alert(
            "Primero debes registrar un insumo."
        );

        return;

    }


    document.getElementById(
        "tituloModal"
    ).textContent =
        "Registrar salida";


    let opciones = "";


    inventario.insumos.forEach(
        function(insumo) {

            opciones += `

                <option value="${insumo.id}">

                    ${insumo.codigo}
                    -
                    ${insumo.nombre}

                    (Stock:
                    ${insumo.stock})

                </option>

            `;

        }
    );


    document.getElementById(
        "formulario"
    ).innerHTML = `

        <div class="formulario-grupo">

            <label>Fecha del reporte</label>

            <input
                type="date"
                id="fechaSalida"
                value="${new Date().toISOString().slice(0, 10)}"
                required
            >

        </div>

        <div class="formulario-grupo">

            <label>Referencia del reporte</label>

            <input
                type="text"
                id="referenciaSalida"
                placeholder="Vale, orden o documento"
            >

        </div>

        <div id="lineasSalida" class="lineas-reporte">
            <div class="linea-reporte">
                <select class="insumo-salida">${opciones}</select>
                <input class="cantidad-salida" type="number" min="1" placeholder="Cantidad" required>
                <button type="button" class="btn-quitar" onclick="this.parentElement.remove()">✕</button>
            </div>
        </div>

        <button type="button" class="btn-secundario btn-agregar" onclick="agregarLineaSalida()">+ Agregar producto</button>


        <div class="formulario-grupo">

            <label>
                Área / Departamento
            </label>

            <input
                type="text"
                id="area"
                placeholder="Administración"
            >

        </div>


        <div class="formulario-grupo">

            <label>
                Solicitado por
            </label>

            <input
                type="text"
                id="solicitado"
            >

        </div>

        <div class="formulario-grupo">

            <label>Entregado por</label>

            <input
                type="text"
                id="entregadoPor"
                placeholder="Nombre del responsable"
            >

        </div>


        <div class="formulario-botones">

            <button
                type="button"
                class="btn-cancelar"
                onclick="cerrarModal()"
            >

                Cancelar

            </button>


            <button
                type="button"
                class="btn-principal"
                onclick="guardarSalida()"
            >

                Registrar

            </button>

        </div>

    `;


    document
        .getElementById("modal")
        .classList.remove("oculto");

}



// =====================================================
// GUARDAR SALIDA
// =====================================================

function guardarSalida() {
    const fecha = document.getElementById("fechaSalida").value;
    const referencia = document.getElementById("referenciaSalida").value.trim();
    const area = document.getElementById("area").value;
    const solicitado = document.getElementById("solicitado").value;
    const entregadoPor = document.getElementById("entregadoPor").value.trim();
    const lineas = Array.from(document.querySelectorAll("#lineasSalida .linea-reporte")).map(function(linea) {
        return {
            id: Number(linea.querySelector(".insumo-salida").value),
            cantidad: Number(linea.querySelector(".cantidad-salida").value)
        };
    });

    if (lineas.length === 0 || lineas.some(function(linea) {
        return linea.cantidad <= 0;
    })) {
        alert("Agrega al menos un producto con una cantidad válida.");
        return;
    }

    const insuficiente = lineas.find(function(linea) {
        const insumo = inventario.insumos.find(function(item) {
            return item.id === linea.id;
        });
        return linea.cantidad > insumo.stock;
    });

    if (insuficiente) {
        const insumo = inventario.insumos.find(function(item) {
            return item.id === insuficiente.id;
        });
        alert("No hay suficiente stock para " + insumo.nombre + ". Disponible: " + insumo.stock);
        return;
    }

    lineas.forEach(function(linea, indice) {
        const insumo = inventario.insumos.find(function(item) {
            return item.id === linea.id;
        });
        insumo.stock -= linea.cantidad;
        inventario.salidas.push({
            id: Date.now() + indice,
            fecha: fecha,
            referencia: referencia,
            insumoId: linea.id,
            cantidad: linea.cantidad,
            area: area,
            solicitado: solicitado,
            entregadoPor: entregadoPor
        });
    });


    guardarDatos();


    cerrarModal();


    actualizarTodo();


    alert(
        "Salida registrada correctamente."
    );

}


function agregarLineaSalida() {

    const opciones = inventario.insumos.map(function(insumo) {
        return `<option value="${insumo.id}">${insumo.codigo} - ${insumo.nombre} (Stock: ${insumo.stock})</option>`;
    }).join("");

    document.getElementById("lineasSalida").insertAdjacentHTML("beforeend", `
        <div class="linea-reporte">
            <select class="insumo-salida">${opciones}</select>
            <input class="cantidad-salida" type="number" min="1" placeholder="Cantidad" required>
            <button type="button" class="btn-quitar" onclick="this.parentElement.remove()">✕</button>
        </div>
    `);

}



// =====================================================
// MOSTRAR ENTRADAS
// =====================================================

function mostrarEntradas() {


    const tabla =
        document.getElementById(
            "tablaEntradas"
        );


    tabla.innerHTML = "";


    inventario.entradas
        .slice()
        .reverse()
        .forEach(function(entrada) {


            const insumo =
                inventario.insumos.find(
                    function(item) {

                        return item.id ===
                            entrada.insumoId;

                    }
                );


            tabla.innerHTML += `

                <tr>

                    <td>
                        ${entrada.fecha}
                    </td>

                    <td>
                        ${entrada.referencia || "-"}
                    </td>

                    <td>
                        ${insumo
                            ? insumo.nombre
                            : "Desconocido"}
                    </td>

                    <td>
                        +${entrada.cantidad}
                    </td>

                    <td>
                        ${entrada.proveedor}
                    </td>

                    <td>
                        ${entrada.recibidoPor || "-"}
                    </td>

                </tr>

            `;

        });

}



// =====================================================
// MOSTRAR SALIDAS
// =====================================================

function mostrarSalidas() {


    const tabla =
        document.getElementById(
            "tablaSalidas"
        );


    tabla.innerHTML = "";


    inventario.salidas
        .slice()
        .reverse()
        .forEach(function(salida) {


            const insumo =
                inventario.insumos.find(
                    function(item) {

                        return item.id ===
                            salida.insumoId;

                    }
                );


            tabla.innerHTML += `

                <tr>

                    <td>
                        ${salida.fecha}
                    </td>

                    <td>
                        ${salida.referencia || "-"}
                    </td>

                    <td>
                        ${insumo
                            ? insumo.nombre
                            : "Desconocido"}
                    </td>

                    <td>
                        -${salida.cantidad}
                    </td>

                    <td>
                        ${salida.area}
                    </td>

                    <td>
                        ${salida.solicitado}
                    </td>

                    <td>
                        ${salida.entregadoPor || "-"}
                    </td>

                </tr>

            `;

        });

}



// =====================================================
// HISTORIAL GENERAL
// =====================================================

function mostrarMovimientos() {


    const tabla =
        document.getElementById(
            "tablaMovimientos"
        );


    tabla.innerHTML = "";


    let movimientos = [];


    inventario.entradas.forEach(
        function(entrada) {

            movimientos.push({

                fecha: entrada.fecha,

                tipo: "📥 Entrada",

                insumoId: entrada.insumoId,

                cantidad:
                    "+" + entrada.cantidad,

                responsable:
                    entrada.recibidoPor || entrada.proveedor

            });

        }
    );


    inventario.salidas.forEach(
        function(salida) {

            movimientos.push({

                fecha: salida.fecha,

                tipo: "📤 Salida",

                insumoId: salida.insumoId,

                cantidad:
                    "-" + salida.cantidad,

                responsable:
                    salida.entregadoPor || salida.solicitado

            });

        }
    );


    movimientos.reverse();


    movimientos.forEach(
        function(movimiento) {


            const insumo =
                inventario.insumos.find(
                    function(item) {

                        return item.id ===
                            movimiento.insumoId;

                    }
                );


            tabla.innerHTML += `

                <tr>

                    <td>
                        ${movimiento.fecha}
                    </td>

                    <td>
                        ${movimiento.tipo}
                    </td>

                    <td>
                        ${insumo
                            ? insumo.nombre
                            : "Desconocido"}
                    </td>

                    <td>
                        ${movimiento.cantidad}
                    </td>

                    <td>
                        ${movimiento.responsable}
                    </td>

                </tr>

            `;

        });

}



// =====================================================
// EXPORTACIONES
// =====================================================

function nombreInsumo(id) {

    const insumo = inventario.insumos.find(function(item) {

        return item.id === id;

    });

    return insumo ? insumo.nombre : "Desconocido";

}


function exportarPDF(seccion) {

    if (!window.jspdf || !window.jspdf.jsPDF) {

        alert("No se pudo cargar el generador de PDF. Revisa tu conexión a Internet.");

        return;

    }

    const doc = new window.jspdf.jsPDF({ orientation: "landscape" });
    const titulos = {
        inicio: "Resumen del inventario",
        insumos: "Reporte de insumos",
        entradas: "Reporte de entradas",
        salidas: "Reporte de salidas",
        movimientos: "Reporte de movimientos"
    };

    doc.setFontSize(16);
    doc.text(titulos[seccion], 14, 16);
    doc.setFontSize(10);
    doc.text(new Date().toLocaleDateString("es-GT"), 14, 23);

    let columnas = [];
    let filas = [];

    if (seccion === "inicio") {
        columnas = ["Indicador", "Valor"];
        filas = [
            ["Total de insumos", inventario.insumos.length],
            ["Unidades disponibles", inventario.insumos.reduce(function(total, item) {
                return total + item.stock;
            }, 0)],
            ["Total de entradas", inventario.entradas.reduce(function(total, item) {
                return total + item.cantidad;
            }, 0)],
            ["Total de salidas", inventario.salidas.reduce(function(total, item) {
                return total + item.cantidad;
            }, 0)]
        ];
    }

    if (seccion === "insumos") {
        columnas = ["Código", "Insumo", "Categoría", "Unidad", "Stock", "Estado"];
        filas = inventario.insumos.map(function(item) {
            return [item.codigo, item.nombre, item.categoria, item.unidad, item.stock,
                item.stock > 0 ? "EN STOCK" : "AGOTADO"];
        });
    }

    if (seccion === "entradas") {
        columnas = ["Fecha", "Referencia", "Insumo", "Cantidad", "Proveedor", "Recibido por"];
        filas = inventario.entradas.map(function(item) {
            return [item.fecha, item.referencia || "-", nombreInsumo(item.insumoId), item.cantidad,
            item.proveedor || "-", item.recibidoPor || "-"];
        });
    }

    if (seccion === "salidas") {
        columnas = ["Fecha", "Referencia", "Insumo", "Cantidad", "Área", "Solicitado por", "Entregado por"];
        filas = inventario.salidas.map(function(item) {
            return [item.fecha, item.referencia || "-", nombreInsumo(item.insumoId), item.cantidad,
            item.area || "-", item.solicitado || "-", item.entregadoPor || "-"];
        });
    }

    if (seccion === "movimientos") {
        columnas = ["Fecha", "Tipo", "Insumo", "Cantidad", "Responsable"];
        filas = inventario.entradas.map(function(item) {
            return [item.fecha, "Entrada", nombreInsumo(item.insumoId), "+" + item.cantidad,
                item.recibidoPor || item.proveedor || "-"];
        }).concat(inventario.salidas.map(function(item) {
            return [item.fecha, "Salida", nombreInsumo(item.insumoId), "-" + item.cantidad,
                item.entregadoPor || item.solicitado || "-"];
        }));
    }

    doc.autoTable({
        head: [columnas],
        body: filas,
        startY: 30,
        styles: { fontSize: 8 }
    });

    doc.save(seccion + "-inventario.pdf");

}


function exportarExcel() {

    if (!window.XLSX) {

        alert("No se pudo cargar el generador de Excel. Revisa tu conexión a Internet.");

        return;

    }

    const filas = inventario.insumos.map(function(item) {
        return {
            Codigo: item.codigo,
            Insumo: item.nombre,
            Categoria: item.categoria,
            Unidad: item.unidad,
            Stock: item.stock,
            Estado: item.stock > 0 ? "EN STOCK" : "AGOTADO"
        };
    });

    const hoja = window.XLSX.utils.json_to_sheet(filas);
    const libro = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(libro, hoja, "Insumos");
    window.XLSX.writeFile(libro, "insumos-inventario.xlsx");

}



// =====================================================
// CERRAR MODAL
// =====================================================

function cerrarModal() {

    document
        .getElementById("modal")
        .classList.add("oculto");

}



// =====================================================
// FECHA
// =====================================================

document.getElementById(
    "fecha"
).textContent = new Date()
    .toLocaleDateString(
        "es-GT",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );



// =====================================================
// INICIAR SISTEMA
// =====================================================

actualizarTodo();