import styled from "@emotion/styled";
import * as React from "react";
import htmlToCanvas from "../util/html2canvas";

export default function maker() {
  const [infor, setInfor] = React.useState({
    s_num: null,
    s_name: null,
    t_name: null,
    start_time: null,
    arrive_time: null,
    description: null,
  });
  const [isComplete, setIsComplete] = React.useState(false);

  const writeInfor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfor({
      ...infor,
      [event.target.name]: event.target.value,
    });
  };

  React.useEffect(() => {
    const isEmpty = () =>
      !Object.values(infor).every((x) => x !== null && x !== "");
    !isEmpty() ? setIsComplete(true) : setIsComplete(false);
  }, [infor]);

  const changeHtmlToPng = () => {
    if (!isComplete) {
      alert("모든 정보를 입력해주세요");
      return;
    }
    const htmlArea = document.getElementById("htmlArea");
    htmlToCanvas(htmlArea).then(function (canvas: any) {
      var myImage = canvas.toDataURL();
      downloadURI(myImage, "저장이미지이름.png");
    });
  };

  const downloadURI = (uri: any, name: string) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
  };
  return (
    <Wrapper id="htmlArea">
      <Container>
        <h3>외출증 정보 입력</h3>
        <input
          type="text"
          onChange={writeInfor}
          placeholder="학생 학번을 입력하세요"
          name="s_num"
        />
        <input
          type="text"
          onChange={writeInfor}
          placeholder="학생 이름을 입력하세요"
          name="s_name"
        />
        <input
          type="text"
          onChange={writeInfor}
          placeholder="선생님 성함을 입력하세요"
          name="t_name"
        />
        <input
          type="text"
          onChange={writeInfor}
          placeholder="출발시간 ex) 00시 00분"
          name="start_time"
        />
        <input
          type="text"
          onChange={writeInfor}
          placeholder="도착시간 ex) 00시 00분"
          name="arrive_time"
        />
        <input
          type="text"
          onChange={writeInfor}
          placeholder="외출 사유를 입력하세요"
          name="description"
        />
        <DowonloadButton isComplete={isComplete}>
          외출증 png 다운로드
        </DowonloadButton>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 100px;
`;

const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  & h3 {
    font-size: 20px;
  }
  & input {
    margin-top: 15px;
    height: 40px;
    width: 100%;
    font-size: 13px;
  }
`;

const DowonloadButton = styled.button<{ isComplete: boolean }>`
  width: 100%;
  height: 40px;
  margin-top: 20px;
  font-size: 14px;
  transition: 300ms;
  background-color: ${({ isComplete }) =>
    isComplete ? `var(--main-color)` : "#f0f0f0"};
  color: ${({ isComplete }) => (isComplete ? `var(--main-text)` : "#b1b1b1")};
`;
