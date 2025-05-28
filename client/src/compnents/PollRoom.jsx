import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "/src/App.css";

function PollRoom() {
  const { roomId } = useParams();
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("Apple");
  const [optionB, setOptionB] = useState("Banana");
  const [votes, setVotes] = useState({ optionA: 0, optionB: 0 });
  const [voted, setVoted] = useState(false);
  const [userVote, setUserVote] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [votingClosed, setVotingClosed] = useState(false);

  const socketRef = useRef(null);

  useEffect(() => {
    
    socketRef.current = io("http://localhost:3000");

    
    const savedVote = localStorage.getItem(`vote_${roomId}`);
    if (savedVote) {
      setVoted(true);
      setUserVote(savedVote);
    }

    
    socketRef.current.emit("join-room", { roomId }, (response) => {
      if (response.success) {
        setQuestion(response.question);
        setOptionA(response.optionA);
        setOptionB(response.optionB);
        setVotes(response.votes);
      } else {
        alert("Room not found");
      }
    });

    
    socketRef.current.on("update-votes", (updatedVotes) => {
      setVotes(updatedVotes);
    });

    
    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(timer);
          setVotingClosed(true);
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    
    return () => {
      clearInterval(timer);
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [roomId]);

  
  const castVote = (option) => {
    if (voted || votingClosed) return;
    socketRef.current.emit("cast-vote", { roomId, option });
    setVoted(true);
    setUserVote(option);
    localStorage.setItem(`vote_${roomId}`, option);
  };

  return (
    <div className="container">
      <h2>{question || "Loading question..."}</h2>
      <p>Time Left: {timeLeft} seconds</p>

      <div className="options">
        <button
          onClick={() => castVote("optionA")}
          disabled={voted || votingClosed}
          className={userVote === "optionA" ? "selected" : ""}
        >
          {optionA}
        </button>
        <button
          onClick={() => castVote("optionB")}
          disabled={voted || votingClosed}
          className={userVote === "optionB" ? "selected" : ""}
        >
          {optionB}
        </button>
      </div>

      {voted && <p>You voted for: {userVote === "optionA" ? optionA : optionB}</p>}
      {votingClosed && <p>Voting has ended.</p>}

      <h3>Live Votes</h3>
      <p>
        {optionA}: {votes.optionA}
      </p>
      <p>
        {optionB}: {votes.optionB}
      </p>
    </div>
  );
}

export default PollRoom;
