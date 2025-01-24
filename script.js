let randomNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 7;
let currentScore = 0;
let highScore = 0;

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 7;
    document.getElementById('attempts').textContent = `Attempts left: ${attemptsLeft}`;
    document.getElementById('message').textContent = '';
    document.getElementById('guessInput').disabled = false;
    document.getElementById('submitBtn').disabled = false;
}

function submitGuess() {
    const inputField = document.getElementById('guessInput');
    const message = document.getElementById('message');
    const attemptsDisplay = document.getElementById('attempts');
    const scoreDisplay = document.getElementById('score');
    const highScoreDisplay = document.getElementById('highScore');

    const guess = parseInt(inputField.value, 10);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }

    if (guess === randomNumber) {
        let points = 0;

        // Assign points based on the number of attempts used
        switch (attemptsLeft) {
            case 7:
                points = 10;
                break;
            case 6:
                points = 8;
                break;
            case 5:
                points = 5;
                break;
            case 4:
                points = 4;
                break;
            case 3:
                points = 3;
                break;
            case 2:
                points = 2;
                break;
            case 1:
                points = 1;
                break;
        }

        currentScore += points;
        highScore = Math.max(highScore, currentScore);

        message.textContent = `🎉 You Won! You earned ${points} points!`;
        message.style.color = 'green';

        scoreDisplay.textContent = `Score: ${currentScore}`;
        highScoreDisplay.textContent = `High Score: ${highScore}`;

        inputField.disabled = true;
        document.getElementById('submitBtn').disabled = true;

        // Automatically reset the game after 3 seconds
        setTimeout(resetGame, 3000);

    } else {
        attemptsLeft--;

        if (attemptsLeft > 0) {
            message.textContent = guess < randomNumber ? 'Too low! Try again.' : 'Too high! Try again.';
            message.style.color = 'red';
            attemptsDisplay.textContent = `Attempts left: ${attemptsLeft}`;
        } else {
            message.textContent = `💔 Game Over! The correct number was ${randomNumber}.`;
            message.style.color = 'red';

            inputField.disabled = true;
            document.getElementById('submitBtn').disabled = true;

            // Automatically reset the game after 3 seconds
            setTimeout(resetGame, 3000);
        }
    }

    inputField.value = ''; // Clear input after each guess
}