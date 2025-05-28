# Live-Poll-Battle

How I Built It
I created Live Poll Battle by combining a React frontend with a Node.js backend using Socket.io for real-time communication. On the frontend, users can easily create or join poll rooms, vote on options, and watch live vote counts update instantly — all within a smooth and responsive interface.

To manage the poll rooms and votes, I built a simple backend that keeps track of each room's question, options, votes, and timing. When a user creates a room, the server stores this info in memory. Users join a room using its unique name, and any votes they cast get sent to the server, which updates the vote counts and immediately broadcasts the changes back to everyone in the room.

To prevent users from voting multiple times, I store their vote locally in the browser’s localStorage, so the app remembers if they already voted when they revisit the poll.

Voting is time-limited — after 60 seconds, the poll automatically closes, and users can no longer vote. This time limit is managed both on the server and displayed live on the frontend with a countdown timer.

Overall, this project gave me hands-on experience with real-time web apps, state synchronization, and managing user interactions across multiple clients.
