$(document).ready(function () { //click
    GetAll();
    EstadoGetAll(); 
});

function Limpiar() {
    //$("#dllEstado").get(0).selectedIndex = 1;
    $("#txtIdEmpleado").val('');
    $("#txtNumeroNomina").val('');
    $("#txtNombre").val('');
    $("#txtApellidoPaterno").val('');
    $("#txtApellidoMaterno").val('');
}

function Decidir() {
    var empleado = {
        IdEmpleado: $('#txtIdEmpleado').val(),
        NumeroNomina: $('#txtNumeroNomina').val(),
        Nombre: $('#txtNombre').val(),
        ApellidoPaterno: $('#txtApellidoPaterno').val(),
        ApellidoMaterno: $('#txtApellidoMaterno').val(),
        Estado: {
            IdEstado: $('#ddlEstadoX').val()
        }
    }
    if (empleado.IdEmpleado == 0 || empleado.IdEmpleado == null) {
        Add();
    }
    else {
        Update();
    }
}

function Row(i, empleado) {
    var filas =
        '<tr class="text-center">' +
        /*'<td>' + '<a href="#" onclick="GetById(' + empleado.IdEmpleado + ')">' + '<span class="glyphicon glyphicon-edit"></span>' + '</a>' + '</td>'*/
        '<td>' + '<button class="btn btn-primary" onclick="GetById(' + empleado.IdEmpleado + ')">' + '<span class="glyphicon glyphicon-edit"></span></button></td>'
        + '<td>' + empleado.IdEmpleado + '</td>'
        + '<td>' + empleado.NumeroNomina + '</td>'
        + '<td>' + empleado.Nombre + " " + empleado.ApellidoPaterno + " " + empleado.ApellidoMaterno + '</td>'
        + '<td>' + empleado.Estado.Nombre + '</td>'
        + '<td> <button class="btn btn-danger" onclick="Eliminar(' + empleado.IdEmpleado + ')"><span class="glyphicon glyphicon-trash"></span></button> </td>'
        + '</tr>';
    $('#tblEmpleado tbody').append(filas);
}

function GetAll() {
    Limpiar();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:2483/api/Empleado',
        success: function (result) { //200 Ok
            $('#tblEmpleado tbody').empty();
            $.each(result.Objects, function (i, empleado) {
                //var filas =
                //    '<tr class="text-center">' +
                //    /*'<td>' + '<a href="#" onclick="GetById(' + empleado.IdEmpleado + ')">' + '<span class="glyphicon glyphicon-edit"></span>' + '</a>' + '</td>'*/
                //    '<td>' + '<button class="btn btn-primary" onclick="GetById(' + empleado.IdEmpleado + ')">' + '<span class="glyphicon glyphicon-edit"></span></button></td>'
                //    + '<td>' + empleado.IdEmpleado + '</td>'
                //    + '<td>' + empleado.NumeroNomina + '</td>'
                //    + '<td>' + empleado.Nombre + " " + empleado.ApellidoPaterno + " " + empleado.ApellidoMaterno + '</td>'
                //    + '<td>' + empleado.Estado.Nombre + '</td>'
                //    + '<td> <button class="btn btn-danger" onclick="Eliminar(' + empleado.IdEmpleado + ')"><span class="glyphicon glyphicon-trash"></span></button> </td>'
                //    + '</tr>';
                //$('#tblEmpleado tbody').append(filas);
                Row(i, empleado);
            });
        },
        error: function (result) {
            alert('Error en la consulta ' + result.responseJSON.ErroMessage);
        }
    });
};

function EstadoGetAll() {
    $("#dllEstadoX").empty();
    $("#dllEstadoUpdate").empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:2483/api/Estado',
        success: function (result) {
            $("#ddlEstadoX").append('<option value="' + 0 + '">' + 'Seleccione una opción' + '</option>');
            $.each(result.Objects, function (i, estado) {
                $("#ddlEstadoX").append('<option value="'
                    + estado.IdEstado + '">'
                    + estado.Nombre + '</option>')
            });
        }
    });
}

//function Add() {
//    var empleado = {
//        IdEmpleado: 0,
//        NumeroNomina: $('#txtNumeroNominaAdd').val(),
//        Nombre: $('#txtNombreAdd').val(),
//        ApellidoPaterno: $('#txtApellidoPaternoAdd').val(),
//        ApellidoMaterno: $('#txtApellidoMaternoAdd').val(),
//        Estado: {
//            IdEstado: $('#ddlEstado').val()
//        }
//    }
//    $.ajax({
//        type: 'POST',
//        url: 'http://localhost:2483/api/Empleado',
//        dataType: 'json',
//        data: empleado,
//        success: function (result) {
//            $('#myModal').modal();
//            var ocultar = $('#ModalAdd').modal('hide');
//            GetAll();
//        },
//        error: function (result) {
//            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
//        }
//    });
//}; 

function Add() {
    var empleado = {
        IdEmpleado: 0,
        NumeroNomina: $('#txtNumeroNomina').val(),
        Nombre: $('#txtNombre').val(),
        ApellidoPaterno: $('#txtApellidoPaterno').val(),
        ApellidoMaterno: $('#txtApellidoMaterno').val(),
        Estado: {
            IdEstado: $('#ddlEstadoX').val()
        }
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:2483/api/Empleado',
        dataType: 'json',
        data: empleado,
        success: function (result) {
            $('#myModal').modal();
            var ocultar = $('#ModalAddUpdate').modal('hide');
            GetAll();
        },
        error: function (result) {
            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        }
    });
};

//function GetById(IdEmpleado) {
//    $.ajax({
//        type: 'GET',
//        url: 'http://localhost:2483/api/Empleado/' + IdEmpleado,
//        success: function (result) {
//            $('#txtIdEmpleadoUpdate').val(result.Object.IdEmpleado);
//            $('#txtNumeroNominaUpdate').val(result.Object.NumeroNomina);
//            $('#txtNombreUpdate').val(result.Object.Nombre);
//            $('#txtApellidoPaternoUpdate').val(result.Object.ApellidoPaterno);
//            $('#txtApellidoMaternoUpdate').val(result.Object.ApellidoMaterno);
//            $('#ddlEstadoUpdate').val(result.Object.Estado.IdEstado);
//            $('#ModalUpdate').modal('show');
//        }
//        //error: function (result) {
//        //    alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
//        //}
//    });
//}

function GetById(IdEmpleado) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:2483/api/Empleado/' + IdEmpleado,
        success: function (result) {
            $('#txtIdEmpleado').val(result.Object.IdEmpleado);
            $('#txtNumeroNomina').val(result.Object.NumeroNomina);
            $('#txtNombre').val(result.Object.Nombre);
            $('#txtApellidoPaterno').val(result.Object.ApellidoPaterno);
            $('#txtApellidoMaterno').val(result.Object.ApellidoMaterno);
            $('#ddlEstadoX').val(result.Object.Estado.IdEstado);
            $('#ModalAddUpdate').modal('show');
        }
        //error: function (result) {
        //    alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        //}
    });
}

//function Update() {
//    var empleado = {
//        IdEmpleado: $('#txtIdEmpleadoUpdate').val(),
//        NumeroNomina: $('#txtNumeroNominaUpdate').val(),
//        Nombre: $('#txtNombreUpdate').val(),
//        ApellidoPaterno: $('#txtApellidoPaternoUpdate').val(),
//        ApellidoMaterno: $('#txtApellidoMaternoUpdate').val(),
//        Estado: {
//            IdEstado: $('#ddlEstadoUpdate').val()
//        }
//    }

//    $.ajax({
//        type: 'POST',
//        url: 'http://localhost:2483/api/Empleado/Update',
//        datatype: 'json',
//        data: empleado,
//        success: function (result) {
//            $('#myModal').modal();
//            $('#ModalUpdate').modal('hide');
//            GetAll();
//            Console(respond);
//        }
//        //error: function (result) {
//        //    alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
//        //}
//    });
//};

function Update() {
    var empleado = {
        IdEmpleado: $('#txtIdEmpleado').val(),
        NumeroNomina: $('#txtNumeroNomina').val(),
        Nombre: $('#txtNombre').val(),
        ApellidoPaterno: $('#txtApellidoPaterno').val(),
        ApellidoMaterno: $('#txtApellidoMaterno').val(),
        Estado: {
            IdEstado: $('#ddlEstadoX').val()
        }
    }

    $.ajax({
        type: 'POST',
        url: 'http://localhost:2483/api/Empleado/Update',
        datatype: 'json',
        data: empleado,
        success: function (result) {
            $('#myModal').modal();
            $('#ModalAddUpdate').modal('hide');
            GetAll();
            Console(respond);
        }
        //error: function (result) {
        //    alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        //}
    });
};

function Modal() {  
    var mostrar = $('#ModalAddUpdate').modal('show');
    //EstadoGetAll();
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