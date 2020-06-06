using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;

namespace ProAgil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PalestranteController : ControllerBase
    {
        public IProAgilRepository _repo;
        public PalestranteController(IProAgilRepository repo)
        {
            _repo = repo;

        }
        [HttpGet]
        public async Task<IActionResult> Get(int palestranteId)
        {
            try
            {
                var results = await _repo.GetAllPalestranteAsync(palestranteId,true);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Ooops!! Banco de Dados falhou");
            }
            
        }

        [HttpGet("getByName{name}")]
        public async Task<IActionResult> Get(string name)
        {
            try
            {
                var results = await _repo.GetAllPalestranteAsyncByName(name,true);
                return Ok(results);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Ooops!! Banco de Dados falhou");
            }
        }
      
        [HttpPost]
        public async Task<IActionResult> Post(Palestrante model)
        {
            try
            {
                _repo.Add(model);

                if(await _repo.SaveChangesAsync()
                )
                return Created($"api/palestrante/{model.Id}",model);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Ooops!! Banco de Dados falhou");
            }
            return BadRequest();
        }
        
        [HttpPut]
        public async Task<IActionResult> Put(int palestranteId, Palestrante model)
        {
            try
            {
                var palestrante = await _repo.GetAllEventoAsyncById(palestranteId, false);
                if(palestrante == null) return NotFound();

                _repo.Update(model);

                if(await _repo.SaveChangesAsync()
                )
                return Created($"api/palestrante/{model.Id}",model);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Ooops!! Banco de Dados falhou");
            }
            return BadRequest();
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(int palestranteId)
        {
            try
            {
                var palestrante = await _repo.GetAllPalestranteAsync(palestranteId, false);
                if(palestrante == null) return NotFound();

                _repo.Delete(palestrante);

                if(await _repo.SaveChangesAsync()
                )
                return Ok();
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Ooops!! Banco de Dados falhou");
            }
            return BadRequest();
        }
    
    }
}