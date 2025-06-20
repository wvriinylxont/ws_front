import logo from "./logo.svg";
import "./App.css";
import { Bounce, Slide, toast, ToastContainer } from "react-toastify";

// 1. 토스트 띄우기
function App() {
  const show1 = () =>
    toast.success("🦄 예약이 접수되었습니다 !", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  const show2 = () =>
    toast.error("🦄 예약이 접수되었습니다 !", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide,
    });
  return (
    <div>
      <h1>Toast 띄우기</h1>
      <button onClick={show1}>colored</button>
      <button onClick={show2}>colored</button>
      <ToastContainer />
    </div>
  );
}

export default App;
