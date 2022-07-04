import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { KeyboardEvent, useRef } from "react";

const Main = () => {
  const pswInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const checkPsw = () => {
    const psw = pswInputRef.current?.value;
    if (psw === "fprhwhdk1214") {
      router.push("/maker");
    } else {
      alert("비밀번호가 다릅니다.");
    }
  };

  const submitWithInput = (event: KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.keyCode;
    if (keyCode === 13) checkPsw();
  };
  return (
    <Wrapper>
      <h3>외출증 만들기</h3>
      <p>외출증을 만들기 위해 선생님임을 인증해주세요</p>
      <input
        type="password"
        placeholder="공통 비밀번호 입력"
        ref={pswInputRef}
        onKeyDown={submitWithInput}
      />
      <button onClick={checkPsw}>제출</button>
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 100px;
  & h3 {
    font-size: 20px;
  }
  & p {
    font-size: 14px;
    margin-top: 10px;
  }
  & button,
  input {
    width: 300px;
    height: 40px;
  }
  & input {
    margin-top: 30px;
    ::placeholder {
      font-size: 13px;
    }
  }
  & button {
    padding: 10px;
    background-color: var(--main-color);
    margin-top: 10px;
    font-weight: bold;
    color: var(--main-text);
  }
`;
