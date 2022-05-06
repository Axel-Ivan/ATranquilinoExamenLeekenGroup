using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SL.Controllers
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
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Empleado
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Empleado/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Empleado/5
        public void Delete(int id)
        {
        }
    }
}
