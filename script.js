// SLIDE DO INICIO DA PÁGINA

const fotos = ["img/bts1.jpg", "img/bts2.jpg", "img/bts3.jpg", "img/bts4.jpg", "img/bts5.jpg"];
let atual = 0;
const home = document.getElementById("home");

function mudarFoto(direcao) {
    atual = (atual + direcao + fotos.length) % fotos.length;
    home.style.backgroundImage = `url('${fotos[atual]}')`;
}

// Inicia com a primeira foto e troca sozinha a cada 4 segundos
mudarFoto(0);
setInterval(() => mudarFoto(1), 4000);

// ===========================================================================
// CARDS DAS MÚSICAS

const botoesPlay = document.querySelectorAll(".play-btn");

botoesPlay.forEach(botao => {
    botao.addEventListener("click", () => {
        const card = botao.closest(".music-card");
        const audio = card.querySelector("audio");

        // Se o áudio clicado já estiver tocando, apenas pausa
        if (!audio.paused) {
            audio.pause();
            botao.textContent = "▶";
            card.classList.remove("tocando");
            return;
        }

        // Pausa qualquer outra música que esteja tocando antes de iniciar a nova
        document.querySelectorAll(".music-card").forEach(outroCard => {
            const outroAudio = outroCard.querySelector("audio");
            const outroBotao = outroCard.querySelector(".play-btn");
            
            outroAudio.pause();
            outroBotao.textContent = "▶";
            outroCard.classList.remove("tocando");
        });

        // Toca a música escolhida e ativa os efeitos visuais
        audio.play();
        botao.textContent = "⏸";
        card.classList.add("tocando");

        // Quando a música acabar sozinha, reseta o card e o botão
        audio.onended = () => {
            botao.textContent = "▶";
            card.classList.remove("tocando");
        };
    });
});

// ===========================================================================
// DICIONÁRIO ARMY

const inputBusca = document.getElementById("busca-termo");
const cardsDicionario = document.querySelectorAll(".flip-card");

if (inputBusca) {
    inputBusca.addEventListener("input", () => {
        const termo = inputBusca.value.toLowerCase();

        cardsDicionario.forEach(card => {
            const textoCard = card.textContent.toLowerCase();
            card.style.display = textoCard.includes(termo) ? "block" : "none";
        });
    });
}

// ============================================================================
// MODO ESCURO

const logoBtn = document.getElementById("logo");

// Verifica se o usuário já tinha deixado no modo escuro antes
if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("dark-mode");
}

// Alterna entre modo claro pastel e modo escuro ao clicar no logo
logoBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("tema", "escuro");
    } else {
        localStorage.setItem("tema", "claro");
    }
});

// ============================================================================
// GRADIENTE NO MOUSE

const luz = document.createElement("div");
luz.className = "luz-mouse";
document.body.appendChild(luz);

document.addEventListener("mousemove", (e) => {
    luz.style.left = `${e.clientX}px`;
    luz.style.top = `${e.clientY}px`;
});

// ============================================================================
// ICONES COM CLIQUE

const simbolos = ["💜", "✨", "💫", "🪻"];

document.addEventListener("click", (e) => {
    const particula = document.createElement("span");
    particula.className = "particula-click";
    particula.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
    
    // Posiciona exatamente onde o mouse clicou
    particula.style.left = `${e.clientX}px`;
    particula.style.top = `${e.clientY}px`;
    
    document.body.appendChild(particula);

    // Remove do HTML assim que a animação termina
    setTimeout(() => particula.remove(), 900);
});

// ============================================================================
// EASTER EGG 1: DIGITAR "ARMY" NO TECLADO

let teclasDigitadas = "";

function ativarEasterEggArmy() {
    // Ativa o modo escuro (ARMY Bomb)
    document.body.classList.add("dark-mode");
    localStorage.setItem("tema", "escuro");

    // Mostra aviso secreto
    const toast = document.createElement("div");
    toast.className = "easter-toast";
    toast.textContent = "💜 Você desbloqueou o Modo ARMY! Bem-vindo(a) ao oceano roxo ✨";
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("visivel"), 50);
    setTimeout(() => {
        toast.classList.remove("visivel");
        setTimeout(() => toast.remove(), 400);
    }, 4000);

    // Cria chuva de 30 corações e brilhos
    const emojis = ["💜", "🪻", "✨", "🫶"];
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const item = document.createElement("span");
            item.className = "chuva-coracao";
            item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            item.style.left = `${Math.random() * 100}vw`;
            item.style.animationDuration = `${2 + Math.random() * 2}s`;
            document.body.appendChild(item);

            setTimeout(() => item.remove(), 4000);
        }, i * 90);
    }
}

document.addEventListener("keydown", (e) => {
    // Ignora se o usuário estiver digitando na barra de pesquisa do dicionário
    if (document.activeElement.tagName === "INPUT") return;

    teclasDigitadas += e.key.toLowerCase();
    teclasDigitadas = teclasDigitadas.slice(-4); // Mantém apenas as últimas 4 letras ("army")

    if (teclasDigitadas === "army") {
        ativarEasterEggArmy();
        teclasDigitadas = "";
    }
});