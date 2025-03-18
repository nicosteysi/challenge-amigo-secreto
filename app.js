// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
const listaAmigos = [];
const inputAmigo = document.getElementById("amigo");
const listaAmigosElement = document.getElementById("listaAmigos");
const resultadoElement = document.getElementById("resultado");

function agregarAmigo() {
    const nombre = inputAmigo.value.trim();
    
    if (nombre === "") {
        alert("Por favor, ingresa un nombre.");
        return;
    }

    if (listaAmigos.includes(nombre)) {
        alert("Este nombre ya fue agregado.");
        inputAmigo.value = "";
        return;
    }

    listaAmigos.push(nombre);
    actualizarLista();
    inputAmigo.value = "";
}

function actualizarLista() {
    listaAmigosElement.innerHTML = "";
    listaAmigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;

        // Botón para eliminar nombres de la lista
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.style.marginLeft = "10px";
        btnEliminar.onclick = () => eliminarAmigo(index);

        li.appendChild(btnEliminar);
        listaAmigosElement.appendChild(li);
    });
}

function eliminarAmigo(index) {
    listaAmigos.splice(index, 1);
    actualizarLista();
}

function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("Debe haber al menos dos participantes para el sorteo.");
        return;
    }

    const amigosDisponibles = [...listaAmigos];
    const resultado = [];

    while (amigosDisponibles.length > 0) {
        const indice1 = Math.floor(Math.random() * amigosDisponibles.length);
        const amigo1 = amigosDisponibles.splice(indice1, 1)[0];

        if (amigosDisponibles.length === 0) {
            // Si el último en la lista se asigna a sí mismo, rehacemos el sorteo
            if (resultado.length > 0 && resultado[0].regalaA === amigo1) {
                return sortearAmigo();
            }
        }

        const indice2 = Math.floor(Math.random() * amigosDisponibles.length);
        const amigo2 = amigosDisponibles.splice(indice2, 1)[0];

        resultado.push({ nombre: amigo1, regalaA: amigo2 });
    }

    mostrarResultados(resultado);
}

function mostrarResultados(resultado) {
    resultadoElement.innerHTML = "";
    resultado.forEach(({ nombre, regalaA }) => {
        const li = document.createElement("li");
        li.textContent = `${nombre} regala a ${regalaA}`;
        resultadoElement.appendChild(li);
    });
}

// Permitir agregar con tecla Enter
inputAmigo.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        agregarAmigo();
    }
});
