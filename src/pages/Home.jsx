import { useEffect, useState } from "react";
import { getRestaurants } from "../services/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);

  const [filters, setFilters] = useState({
    openNow: false,
    price: "",
    category: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getRestaurants();
    setRestaurants(data);
  };

  const filteredRestaurants = restaurants.filter((r) => {
    return (
      (!filters.openNow || r.isOpen) &&
      (!filters.price || r.price === filters.price) &&
      (!filters.category || r.categories?.includes(filters.category))
    );
  });

  const navigate = useNavigate();

  return (
    <div style={{
        padding: "20px",
        width: "100%",
        textAlign: "left"
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "4px" }}>Restaurants</h1>
      <p style={{ fontSize: "12px", color: "#777", marginBottom: "16px" }}>
        Lorem ipsum dolor sit amet
      </p>

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "left",
          marginBottom: "16px",
          fontSize: "12px",
          flexWrap: "wrap"
        }}
      >
        <span>Filter By:</span>

        <label>
          <input
            type="checkbox"
            onChange={(e) =>
              setFilters({ ...filters, openNow: e.target.checked })
            }
          />{" "}
          Open Now
        </label>

        <select
          style={{ fontSize: "12px" }}
          onChange={(e) =>
            setFilters({ ...filters, price: e.target.value })
          }
        >
          <option value="">Price</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
        </select>

        <select
          style={{ fontSize: "12px" }}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">Categories</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="American">American</option>
        </select>
      </div>

      <h2 style={{ fontSize: "16px", marginBottom: "10px" }}>
        All Restaurants
      </h2>

      {filteredRestaurants.length === 0 ? (
        <p style={{ fontSize: "12px" }}>
          No restaurants found based on your filter.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)", 
            gap: "12px"
          }}
        >
          {filteredRestaurants.map((r) => (
            <div
              key={r.id}
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                background: "#fff",
                fontSize: "12px",
                color: "#000"
              }}
            >
              <img
                src={r.photos?.[0]}
                alt={r.name}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/300")
                }
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover"
                }}
              />

              <h4 style={{ margin: "6px 0", fontSize: "13px" }}>
                {r.name}
              </h4>

              <p style={{ margin: "2px 0" }}>⭐ {r.rating}</p>

              <p style={{ margin: "2px 0" }}>
                {r.categories?.[0]}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "4px"
                }}
              >
                <span>{r.price}</span>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: r.isOpen ? "green" : "red"
                    }}
                  ></span>

                  <span>
                    {r.isOpen ? "Open" : "Closed"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/restaurant/${r.id}`)}
                style={{
                  width: "100%",
                  background: "#0d2a52",
                  color: "white",
                  padding: "6px",
                  border: "none",
                  marginTop: "8px",
                  fontSize: "11px",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                LEARN MORE
              </button>
            </div>
          ))}
        </div>
      )}

      <style>
        {`
          @media (max-width: 900px) {
            div[style*="grid-template-columns: repeat(4, 1fr)"] {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;