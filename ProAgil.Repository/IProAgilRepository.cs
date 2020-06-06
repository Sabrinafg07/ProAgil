using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
        //GERAL
       void Add<T>(T entity) where T : class;
       void Update<T>(T entity) where T : class;
       void Delete<T>(T entity) where T : class;
       Task<bool> SaveChangesAsync();

       //EVENTOS
       Task<Evento[]> GetAllEventoAsync(bool includePalestrantes);
       Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrantes);
       Task<Evento[]> GetAllEventoAsyncById(int EventoId, bool includePalestrantes);
        
        //PALESTRANTES
        Task<Palestrante[]> GetAllPalestranteAsyncByName(string name , bool includeEvento);
       Task<Palestrante[]> GetAllPalestranteAsync(int PalestranteId, bool includeEvento);

    }

}