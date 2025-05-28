import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Welcome to Live Poll Battle</h1>
      <button
        onClick={() => navigate("/create")}
        style={{ margin: "1rem", padding: "0.5rem 1rem", fontSize: "1.2rem" }}
      >
        Create Room
      </button>
      <button
        onClick={() => navigate("/join")}
        style={{ margin: "1rem", padding: "0.5rem 1rem", fontSize: "1.2rem" }}
      >
        Join Room
      </button>
    </div>
  );
}

export default HomePage;
