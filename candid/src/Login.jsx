
import './login.css';
import { useNavigate } from "react-router-dom";
import { useContext ,useEffect} from 'react';
import {CC} from "./Components/context";
import { socket } from './Groupchat';

const Login = () => {

    const navigate = useNavigate();

    const {groupCode, setGroupCode,accessKey, setAccessKey,userName, setUserName,username, setUsername} = useContext(CC);


     useEffect(() => {
    const names = ["Phoenix", "Shadow", "Blaze", "Echo", "Nova", "Raven", "Drift", "Luna", "Bolt", "Zara"];
    const randomName = names[Math.floor(Math.random() * names.length)] + "#" + Math.floor(Math.random() * 1000);
    setUsername(randomName);}, []);


     function nextPage(e)
      {
       
        e.preventDefault();
       navigate("/Groupchat");

        if (groupCode !== "") {
         socket.emit("join_room", { groupCode, username });
        }
      }

  return (
    <div className='main'>
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Candid</h1>
          <p className="login-subtitle">Anonymous You </p>
        </div>
        
        <form className="login-form" onSubmit={nextPage}>
          <div className="login-input-group">
             <input 
                 type="text" 
                 required placeholder="Your name" 
                 className="login-input"
                 value={userName}
                 onChange={(e) => setUserName(e.target.value)}
                 onFocus={() => setUserName("")}
             />
            <input 
              type="text" 
              required placeholder="Group code" 
              className="login-input"
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value)}
              onFocus={() => setGroupCode("")}
            />
          </div>
          
          <div className="login-input-group">
            <input 
                 type="password" 
                 required placeholder="Access key" 
                className="login-input"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                onFocus={() => setAccessKey("")}
            />
          </div>
          
          <div className="login-actions">
            <button type="submit" className="login-button">
              Accept
            </button>
          </div>
        </form>
        
        <div className="login-footer">
          <p>Feel free to talk</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;