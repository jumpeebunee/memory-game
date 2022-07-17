function startGame() {
    const container = document.querySelector('.container');
    const content = document.createElement('div');
    content.classList.add('content', 'content-close');

    const stack = [];
    let prewCard = [];
    let scores = 0;

    let choices = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

    gameStarted();

    function gameStarted() {
        container.append(content);
        for (let i = 1; i <= 16; i++) {
            const card = document.createElement('div');
            card.dataset.value = getRandomNumber();
            card.classList.add('block');
            getEvent(card);
            content.append(card);
        };
        setTimeout(() => content.classList.remove('content-close'), 1000);
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
        console.log(scores)

        if (scores === 1) restartGame();
    };

    function getEvent(eventList) {
        eventList.addEventListener('click', getUserCard);
    };

    function restartGame() {
        const button = document.createElement('button');
        button.classList.add('btn','btn-primary', 'btn-lg', 'mt-5', 'btn-anim', 'absolute-bottom');
        button.textContent = 'Start New Game';
        container.append(button);
        setTimeout(() => {button.classList.remove('btn-anim')},1000);
        button.addEventListener('click', () => {
            button.classList.add('btn-anim');
            content.classList.add('content-close');
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

