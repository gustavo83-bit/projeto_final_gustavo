window-alert ('ola, seja bem vindo');

function mudarTamanho() {
    if (window.innerwidth >=768) {
        itens.style.display = 'inline-block'
    } else {
        itens.style.display = 'none'
    }
}

function clickMenu() {
    if (itens.style.display == 'block') {
        itens.style.display = 'none'
    } else {
        itens.style.display = 'block'
    }
}

/**
 * ====================================
 * 1. FUNÇÃO playhihi()
 * Toca um som de áudio quando o botão 'Menu' é clicado.
 * ====================================
 */
function playhihi() {
    // 1. Encontra o elemento de áudio pelo seu ID
    const audio = document.getElementById('hihi-audio');
    
    // 2. Verifica se o elemento de áudio existe
    if (audio) {
        // Reinicia o áudio para o início (caso seja clicado rapidamente várias vezes)
        audio.currentTime = 0; 
        
        // Toca o áudio
        audio.play()
            .then(() => {
                console.log("Som de menu tocado com sucesso.");
            })
            .catch(error => {
                // Trata erros de reprodução (ex: o navegador bloqueia a reprodução automática)
                console.error("Erro ao tocar o som: ", error);
                alert("Clique no menu! (O som pode ter sido bloqueado pelo navegador)");
            });
    } else {
        console.error("Elemento de áudio com ID 'hihi-audio' não encontrado.");
    }
}


/**
 * ====================================
 * 2. FUNÇÃO searchgames()
 * Obtém o valor do campo de pesquisa e simula a ação de pesquisar.
 * ====================================
 */
function searchgames() {
    // 1. Obtém o elemento de input de pesquisa pelo seu ID
    const inputElement = document.getElementById('searchinput');
    
    // 2. Verifica se o elemento de input existe
    if (inputElement) {
        // Obtém o texto digitado pelo utilizador, removendo espaços em branco no início e fim
        const searchTerm = inputElement.value.trim(); 

        // 3. Verifica se o termo de pesquisa não está vazio
        if (searchTerm !== "") {
            // Simula o resultado da pesquisa exibindo um alerta
            alert(`A pesquisar por: "${searchTerm}". Funcionalidade de pesquisa será implementada aqui!`);
            
            // Opcional: Limpar o campo de pesquisa após a pesquisa
            // inputElement.value = ''; 
        } else {
            // Caso o utilizador clique no botão sem digitar nada
            alert("Por favor, digite o nome de um jogo para pesquisar.");
        }
    } else {
        console.error("Elemento de input com ID 'searchinput' não encontrado.");
    }
}


/**
 * ====================================
 * 3. FUNÇÃO abrirjogo(gameId)
 * Simula a abertura de um jogo quando o cartão é clicado.
 * @param {string} gameId - O identificador único do jogo (e.g., 'jogo1').
 * ====================================
 */
function abrirjogo(gameId) {
    // Verifica se um ID de jogo foi passado
    if (gameId) {
        // No futuro, este código poderia redirecionar para uma página específica:
        // window.location.href = `/jogos/${gameId}.html`; 

        // Por enquanto, apenas alerta o utilizador sobre qual jogo foi clicado
        alert(`Abrir Jogo: ${gameId}. Preparado para jogar!`);
    } else {
        alert("Erro: Não foi possível identificar o jogo.");
    }
}

// Fim do script.js