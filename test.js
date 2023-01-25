        // id 속성이 clickBtn인 요소의 DOM 셀렉트
        let clickBtn = document.getElementById("clickBtn");
        let heading = document.getElementById("heading");
        let aa= document.getElementById("aa");
        //DOM 
        console.log(clickBtn)
        console.dir(clickBtn)
        //선택된 DOM 요소에 이벤트 핸들러 걸기
        clickBtn.onclick = function(event){
            //클릭이벤트가 발생하면 이벤트를 콘솔에 출력
            console.dir(event)
            console.dir(document)
            console.log(heading)
            //문서의 모든 요소가 객체가 될수있다.
            //함수를 변수에 참조시킨다.
            //함수를 배열에도 담을수있다.
            //함수를 다른 함수의 임자로도 사용
            document.bgColor="yellow"
            //style.backgroundColor 는 안됨
            document.title="Hello"

            clickBtn.innerText = "클릭했습니다"
            // 버튼의 이름 변경

            heading.style.backgroundColor = "green"
            aa.style.border="5px solid black"
            heading.innerText="world Hello"
            //텍스트 변경

            aa.style.color = "red"
            aa.style.backgroundColor = "blue"
            aa.style.border = "5px solid red";
            aa.style.padding = "10px"; 
            aa.innerText ="321"
        }