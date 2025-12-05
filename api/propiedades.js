// api/propiedades.js
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  const { operacion, tipo, zona, precio_min, precio_max } = req.query;

  // 💡 CAMBIO: Agregamos &limit=1000 para solicitar 1000 propiedades (o un valor más grande)
  let url = `https://tokkobroker.com/api/v1/property/?key=${process.env.TOKKO_API_KEY}&format=json&available=true&limit=1000`; 

  if (operacion) url += `&operation_type=${encodeURIComponent(operacion)}`;
  if (tipo) url += `&property_type=${encodeURIComponent(tipo)}`;
  if (zona) url += `&location=${encodeURIComponent(zona)}`;
  if (precio_min) url += `&price_from=${encodeURIComponent(precio_min)}`;
  if (precio_max) url += `&price_to=${encodeURIComponent(precio_max)}`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.status(200).json(data.objects || data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al conectar con Tokko' });
  }
}
