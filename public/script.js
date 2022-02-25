const textAreaArray = document.querySelectorAll('textarea');
console.log(textAreaArray);

//source : 번역할 텍스트와 관련된 명칭
//target : 번역괸 결과와 관련된 명칭

const[sourceTextArea, targetTextArea] = textAreaArray;
const[sourceSelect, targetSelect] = document.querySelectorAll('select');

// 번역할 언어의 타입
let targetLanguage = 'en';

//번역할 언어가 바뀔 때마다 값을 변경
targetSelect.addEventListener('change', () => {
    const selectedIndex = targetSelect.selectedIndex;
    //console.log(selectedIndex);
    targetLanguage = targetSelect.options[selectedIndex].value;
    //console.log(targetLanguage);
});

let debouncer;

sourceTextArea.addEventListener('input', (event) => {

if(debouncer){
    clearTimeout(debouncer);
}

debouncer = setTimeout(() => {
        //console.dir(event.target.value);
        const text = event.target.value;

        if(text){
            const xhr = new XMLHttpRequest();

            const url = '/detectLangs'; // node 서버의 특정 url 주소 localhost:3000/detectLangs

            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4 & xhr.status == 200){

                    //서버의 응답 결과 확인(responseText : 응답에 포함된 텍스트)
                    console.log(typeof xhr.responseText);
                    const responseData = xhr.responseText;
                    console.log(`responseData: ${responseData}, type: type of responseData`);
                    const parseJsonToObject = JSON.parse(JSON.parse(responseData));
                    //두번 파싱해야하는 이유
                    //https://stackoverflow.com/questions/30194562/json-parse-not-working/49460716

                    console.log(typeof parseJsonToObject, parseJsonToObject);

                    const result = parseJsonToObject['message']['result'];

                    //번역된 텍스트응 결과화면에 입력
                    targetTextArea.value = result['translatedText'];

                    // 응답의 헤더(header) 확인
                    //console.log(`응답 헤더 : ${xhr,getAllResponseHeaders()}`);
                }
            };

            xhr.open("POST", url);
            
            // 서버에 보내는 요청 데이터의 형식이 json형식임을 명시
            xhr.setRequestHeader("Content-type", "application/json");

            const requestData = { //targer : object
                text,
                targetLanguage
            };

            //JSON(Javascript Object notaiton)의 타입은? string
            //내장모듈 JSON 활용
            jsonToString = JSON.stringify(requestData);
            console.log(typeof jsonToString);

            //xhr : XMLHttpRequest
            xhr.send(jsonToString);
        }else{
            alert('번역할 텍스트를 입력하세요!');
        }
        
    }, 3000);
    
});

