//구조분해 할당 <- 객체가 리스트의 요소를 바로 끄집어 내어서 사용
function Hello({ name, address, ChangeName }) {
    return (
      <>
        <h1>Hello {name} in {address}</h1>
        <button id="123" onClick={function () {
          ChangeName("철수");
        }}
        >이름 바꾸기</button>
        {/* 변수안에 함수를 넣어서 함수가 실행되도록 하는것. */}
      </>
    )
  }
export default Hello;