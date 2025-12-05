export default async function handler(req, res) {
  const {
    operacion,
    tipo,
    zona,
    precio_min,
    precio_max
  } = req.query;

  let url = `https://tokkobroker.com/api/v1/property/?key=${process.env.TOKKO_API_KEY}&format=json&available=true`;

  if (operacion) url += `&operation_type=${operacion}`;
  if (tipo) url += `&property_type=${tipo}`;
  if (zona) url += `&location=${zona}`;
  if (precio_min) url += `&price_from=${precio_min}`;
  if (precio_max) url += `&price_to=${precio_max}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data.objects);
  } catch (error) {
    res.status(500).json({ error: 'Error con Tokko' });
  }
}
