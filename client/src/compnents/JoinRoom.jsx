import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function JoinRoom() {
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!roomName) return alert("Enter a room name to join!");
    socket.emit("join-room", { roomId: roomName }, (response) => {
      if (response.success) {
        navigate(`/room/${roomName}`);
      } else {
        alert("No such room exists!");
      }
    });
  };

  return (
    <div>
      <h2>Join Poll Room</h2>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Room Name"
      />
      <button onClick={handleJoin}>Join Room</button>
      <br />
      <button
        onClick={() => navigate("/")}
        style={{ marginTop: "1rem" }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default JoinRoom;
