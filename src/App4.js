import React, { useState } from "react";
import useWS from "./hooks/useWS";
import api from "./utils/api";
import axios from "axios";

// 서버로 메시지를 보내고 수신하기
function App() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState('');

  const socket = useWS("/sub/job2", (message) => append(message.body));

  const append=(msg)=>setMessage(prev=>prev+(msg)+"\n");

  const handleKeyDown = e =>{
    if(e.key==='Enter') {
        socket.current.publish({destination:'/pub/job2', body:value});
        setValue("");
    }
  }
  const login= async (id)=>{
    const requestForm = {username:id, password:'1234'};
    try {
        await axios.post('http://localhost:8080/login', new URLSearchParams(requestForm), {withCredentials: true});
        setUsername(id);
    } catch(err) {
        console.log(err);
    }
  }

  return (
    <div>
      <h1>웹소켓 초간단 채팅</h1>
      <h2>아이디:{username}</h2>
      <input value={value} onChange={e=>setValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="입력 후 엔터.." />
      <hr />
      <textarea value={message}style={{width:'100%'}} readOnly rows={10} />
      <button onClick={()=>login('spring')} disabled={username && username!='spring'}>스프링 로그인</button>
      <button onClick={()=>login('summer')} disabled={username && username!='summer'}>썸머 로그인</button>
      <button onClick={()=>login('winter')} disabled={username && username!='winter'}>윈터 로그인</button>
    </div>
  );
}

export default App;