import { useEffect} from 'react';
import io from 'socket.io-client';
import "./groupchat.css"
import { useContext } from 'react';
import {CC} from "./Components/context";
export const socket = io.connect("http://localhost:3001")

function Groupchat()
{
    
    const{popupUser, setPopupUser,showPopup, setShowPopup,members, setMembers ,messageList ,setMessageList,message, setMessage,groupCode,username , typingUser, setTypingUser} = useContext(CC);
    const gc = useContext(CC);

 useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, { ...data, self: false }]);
    });

    socket.on("user_typing", (user) => {
      setTypingUser(user);
      setTimeout(() => setTypingUser(""), 2000);
    });

    socket.on("user_joined", (user) => {
      setPopupUser(user);
      setShowPopup(true);
      setMembers((prev) => [...new Set([...prev, user])]);
      setTimeout(() => setShowPopup(false), 3000);
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_typing");
      socket.off("user_joined");
    };
  }, []);

     const sendMessage = () => {
    if (message !== "") {
      const messageData = { groupCode, message, sender: username };
      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, { ...messageData, self: true }]);
      setMessage("");
    }
  };

      const handleTyping = () => {
    socket.emit("typing", { groupCode, username });
  };

  
   socket.on("typing", ({ room, username }) => {
    socket.to(room).emit("user_typing", username);
  });

    return(<div className="main">
          <div className="members">
            <h1>Members</h1>
            {members.length === 0 ? (
            <p>No one joined yet</p>
             ) : (
            <ul>
            {members.map((m, i) => (
              <li key={i}>{m}</li>
              ))}
              </ul>
              )}
        </div>
        <div className="chatfield">
            <h1>Group Chat</h1>
            <h2>{gc.groupCode}</h2>

             {showPopup && <div className="popup">{popupUser} joined the room</div>}

            <div className="messages">
          {messageList.map((msg, index) => (
            <div key={index} className={`message ${msg.self ? "self" : "other"}`}>
              <strong>{msg.sender}: </strong> {msg.message}
            </div>
          ))}
        </div>

         {typingUser && <p className="typing-indicator">{typingUser} is typing...</p>}

        <div className="send-message">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
          </div>
        </div>
    </div>);
}

export default Groupchat;