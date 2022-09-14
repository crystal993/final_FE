// 모든 쿠키 가져와서 json 배열형태로 반환 함수
const getAllCookies = () => {
  const cookies = document.cookie.split("; ");
  const cookieList = cookies.map(function (cookie) {
    const cookieRow = cookie.split("=");
    return cookieRow[0];
  });
  return cookieList;
};

// 쿠키를 브라우저에 저장하는 함수
const setCookie = (name, value, expires = 1) => {
  let date = new Date();
  date.setTime(date.getTime() + expires * 24 * 3600 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;`;
};

// 쿠키 삭제
function deleteCookie(name) {
  // 만료시간을 음수로 하면 바로 삭제 가능
  setCookie(name, "", {
    "max-age": -1,
  });
}

export { setCookie, deleteCookie, getAllCookies };
