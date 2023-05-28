const numberBtn = document.getElementById('numOfplayers');
const settingBtn = document.getElementById('setting');
const startBtn = document.getElementById('start');

export const ladderData = {};
let numOfplayers = 0;
let ladder_arr;

settingBtn.addEventListener('click', () => settingPlayer())
startBtn.addEventListener('click', () => init())


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

    Array.from({ length: numOfplayers }, (_, i) => {
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", `player-${i + 1}`);
        input.setAttribute("placeholder", `player-${i + 1}`);

        const destInput = document.createElement("input");
        destInput.setAttribute("type", "text");
        destInput.setAttribute("id", `destination-${i + 1}`);
        destInput.setAttribute("placeholder", `destination-${i + 1}`);

        input_player.appendChild(input);
        input_dest.appendChild(destInput);
    });

}

const init = () => {
    createLadder();
    renderLadder();
}

const createLadder = () => {
    const playerNames = [];
    const destinations = [];
    let index_play = 0;
    let index_dest = 0;

    Array.from({ length: numOfplayers }, (_, i) => i + 1).forEach((i) => {
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
    });

    if (playerNames.length != numOfplayers || destinations.length != numOfplayers) {
        alert("빈칸이 있다임마");
        return;
    }

    const rows = playerNames.length * 2 + 3;
    const cols = playerNames.length * 2 - 1;
    ladder_arr = Array.from(Array(rows), () => new Array(cols));
    
    Array.from({ length: rows }, (_, i) => {
        Array.from({ length: cols }, (_, j) => {
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
        });
    });

    const random_ladder = Math.floor(cols / 2);
    const start = 2;
    const end = rows - 2;

    Array.from({ length: end - start }, (_, index) => start + index).forEach(i => {
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

        Array.from({ length : nums.length}, (_, k) => {
            ladder_arr[i][2 * nums[k] - 1] = "───";
            ladder_arr[i][2 * nums[k] - 1 - 1] = "├";
            ladder_arr[i][2 * nums[k] - 1 + 1] = "┤";
        });
    });


    console.log(ladder_arr);

    ladderData.rows = rows;
    ladderData.cols = cols;
    ladderData.ladder_arr = ladder_arr;
}


const renderLadder = () => {
    const ladder = document.getElementById('ladder');
    ladder.innerHTML = "";
    let ladder_print = document.createElement("table");
    Array.from({ length: ladder_arr.length }, (_,i) => {
        let row = ladder_print.insertRow();
        Array.from({ length: ladder_arr[i].length }, (_,j) => {
            let cell = row.insertCell();
            cell.innerHTML = ladder_arr[i][j];
            cell.setAttribute("id", `${i},${j}`);
        });
    });

    ladder.appendChild(ladder_print);
}



