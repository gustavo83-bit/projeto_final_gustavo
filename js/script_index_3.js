// ====================================
// 1. DADOS DE JOGOS (ARRAY 'books')
// Esta lista é a fonte de dados para o seu catálogo
// ====================================
const books = [
    {
        title: "Super Mario 64: A Revolução 3D",
        author: "Shigeru Miyamoto",
        category: "mario-64",
        cover: "https://via.placeholder.com/84x120/60a5fa/ffffff?text=M64",
        year: 1996
    },
    {
        title: "Donkey Kong Country: A Lenda Retorna",
        author: "Rareware (Tim Stamper)",
        category: "dk-country",
        cover: "https://via.placeholder.com/84x120/7c3aed/ffffff?text=DKC",
        year: 1994
    },
    {
        title: "Metal Slug: Guia de Sobrevivência",
        author: "Nazca Corporation",
        category: "metal-slug",
        cover: "https://via.placeholder.com/84x120/10b981/ffffff?text=MSL",
        year: 1996
    },
    {
        title: "Mortal Kombat II: O Torneio Mortal",
        author: "Ed Boon & John Tobias",
        category: "mortal-kombat",
        cover: "https://via.placeholder.com/84x120/ef4444/ffffff?text=MK2",
        year: 1993
    },
    {
        title: "Sonic the Hedgehog 2: Velocidade Máxima",
        author: "Yuji Naka",
        category: "sonic",
        cover: "https://via.placeholder.com/84x120/3b82f6/ffffff?text=SNC",
        year: 1992
    },
    {
        title: "The Legend of Zelda: Ocarina of Time",
        author: "Shigeru Miyamoto",
        category: "zelda",
        cover: "https://via.placeholder.com/84x120/f97316/ffffff?text=ZEL",
        year: 1998
    },
    {
        title: "Street Fighter II: O Clássico dos Arcades",
        author: "Akira Nishitani",
        category: "sf-ii",
        cover: "https://via.placeholder.com/84x120/facc15/ffffff?text=SF2",
        year: 1991
    },
    // Você pode adicionar mais jogos aqui com a categoria correta!
];

// ====================================
// 2. SELETORES E VARIÁVEIS GLOBAIS
// ====================================
const booksGrid = document.getElementById('booksGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryList = document.getElementById('categoryList');
const resultCount = document.getElementById('resultCount');
const sortSelect = document.getElementById('sortSelect');
const yearSpan = document.getElementById('year');
// Define o ano atual no footer
yearSpan.textContent = new Date().getFullYear();

let activeCategory = 'todos';
let query = '';
let sortBy = 'titulo';

// ====================================
// 3. FUNÇÕES DE SUPORTE
// ====================================

/**
 * Renderiza a lista de jogos no grid.
 * @param {Array} list - Lista de objetos de jogo a serem exibidos.
 */
function renderBooks(list) {
    booksGrid.innerHTML = '';
    
    if (list.length === 0) {
        booksGrid.innerHTML = '<p style="color:var(--muted)">Nenhum jogo encontrado.</p>';
    } else {
        for (const b of list) {
            const div = document.createElement('article');
            div.className = 'book';
            // O uso de 'escapeHtml' previne ataques XSS ao inserir dados no HTML
            div.innerHTML = `
              <div class="cover" aria-hidden="true"><img src="${b.cover}" alt="Capa do jogo ${escapeHtml(b.title)}"></div>
              <div class="meta">
                <h4>${escapeHtml(b.title)}</h4>
                <p>Autor/Empresa: ${escapeHtml(b.author)}</p>
                <div class="tags">
                  <span class="tag">${formatCategory(b.category)}</span>
                  <span class="tag">Ano: ${b.year}</span>
                </div>
              </div>
            `;
            booksGrid.appendChild(div);
        }
    }
    // Corrigido o template literal
    resultCount.textContent = `Exibindo ${ list.length } jogo(s)`;
}

/**
 * Mapeia a chave da categoria para um nome amigável (ex: 'mario-64' -> 'Mario 64').
 * @param {string} cat - Chave da categoria.
 * @returns {string} Nome formatado.
 */
function formatCategory(cat) {
    const map = {
        'mario-64': 'Mario 64',
        'dk-country': 'Donkey Kong',
        'metal-slug': 'Metal Slug',
        'mortal-kombat': 'Mortal Kombat',
        'sonic': 'Sonic',
        'zelda': 'Zelda',
        'sf-ii': 'Street Fighter II',
        'todos': 'Todos os Jogos'
    };
    return map[cat] || cat;
}

/**
 * Escapa caracteres HTML para garantir segurança.
 * @param {string} str - String a ser escapada.
 * @returns {string} String segura.
 */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Aplica filtros de categoria e busca e, em seguida, ordena a lista.
 */
function applyFilters() {
    let filtered = books.slice(); // Cria uma cópia do array original

    // 1. Filtragem por categoria
    if (activeCategory !== 'todos') {
        filtered = filtered.filter(b => b.category === activeCategory);
    }

    // 2. Filtragem por busca (título, autor ou categoria)
    if (query.trim().length > 0) {
        const q = query.toLowerCase();
        filtered = filtered.filter(b =>
            b.title.toLowerCase().includes(q) ||
            b.author.toLowerCase().includes(q) ||
            b.category.toLowerCase().includes(q)
        );
    }

    // 3. Ordenação
    if (sortBy === 'titulo') {
        // Ordena por título, sensível ao idioma português
        filtered.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
    } else if (sortBy === 'autor') {
        // Ordena por autor
        filtered.sort((a, b) => a.author.author.localeCompare(b.author, 'pt-BR'));
    }

    renderBooks(filtered);
}

// ====================================
// 4. LISTENERS DE EVENTOS
// ====================================

// Evento de clique no botão de busca
searchBtn.addEventListener('click', () => {
    query = searchInput.value;
    applyFilters();
});

// Evento de tecla (Enter) no campo de busca
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { 
        query = searchInput.value; 
        applyFilters(); 
    }
});

// Evento de clique nos chips de categoria
categoryList.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    
    // 1. Remove a classe 'active' do chip anterior
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    
    // 2. Adiciona a classe 'active' ao chip clicado
    chip.classList.add('active');
    
    // 3. Define a nova categoria ativa e aplica os filtros
    activeCategory = chip.dataset.cat || 'todos';
    applyFilters();
});

// Evento de mudança na opção de ordenação
sortSelect.addEventListener('change', (e) => {
    sortBy = e.target.value;
    applyFilters();
});

// ====================================
// 5. INICIALIZAÇÃO
// ====================================
// Renderiza o catálogo na primeira vez que a página carrega
applyFilters();