$(document).ready(function () {
    console.log("ready!");

    $.validator.addMethod("customemail",
        function (value, element) {
            return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        },
        "Ingresá una dirección de email"
    );

    $("#mainform").validate({
        rules: {
            "nombre": {
                required: true
            },
            "email": {
                required: {
                    depends: function () {
                        $(this).val($.trim($(this).val()));
                        return true;
                    }
                },
                customemail: true
            },
            "sexo": {
                required: true
            },
            "comentarios": {
                required: true
            }
        },
        messages: {
            "nombre": "Ingresa tu nombre",
            "email": "Ingresa un mail valido",
            "sexo": "Ingresa un valor",
            "comentarios": "Ingresa tu mensaje"

        },
        submitHandler: function (form) {
            console.log("se envio el form");
            //$(form).submit();

            $.ajax({
                url: form.action,
                type: form.method,
                data: $(form).serialize(),
                beforeSend: function () {
                    $('#respuesta_form').html('Espere...');
                },
                success: function (response) {
                    console.log(response)
                    $('#respuesta_form').html('Gracias ' + response.nombre + ' por tu mensaje');
                }
            })
        }
    });

    const loadLeads = () => {
        $.ajax({
            url: 'https://prog-3-leads-api-rest.vercel.app/leads',
            type: 'GET',
            success: function (response) {
                console.log("get success"),
                
                response.forEach(element =>{
                    $('#listado').append('<ul>' + ' <li>' + element.nombre + ' - </li>' + '<li>' + element.sexo + ' - </li>' +'<li>' + element.comentarios + '</li> ' + '</ul>')
                });
                console.log(response)
            }
        })
    }
    loadLeads();
});