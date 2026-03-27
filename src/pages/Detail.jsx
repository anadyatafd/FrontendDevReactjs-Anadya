import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantById, getReviews } from "../services/api";

const Detail = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const res = await getRestaurantById(id);
    const rev = await getReviews(id);

    setRestaurant(res);
    setReviews(rev);
  };

  if (!restaurant) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px 40px", maxWidth: "1200px" }}>
      
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <img
          src={restaurant.photos?.[0]}
          alt={restaurant.name}
          style={{
            width: "100%",
            height: "280px",
            objectFit: "cover",
            borderRadius: "8px"
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "12px",
            background: "rgba(0,0,0,0.5)",
            color: "#fff",
            borderRadius: "0 0 8px 8px"
          }}
        >
          <h1 style={{ margin: 0, fontSize: "20px" }}>
            {restaurant.name}
          </h1>
          <p style={{ margin: 0, fontSize: "12px" }}>
            ⭐ {restaurant.rating}
          </p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <p style={{ fontSize: "13px", color: "#444", marginBottom: "10px" }}>
        {restaurant.description}
      </p>

      {/* ADDRESS */}
      <p style={{ fontSize: "12px", color: "#666", marginBottom: "16px" }}>
        📍 {restaurant.address}
      </p>

      {/* INFO */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          fontSize: "13px",
          marginBottom: "20px"
        }}
      >
        <div>
          <strong>Category:</strong> {restaurant.categories?.[0]}
        </div>

        <div>
          <strong>Price:</strong> {restaurant.price}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: restaurant.isOpen ? "green" : "red"
            }}
          ></span>
          {restaurant.isOpen ? "Open Now" : "Closed"}
        </div>
      </div>

      {/* MENU */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>
          Menu Highlights
        </h3>

        <ul style={{ fontSize: "13px", paddingLeft: "16px" }}>
          {restaurant.menu?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* MAP */}
      <div
        style={{
          height: "180px",
          background: "#eee",
          borderRadius: "6px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "12px",
          color: "#777"
        }}
      >
        Map Placeholder
      </div>

      {/* REVIEWS */}
      <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
        Reviews
      </h2>

      {reviews.length === 0 ? (
        <p style={{ fontSize: "12px" }}>No reviews available</p>
      ) : (
        <div>
          {reviews.map((r) => (
            <div
              key={r.id}
              style={{
                display: "flex",
                gap: "12px",
                padding: "12px 0",
                borderBottom: "1px solid #eee"
              }}
            >
              <img
                src={r.image}
                alt={r.name}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/50")
                }
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />

              <div>
                <h4 style={{ margin: 0, fontSize: "13px" }}>
                  {r.name}
                </h4>

                <p style={{ margin: "2px 0", fontSize: "12px" }}>
                  ⭐ {r.rating}
                </p>

                <p style={{ margin: "2px 0", fontSize: "12px", color: "#444" }}>
                  {r.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Detail;