
// 1. Array de palavras e suas informações
const palavras = [
    {
        palavra: "javascript",
        categoria: "Tecnologia",
        dica: "Linguagem de programação muito utilizada na Web."
    },
    {
        palavra: "computador",
        categoria: "Tecnologia",
        dica: "Máquina utilizada para executar programas."
    },
    {
        palavra: "internet",
        categoria: "Tecnologia",
        dica: "Rede mundial que conecta dispositivos."
    },
    {
        palavra: "teclado",
        categoria: "Tecnologia",
        dica: "Utilizado para digitar no computador."
    },
    {
        palavra: "navegador",
        categoria: "Tecnologia",
        dica: "Programa utilizado para acessar sites."
    },
    {
        palavra: "elefante",
        categoria: "Animais",
        dica: "Animal grande que possui uma tromba."
    },
    {
        palavra: "borboleta",
        categoria: "Animais",
        dica: "Inseto conhecido pelas asas coloridas."
    },
    {
        palavra: "girassol",
        categoria: "Natureza",
        dica: "Flor que acompanha a direção do sol."
    },
    {
        palavra: "abacaxi",
        categoria: "Alimentos",
        dica: "Fruta tropical com casca áspera."
    },
    {
        palavra: "chocolate",
        categoria: "Alimentos",
        dica: "Doce feito a partir do cacau."
    },
    {
        palavra: "biblioteca",
        categoria: "Lugares",
        dica: "Lugar onde encontramos muitos livros."
    },
    {
        palavra: "montanha",
        categoria: "Natureza",
        dica: "Grande elevação natural do terreno."
    }
];

// 2. Variáveis que controlam o estado do jogo
let palavraSecreta;
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = 6;
let jogoFinalizado = false;

// 3. Localização dos elementos HTML pelo DOM
const elementoPalavra = document.getElementById("palavra");
const elementoTentativas = document.getElementById("tentativas");
const elementoCategoria = document.getElementById("categoria");
const elementoDica = document.getElementById("dica");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");
const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");

// 4. Função para iniciar ou reiniciar uma partida
function iniciarJogo() {

    // Escolhe uma palavra aleatória do array
    const indice = Math.floor(Math.random() * palavras.length);
    const escolha = palavras[indice];

    // Atualiza a palavra secreta
    palavraSecreta = escolha.palavra;

    // Reinicia as variáveis da partida
    tentativas = 6;
    letrasCorretas = [];
    letrasUsadas = [];
    jogoFinalizado = false;

    // Atualiza as informações exibidas na página
    elementoCategoria.textContent = escolha.categoria;
    elementoDica.textContent = escolha.dica;
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = "Nenhuma";

    // Limpa o campo e a mensagem anterior
    inputLetra.value = "";
    mensagem.textContent = "Boa sorte! Descubra a palavra secreta.";

    // Libera os controles para uma nova partida
    inputLetra.disabled = false;
    botaoTentar.disabled = false;

    // Atualiza a palavra escondida
    atualizarPalavra();

    // Coloca o cursor no campo de digitação
    inputLetra.focus();
}

// 5. Função para mostrar as letras descobertas
function atualizarPalavra() {

    let exibicao = "";

    // Percorre todas as letras da palavra secreta
    for (let i = 0; i < palavraSecreta.length; i++) {

        const letra = palavraSecreta[i];

        // Verifica se a letra já foi descoberta
        if (letrasCorretas.includes(letra)) {
            exibicao += letra + " ";
        } else {
            exibicao += "_ ";
        }
    }

    // Mostra o resultado na página
    elementoPalavra.textContent = exibicao.trim();
}

// 6. Função para verificar se o jogador venceu
function venceu() {

    // Percorre todas as letras da palavra
    for (let i = 0; i < palavraSecreta.length; i++) {

        const letra = palavraSecreta[i];

        // Verifica se ainda existe alguma letra escondida
        if (!letrasCorretas.includes(letra)) {
            return false;
        }
    }

    // Todas as letras foram descobertas
    return true;
}

// 7. Função para verificar a letra digitada
function verificarLetra() {

    // Impede novas tentativas depois do fim da partida
    if (jogoFinalizado) {
        return;
    }

    // Obtém a letra digitada e transforma em minúscula
    const letra = inputLetra.value.trim().toLowerCase();

    // Verifica se foi digitada uma letra válida
    if (!/^[a-z]$/.test(letra)) {
        mensagem.textContent = "Digite apenas uma letra de A a Z.";
        inputLetra.value = "";
        inputLetra.focus();
        return;
    }

    // Impede que uma letra seja utilizada novamente
    if (letrasUsadas.includes(letra)) {
        mensagem.textContent = "Essa letra já foi utilizada!";
        inputLetra.value = "";
        inputLetra.focus();
        return;
    }

    // Adiciona a letra ao array de letras utilizadas
    letrasUsadas.push(letra);

    // Verifica se a letra existe na palavra secreta
    if (palavraSecreta.includes(letra)) {

        letrasCorretas.push(letra);

        mensagem.textContent = "Parabéns! Você acertou!";

    } else {

        // Diminui uma tentativa quando a letra está errada
        tentativas--;

        mensagem.textContent = "Você errou! Tente novamente.";
    }

    // Atualiza as informações mostradas na página
    atualizarPalavra();

    elementoTentativas.textContent = tentativas;

    elementoLetrasUsadas.textContent = letrasUsadas.join(", ");

    // Limpa o campo de digitação
    inputLetra.value = "";

    // Verifica se o jogador venceu
    if (venceu()) {

        mensagem.textContent = "Parabéns! Você venceu!";

        finalizarJogo();

    } else if (tentativas === 0) {

        // Verifica se todas as tentativas acabaram
        mensagem.textContent = "Você perdeu! A palavra era: " + palavraSecreta;

        finalizarJogo();

    } else {

        // Mantém o cursor no campo para a próxima tentativa
        inputLetra.focus();
    }
}

// 8. Função para finalizar a partida
function finalizarJogo() {

    jogoFinalizado = true;

    // Desativa os controles de tentativa
    botaoTentar.disabled = true;
    inputLetra.disabled = true;
}

// 9. Eventos dos botões
botaoTentar.addEventListener("click", verificarLetra);

botaoReiniciar.addEventListener("click", iniciarJogo);

// 10. Evento para tentar uma letra utilizando Enter
inputLetra.addEventListener("keydown", function(evento) {

    if (evento.key === "Enter") {
        verificarLetra();
    }
});

// 11. Inicia a primeira partida automaticamente
iniciarJogo();
