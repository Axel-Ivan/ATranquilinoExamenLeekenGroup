using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class Empleado
    {
        public static ML.Result GetAll()
        {
            ML.Result result = new ML.Result();

            try
            {
                using (DL.ATranquilinoLeenkenGroupEntities context = new DL.ATranquilinoLeenkenGroupEntities())
                {
                    var procedure = context.EmpleadosGetAll().ToList();
                    result.Objects = new List<object>();

                    if(procedure != null)
                    {
                        foreach(var obj in procedure)
                        {
                            ML.Empleado empleado = new ML.Empleado();
                            empleado.IdEmpleado = obj.IdEmpleado;
                            empleado.NumeroNomina = obj.NumeroNomina;
                            empleado.Nombre = obj.Nombre;
                            empleado.ApellidoPaterno = obj.ApellidoPaterno;
                            empleado.ApellidoMaterno = obj.ApellidoMaterno;
                            empleado.Estado = new ML.Estado();
                            empleado.Estado.IdEstado = obj.IdEstado.Value;
                            empleado.Estado.Nombre = obj.EstadoNombre;
                            result.Objects.Add(empleado);
                        }
                        result.Correct = true;
                    }
                    else
                    {
                        result.Correct = false;
                    }
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }
        public static ML.Result Add(ML.Empleado empleado)
        {
            ML.Result result = new ML.Result();

            try
            {
                using (DL.ATranquilinoLeenkenGroupEntities context = new DL.ATranquilinoLeenkenGroupEntities())
                {
                    var procedure = context.EmpleadoAdd(empleado.Nombre, empleado.ApellidoPaterno, empleado.ApellidoMaterno, empleado.Estado.IdEstado);

                    if(procedure >= 1)
                    {
                        result.Correct = true;
                    }
                    else
                    {
                        result.Correct = false;
                    }
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }
        public static ML.Result GetById(int IdEmpleado)
        {
            ML.Result result = new ML.Result();

            try
            {
                using (DL.ATranquilinoLeenkenGroupEntities context = new DL.ATranquilinoLeenkenGroupEntities())
                {
                    var procedure = context.EmpleadoGetById(IdEmpleado).FirstOrDefault();
                    result.Objects = new List<object>();

                    if(procedure != null)
                    {
                        ML.Empleado empleado = new ML.Empleado();
                        empleado.IdEmpleado = procedure.IdEmpleado;
                        empleado.NumeroNomina = procedure.NumeroNomina;
                        empleado.Nombre = procedure.Nombre;
                        empleado.ApellidoPaterno = procedure.ApellidoPaterno;
                        empleado.ApellidoMaterno = procedure.ApellidoMaterno;
                        empleado.Estado = new ML.Estado();
                        empleado.Estado.IdEstado = procedure.IdEstado.Value;
                        empleado.Estado.Nombre = procedure.EstadoNombre;

                        result.Object = empleado;
                        result.Correct = true;
                    }
                    else
                    {
                        result.Correct = false;
                    }
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }
        public static ML.Result Update(ML.Empleado empleado)
        {
            ML.Result result = new ML.Result();

            try
            {
                using (DL.ATranquilinoLeenkenGroupEntities context = new DL.ATranquilinoLeenkenGroupEntities())
                {
                    var procedure = context.EmpleadoUpdate(empleado.IdEmpleado, empleado.Nombre, empleado.ApellidoPaterno, empleado.ApellidoMaterno, empleado.Estado.IdEstado);

                    if(procedure >= 1)
                    {
                        result.Correct = true;
                    }
                    else
                    {
                        result.Correct = false;
                    }
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }
        public static ML.Result Delete(int IdEmpleado)
        {
            ML.Result result = new ML.Result();

            try
            {
                using (DL.ATranquilinoLeenkenGroupEntities context = new DL.ATranquilinoLeenkenGroupEntities())
                {
                    var procedure = context.EmpleadoDelete(IdEmpleado);

                    if(procedure >= 1)
                    {
                        result.Correct = true;
                    }
                    else
                    {
                        result.Correct = false;
                    }
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }
    }
}
