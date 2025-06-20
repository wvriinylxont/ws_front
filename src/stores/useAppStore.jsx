// 로그인하면 소켓 생성
import { Client } from "@stomp/stompjs";
import axios from "axios";
import React from "react";
import SockJS from "sockjs-client";
import { create } from "zustand";

// zustand의 store 자체도 커스텀 훅 객체
// create 함수는 커스텀훅을 생성해서 리턴하는 함수
// - zustand는 상태를 다루기 위해 set, get을 제공
// - 개발자는 create를 이용해 set,get을 전달받아 상태 관련 로직 객체를 작성한다
const useAppStore = create((set, get) => ({
  username: undefined,
  role: undefined,
  socket: undefined,

  connectWebSocket: () => {
    if(get().socket)
        return;
    const client = new Client({
        // 연결이 끊어지면 대기 후 재연결 요청을 보낼 간격 설정 -> 금지
        reconnectDelay: 0,
        webSocketFactory:()=>new SockJS("http://localhost:8080/ws"),
        onConnect:()=>set({socket:client})
    })
    client.activate();
  },

  // 로그인 여부 확인 : F5 누르면 초기화
  checkAuth: async () => {
    try {
        const prevUsername = get().username;
      const res = await axios.get("http://localhost:8080/api/auth/check", { withCredentials: true });
      const { username, role } = res.data;

      // zustand에서 이전 값을 가지고 변경하는 경우가 아니라면 함수형 업데이트 불필요
      set({ username, role });

      // 저장된 아이디가 바뀌었다면
      if(prevUsername !== username)
      get().connectWebSocket();
    } catch (err) {
      if(get().socket)
        get().socket.deactivate();
      set({ username: null, role: null, socket: null });
      console.log(err);
    }
  },

  // 로그인 설정
  setLogin: (username, role) => {
    set({ username, role });
    get().connectWebSocket();
  },

  // 로그아웃 설정
  setLogout: () => {
    if(get().socket)
    get().socket.deactivate();
    set({ username: null, role: null, socket: null });
  },
}));

export default useAppStore;