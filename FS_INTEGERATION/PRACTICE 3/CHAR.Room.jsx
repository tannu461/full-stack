import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

// change to server address if different
const SOCKET_URL = 'http://localhost:4000';

export default function ChatRoom() {
  const [socket, setSocket] = useState(null);
  const [name, setName] = useState('');
  const [connected, setConnected] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef();

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    const s = io(SOCKET_URL, { transports: ['websocket', 'polling'] });
    setSocket(s);

    s.on('connect', () => {
      console.log('connected to server', s.id);
    });

    s.on('message', (message) => {
      // message: { id, name, text, time }
      setMessages(prev => [...prev, message]);
      scrollToBottom();
    });

    s.on('user-joined', (info) => {
      setMessages(prev => [...prev, { id: info.id, name: 'System', text: `${info.username} joined`, time: new Date().toISOString() }]);
      scrollToBottom();
    });

    s.on('user-left', (info) => {
      setMessages(prev => [...prev, { id: info.id, name: 'System', text: `${info.username} left`, time: new Date().toISOString() }]);
      scrollToBottom();
    });

    return () => {
      s.disconnect();
    };
  }, []);

  function joinChat() {
    if (!socket) return;
    const uname = name.trim() || 'Anonymous';
    socket.emit('join', uname);
    setConnected(true);
  }

  function sendMessage() {
    if (!socket || !msg.trim()) return;
    const payload = { name: name || 'Anonymous', text: msg };
    socket.emit('message', payload);
    setMsg('');
  }

  function onEnterSend(e) {
    if (e.key === 'Enter') sendMessage();
  }

  function formatTime(iso) {
    const d = new Date(iso);
    return d.toLocaleTimeString();
  }

  function scrollToBottom(){
    const el = document.getElementById('messagesBox');
    if(el) el.scrollTop = el.scrollHeight;
  }

  return (
    <div style={{ display:'flex', gap:20 }}>
      <div style={{ border:'2px solid #222', padding:20, width:400 }}>
        <h3 style={{textAlign:'center'}}>Real-Time Chat</h3>

        {!connected ? (
          <>
            <input
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width:'100%', padding:8, marginBottom:10 }}
            />
            <button onClick={joinChat} style={{ width:'100%', padding:8 }}>Join</button>
          </>
        ) : (
          <>
            <div id="messagesBox" style={{ height:300, overflowY:'auto', border:'1px solid #ccc', padding:10, background:'#fff' }}>
              {messages.map((m, idx) => (
                <div key={idx} style={{ marginBottom:8 }}>
                  <strong>{m.name}</strong> <small style={{ color:'#555' }}>[{formatTime(m.time)}]:</small> <span>{m.text}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop:10 }}>
              <input
                placeholder="Type your message..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={onEnterSend}
                style={{ width:'100%', padding:8, boxSizing:'border-box' }}
              />
              <button onClick={sendMessage} style={{ marginTop:8, width:'100%', padding:8 }}>Send</button>
            </div>
          </>
        )}
      </div>

      {/* Example second panel to simulate 2 users in side-by-side layout (optional) */}
      <div style={{ border:'2px solid #222', padding:20, width:400 }}>
        <h3 style={{textAlign:'center'}}>Real-Time Chat (Preview)</h3>
        <div style={{ height:380, overflowY:'auto', border:'1px solid #ccc', padding:10, background:'#fff' }}>
          {messages.map((m, idx) => (
            <div key={`pv-${idx}`} style={{ marginBottom:8 }}>
              <strong>{m.name}</strong> <small style={{ color:'#555' }}>[{formatTime(m.time)}]:</small> <span>{m.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
