$(document).ready(function () { //click
    GetAll();
    EstadoGetAll();
});

function GetAll() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:2483/api/Empleado',
        success: function (result) { //200 Ok
            $('#tblEmpleado tbody').empty();
            $.each(result.Objects, function (i, empleado) {
                var filas =
                    '<tr class="text-center">' +
                    '<td>' + '<a href="#" onclick="GetById(' + empleado.IdEmpleado + ')">' + '<span class="glyphicon glyphicon-edit"></span>' + '</a>' + '</td>'
                    + '<td>' + empleado.IdEmpleado + '</td>'
                    + '<td>' + empleado.NumeroNomina + '</td>'
                    + '<td>' + empleado.Nombre + " " + empleado.ApellidoPaterno + " " + empleado.ApellidoMaterno + '</td>'
                    + '<td>' + empleado.Estado.Nombre + '</td>'
                    + '<td> <button class="btn btn-danger" onclick="Eliminar(' + empleado.IdEmpleado + ')"><span class="glyphicon glyphicon-trash"></span></button> </td>'
                    + '</tr>';
                $('#tblEmpleado tbody').append(filas);
            });
        },
        error: function (result) {
            alert('Error en la consulta ' + result.responseJSON.ErroMessage);
        }
    });
};



function EstadoGetAll() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:2483/api/Estado',
        success: function (result) {
            $("#ddlEstados").append('<option value="' + 0 + '">' + 'Seleccione una opción' + '</option>');
            $.each(result.Objects, function (i, estado) {
                $("#ddlEstados").append('<option value="'
                    + estado.IdEstado + '">'
                    + estado.Nombre + '</option>');
            });
        }
    });
}


function Add() {

    var empleado = {
        IdEmpleado: 0,
        NumeroNomina: $('#txtNumeroNomina').val(),
        Nombre: $('#txtNombre').val(),
        ApellidoPaterno: $('#txtApellidoPaterno').val(),
        ApellidoMaterno: $('#txtApellidoMaterno').val(),
        Estado: {
            IdEstado: $('#ddlEstados').val()
        }
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:2483/api/Empleado',
        dataType: 'json',
        data: empleado,
        success: function (result) {
            $('#myModal').modal();
        },
        error: function (result) {
            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        }
    });
};


function GetById(IdEmpleado) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:14982/api/Empleado/' + IdEmpleado,
        success: function (result) {
            $('#txtIdEmpleado').val(result.Object.IdEmpleado);
            $('#txtNumeroNomina').val(result.Object.NumeroNomina);
            $('#txtNombre').val(result.Object.Nombre);
            $('#txtApellidoPaterno').val(result.Object.ApellidoPaterno);
            $('#txtApellidoMaterno').val(result.Object.ApellidoMaterno);
            $('#ddlEstados').val(result.Object.Estado.IdEstado);
            $('#ModalUpdate').modal('show');
        },
        error: function (result) {
            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        }


    });

}


function Update() {

    var subcategoria = {
        IdSubCategoria: $('#txtIdSubCategoria').val(),
        Nombre: $('#txtNombre').val(),
        Descripcion: $('#txtDescripcion').val(),
        IdCategoria: {
            IdCategoria: $('#txtIdCategoria').val()
        }
    }

    $.ajax({
        type: 'POST',
        url: 'http://localhost:14982/api/SubCategoria/Update',
        datatype: 'json',
        data: subcategoria,
        success: function (result) {
            $('#myModal').modal();
            $('#ModalUpdate').modal('hide');
            GetAll();
            Console(respond);
        },
        error: function (result) {
            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        }
    });

};



function Eliminar(IdEmpleado) {

    if (confirm("¿Estas seguro de eliminar el empleado seleccionado?")) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:2483/api/Empleado/' + IdEmpleado,
            success: function (result) {
                $('#myModal').modal();
                GetAll();
            },
            error: function (result) {
                alert('Error en la consulta ' + result.responseJSON.ErroMessage);
            }
        });

    };
};