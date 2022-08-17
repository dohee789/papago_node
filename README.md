# papago

- 네이버의 Papago API를 활용하여 한국어, 영어, 일본어 번역을 해주는 웹사이트 구현 <br>

1️⃣입력한 언어가 어떤 언어인지 감지<br>
2️⃣작성된 언어를 선택한 언어로 번역하여 출력<br><br>

![image](https://user-images.githubusercontent.com/78744630/182364888-ede776f7-0b0f-4a03-a163-715bb4291587.png)
![image](https://user-images.githubusercontent.com/78744630/182364941-b3a39479-9741-449a-9fd7-82ce01972b95.png)

- 트러블 슈팅<br>
문자열 하나하나 입력할 때마다 서버가 갱신되어 효율적으로 번역이되지 않음 -> setTimeout() 활용하여 3초마다 문자를 감지하고 번역하도록 수정

