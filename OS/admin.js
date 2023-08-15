// Função para carregar as ordens de serviço do armazenamento local
function carregarOrdensDeServico() {
  var ordensDeServico = JSON.parse(localStorage.getItem("ordensDeServico"));

  if (ordensDeServico === null || ordensDeServico.length === 0) return;

  var tabela = document.getElementById("ordersTable");

  ordensDeServico.forEach(function(ordemDeServico) {
    var row = tabela.insertRow();

    row.insertCell().textContent = ordemDeServico.ambiente;
    row.insertCell().textContent = ordemDeServico.nome;
    row.insertCell().textContent = ordemDeServico.turma;
    row.insertCell().textContent = ordemDeServico.periodo;
    row.insertCell().textContent = ordemDeServico.descricao;
    row.insertCell().textContent = ordemDeServico.patrimonio;
    row.insertCell().textContent = ordemDeServico.professor;
    row.insertCell().textContent = "Em andamento";
    row.insertCell().textContent = "-";
    row.insertCell().innerHTML = '<button class="resolveButton">Resolver</button>';
  });
}

// Função para atualizar a ordem de serviço quando o botão "Resolver" for clicado
function atualizarOrdemDeServico(event) {
  var row = event.target.parentNode.parentNode;
  var index = row.rowIndex - 1;

  var ordensDeServico = JSON.parse(localStorage.getItem("ordensDeServico"));

  var statusCell = row.cells[7];
  var dataCell = row.cells[8];

  if (statusCell.textContent === "Em andamento") {
    statusCell.textContent = "Finalizado";
    dataCell.textContent = new Date().toLocaleDateString();

    ordensDeServico[index].status = "finalizado";
    ordensDeServico[index].data = dataCell.textContent;

    localStorage.setItem("ordensDeServico", JSON.stringify(ordensDeServico));
  }
}

// Adicionar evento de clique para atualizar a ordem de serviço quando o botão "Resolver" for clicado
document.getElementById("ordersTable").addEventListener("click", function(event) {
  if (event.target.classList.contains("resolveButton")) {
    atualizarOrdemDeServico(event);
  }
});

// Carregar as ordens de serviço ao carregar a página
window.onload = carregarOrdensDeServico;