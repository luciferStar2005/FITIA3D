// Definimos qué "piezas" necesita recibir la tarjeta
interface infoTarjetas {
  numero: string;
  titulo: string;
  descripcion: string;
}


export const FeatureCard = ({ numero, titulo, descripcion }: infoTarjetas) => {
  return (
    <div className="card">
      <span className="numero-card">{numero}</span>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </div>
  );
};
