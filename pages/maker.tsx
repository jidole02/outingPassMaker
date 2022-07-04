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
  const today = new Date();

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
    <Wrapper>
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
        <DowonloadButton isComplete={isComplete} onClick={changeHtmlToPng}>
          외출증 png 다운로드
        </DowonloadButton>
      </Container>
      <CardWrapper id="htmlArea">
        {isComplete && (
          <WaterMark>
            절대로
            <br />
            조작 금지
            <br />
            절대로
            <br />
            조작 금지
          </WaterMark>
        )}
        <CardContainer>
          <h4>외출증</h4>
          <hr />
          <CardSection>
            <div>
              <span>이름</span>
              <h6>{infor.s_name}</h6>
            </div>
            <div>
              <span>학번</span>
              <h6>{infor.s_num}</h6>
            </div>
            <div>
              <span>담임선생님 성함</span>
              <h6>{infor.t_name}</h6>
            </div>
          </CardSection>
          <CardSection>
            <div>
              <span>출발시간</span>
              <h6>{infor.start_time}</h6>
            </div>
            <div>
              <span>도착시간</span>
              <h6>{infor.arrive_time}</h6>
            </div>
          </CardSection>
          <CardSection>
            <div>
              <span>외출사유</span>
              <h6>{infor.description}</h6>
            </div>
            <div>
              <span>날짜</span>
              <h6>
                {today.getMonth() + 1}월 {today.getDate()}일
              </h6>
            </div>
          </CardSection>
        </CardContainer>
      </CardWrapper>
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

const CardWrapper = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
  border: 1px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  position: relative;
  overflow: hidden;
`;

const WaterMark = styled.div`
  font-size: 100px;
  position: absolute;
  color: #ffada0;
  font-weight: bold;
  transform: rotate(10deg);
`;

const CardContainer = styled.div`
  width: 450px;
  height: 450px;
  border: 3px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  & h4 {
    font-size: 30px;
    font-weight: 500;
  }
  & hr {
    width: 250px;
    height: 3px;
    background-color: black;
    margin-top: 20px;
  }
`;

const CardSection = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 0 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  & div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    & span {
      font-size: 16px;
      color: grey;
    }
    & h6 {
      font-size: 20px;
      color: black;
    }
  }
`;
