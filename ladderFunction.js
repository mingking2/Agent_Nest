import { rows } from "./ladderGame";
import { cols } from "./ladderGame";

const resetBtn = document.getElementById("reset");
const resultBtn = document.getElementById('result');

resetBtn.addEventListener('click', () => resetLadder())
resultBtn.addEventListener('click', () => resultLadder())

const resultLadder = () => {
    let cur_i = 0;
    let i_col = 0;

    const result = document.getElementById("ladder_result");
    const next_result = document.getElementById("next");
    next_result.style.display = 'flex';
    result.innerHTML = "";
    
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    next_result.addEventListener('click', () => { //여기서 문제가 발생함.
        console.log(" i_col11111= " + i_col);
        const tdElements = document.getElementsByTagName('td');
        for (let j = 0; j < tdElements.length; j++) {
            tdElements[j].style.color = "black";
        }
        if (i_col > cols) {
            i_col = 0;
            console.log(" i_col= " + i_col);
            alert('더이상 나올 데이터가 없습니다!');
            next_result.style.display = 'none';
            resultBtn.disabled = true;
            resultBtn.removeEventListener('click', resultLadder);
        } else {
            runLoop();
        }
    });


    runLoop(cur_i, i_col); // 버튼을 누르기 전에 첫화면 결과 보여줘야댐
}

const runLoop = async (cur_i, i_col) => {
    console.log('cols: ' + cols);
    if (i_col < cols) {
      cur_i = i_col;
      console.log(i_col);
      console.log(cur_i);
      for (let j = 0; j < rows; j++) {
        console.log(document.getElementById(`${j},${cur_i}`));
        document.getElementById(`${j},${cur_i}`).style.color = 'red';
        await sleep(500); // 0.5초 대기
        if (ladder_arr[j][cur_i + 1] == '───') {
          document.getElementById(`${j},${cur_i + 1}`).style.color = 'red';
          console.log(document.getElementById(`${j},${cur_i + 1}`));
          await sleep(500); // 0.5초 대기
          cur_i += 1; // 오른쪽으로 이동
          document.getElementById(`${j},${cur_i+1}`).style.color = 'red';
          cur_i += 1; // 오른쪽으로 이동
          console.log(document.getElementById(`${j},${cur_i}`));
        } else if (ladder_arr[j][cur_i - 1] == '───') {
          console.log(document.getElementById(`${j},${cur_i - 1}`));
          document.getElementById(`${j},${cur_i - 1}`).style.color = 'red';
          await sleep(500); // 0.5초 대기
          cur_i -= 1; // 왼쪽으로 이동
          document.getElementById(`${j},${cur_i-1}`).style.color = 'red';
          cur_i -= 1; // 왼쪽으로 이동
          console.log(document.getElementById(`${j},${cur_i}`));
        }
      }
      result.style.display = 'flex';
      result.innerHTML += ladder_arr[0][i_col] + ' => ' + ladder_arr[rows - 1][cur_i] + '</br>';
      i_col += 2;
      console.log(' i_col= ' + i_col);
    } 
  };


const resetLadder = () => {
    const ladder = document.getElementById("ladder");
    const input_player = document.getElementById("input_players");
    const input_dest = document.getElementById('input_destinations');
    const numOfplayers = document.getElementById('numOfplayers');
    const result = document.getElementById("ladder_result");
    resultBtn.removeEventListener('click',resultLadder);

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

