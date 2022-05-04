//initial data

let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}

let player = 'x';
let warning = '';
let playing = false;
let player1Win = 0
let player2Win = 0

reset()

//events
//reiniciar o jogo
document.querySelector('.reset').addEventListener('click', reset);
//adiciona qual função será executada nos espaços do X e O no jogo
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick)
})

//functions
function itemClick(e) {
    //pegar o atributo de cada item clicado 
    let item = e.target.getAttribute('data-item');
    //percorrer o square e marcar o espaço vazio clicado de acordo com a vez do jogador
    if (playing && square[item] === '') {
        square[item] = player
        renderSquare()
        togglePlayer()
    }
}

//reiniciar o jogo
function reset() {
    //esvaziar o aviso de vencedor ou empate
    warning = '';
    //definir aleatoriamente quem será o próximo a jogar
    let random = Math.floor(Math.random() * 2);
    //definir proximo jogador de acordo com quem venceu. se der empate, definir aleatoriamente proximo jogador
    player = (checkWinnerFor('x')) ? 'x' : (checkWinnerFor('o')) ? 'o' : player = (random === 0) ? 'x' : 'o'

    //zerar o tabuleiro
    for (let i in square) {
        square[i] = ''
    }

    //iniciar o jogo
    playing = true;

    renderSquare();
    renderInfo();
}

//percorrer o tabuleiro e verificar se em cada elemento tem algo preenchido, se não tiver, pode preencher.
function renderSquare() {
    for (let i in square) {
        //com o data-item${i} eu pego o item especifico dali 
        let item = document.querySelector(`div[data-item=${i}]`)
        item.innerHTML = square[i];
    }

    checkGame();
}

//informações do jogo (vez / vitória ou empate)
function renderInfo() {
    document.querySelector('.vez').innerHTML = player
    document.querySelector('.resultado').innerHTML = warning
    document.querySelector('.player1').innerHTML = player1Win
    document.querySelector('.player2').innerHTML = player2Win
}

//alternar o jogador
function togglePlayer() {
    //se for a vez de X, mude para O. se for a vez de O, mude para X
    player = (player === 'x') ? 'o' : 'x'
    //exibir de quem é a vez
    renderInfo()
}
//verificar quem venceu ou se deu empate
function checkGame() {
    if (checkWinnerFor('x')) {
        warning = 'O "x" venceu'
        playing = false;
        player1Win++
    } else if (checkWinnerFor('o')) {
        warning = 'O "o" venceu'
        playing = false;
        player2Win++
    } //conferir se tudo está preenchido para dar empate
    else if (isFull()) {
        warning = 'Deu empate!'
        playing = false;
    }
}

//definir todas as possibilidade de vitória
function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'c1,b2,a3',
    ];

    //verificar se o player preencheu alguma destas opções
    for (let w in pos) {
        //por estar separando os itens com vírgula, vou gerar um array com o split para verificar cada uma das possibilidades individualmente
        let pArray = pos[w].split(','); //a1, a2, a3... b1, b2, b3...

        //every é uma função que roda no array. Esta condição será aplicada a todos os itens do array, se derem true, quer dizer que a condição foi satisfeita
        //se o meu tabuleiro(square) estiver preenchido(option) por um jogador só (player), irá dar true.
        let hasWon = pArray.every(option => square[option] === player) //simplificou um if que era apenas de true or false

        //caso ache algum vencedor, retornar true
        if (hasWon) {
            return true;
        }
    }

    //caso não ache nenhum vencedor, retornar false
    return false;
}

function isFull() {
    for (let i in square) {
        //se algum lugar do square estiver vazio, não precisa executar a função
        if (square[i] === '') {
            return false;
        }
    }
    //se todos os lugares estiverem preenchidos, executar a função
    return true;
}

