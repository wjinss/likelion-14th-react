import App from "./app.js";

const MIN = 30,
  MAX = 99;

function getRandomMinMax(min = MIN, max = MAX) {
  if (min >= max)
    throw new Error("min 값이 max 값보다 크거나 같으면 안됩니다.");
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomHue() {
  return getRandomMinMax(0, 360);
}

const ORIGIN_TITLE = document.title;

let targetCount;

function setTargetCount() {
  targetCount = getRandomMinMax();
}

function setDocumentTitle() {
  document.title = ORIGIN_TITLE + ` (${targetCount})`;
}

function setAppRandomHue() {
  document.body.style.setProperty("--hue", getRandomHue());
}

let count = 0;

const container = document.getElementById("container");

if (!container) throw new Error("문서에 #container 요소가 존재하지 않습니다.");

const reactDOMRoot = ReactDOM.createRoot(container);

function render() {
  reactDOMRoot.render(React.createElement(App, { count, targetCount }));
}

let animateId;

function animate() {
  count += 1;

  if (count > targetCount) {
    return cancelAnimationFrame(animateId);
  }

  render();

  animateId = requestAnimationFrame(animate);
}

function play() {
  setTargetCount();
  setDocumentTitle();
  setAppRandomHue();
  animate();
}

function replay() {
  count = 0;
  play();
}

document.addEventListener("DOMContentLoaded", () => {
  play();

  document.body.addEventListener("click", replay);
  document.body.addEventListener("keydown", (e) => {
    if (e.shiftKey && e.code === "Enter") replay();
  });
});

// ---------------연습
() => {
  // import App from "./app.js";

  const MIN = 40,
    MAX = 99;
  // 최소값 40, 최대값 99

  function getRandomMinMax(min = MIN, max = MAX) {
    // 랜덤 숫자 구하는 함수, 인수는 최소값과 최대값으로 설정
    if (min >= max)
      // 최소값이 최대값보다 크거나 같으면
      throw new Error("최소값이 최대값보다 크거나 같으면 안됩니다"); // 에러 던짐
    return Math.round(Math.random() * (max - min) + min); // 최소값 ~ 최대값 사이의 임의의 숫자 반환
    // (랜덤 숫자에 최대값 - 최소값의 값을 곱하고 최소값을 더하면 설정된 숫자 범위에서 반환함 )
  }

  function getRandomHue() {
    // 랜덤 hue값 구하는 함수
    return getRandomMinMax(0, 360); // 랜덤숫자 함수에 0, 360 설정(hue는 원형의 색상환으로 각도로 색상을 지정)
  }

  const ORIGIN_TITLE = document.title; // 문서의 title값을 상수로 지정

  let targetCount; // 타겟 카운트 변수 설정
  function setTargetCount() {
    // 타겟 카운트 설정 함수
    targetCount = getRandomMinMax(); // 타겟 카운트는 랜덤숫자 함수의 기본값(40~99)
  }

  function setDocumentTitle() {
    // 문서 제목 설정하는 함수
    document.title = ORIGIN_TITLE + ` ${targetCount}`; // 문서 제목은 상수로 지정한 문자열 + 랜덤값(targetCount)
  }

  function setAppRandomHue() {
    // App 배경 바꾸는 함수
    document.body.style.setProperty("--hue", getRandomHue()); // body의 스타일 중 --hue의 값을 랜덤 색상 출력
  }

  let count = 0; // count 초기화

  const container = document.getElementById("container"); // 문서에서 conatiner 요소 찾기

  if (!container)
    // 컨테이너 요소가 없으면 에러 던짐
    throw new Error("문서에 #conatiner 요소가 존재하지 않습니다!");

  const reactDOMRoot = ReactDOM.createRoot(container); //컨테이너 요소를 ReactDOM으로 설정

  function render() {
    //렌더하는 함수
    reactDOMRoot.render(React.createElement(App, { count, targetCount })); // ReactDOM에 App 컴포넌트를 넣고, count, targetCount를 props로 받음
  }

  let animateId; //애니메이트 id 설정
  function animate() {
    // 애니메이트 함수
    count++; // count값 1씩 상승

    if (count > targetCount) {
      // count값이 targetCount보다 크면
      return cancelAnimationFrame(animateId); // 애니메이션 종료
    }

    render(); //렌더 함수 호출

    animateId = requestAnimationFrame(animate); // 애니메이션 시작
  }

  function play() {
    //실행하는 함수
    setTargetCount(); // 타겟 카운트 설정하는 함수 실행
    setDocumentTitle(); // 문서 제목 설정하는 함수 실행
    setAppRandomHue(); // 문서 배경 변경하는 함수 실행
    animate(); // 애니메이션 함수 실행
  }

  function replay() {
    //재실행하는 함수
    count = 0; // count 값 초기화
    play(); // 실행함수 실행
  }

  document.addEventListener("DOMContentLoaded", () => {
    // 문서가 로드될때
    play(); // 실행

    document.body.addEventListener("click", replay); // 배경 클릭하면 재실행
    document.body.addEventListener("keydown", (e) => {
      // 특정 키를 누르면
      if (e.shiftKey && e.code === "Enter") replay(); // 쉬프트랑 엔터 누르면 재실행
    });
  });
};
