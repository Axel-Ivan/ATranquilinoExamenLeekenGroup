using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SL_API.Controllers
{
    public class EmpleadoController : ApiController
    {
        // GET: api/Empleado
        [HttpGet]
        [Route("api/Empleado")]
        public IHttpActionResult GetAll()
        {
            ML.Result result = BL.Empleado.GetAll();

            if (result.Correct)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }

        // GET: api/Empleado/5
        [HttpGet]
        [Route("api/Empleado/{IdEmpleado}")]
        public IHttpActionResult GetById(int IdEmpleado)
        {
            ML.Result result = BL.Empleado.GetById(IdEmpleado);

            if (result.Correct)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }

        // POST: api/Empleado
        [HttpPost]
        [Route("api/Empleado")]
        public IHttpActionResult Add([FromBody] ML.Empleado empleado)
        {
            ML.Result result = BL.Empleado.Add(empleado);

            if (result.Correct)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }

        // PUT: api/Empleado/5
        [HttpPost]
        [Route("api/Empleado/Update")]
        public IHttpActionResult Update([FromBody] ML.Empleado empleado)
        {
            ML.Result result = BL.Empleado.Update(empleado);

            if (result.Correct)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }

        // DELETE: api/Empleado/5
        [HttpGet]
        [Route("api/Empleado/Delete/{IdEmpleado}")]
        public IHttpActionResult Delete(int IdEmpleado)
        {
            ML.Result result = BL.Empleado.Delete(IdEmpleado);

            if (result.Correct)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
