import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// This is the address of our backend server
const socket = io('http://localhost:3001');

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log('Connected to server!');
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log('Disconnected from server.');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div className="App">
      <h1>Garble.ai</h1>
      <h2>Connection Status: {isConnected ? 'Connected ✅' : 'Disconnected ❌'}</h2>
    </div>
  );
}

export default App;