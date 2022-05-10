$(document).ready(function () { //click
    GetAll();
    /*EstadoGetAll();*/ 
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
                    /*'<td>' + '<a href="#" onclick="GetById(' + empleado.IdEmpleado + ')">' + '<span class="glyphicon glyphicon-edit"></span>' + '</a>' + '</td>'*/
                    '<td>' + '<button class="btn btn-primary" onclick="GetById(' + empleado.IdEmpleado + ')">' + '<span class="glyphicon glyphicon-edit"></span>' + '</button>' + '</td>'
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
    $("dllEstado").empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:2483/api/Estado',
        success: function (result) {
            $("#ddlEstado").append('<option value="' + 0 + '">' + 'Seleccione una opción' + '</option>');
            $.each(result.Objects, function (i, estado) {
                $("#ddlEstado").append('<option value="'
                    + estado.IdEstado + '">'
                    + estado.Nombre + '</option>');
            });
        }
    });
}

function Add() {

    var empleado = {
        IdEmpleado: 0,
        NumeroNomina: $('#txtNumeroNominaAdd').val(),
        Nombre: $('#txtNombreAdd').val(),
        ApellidoPaterno: $('#txtApellidoPaternoAdd').val(),
        ApellidoMaterno: $('#txtApellidoMaternoAdd').val(),
        Estado: {
            IdEstado: $('#ddlEstado').val()
        }
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:2483/api/Empleado',
        dataType: 'json',
        data: empleado,
        success: function (result) {
            $('#myModal').modal();
            var ocultar = $('#ModalAdd').modal('hide');
            GetAll();
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
            $('#txtIdEmpleadoUpdate').val(result.Object.IdEmpleado);
            $('#txtNumeroNominaUpdate').val(result.Object.NumeroNomina);
            $('#txtNombreUpdate').val(result.Object.Nombre);
            $('#txtApellidoPaternoUpdate').val(result.Object.ApellidoPaterno);
            $('#txtApellidoMaternoUpdate').val(result.Object.ApellidoMaterno);
            $('#ddlEstadoUpdate').val(result.Object.Estado.IdEstado);
            $('#ModalUpdate').modal('show');
        }
        //error: function (result) {
        //    alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        //}
    });

}


function Update() {

    var empleado = {
        IdSubCategoria: $('#txtIdEmpleadoUpdate').val(),
        IdSubCategoria: $('#txtNumeroNominaUpdate').val(),
        IdSubCategoria: $('#txtNombreUpdate').val(),
        Nombre: $('#txtApellidoPaternoUpdate').val(),
        Descripcion: $('#txtApellidoMaternoUpdate').val(),
        Estado: {
            IdEstado: $('#ddlEstadoUpdate').val()
        }
    }

    $.ajax({
        type: 'POST',
        url: 'http://localhost:14982/api/Empleado',
        datatype: 'json',
        data: empleado,
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

function Modal() {  
    var mostrar = $('#ModalAdd').modal('show');
    EstadoGetAll();
}

function Eliminar(IdEmpleado) {

    if (confirm("¿Estas seguro de eliminar el empleado seleccionado?")) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:2483/api/Empleado/Delete/' + IdEmpleado,
            success: function (result) {
                $('#myModal').modal();
                GetAll();
            }
            //error: function (result) {
            //    alert('Error en la consulta ' + result.responseJSON.ErroMessage);
            //}
        });

    };
};