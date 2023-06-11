import { ladderData } from "./ladderGame.js";

const resetBtn = document.getElementById("reset");
const resultBtn = document.getElementById('result');
const next_result = document.getElementById("next");

resetBtn.addEventListener('click', () => resetLadder())
resultBtn.addEventListener('click', () => resultLadder())
next_result.addEventListener('click', () => nextLadder())

let cur_i = 0;
let i_col = 0;


const resultLadder = () => {
  const result = document.getElementById("ladder_result");
  next_result.style.display = 'flex';
  result.innerHTML = "";
  resultBtn.disabled = true;
  next_result.disabled = true;
  runLoop();
}

const nextLadder = () => {
  next_result.disabled = true;
  const cols = ladderData.cols;

  const tdElements = document.getElementsByTagName('td');
  Array.from({ length: tdElements.length }, (_, j) => {
    tdElements[j].style.color = "black";
  });

  if (i_col > cols) {
    i_col = 0;
    alert('더이상 나올 데이터가 없습니다!');
    next_result.style.display = 'none';
    resultBtn.disabled = true;
  } else {
    runLoop();
  }
}

const changeColor = (j, cur_i) => {
  document.getElementById(`${j},${cur_i}`).style.color = 'red';
}

const runLoop = async () => {
  const result = document.getElementById("ladder_result");
  const rows = ladderData.rows;
  const cols = ladderData.cols;
  const ladder_arr = ladderData.ladder_arr;

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  if (i_col < cols) {
    cur_i = i_col;
    for (let j = 0; j < rows; j++) {
      changeColor(j,cur_i);
      await sleep(500); // 0.5초 대기
      if (ladder_arr[j][cur_i + 1] == '───') {
        changeColor(j,cur_i+1);
        await sleep(500); // 0.5초 대기
        cur_i += 1; // 오른쪽으로 이동
        changeColor(j,cur_i+1);
        await sleep(500);
        cur_i += 1; // 오른쪽으로 이동
      } else if (ladder_arr[j][cur_i - 1] == '───') {
        changeColor(j,cur_i-1);
        await sleep(500); // 0.5초 대기
        cur_i -= 1; // 왼쪽으로 이동
        changeColor(j,cur_i-1);
        await sleep(500);
        cur_i -= 1; // 왼쪽으로 이동
      }
    }
    result.style.display = 'flex';
    result.innerHTML += ladder_arr[0][i_col] + ' => ' + ladder_arr[rows - 1][cur_i] + '</br>';
    i_col += 2;
  }
  next_result.disabled=false;
};


const resetLadder = () => {
  const ladder = document.getElementById("ladder");
  const input_player = document.getElementById("input_players");
  const input_dest = document.getElementById('input_destinations');
  const numOfplayers = document.getElementById('numOfplayers');
  const numberBtn = document.getElementById('numOfplayers');
  const settingBtn = document.getElementById('setting');
  const result = document.getElementById("ladder_result");

  numOfplayers.value = "";
  ladder.innerHTML = "";
  input_player.innerHTML = "";
  input_dest.innerHTML = "";
  numberBtn.disabled = false;
  settingBtn.disabled = false;
  resultBtn.disabled = false;
  result.innerHTML = "";
  result.style.display = "none";
}

