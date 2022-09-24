import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  // 입력된 값을 state로 재정의
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delay 지정된 값이 없으면
    // 0.35초 뒤에 value의 값이 변경된다.
    const timer = setTimeout(() => setDebouncedValue(value), delay || 350);

    return () => {
      // 컴포넌트가 제거될때(언마운트)될 때 setTimeout 시간을 초기화
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
