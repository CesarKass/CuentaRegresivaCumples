var fechasCumpleaños = [
    {
        name: "Cesar",
        date: "1998-09-17"
    },
    {
        name: "Ejemplo 1",
        date: "1998-01-23"
    }
];


//ordenar fechas cronologicamente 
fechasCumpleaños.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
//llamar a la funcion 
cuentaRegresiva();


function cuentaRegresiva() {
    var concat = '';
    const year = new Date();
    var div = document.getElementById('data');
    var count1 = 0, aux = 0, minimo = 0;

    var x = setInterval(function () {
        div.innerHTML = '';
        concat = '';
        //recorrer el ARRAY
        for (persona of fechasCumpleaños) {

            var fechaSeparada = persona.date.split('-');
            var countDownDate = new Date(year.getFullYear(), (fechaSeparada[1] - 1), fechaSeparada[2], '00', '00', '00').getTime();

            var now = new Date().getTime();
            var distance = countDownDate - now;

            if (distance < 0) {
                //si la fecha del cumple, ya paso se le suma un año mas para calcular cuando será la siguiente
                countDownDate = new Date((year.getFullYear() + 1), (fechaSeparada[1] - 1), fechaSeparada[2], '00', '00', '00').getTime();
                distance = countDownDate - now;
            } else {
                //Aqui se iteran las personas que cumplen despues de la fecha actual
                //para que solo entre una vez al if
                if (count1 == 0) {
                    //vemos la siguiente persona que cumple años con su fecha
                    aux = countDownDate;
                    count1 = 1;
                }
            }

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            (days < 100) ? days = '&nbsp;&nbsp;'+days : days;
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            //Si mas de 1 persona cumple el mismo día se imprimen las veces que sean necesarias
            var pastel = '', proximo = '';
            if (aux == countDownDate) {
                pastel = `🍰&nbsp;&nbsp;`;
                proximo = `id="prox"`; 
                //minimo debe entrar 1 vez si no...
                minimo = 1;
            }

            concat += `<tr ${proximo}>
                        <th>${pastel}</th>
                        <th>${persona.name} &nbsp;&nbsp;&nbsp;&nbsp; </th>
                        <th>${days} d - ${hours} - h ${minutes} m - ${seconds} s </th>
                       </tr>`;
        }

        div.innerHTML = concat;

        //recakcular fechas del sigueinte cumple, esto en caso de que una cuenta llegue a cero
        if (minimo == 0) {
            count1 = 0;
        }
        minimo = 0;

    }, 1000);

}

 