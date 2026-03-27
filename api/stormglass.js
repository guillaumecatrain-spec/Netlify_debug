export default async function handler(req, res) {
  const SG_KEY = process.env.STORMGLASS_KEY;
  const LAT = 48.7322;
  const LON = -3.4560;

  try {
    const r = await fetch(
      `https://api.stormglass.io/v2/ocean/point?lat=${LAT}&lng=${LON}&params=windSpeed,windDirection,waveHeight,wavePeriod&source=sg`,
      { headers: { Authorization: SG_KEY } }
    );

    const txt = await r.text();
    res.status(r.status).send(txt);

  } catch (err) {
    res.status(500).json({ error: "Erreur serveur", details: err });
  }
}
