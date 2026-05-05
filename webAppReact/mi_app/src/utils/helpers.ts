export const porcentaje = (actual: number, meta: number) => {
  if (meta === 0) return 0; // Evitar división por cero
  return (actual / meta) * 100;
};

export const calcularIMC = (peso: string | number, altura: string | number) => {
  const pesoNum = Number(peso);
  const alturaNum = Number(altura);
  if (!alturaNum) return 0;
  return (pesoNum / (alturaNum * alturaNum)).toFixed(2);
};
