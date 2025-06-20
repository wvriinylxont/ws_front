import { Client } from '@stomp/stompjs';
import React, { useEffect, useRef } from 'react'
import SockJS from 'sockjs-client';
import { Bounce, Slide, toast, ToastContainer } from "react-toastify";

// 두 종류의 상태
// 1. 렌더링하는 상태
// 2. 렌더링되지 않는 상태

// 예를 들어 Todos를 만드는데 할일번호 tno가 있다고 하자. tno는 출력하지 않는다고 해보자
// - const [tno, setTno] = useState(0);
// - 사용자가 할일을 입력하면
//        tno를 1증가  --> 여기서도 렌더링이 발생하는데 ????
//        tno를 가지고 새로운 할일을 배열에 추가 -> 여기서 재렌더링 발생
function App() {
    const socket = useRef(null);

    useEffect(()=>{
        const client = new Client({
            webSocketFactory:()=> new SockJS('http://localhost:8080/ws'),
            onConnect:()=>{
                console.log('===서버연결===');
                client.subscribe('/sub/job1', (message)=>{
                    console.log(message.body);
                    toast.success(message.body , { position: "top-right", autoClose: false, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored", transition: Bounce });
            })
         }
        });
        client.activate();
        socket.current = client;
    }, []);
  return (
    <>
    <div>App</div>
    <ToastContainer />
    </>
  )
}

export default App