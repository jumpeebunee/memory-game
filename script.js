function startGame() {
    const container = document.querySelector('.container');
    const button = document.querySelector('.btn');
    const content = document.createElement('div');
    content.classList.add('content');

    button.addEventListener('click', startButton);

    const stack = [];
    let prewCard = [];

    let choices = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

    function startButton() {
        button.classList.add('btn-start');
        button.addEventListener('transitionend', () => starGame());
    };

    function starGame() {
        button.remove();
        container.append(content);
        for (let i = 1; i <= 16; i++) {
            const card = document.createElement('div');
            card.dataset.value = getRandomNumber();
            card.classList.add('block');
            content.append(card);
        };
    };

    function getRandomNumber() {
        let randomNumber = choices[Math.floor(Math.random() * (choices.length - 0)) + 0];
        choices.splice(choices.indexOf(randomNumber), 1);
        return randomNumber;
    };

};

document.addEventListener('DOMContentLoaded', startGame);

/*
    container.append(content);
    const stack = [];
    let arrD = []

    let arr = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

    for (let i = 1; i <= 16; i++) {
        const card = document.createElement('div');
        card.classList.add('block');
        card.dataset.value = getNumber();
        card.addEventListener('click', getCard);
        content.append(card);
    };

    function getNumber() {
        let random = arr[Math.floor(Math.random() * (arr.length - 0)) + 0];
        arr.splice(arr.indexOf(random), 1);
        return random;
    };

    function getCard(e) {

        let current = e.target;
        current.classList.add('is-open');
        current.textContent = e.target.dataset.value;

        arrD.push(e.target)

        if (stack.length === 0) { 
            stack.push(e.target.dataset.value);
        } else if (stack[0] === e.target.dataset.value) {
            arrD = [];
            stack.pop();
        } else {
            setTimeout(() => {
                arrD.forEach((item) => {
                    item.classList.remove('is-open');
                    item.textContent = '';
                    arrD = [];
                    stack.pop();
                });
            },2000)
        };

    };
*/