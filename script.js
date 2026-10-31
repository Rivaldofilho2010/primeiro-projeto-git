const produtos = [
  {
    id: 1,
    nome: "X-Burger",
    categoria: "Hambúrgueres",
    descricao: "Hambúrguer artesanal, queijo, alface e tomate.",
    preco: 18.90,
    imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 2,
    nome: "X-Bacon",
    categoria: "Hambúrgueres",
    descricao: "Hambúrguer, queijo, bacon crocante e molho especial.",
    preco: 23.90,
    imagem: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 3,
    nome: "Batata Frita",
    categoria: "Porções",
    descricao: "Batatas douradas e crocantes.",
    preco: 12.90,
    imagem: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80"
  },

   {
    id: 4,
    nome: "Refrigerante",
    categoria: "Bebidas",
    descricao: "Bebida gelada de 350 ml.",
    preco: 6.00,
    imagem: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 5,
    nome: "X-Tudo",
    categoria: "Hambúrgueres",
    descricao: "Um hambúrguer caprichado para matar a fome.",
    preco: 27.90,
    imagem: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 6,
    nome: "Batata com molho",
    categoria: "Porções",
    descricao: "Porção de batatas com molho especial.",
    preco: 16.90,
    imagem: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=700&q=80"
  }

  ];

// Elementos do HTML
const areaProdutos = document.getElementById("produtos");
const contador = document.getElementById("contador");
const quantidade = document.getElementById("quantidade");
const total = document.getElementById("total");
const botoesCategoria = document.querySelectorAll(".categoria");

// Carrinho temporário
const carrinho = [];

// Formata valores como reais
function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

  // Mostra os produtos na tela
function mostrarProdutos(categoria = "Todos") {
  const lista = categoria === "Todos"
    ? produtos
    : produtos.filter(produto => produto.categoria === categoria);

    areaProdutos.innerHTML = lista.map(produto => `
    <article class="produto">
      <img
        src="${produto.imagem}"
        alt="${produto.nome}"
        loading="lazy"
      >

       <div class="produto-info">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <div class="produto-rodape">
          <span class="preco">${formatarPreco(produto.preco)}</span>
          <button
            class="adicionar"
            data-id="${produto.id}"
          >
            + Adicionar
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// Adiciona um produto ao carrinho
areaProdutos.addEventListener("click", function(evento) {
  const botao = evento.target.closest(".adicionar");

  if (!botao) return;

  const id = Number(botao.dataset.id);
  const produto = produtos.find(item => item.id === id);

  if (produto) {
    carrinho.push(produto);
    atualizarCarrinho();
  }
});

// Atualiza quantidade e preço
function atualizarCarrinho() {
  const soma = carrinho.reduce(
    (acumulador, produto) => acumulador + produto.preco,
    0
  );

  contador.textContent = carrinho.length;
  quantidade.textContent = carrinho.length;
  total.textContent = formatarPreco(soma);
}

// Filtros de categorias
botoesCategoria.forEach(botao => {
  botao.addEventListener("click", function() {
    botoesCategoria.forEach(item => item.classList.remove("ativa"));
    botao.classList.add("ativa");
    mostrarProdutos(botao.dataset.categoria);
  });
});

// Menu do celular
const botaoMenu = document.getElementById("menu-mobile");
const navegacao = document.getElementById("navegacao");

botaoMenu.addEventListener("click", function() {
  const aberto = navegacao.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", aberto);
  botaoMenu.setAttribute(
    "aria-label",
    aberto ? "Fechar menu" : "Abrir menu"
  );
});

// Fecha o menu após clicar em um link
navegacao.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function() {
    navegacao.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
  });
});

// Envia o pedido para o WhatsApp
document.getElementById("finalizar").addEventListener("click", function() {
  if (carrinho.length === 0) {
    alert("Adicione pelo menos um produto ao pedido!");
    return;
  }

   // Troque pelo número real, com código do país e DDD.
  // Exemplo de formato: 55 + DDD + número.
  const telefone = "";

  if (!/^\d{12,13}$/.test(telefone)) {
    alert("O WhatsApp do restaurante ainda não foi configurado.");
    return;
  }

  const soma = carrinho.reduce(
    (acumulador, produto) => acumulador + produto.preco,
    0
  );

  const itens = carrinho.map(produto =>
    `- ${produto.nome}: ${formatarPreco(produto.preco)}`
  ).join("\n");

  const mensagem =
    `Olá! Gostaria de fazer este pedido:\n\n${itens}\n\n` +
    `Total dos itens: ${formatarPreco(soma)}`;

  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank", "noopener,noreferrer");
});

// Carrega o cardápio ao abrir a página
mostrarProdutos();
