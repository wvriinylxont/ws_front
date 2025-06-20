import React from 'react'
import useAppStore from '../stores/useAppStore'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Nav() {
  const { username, role, setLogout} = useAppStore();

  const doLogout = async (e) => {
    // 고유 동작이 있는 요소들의 고유동작을 막는다
    // <form action='/주소'><button onCLick={aaa}>서밋으로 동작</button></form>
    // 버튼을 클릭했을 때 aaa함수에서 조건 체크를 해서 조건을 만족하지 못하면 작업을 중단하게 했다
    // 그래도 폼은 서밋된다 -> 왜 ? 폼안에 있는 버튼은 submit한다는 고유 동작이 정의되어 있어서
    // <a href="/aaa" onClick="조건처리">
    e.preventDefault();
    try {
        // MVC 방식에서는 a사이트에서 수신한 쿠키를 브라우저가 자동 전송한다 vs REST는 그런 거 없다
        // withCredentials:true 쿠키를 서버로 자동 전송해라
        await axios.post('http://localhost:8080/logout', {withCredentials:true});
        setLogout();
    } catch(err) {
        console.log(err);
    }
  }

  if(!username) {
    return (
        <nav>
            <div>비로그인</div>
            <ul>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/login">로그인</Link></li>
            </ul>
        </nav>
    )
  } else {
    if(role==='ROLE_USER') {
        return (
            <nav>
            <div>{username} 권한:{role}</div>
            <ul>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/private">메시지 보내기(로그인 필요)</Link></li>
                <li><Link to="/user">유저권한 접근가능</Link></li>
                <li><Link to="#" onClick={doLogout}>로그아웃</Link></li>
            </ul>
            </nav>
        )
    } else if(role==='ROLE_HOSPITAL') {
        return (
        <nav>
            <div>{username} 권한:{role}</div>
            <ul>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/private">메시지 보내기(로그인 필요)</Link></li>
                <li><Link to="/hospital">병원권한 접근가능</Link></li>
                <li><Link to="#" onClick={doLogout}>로그아웃</Link></li>
            </ul>
            </nav>
        )
    }
  }
}

export default Nav