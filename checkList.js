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

const init = () => renderCheckboxes(); 

const renderCheckboxes = () => {
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

const checkNumer = (name_id) => {
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
    init();
});

init();