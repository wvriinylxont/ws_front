import { Client } from "@stomp/stompjs";
import { useState } from "react";
import SockJS from "sockjs-client";

// 1. 증가버튼을 상태가 변경된다 -> 재렌더링 발생
// 2. 메모리에 재렌더링한 다음 현재 DOM에 출력된 화면과 비교해 변경된 부분만 부분 갱신 -> 리액트나 vue가 강조하는 장점(빠르다)
// 3. 이 와중에 상태가 아닌 일반 변수들은 다시 초기화
// 4. 소켓을 일반 변수로 만들면 재렌더링될때마다 웹소켓을 다시 연결
//    서버에서는 연결이 끊어진 웹소켓이 계속 유지 -> 귀중한 연결이 낭비된다
function App() {
  let socket = null;
  const [value, setValue] = useState(1);

  socket = new Client({
    // ws는 http가 아니다. ws://localhost:8080로 접속해야한다
    // http에 대해 https가 있는 것 처럼 ws에 대해서도 ws가 있다
    // sockJS는 ws가 미지원되는 경우에도 ws 에뮬레이션 해준다 -> ws가 아닌 http 접속
    webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
    onConnect:() => {
      console.log("===서버 연결===");
      socket.subscribe('/sub/job1', (message)=>{console.log(message.body)})
    }
  });
  socket.activate();

  return (
    <div>
      {value} <button onClick={()=>setValue(prev=>prev+1)}>증가</button>
    </div>
  )
}

export default App;