const rooms = {};

function createRoom(roomId, question, optionA, optionB) {
  rooms[roomId] = {
    question,
    optionA,
    optionB,
    votes: { optionA: 0, optionB: 0 },
    createdAt: Date.now(),
    votingOpen: true,
  };
}

function getRoom(roomId) {
  return rooms[roomId];
}

function isVotingOpen(roomId) {
  const room = rooms[roomId];
  if (!room) return false;
  const elapsed = Date.now() - room.createdAt;
  if (elapsed > 60000) {
    room.votingOpen = false;
    return false;
  }
  return room.votingOpen;
}

function voteInRoom(roomId, option) {
  if (isVotingOpen(roomId)) {
    if (rooms[roomId]) {
      if (option === "optionA") rooms[roomId].votes.optionA++;
      else if (option === "optionB") rooms[roomId].votes.optionB++;
      return true;
    }
  }
  return false;
}

module.exports = { createRoom, getRoom, voteInRoom, isVotingOpen };
