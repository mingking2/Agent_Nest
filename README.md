# Agent_Nest
사회복무요원 기간 (2022.03.21 ~ 2023.12.20) 동안 아무것도 안하기에는 심심해서 javascript 공부를 통해 복무기관에서 필요한 기능? 놀이들을 구현하려고 한다. 

현재 구현된 기능들
- 체크리스트
- 사다리타기 게임

## Languages
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 

## REST API
[![json-server](https://img.shields.io/badge/json--server-v0.16.3-orange)](https://github.com/typicode/json-server)

## WebSite URL
배포는 못할듯 ㅋㅋ

## 조건
1. 최적화 기능별 js파일분리
2. 데이터 DB?
3. 그냥 내맘대로 하는 거임

## 피드백

<details>
<summary>2023-04-24 피드백</summary>
<div markdown="1">
 
1. checkList
    - 처음 써보는 기능이지만 잘햇다.
    - let 키워드를 줄이는 방향으로
2. ladderGame
    - 뭔가 막막 설계안하고 더러움 ㅜㅜ
    - 전역변수를 최소화하자
    - 처음에는 되는데 다시 실행하면 오류?
 
</div>
</details>

<details>
<summary>2023-05-01 피드백</summary>
<div markdown="1">
 
1. 오류때문에 상정이가 도와줌
2. next_result 버튼의 addEventListener에서 오류 발생한다는 것을 확인
3. 다음데이터가 나와야되는데 왜 자꾸 다음데이터가 없다고 건너뛰는 걸까?

</div>
</details>
 
<details>
<summary>2023-05-02 피드백</summary>
<div markdown="1">

1. 사다리타기 결과를 볼 때 사다리가 하나씩 내려가는 효과 부여
2. await sleep()을 통해 시간 지연을 줌
3. 효과 변화에 걸맞게 css 파일 수정

</div>
</details>


<details>
<summary>2023-05-27 피드백</summary>
<div markdown="1">
 
1. js 기능별로 파일 분리함
2. 일반함수를 화살표함수로 전원 변경
 
</div>
</details>


