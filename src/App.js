import React, { useEffect } from 'react'
import useAppStore from './stores/useAppStore'
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Bounce, toast } from 'react-toastify';
import Nav from './fragments/Nav';
import Index from './pages/Index';
import E403 from './pages/E403';
import NotFound from './pages/NotFound';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute'
import UserRoute from './routes/UserRoute'
import HospitalRoute from './routes/HospitalRoute'
import Login from './pages/Login';
import Private from './pages/Private';
import User from './pages/User';
import Hospital from './pages/Hospital';

function App() {
    // 훅을 통채로 가져온 다음 checkAuth, socket을 꺼낸다
    // 훅에 있는 어떤 상태라도 변경되면 재렌더링
    const {checkAuth, socket} = useAppStore();

    // 훅에 checkAuth만 가져온다
    // const checkAuth = useAppStore(state => state.checkAuth);

    // 주소가 바뀔때마다 로그인 정보를 갱신해라
    const location = useLocation();

    // async 함수는 리턴이 있는 것으로 취급된다. useEffect의 콜백은 리턴이 없거나 있다면 cleanup 함수다
    // 따라서 useEffect의 콜백은 async가 될 수 없다
    useEffect(()=>{
      const run= async()=>{
        checkAuth();
      }
      run();
    }, [location]);

    // 로그인 했으면 toast를 띄울 subscribe를 등록
    useEffect(()=>{
        if(!socket)
            return;
        socket.subscribe('/user/sub/job3', ()=>{
            toast.success("🦄 메시지가 도착했습니다 !", {position: "top-right",autoClose: false,hideProgressBar: false,closeOnClick: false, pauseOnHover: true,draggable: true, progress: undefined,theme: "colored",transition: Bounce})
            })
    }, [socket])

  return (
    <div>
      <Nav />
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/login' element={<PublicRoute element={<Login />} />} />
          <Route path='/private' element={<PrivateRoute element={<Private />} />} />
          <Route path='/user' element={<UserRoute element={<User />} />} />
          <Route path='/hospital' element={<HospitalRoute element={<Hospital />} />} />
          <Route path='/e403' element={<E403 />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <ToastContainer />
    </div>
  )
}

export default App