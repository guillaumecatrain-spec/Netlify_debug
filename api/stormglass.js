export default async function handler(req, res) {
  const SG_KEY = process.env.STORMGLASS_KEY;

  // Vérification de la clé
  if (!SG_KEY) {
    return res.status(500).json({ error: "Missing STORMGLASS_KEY environment variable" });
  }

  const LAT = 48.7322;
  const LON = -3.4560;

  try {
    const url = `https://api.stormglass.io/v2/ocean/point?lat=${LAT}&lng=${LON}&params=windSpeed,windDirection,waveHeight,wavePeriod&source=sg`;

    const response = await fetch(url, {
      headers: { Authorization: SG_KEY }
    });

    const data = await response.text();

    return res.status(response.status).send(data);

  } catch (err) {
    return res.status(500).json({ error: "Erreur serveur", details: String(err) });
  }
}
