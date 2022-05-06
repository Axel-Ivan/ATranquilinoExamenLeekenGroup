using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SL_API.Controllers
{
    public class EstadoController : ApiController
    {
        // GET: api/Estado
        [HttpGet]
        [Route("api/Estado")]
        public IHttpActionResult GetAll()
        {
            ML.Result result = BL.Estado.GetAll();

            if (result.Correct)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }

        // GET: api/Estado/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Estado
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Estado/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Estado/5
        public void Delete(int id)
        {
        }
    }
}
