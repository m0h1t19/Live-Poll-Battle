import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "/src/App.css";

const socket = io("http://localhost:3000");

function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!roomName || !question || !optionA || !optionB) {
      return alert("Please fill all fields!");
    }
    socket.emit("create-room", { roomId: roomName, question, optionA, optionB }, () => {
      navigate(`/room/${roomName}`);
    });
  };

  return (
    <div className="container">
      <h2>Create Poll Room</h2>
      <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="Room Name" />
      <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Poll Question" />
      <input type="text" value={optionA} onChange={(e) => setOptionA(e.target.value)} placeholder="Option A" />
      <input type="text" value={optionB} onChange={(e) => setOptionB(e.target.value)} placeholder="Option B" />
      <button onClick={handleCreate}>Create Room</button>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}

export default CreateRoom;
