const BASE_URL = "https://69c5f91ef272266f3eabbfb2.mockapi.io";

export const getRestaurants = async () => {
  const res = await fetch(`${BASE_URL}/restaurant`);
  return res.json();
};

export const getRestaurantById = async (id) => {
  const res = await fetch(
    `https://69c5f91ef272266f3eabbfb2.mockapi.io/restaurant/${id}`
  );
  return res.json();
};

export const getReviews = async (restaurantId) => {
  const res = await fetch(
    `https://69c5f91ef272266f3eabbfb2.mockapi.io/reviews?restaurantId=${restaurantId}`
  );
  return res.json();
};