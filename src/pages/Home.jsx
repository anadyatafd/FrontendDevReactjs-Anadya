import { useEffect, useState } from "react";
import { getRestaurants } from "../services/api";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);

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

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "32px" }}>Restaurants</h1>
      <p style={{ color: "#777" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </p>

      <div style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <span>Filter By:</span>

        <label>
          <input
            type="checkbox"
            onChange={(e) =>
              setFilters({ ...filters, openNow: e.target.checked })
            }
          />
          Open Now
        </label>

        <select
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

      <h2>All Restaurants</h2>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    marginTop: "20px"
  }}
>
  {filteredRestaurants.map((r) => (
    <div
      key={r.id}
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        background: "#fff"
      }}
    >
      <img
        src={r.photos?.[0]}
        style={{ width: "100%", height: "120px", objectFit: "cover" }}
      />

      <h4>{r.name}</h4>

      <p>⭐ {r.rating}</p>

      <p>
        {r.categories?.[0]} • {r.price}
      </p>

      <p style={{ color: r.isOpen ? "green" : "red" }}>
        {r.isOpen ? "Open Now" : "Closed"}
      </p>

      <button
        style={{
          width: "100%",
          background: "#0d2a52",
          color: "white",
          padding: "8px",
          border: "none",
          marginTop: "10px"
        }}
      >
        LEARN MORE
      </button>
    </div>
  ))}
</div>

    </div>
  );
};

export default Home;