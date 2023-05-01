const users = [
    { name: '김민경', sex: 'female', checked: false },
    { name: '진영주', sex: 'female', checked: false },
    { name: '이성민', sex: 'female', checked: false },
    { name: '안혜주', sex: 'female', checked: false },
    { name: '이진환', sex: 'male', checked: false },
    { name: '피재호', sex: 'male', checked: false },
    { name: '박순필', sex: 'male', checked: false },
    { name: '안영재', sex: 'male', checked: false },
    { name: '박세형', sex: 'male', checked: false },
    { name: '이동우', sex: 'male', checked: false },
    { name: '김준영', sex: 'male', checked: false },
    { name: '정만수', sex: 'male', checked: false },
    { name: '신영진', sex: 'male', checked: false },
    { name: '김성욱', sex: 'male', checked: false },
    { name: '전동엽', sex: 'male', checked: false }
];

const resetBtn = document.getElementById("reset-btn");

let countNum = 0;


init();

function init() {
    renderCheckboxes();
}

function renderCheckboxes() {
    const checkboxDiv = document.getElementById("checkboxes");
    checkboxDiv.innerHTML = "";
    let user_num = 1;
    const checkNum = document.getElementById("checknum");
    checkNum.innerText = `체크된 인원: ${countNum} 명`;

    users.forEach((user) => {
        const userElement = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `user_${user_num}`;
        checkbox.checked = user.checked;
        checkbox.addEventListener('click', () => checkNumer(user.name));

        const label = document.createElement('label');
        label.setAttribute('for', `user_${user_num++}`);
        label.textContent = user.name;

        userElement.appendChild(checkbox);
        userElement.appendChild(label);
        checkboxDiv.appendChild(userElement);

    });

}

function checkNumer(name_id) {
    const user_name = users.find(user_name => user_name.name === name_id);
    // user_name.name === name_id 인 조건을 찾아 조건에 해당하는 name을 반환한다.
    if (user_name) {
        user_name.checked = !user_name.checked;
        // 체크박스를 눌렀을 때 정보는 false이기 때문에 역으로 만들어줌
        if (user_name.checked) {
            countNum++;
        } else {
            countNum--;
        }
    }

    const checkNum = document.getElementById("checknum");
    checkNum.innerText = `체크된 인원: ${countNum} 명`;
}

resetBtn.addEventListener("click", () => {
    users.forEach((user) => {
        user.checked = false;
    });
    countNum = 0;
    const checkNum = document.getElementById("checknum");
    checkNum.innerText = `체크된 인원: ${countNum} 명`;
    renderCheckboxes();
});


const numberBtn = document.getElementById('numOfplayers');
const settingBtn = document.getElementById('setting');
let numOfplayers = 0;
let ladder_arr;
let rows, cols;

function settingPlayer() {
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

    for (let i = 1; i <= numOfplayers; i++) {
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
    }

}

function createLadder() {
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
                    ladder_arr[i][j] = 'ㅣ';
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
            ladder_arr[i][2 * nums[k] - 1] = "ㅡㅡㅡ";
            ladder_arr[i][2 * nums[k] - 1 - 1] = "ㅏ";
            ladder_arr[i][2 * nums[k] - 1 + 1] = "ㅓ";
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

function resetLadder() {
    const ladder = document.getElementById("ladder");
    const input_player = document.getElementById("input_players");
    const input_dest = document.getElementById('input_destinations');
    const numOfplayers = document.getElementById('numOfplayers');
    const result = document.getElementById("ladder_result");

    numOfplayers.value = "";
    ladder.innerHTML = "";
    input_player.innerHTML = "";
    input_dest.innerHTML = "";
    numberBtn.disabled = false;
    settingBtn.disabled = false;
    result.innerHTML = "";
    result.style.display = "none";
}

function resultLadder() {
    let cur_i = 0;
    let i_col = 0;
    const result = document.getElementById("ladder_result");
    const next_result = document.getElementById("next");
    next_result.style.display = 'flex';
    result.innerHTML = "";

    const runLoop = () => {
        console.log('cols: ' + cols);
        if (i_col < cols) {
            cur_i = i_col;
            console.log(i_col);
            console.log(cur_i);
            for (let j = 0; j < rows; j++) {
                console.log(document.getElementById(`${j},${cur_i}`));
                document.getElementById(`${j},${cur_i}`).style.color = "red";
                if (ladder_arr[j][cur_i + 1] == "ㅡㅡㅡ") {
                    document.getElementById(`${j},${cur_i + 1}`).style.color = "red";
                    console.log(document.getElementById(`${j},${cur_i + 1}`));
                    cur_i += 1;
                    document.getElementById(`${j},${cur_i + 1}`).style.color = "red";
                    console.log(document.getElementById(`${j},${cur_i + 1}`));
                    cur_i += 1;

                }
                else if (ladder_arr[j][cur_i - 1] == "ㅡㅡㅡ") {
                    console.log(document.getElementById(`${j},${cur_i - 1}`));
                    document.getElementById(`${j},${cur_i - 1}`).style.color = "red";
                    cur_i -= 1;
                    document.getElementById(`${j},${cur_i - 1}`).style.color = "red";
                    console.log(document.getElementById(`${j},${cur_i - 1}`));
                    cur_i -= 1;
                }
            }
            result.style.display = "flex";
            result.innerHTML += ladder_arr[0][i_col] + " => " + ladder_arr[rows - 1][cur_i] + '</br>';
            i_col += 2;
            console.log(" i_col= " + i_col);
        }
        // else {
        //     console.log(" i_col= " + i_col);
        //     alert('더이상 나올 데이터가 없습니다!');
        //      next_result.style.display = 'none';
        // }
    }

    next_result.addEventListener('click', () => {
        console.log(" i_col11111= " + i_col);
        const tdElements = document.getElementsByTagName('td');
        for (let j = 0; j < tdElements.length; j++) {
            tdElements[j].style.color = "black";
        }
        runLoop();
        // if (i_col > cols) {
        //     console.log(" i_col= " + i_col);
        //     alert('더이상 나올 데이터가 없습니다!');
        //     next_result.style.display = 'none';
        // }else {
        //     runLoop();
        // }
        
    });

    runLoop(); // 버튼을 누르기 전에 첫화면 결과 보여줘야댐
}