// Rock Paper Scissors Game Logic

class RockPaperScissors {
    constructor() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.choices = ['rock', 'paper', 'scissors'];
        this.choiceIcons = {
            rock: 'fas fa-hand-rock',
            paper: 'fas fa-hand-paper',
            scissors: 'fas fa-hand-scissors'
        };
        this.choiceNames = {
            rock: 'Piedra',
            paper: 'Papel',
            scissors: 'Tijera'
        };
        
        this.initializeGame();
    }

    initializeGame() {
        // Get DOM elements
        this.playerScoreElement = document.getElementById('playerScore');
        this.computerScoreElement = document.getElementById('computerScore');
        this.playerChoiceElement = document.getElementById('playerChoice');
        this.computerChoiceElement = document.getElementById('computerChoice');
        this.resultCard = document.getElementById('resultCard');
        this.resultText = document.getElementById('resultText');
        this.resetBtn = document.getElementById('resetBtn');
        this.choiceButtons = document.querySelectorAll('.btn-choice');

        // Add event listeners
        this.choiceButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const choice = e.currentTarget.getAttribute('data-choice');
                this.playRound(choice);
            });
        });

        this.resetBtn.addEventListener('click', () => {
            this.resetGame();
        });

        // Initialize display
        this.updateDisplay();
    }

    playRound(playerChoice) {
        // Disable buttons temporarily
        this.setButtonsEnabled(false);
        
        // Generate computer choice
        const computerChoice = this.getComputerChoice();
        
        // Show loading animation
        this.showLoadingAnimation();
        
        // Simulate thinking time
        setTimeout(() => {
            // Display choices
            this.displayChoices(playerChoice, computerChoice);
            
            // Determine winner
            const result = this.determineWinner(playerChoice, computerChoice);
            
            // Update scores
            this.updateScores(result);
            
            // Show result
            this.showResult(result, playerChoice, computerChoice);
            
            // Re-enable buttons
            this.setButtonsEnabled(true);
        }, 1500);
    }

    getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * this.choices.length);
        return this.choices[randomIndex];
    }

    determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return 'tie';
        }

        const winConditions = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
        };

        if (winConditions[playerChoice] === computerChoice) {
            return 'win';
        } else {
            return 'lose';
        }
    }

    updateScores(result) {
        if (result === 'win') {
            this.playerScore++;
            this.animateScore(this.playerScoreElement);
        } else if (result === 'lose') {
            this.computerScore++;
            this.animateScore(this.computerScoreElement);
        }
        
        this.updateDisplay();
    }

    animateScore(element) {
        element.classList.add('score-update');
        setTimeout(() => {
            element.classList.remove('score-update');
        }, 500);
    }

    displayChoices(playerChoice, computerChoice) {
        // Update player choice
        this.playerChoiceElement.innerHTML = `<i class="${this.choiceIcons[playerChoice]} text-primary"></i>`;
        this.playerChoiceElement.classList.add('active');
        
        // Update computer choice
        this.computerChoiceElement.innerHTML = `<i class="${this.choiceIcons[computerChoice]} text-danger"></i>`;
        this.computerChoiceElement.classList.add('active');

        // Clear previous winner/loser classes
        this.playerChoiceElement.classList.remove('winner', 'loser');
        this.computerChoiceElement.classList.remove('winner', 'loser');

        // Add winner/loser effects
        setTimeout(() => {
            const result = this.determineWinner(playerChoice, computerChoice);
            if (result === 'win') {
                this.playerChoiceElement.classList.add('winner');
                this.computerChoiceElement.classList.add('loser');
            } else if (result === 'lose') {
                this.computerChoiceElement.classList.add('winner');
                this.playerChoiceElement.classList.add('loser');
            }
        }, 200);
    }

    showLoadingAnimation() {
        // Reset choice displays
        this.playerChoiceElement.classList.remove('active', 'winner', 'loser');
        this.computerChoiceElement.classList.remove('active', 'winner', 'loser');
        
        // Show loading
        this.playerChoiceElement.innerHTML = '<i class="fas fa-question text-muted"></i>';
        this.computerChoiceElement.innerHTML = '<i class="fas fa-cog loading text-muted"></i>';
        
        // Hide result card
        this.resultCard.style.display = 'none';
        this.resultCard.className = 'card mb-4 shadow-lg';
    }

    showResult(result, playerChoice, computerChoice) {
        let resultMessage = '';
        let cardClass = '';

        switch (result) {
            case 'win':
                resultMessage = `¡Ganaste! ${this.choiceNames[playerChoice]} vence a ${this.choiceNames[computerChoice]}`;
                cardClass = 'win';
                break;
            case 'lose':
                resultMessage = `¡Perdiste! ${this.choiceNames[computerChoice]} vence a ${this.choiceNames[playerChoice]}`;
                cardClass = 'lose';
                break;
            case 'tie':
                resultMessage = `¡Empate! Ambos eligieron ${this.choiceNames[playerChoice]}`;
                cardClass = 'tie';
                break;
        }

        this.resultText.innerHTML = `<i class="fas fa-${this.getResultIcon(result)} me-2"></i>${resultMessage}`;
        this.resultCard.className = `card mb-4 shadow-lg ${cardClass} show`;
    }

    getResultIcon(result) {
        switch (result) {
            case 'win':
                return 'trophy';
            case 'lose':
                return 'times-circle';
            case 'tie':
                return 'handshake';
            default:
                return 'question';
        }
    }

    setButtonsEnabled(enabled) {
        this.choiceButtons.forEach(button => {
            button.disabled = !enabled;
            if (!enabled) {
                button.classList.add('disabled');
            } else {
                button.classList.remove('disabled');
            }
        });
    }

    updateDisplay() {
        this.playerScoreElement.textContent = this.playerScore;
        this.computerScoreElement.textContent = this.computerScore;
    }

    resetGame() {
        // Reset scores
        this.playerScore = 0;
        this.computerScore = 0;
        
        // Reset display
        this.updateDisplay();
        
        // Reset choice displays
        this.playerChoiceElement.innerHTML = '<i class="fas fa-question text-muted"></i>';
        this.computerChoiceElement.innerHTML = '<i class="fas fa-question text-muted"></i>';
        this.playerChoiceElement.className = 'choice-display bg-light rounded-circle mx-auto mb-3';
        this.computerChoiceElement.className = 'choice-display bg-light rounded-circle mx-auto mb-3';
        
        // Hide result card
        this.resultCard.style.display = 'none';
        this.resultCard.className = 'card mb-4 shadow-lg';
        
        // Re-enable buttons
        this.setButtonsEnabled(true);
        
        // Show reset confirmation
        this.showResetConfirmation();
    }

    showResetConfirmation() {
        const originalBtnText = this.resetBtn.innerHTML;
        this.resetBtn.innerHTML = '<i class="fas fa-check"></i> ¡Reiniciado!';
        this.resetBtn.classList.remove('btn-outline-danger');
        this.resetBtn.classList.add('btn-success');
        
        setTimeout(() => {
            this.resetBtn.innerHTML = originalBtnText;
            this.resetBtn.classList.remove('btn-success');
            this.resetBtn.classList.add('btn-outline-danger');
        }, 1500);
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RockPaperScissors();
});

// Add some keyboard support
document.addEventListener('keydown', (e) => {
    const keyMap = {
        'r': 'rock',
        'p': 'paper',
        's': 'scissors',
        '1': 'rock',
        '2': 'paper',
        '3': 'scissors'
    };
    
    const choice = keyMap[e.key.toLowerCase()];
    if (choice) {
        const button = document.querySelector(`[data-choice="${choice}"]`);
        if (button && !button.disabled) {
            button.click();
        }
    }
    
    // Reset with space or escape
    if (e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        document.getElementById('resetBtn').click();
    }
});