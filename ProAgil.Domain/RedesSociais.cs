namespace ProAgil.Domain
{
    public class RedesSociais
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string URL { get; set; }
        public int? EventoId { get; set; }
        public Evento Evento { get;  }
        public int? PalestranteId { get; set; }
        public Palestrante Palestrante { get; set; }
    }
}