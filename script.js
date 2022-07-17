function startGame() {
    const container = document.querySelector('.container');
    const content = document.createElement('div');
    content.classList.add('content', 'close');

    const stack = [];
    let prewCard = [];

    let scores = 0;
    let scoreToWin = null;

    let choices = [];

    let startingForm = createForm();
    container.append(startingForm.form);

    startingForm.inputBtn.addEventListener('click', getTotalCards);

    function getTotalCards(e) {
        e.preventDefault();
        let value = Number(startingForm.input.value);
        if (value <= 0 || value > 10 || value % 2 !== 0) {
            startingForm.input.value = '4'
            return;
        };
        let totalCards = value * value;
        for (let i = 1; i <= totalCards / 2; i++) {
            choices.push(i);
            choices.push(i);
        };
        scoreToWin = value;
        gameStarted(totalCards);
    };

    function gameStarted(value) {
        startingForm.form.classList.add('close');
        container.append(content);
        for (let i = 1; i <= value; i++) {
            const card = document.createElement('div');
            card.dataset.value = getRandomNumber(value / 2);
            card.classList.add('block');
            getEvent(card);
            content.append(card);
        };

        setTimeout(() => {
            content.classList.remove('close');
        }, 1000);
    };

    function getUserCard(e) {
        if (prewCard.length > 1) return;

        const current = e.target;
        const currentValue = current.dataset.value;
        current.classList.add('is-open');
        current.textContent = currentValue;

        current.removeEventListener('click', getUserCard);
        prewCard.push(current);

        if (stack.length === 0) {
            stack.push(currentValue);
        } else if (stack[0] === currentValue) {
            scores += 1;
            prewCard = [];
            stack.pop();
        } else {
            setTimeout(() => {
                prewCard.forEach((item) => {
                    item.classList.remove('is-open');
                    item.textContent = '';
                    getEvent(item);
                    prewCard = [];
                    stack.pop();
                });
            }, 1000);
        };

        if (scores === scoreToWin) restartGame();
    };

    function getEvent(eventList) {
        eventList.addEventListener('click', getUserCard);
    };

    function createForm() {
        const form  = document.createElement('form');
        const input = document.createElement('input');
        const inputBtn = document.createElement('button');
        
        form.classList.add('input-group', 'input-group-lg', 'w-50', 'open');
        input.classList.add('form-control');
        input.placeholder = 'Enter the number of cards from 2 to 10';
        input.type = 'number';
        inputBtn.classList.add('btn', 'btn-primary');
        inputBtn.textContent = 'Start Game';

        form.append(input);
        form.append(inputBtn);

        return {
            form,
            input,
            inputBtn,
        };
    };

    function restartGame() {
        const button = document.createElement('button');
        button.classList.add('btn','btn-primary', 'btn-lg', 'mt-5', 'btn-anim', 'absolute-bottom');
        button.textContent = 'Start New Game';
        container.append(button);
        setTimeout(() => {button.classList.remove('btn-anim')},1000);
        button.addEventListener('click', () => {
            button.classList.add('btn-anim');
            content.classList.add('close');
            setTimeout(() => {
                container.innerHTML = '';
                startGame();
            }, 2000);
        });
    };

    function getRandomNumber() {
        let randomNumber = choices[Math.floor(Math.random() * (choices.length - 0)) + 0];
        choices.splice(choices.indexOf(randomNumber), 1);
        return randomNumber;
    };

};

document.addEventListener('DOMContentLoaded', startGame);

