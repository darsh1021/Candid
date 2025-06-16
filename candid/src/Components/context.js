import { createContext } from "react";
import React, { useState } from 'react';

export const  CC = createContext(0);

export function ContextProvider(props)
{

    //Login Page 
    const [groupCode, setGroupCode] = useState("");
    const [accessKey, setAccessKey] = useState("");
    const [userName, setUserName] = useState("");

    //GroupChat
     const [room, setRoom] = useState("");
     const [username, setUsername] = useState("");
     const [message, setMessage] = useState("");
     const [messageList ,setMessageList] = useState([]);
     const [members, setMembers] = useState(["Darshan","Darsha"]);
     const [showPopup, setShowPopup] = useState(false);
     const [typingUser, setTypingUser] = useState("");
     const [popupUser, setPopupUser] = useState("");

    return(<CC.Provider  value= {{groupCode, setGroupCode,accessKey, setAccessKey,userName, setUserName,room, setRoom,username, setUsername,popupUser, setPopupUser,showPopup, setShowPopup,members, setMembers,messageList ,setMessageList,message, setMessage,typingUser, setTypingUser}}>
     {props.children}
    </CC.Provider>);
}