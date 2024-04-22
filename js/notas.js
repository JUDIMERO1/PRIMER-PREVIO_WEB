
const logoutButton = document.getElementById('logout');
window.addEventListener('load', function () {
    var user = localStorage.getItem('user');

    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    var data = JSON.parse(user);
    document.getElementById('codigoes').textContent = data.codigo;
    document.getElementById('nombrees').textContent = data.nombre;

    var api = 'https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/students/' + data.codigo + '/notas';

    fetch(api)

        .then(response => response.json())
        .then(data => {
            if (data.notas && data.notas.length > 0) {
                var tbody = document.querySelector('tbody');

                data.notas.forEach(nota => {
                    var row = document.createElement('tr');
                    var asignaturaCell = document.createElement('td');
                    var creditosCell = document.createElement('td');
                    var n1Cell = document.createElement('td');
                    var n2Cell = document.createElement('td');
                    var n3Cell = document.createElement('td');
                    var exCell = document.createElement('td');
                    var defCell = document.createElement('td');

                    asignaturaCell.textContent = nota.asignatura;
                    creditosCell.textContent = nota.creditos;
                    n1Cell.textContent = nota.n1;
                    n2Cell.textContent = nota.n2;
                    n3Cell.textContent = nota.n3;
                    exCell.textContent = nota.ex;
                    defCell.textContent = ((parseFloat(nota.n1) + parseFloat(nota.n2) + parseFloat(nota.n3) + parseFloat(nota.ex)) / 4).toFixed(2); // Calcula el promedio

                    row.appendChild(asignaturaCell);
                    row.appendChild(creditosCell);
                    row.appendChild(n1Cell);
                    row.appendChild(n2Cell);
                    row.appendChild(n3Cell);
                    row.appendChild(exCell);
                    row.appendChild(defCell);
                    tbody.appendChild(row);
                });
            } else {
                console.log('No hay notas disponibles para mostrar.');
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos de la API:', error);
        });
});

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});




