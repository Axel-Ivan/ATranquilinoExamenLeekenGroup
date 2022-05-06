using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class Estado
    {
        public static ML.Result GetAll()
        {
            ML.Result result = new ML.Result();

            try
            {
                using(DL.ATranquilinoLeenkenGroupEntities context = new DL.ATranquilinoLeenkenGroupEntities())
                {
                    var procedure = context.EstadoGetAll().ToList();
                    result.Objects = new List<object>();

                    if(procedure != null)
                    {
                        foreach(var obj in procedure)
                        {
                            ML.Estado estado = new ML.Estado();
                            estado.IdEstado = obj.IdEstado;
                            estado.Nombre = obj.Nombre;
                            result.Objects.Add(estado);
                            
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
    }
}
