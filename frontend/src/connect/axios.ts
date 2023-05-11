import axios from "axios";
import Swal from "sweetalert2";

// axios 객체 생성
export const $ = axios.create({
  baseURL: "https://algopat.kr/api",
  headers: {
    "Content-Type": "application/json",
  },
});

$.interceptors.request.use((config) => {
  config.headers["authorization"] = localStorage.getItem("access-token");
  return config;
});

$.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("access 토큰 만료");
      $.get("/auth/token/accesstoken", {
        withCredentials: true,
      })
        .then((res) => {
          const accessToken = res.headers["authorization"];
          localStorage.setItem("access-token", accessToken);
          location.reload();
        })
        .catch(() => {
          Swal.fire({
            icon: "warning",
            title: "",
            text: "토큰이 만료되었습니다! 다시 로그인 해주세요!",
            confirmButtonText: "닫기",
          }).then(() => {
            window.location.href = `https://www.algopat.kr`;
          });
        });
    }
    return Promise.reject(error);
  }
);
