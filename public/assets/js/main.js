document.getElementById('hamburger').addEventListener('click', function () {
    this.classList.toggle('active');
    document.getElementById('nav-links').classList.toggle('active');
});

// Código para cargar y mostrar los testimonios aleatoriamente
const testimoniosUrl = './assets/data/testimonios.json';

fetch(testimoniosUrl)
    .then(response => response.json())
    .then(data => {
        const testimoniosAleatorios = data.sort(() => Math.random() - 0.5);
        const contenedor = document.getElementById('testimonials-container');

        testimoniosAleatorios.forEach(testimonio => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <h3>${testimonio.nombre}</h3>
                <p>${testimonio.texto}</p>
            `;

            contenedor.appendChild(card);
        });
    })
    .catch(error => console.error('Error al cargar los testimonios:', error));


// Código para cargar y mostrar 6 testimonios aleatoriamente
fetch(testimoniosUrl)
    .then(response => response.json())
    .then(data => {
        const testimoniosAleatorios = data.sort(() => Math.random() - 0.5).slice(0, 6); // Obtener solo 6 testimonios
        const contenedorLimitado = document.getElementById('limited-testimonials-container');

        testimoniosAleatorios.forEach(testimonio => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <h3>${testimonio.nombre}</h3>
                <p>${testimonio.texto}</p>
            `;

            contenedorLimitado.appendChild(card);
        });
    })
    .catch(error => console.error('Error al cargar los 6 testimonios:', error));
