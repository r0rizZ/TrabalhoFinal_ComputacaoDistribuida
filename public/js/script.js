document.addEventListener("DOMContentLoaded", function () {
    const btnPesquisar = document.getElementById('form-btn');
    const btnHistorico = document.getElementById('btn-historico');
    const popupHistorico = document.getElementById('popup-historico');
    const tabelaHistoricoPopup = document.getElementById('popup-tabela-historico');

    // Histórico de Pesquisas
    async function carregarHistorico() {
        try {
            const response = await fetch('/api/history');
            const historico = await response.json();

            if (historico.error) {
                console.error('Erro ao carregar histórico:', historico.error);
                return;
            }

            historico.forEach(filme => {
                const linha = `
                    <tr>
                        <td>${filme.titulo}</td>
                        <td style="text-align: center;">${filme.imdbRating}</td>
                        <td style="text-align: center;">${filme.ip_utilizador}</td>
                        <td>${formatarData(filme.timestamp) + " | " + formatarHora(filme.timestamp)}</td>
                    </tr>
                `;
                tabelaHistoricoPopup.innerHTML += linha;
            });
        } catch (error) {
            console.error('Erro ao carregar o histórico:', error);
        }
    }

    btnPesquisar.addEventListener('click', async function () {
        const nomeFilme = document.getElementById("form-input").value.trim();
    
        if (!nomeFilme) {
            alert("Por favor, insira o nome de um filme.");
            return;
        }
    
        try {
            const response = await fetch(`/api/search?titulo=${nomeFilme}`);
            
            if (!response.ok) {
                throw new Error('Falha ao procurar o filme. Tente novamente.');
            }
    
            const filmeData = await response.json();
    
            if (filmeData.error) {
                alert(filmeData.error);
                return;
            }
   
            document.getElementById('informacoes-filme').innerHTML = '';
    
            const informacoesFilme = `
                <strong>Título:</strong> ${filmeData.titulo}<br>
                <strong>Ano:</strong> ${filmeData.ano}<br>
                <strong>Diretor:</strong> ${filmeData.diretor}<br>
                <strong>Elenco:</strong> ${filmeData.elenco}<br>
                <strong>Géneros:</strong> ${filmeData.generos}<br>
                <strong>IMDB Rating:</strong> ${filmeData.imdbRating}<br>
            `;
    
            const filmeDiv = document.createElement('div');
            filmeDiv.classList.add('filme-card');
            filmeDiv.innerHTML = informacoesFilme;

            if (filmeData.cartaz) {
                const imgElement = document.createElement('img');
                imgElement.src = filmeData.cartaz;
                imgElement.style.maxWidth = '100%';
                imgElement.style.borderRadius = '10px';
                imgElement.style.marginTop = '10px';
                filmeDiv.appendChild(imgElement);
            }
    
            document.getElementById('informacoes-filme').appendChild(filmeDiv);
    
        } catch (error) {
            console.error('ERRO', error);
            alert("Erro ao procurar informações do filme.");
        }
    });    

    btnHistorico.addEventListener('click', function() {
        carregarHistorico();
        popupHistorico.style.display = 'block';
    });

    document.getElementById('fechar-popup').addEventListener('click', function() {
        popupHistorico.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target === popupHistorico) {
            popupHistorico.style.display = 'none';
        }
    };
});

function formatarData(timestamp) {
    const data = new Date(timestamp);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function formatarHora(timestamp) {
    const data = new Date(timestamp);
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
}