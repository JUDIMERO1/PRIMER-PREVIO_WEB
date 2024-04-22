
const formulario = document.getElementById('login');
formulario.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const codigoEstudiante = document.querySelector("#code").value;
    const claveEstudiante = document.querySelector("#password").value;

    if (codigoEstudiante === '' || claveEstudiante === '') {
        alert('Por favor, ingrese todas las credenciales.');
        return;
    }

    loginUsuario(codigoEstudiante, claveEstudiante);
});

function loginUsuario(codigoEstudiante, claveEstudiante) {
    const url = 'https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/login';
    const data = {
        codigo: codigoEstudiante,
        clave: claveEstudiante
    };
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(user => {
            if (user.login) {
                console.log('Login exitoso:', user.mensaje);
                localStorage.setItem('usuario', JSON.stringify(user));
                alert('Bienvenido ' + user.nombre);
                window.location.href = "notas.html";
            } else {
                alert(user.mensaje);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
}
