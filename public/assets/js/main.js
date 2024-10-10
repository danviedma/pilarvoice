document.getElementById('hamburger').addEventListener('click', function () {
    this.classList.toggle('active');
    document.getElementById('nav-links').classList.toggle('active');
    
    // Agrega o quita la clase al main cuando el menú está activo
    const main = document.querySelector('main');
    main.classList.toggle('menu-open');
});

/*
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
*/

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

    function crearTestimonioCard(testimonio) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${testimonio.nombre}</h3>
            <p>${testimonio.texto}</p>
        `;
        return card;
    }

    function cargarMasTestimonios() {
        if (currentIndex < testimonios.length) {
            const testimonio = testimonios[currentIndex];
            const card = crearTestimonioCard(testimonio);
    
            // Si es el primer testimonio, añade el ID para el ancla
            if (currentIndex === 0) {
                card.setAttribute('id', 'test-container');
            }
    
            container.appendChild(card);
            observer.observe(card); // Observar la nueva card
            currentIndex++;
    
            // Desplazarse al primer testimonio si el hash está presente en la URL
            if (currentIndex === 1 && window.location.hash === '#test-container') {
                card.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
    

    // Configurar IntersectionObserver para cargar más testimonios cuando se acerque al final
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target); // Dejar de observar el elemento actual
                cargarMasTestimonios(); // Cargar el siguiente testimonio
            }
        });
    });

    // Observar el último testimonio cargado
    const observeLastTestimonial = () => {
        const lastTestimonial = container.lastElementChild;
        if (lastTestimonial) {
            observer.observe(lastTestimonial);
        }
    };

    // Inicialmente observa el primer testimonio
    observeLastTestimonial();

    // Escuchar cuando se agregue un nuevo testimonio y observarlo
    const mutationObserver = new MutationObserver(() => {
        observeLastTestimonial();
    });

    mutationObserver.observe(container, { childList: true });
});


