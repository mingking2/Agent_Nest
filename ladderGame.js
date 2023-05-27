const numberBtn = document.getElementById('numOfplayers');
const settingBtn = document.getElementById('setting');
let numOfplayers = 0;
let ladder_arr;
let rows, cols;

settingBtn.addEventListener('click', () => {
    settingPlayer();
})

const settingPlayer = () => {
    numOfplayers = document.getElementById('numOfplayers').value;
    if (numOfplayers < 3 || numOfplayers > 100) {
        alert("플레이어의 수가 에바임");
        return;
    }

    numberBtn.disabled = true;
    settingBtn.disabled = true;
    const input_player = document.getElementById("input_players");
    const input_dest = document.getElementById('input_destinations');

    input_player.innerHTML = "";
    input_dest.innerHTML = "";

    Array.from({ length: numOfplayers }, (_,i) => {
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", `player-${i}`);
        input.setAttribute("placeholder", `player-${i}`);

        const destInput = document.createElement("input");
        destInput.setAttribute("type", "text");
        destInput.setAttribute("id", `destination-${i}`);
        destInput.setAttribute("placeholder", `destination-${i}`);

        input_player.appendChild(input);
        input_dest.appendChild(destInput);
    });

}

const createLadder = () => {
    const playerNames = [];
    const destinations = [];
    let index_play = 0;
    let index_dest = 0;

    for (let i = 1; i <= numOfplayers; i++) {
        const inputElement = document.getElementById(`player-${i}`);
        if (inputElement.value) {
            playerNames.push(inputElement.value);
            inputElement.disabled = true;
        }
        const destElement = document.getElementById(`destination-${i}`);
        if (destElement.value) {
            destinations.push(destElement.value);
            destElement.disabled = true;
        }
    }

    if (playerNames.length != numOfplayers || destinations.length != numOfplayers) {
        alert("빈칸이 있다임마");
        return;
    }

    rows = playerNames.length * 2;
    cols = playerNames.length * 2 - 1;

    ladder_arr = Array.from(Array(rows), () => new Array(cols));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (j % 2 === 0) {
                if (i === 0) {
                    ladder_arr[i][j] = playerNames[index_play++];
                } else if (i === rows - 1) {
                    ladder_arr[i][j] = destinations[index_dest++];
                } else {
                    ladder_arr[i][j] = '│';
                }
            } else {
                ladder_arr[i][j] = " ";
            }
        }
    }


    const random_ladder = Math.floor(cols / 2);
    for (let i = 1; i < rows - 1; i++) {
        let min = 1;
        let max = random_ladder;
        let nums = [];

        while (nums.length < random_ladder) {
            let num = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!nums.includes(num)) {
                if ((!nums.includes(num + 1) && !nums.includes(num - 1))) {
                    nums.push(num);
                }
            } else {
                break;
            }
        }

        console.log(nums);

        for (let k = 0; k < nums.length; k++) {
            ladder_arr[i][2 * nums[k] - 1] = "───";
            ladder_arr[i][2 * nums[k] - 1 - 1] = "├";
            ladder_arr[i][2 * nums[k] - 1 + 1] = "┤";
        }
    }


    console.log(ladder_arr);

    //출력
    ladder.innerHTML = "";
    let ladder_print = document.createElement("table");
    for (let i = 0; i < ladder_arr.length; i++) {
        let row = ladder_print.insertRow();
        for (let j = 0; j < ladder_arr[i].length; j++) {
            let cell = row.insertCell();
            cell.innerHTML = ladder_arr[i][j];
            cell.setAttribute("id", `${i},${j}`);
        }
    }

    ladder.appendChild(ladder_print);

}

const resetLadder = () => {
    const ladder = document.getElementById("ladder");
    const input_player = document.getElementById("input_players");
    const input_dest = document.getElementById('input_destinations');
    const numOfplayers = document.getElementById('numOfplayers');
    const result = document.getElementById("ladder_result");
    const result_btn = document.getElementById('result');
    result_btn.removeEventListener('click',resultLadder);

    numOfplayers.value = "";
    ladder.innerHTML = "";
    input_player.innerHTML = "";
    input_dest.innerHTML = "";
    numberBtn.disabled = false;
    settingBtn.disabled = false;
    result_btn.disabled = false;
    result.innerHTML = "";
    result.style.display = "none";
}

const resultLadder = () => {
    let cur_i = 0;
    let i_col = 0;

    const result = document.getElementById("ladder_result");
    const next_result = document.getElementById("next");
    const result_btn = document.getElementById('result');
    next_result.style.display = 'flex';
    result.innerHTML = "";
    
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      
    const runLoop = async () => {
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
            result_btn.disabled = true;
            result_btn.removeEventListener('click', resultLadder);
        } else {
            runLoop();
        }
    });


    runLoop(); // 버튼을 누르기 전에 첫화면 결과 보여줘야댐
}