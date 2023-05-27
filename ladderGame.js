const numberBtn = document.getElementById('numOfplayers');
const settingBtn = document.getElementById('setting');
const startBtn = document.getElementById('start');

export let ladderData = {};
let numOfplayers = 0;
let ladder_arr;

settingBtn.addEventListener('click', () => settingPlayer())
startBtn.addEventListener('click', () => createLadder())


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
        input.setAttribute("id", `player-${i+1}`);
        input.setAttribute("placeholder", `player-${i+1}`);

        const destInput = document.createElement("input");
        destInput.setAttribute("type", "text");
        destInput.setAttribute("id", `destination-${i+1}`);
        destInput.setAttribute("placeholder", `destination-${i+1}`);

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

    const rows = playerNames.length * 2 + 3;
    const cols = playerNames.length * 2 - 1;

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
    for (let i = 2; i < rows - 2; i++) {
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

    ladderData.rows = rows;
    ladderData.cols = cols;
    ladderData.ladder_arr = ladder_arr;
}

   

