export async function handler(event, context) {
  const SG_KEY = process.env.STORMGLASS_KEY;
  const LAT = 48.7322;
  const LON = -3.4560;
  try {
    const response = await fetch(`https://api.stormglass.io/v2/ocean/point?lat=${LAT}&lng=${LON}&params=windSpeed,windDirection,waveHeight,wavePeriod&source=sg`, {
      headers: { Authorization: SG_KEY }
    });
    const data = await response.text();
    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: data
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur serveur', details: err })
    };
  }
}