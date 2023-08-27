

$(document).ready(function() {
const cells = Array.from(Array(9).keys());
    const restartButton = $('#restart');
    const winnerAlert = $('#winner');

    let currentPlayer = 'X';
    let gameOver = false;

    function checkWinner() {
        const winningPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (cells[a] !== '' && cells[a] === cells[b] && cells[a] === cells[c]) {
                gameOver = true;
                winnerAlert.text(`${currentPlayer} wins!`).removeClass('alert-success').addClass('alert-primary');
                winnerAlert.show();
                break;
            }
        }

        if (!gameOver && cells.every(cell => cell !== '')) {
            gameOver = true;
            winnerAlert.text("It's a tie!").removeClass('alert-primary').addClass('alert-success');
            winnerAlert.show();
        }
    }

    function handleClick(cellIndex) {
        if (cells[cellIndex] === '' && !gameOver) {
            cells[cellIndex] = currentPlayer;
            $(`#cell-${cellIndex}`).html(`<span>${currentPlayer === 'X' ? 'X' : 'O'}</span>`); // Display symbols
            checkWinner();

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            $('#turnHeader').text(`${currentPlayer}'s Turn`);
        }
    }

    $('.board').html(cells.map((_, index) => `<div class="cell" id="cell-${index}"></div>`));

    $('.cell').on('click', function() {
        const cellIndex = $(this).attr('id').split('-')[1];
        handleClick(cellIndex);
    });

    restartButton.on('click', function() {
        cells.fill('');
        $('.cell').text('');
        currentPlayer = 'X';
        $('#turnHeader').text(`${currentPlayer}'s Turn`); // Reset turn header text
        winnerAlert.hide();
        gameOver = false;
    });
});