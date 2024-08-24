document.getElementById('hamburger').addEventListener('click', function () {
    this.classList.toggle('active');
    document.getElementById('nav-links').classList.toggle('active');
    
    // Agrega o quita la clase al main cuando el menú está activo
    const main = document.querySelector('main');
    main.classList.toggle('menu-open');
});

// // Código para cargar y mostrar los testimonios aleatoriamente
// const testimoniosUrl = './assets/data/testimonios.json';

// fetch(testimoniosUrl)
//     .then(response => response.json())
//     .then(data => {
//         const testimoniosAleatorios = data.sort(() => Math.random() - 0.5);
//         const contenedor = document.getElementById('testimonials-container');

//         testimoniosAleatorios.forEach(testimonio => {
//             const card = document.createElement('div');
//             card.classList.add('card');

//             card.innerHTML = `
//                 <h3>${testimonio.nombre}</h3>
//                 <p>${testimonio.texto}</p>
//             `;

//             contenedor.appendChild(card);
//         });
//     })
//     .catch(error => console.error('Error al cargar los testimonios:', error));


// // Código para cargar y mostrar 6 testimonios aleatoriamente
// fetch(testimoniosUrl)
//     .then(response => response.json())
//     .then(data => {
//         const testimoniosAleatorios = data.sort(() => Math.random() - 0.5).slice(0, 6); // Obtener solo 6 testimonios
//         const contenedorLimitado = document.getElementById('limited-testimonials-container');

//         testimoniosAleatorios.forEach(testimonio => {
//             const card = document.createElement('div');
//             card.classList.add('card');

//             card.innerHTML = `
//                 <h3>${testimonio.nombre}</h3>
//                 <p>${testimonio.texto}</p>
//             `;

//             contenedorLimitado.appendChild(card);
//         });
//     })
//     .catch(error => console.error('Error al cargar los 6 testimonios:', error));

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('testimonials-container');
    const testimoniosUrl = './assets/data/testimonios.json';
    let testimonios = [];
    let currentIndex = 0;
    const testimoniosPorCarga = 1; // Cargar uno por uno

    // Cargar el JSON
    fetch(testimoniosUrl)
        .then(response => response.json())
        .then(data => {
            testimonios = data.sort(() => Math.random() - 0.5); // Mezcla los testimonios aleatoriamente
            cargarMasTestimonios(); // Cargar el primer testimonio
        })
        .catch(error => console.error('Error al cargar los testimonios:', error));

    function crearTestimonioCard(testimonio, index) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.setProperty('--delay', `${index * 5}s`); // Retraso progresivo de 5 segundos por tarjeta
        card.innerHTML = `
            <h3>${testimonio.nombre}</h3>
            <p>${testimonio.texto}</p>
        `;
        return card;
    }

    function cargarMasTestimonios() {
        for (let i = 0; i < testimoniosPorCarga && currentIndex < testimonios.length; i++) {
            const testimonio = testimonios[currentIndex];
            container.appendChild(crearTestimonioCard(testimonio, i)); // Pasamos el índice para el retraso
            currentIndex++;
        }
    }

    // Evento para detectar el scroll y cargar más testimonios uno por uno
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            cargarMasTestimonios();
        }
    });
});
