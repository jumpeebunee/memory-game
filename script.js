function createGame() {
    const container = document.querySelector('.container');
    const content = document.createElement('div');
    
    let prewCard = [];
    
    const stack = [];
    const gameCards = [];
    
    let scores = 0;
    let scoreToWin = null;    

    const gameForm = createForm();

    container.append(gameForm.form);
    gameForm.inputBtn.addEventListener('click', getTotalCards);

    function createForm() {

        const form  = document.createElement('form');
        const input = document.createElement('input');
        const inputBtn = document.createElement('button');
        
        form.classList.add('input-group', 'input-group-lg', 'w-50', 'form');
        input.classList.add('form-control');
        input.placeholder = 'Enter the number of cards from 2 to 10';
        input.type = 'number';
        inputBtn.classList.add('btn', 'btn-primary');
        inputBtn.textContent = 'Start Game';

        setTimeout(() => form.classList.add('form-anim'), 500);
    
        form.append(input);
        form.append(inputBtn);
    
        return {
            form,
            input,
            inputBtn,
        };
    
    };

    function getTotalCards(e) {

        e.preventDefault();
        const input = document.querySelector('input')
        const value = Number(input.value);
    
        if (value <= 0 || value > 10 || value % 2 !== 0) {
            input.value = 4;
            return;
        };
    
        const totalCards = value * value;
        scoreToWin = value;
    
        for (let i = 1; i <= totalCards / 2; i++) {
            gameCards.push(i);
            gameCards.push(i);
        };
    
        gameStart(totalCards);
    
    };

    function gameStart(value) {

        const form = document.querySelector('form');
    
        content.classList.add('content');
        form.classList.remove('form-anim');
    
        container.append(content);
    
        for (let i = 1; i <= value; i++) {
            createCardElem(content);
        };
    
        setTimeout(() => content.classList.add('content-open'), 500);
    
    };

    function createCardElem(content) {
        const card = document.createElement('div');
        card.classList.add('block');
        card.dataset.value = getRandomNumber();
        chooseCard(card);
        content.append(card);
    };
    
    function getRandomNumber() {
        let randomNumber = gameCards[Math.floor(Math.random() * (gameCards.length - 0)) + 0];
        gameCards.splice(gameCards.indexOf(randomNumber), 1);
        return randomNumber;
    };
    
    function chooseCard(card) {
        card.addEventListener('click', getUserCard);
    };
     
    function getUserCard(e) {
    
        if (prewCard.length > 1) return;
    
        const current = e.target;
        const currentValue = current.dataset.value;
    
        current.classList.add('card-open');
        current.textContent = currentValue;
        current.removeEventListener('click', getUserCard);
        prewCard.push(current);
    
        checkUserCard(currentValue);
        if (scores === scoreToWin) restartGame();
    
    };
    

    function checkUserCard(currentValue) {
        if (stack.length === 0) {
            stack.push(currentValue);
        } else if (stack[0] === currentValue) {
            scores += 1;
            prewCard = [];
            stack.pop();
        }  else {
            setTimeout(() => {
                prewCard.forEach((item) => {
                    item.classList.remove('card-open');
                    item.textContent = '';
                    chooseCard(item);
                    prewCard = [];
                    stack.pop();
                });
            }, 1000);
        };
    };
    
    function restartGame() {
    
        const button = document.createElement('button');
    
        button.classList.add('btn','btn-primary', 'btn-lg', 'mt-5', 'btn-restart', 'absolute-bottom');
        button.textContent = 'Start New Game';
        container.append(button);
    
        setTimeout(() => button.classList.add('btn-restart-anim'), 1000);
        button.addEventListener('click', () => clickToButton(button));
    
    };
    
    function clickToButton(button) {
        button.classList.remove('btn-restart-anim');
        content.classList.remove('content-open');
        setTimeout(() => {
            container.innerHTML = '';
            createGame();
        }, 1500);
    };
    
};

document.addEventListener('DOMContentLoaded', createGame);

