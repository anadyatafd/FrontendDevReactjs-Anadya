const BASE_URL = "https://69c5f91ef272266f3eabbfb2.mockapi.io";

export const getRestaurants = async () => {
  const res = await fetch(`${BASE_URL}/restaurant`);
  return res.json();
};