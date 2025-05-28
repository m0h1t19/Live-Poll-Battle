import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage"; // import it
import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import PollRoom from "./components/PollRoom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateRoom />} />
      <Route path="/join" element={<JoinRoom />} />
      <Route path="/room/:roomId" element={<PollRoom />} />
    </Routes>
  );
}

export default App;
