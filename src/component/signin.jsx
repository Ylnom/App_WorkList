import React, { useEffect, useState } from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import App from "../App";
import "../css/signin.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiShutDownLine } from "react-icons/ri";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("email", user.email);
      } else {
        setUser(null);
        localStorage.removeItem("email");
      }
    });
  }, []);

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setUser(data.user);
    });
  };

  const confirmSignOut = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      handleSignOut();
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        toast.success("Đăng xuất thành công!"); // Trigger success notification
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện submit form

    // Kiểm tra xem email và password có giá trị không rỗng
    if (email.trim() === "" || password.trim() === "") {
      console.log("Email và mật khẩu không được để trống");
      return; // Kết thúc hàm nếu có bất kỳ trường nào rỗng
    }

    // Gửi yêu cầu đăng nhập bằng email và password
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Đăng nhập thành công
        const user = userCredential.user;
        console.log(user);
        toast.success("Đăng nhập thành công!");
      })
      .catch((error) => {
        // Xử lý lỗi khi đăng nhập thất bại
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      {user ? (
        <App />
      ) : (
        <>
          <div className="SignIn">
            <div className="form-outline mb-4">
              <input
                type="email"
                id="email-address"
                className="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label" htmlFor="loginName">
                Email hoặc Tên đăng nhập
              </label>
            </div>
            <div className="form-outline mb-4">
              <input
                type="password"
                id="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label" htmlFor="password">
                Mật khẩu
              </label>
            </div>
            <div className="row mb-4">
              <div className="col-md-6 d-flex justify-content-center">
                <div className="form-check mb-3 mb-md-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="loginCheck"
                  />
                  <label className="form-check-label" htmlFor="loginCheck">
                    {" "}
                    Nhớ mật khẩu{" "}
                  </label>
                </div>
              </div>
            </div>
            <div className="fgpw col-md-6 d-flex justify-content-center">
              <a href="#!">Quên mật khẩu?</a>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block mb-4"
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
            <button
              className="btn btn-success btn-block mb-4"
              onClick={handleClick}
            >
              Đăng nhập với Google
            </button>
          </div>
        </>
      )}
      {user && (
        <div className="signOut">
          <p>{user.displayName || user.email}</p>
          <button className="btn btn-danger" onClick={confirmSignOut}>
            <RiShutDownLine />
          </button>
        </div>
      )}
    </div>
  );
}

export default SignIn;
