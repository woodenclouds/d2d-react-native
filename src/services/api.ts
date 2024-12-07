const BASE_URL = 'https://api.mapbox.com/directions/v5/mapbox';
const access_token =
  'pk.eyJ1Ijoic3lkLWFhbWlyIiwiYSI6ImNtMzlydG10cjE3NXQybHJ4cXJlOGR4dW0ifQ.ueSpn_8F4nz3cExguWjqEQ';

export const getDirections = async (from: number[], to: number[]) => {
  const url = `${BASE_URL}/walking/${from[0]},${from[1]};${to[0]},${to[1]}?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${access_token}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
