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
window.onload = carregarOrdensDeServico;document.addEventListener("DOMContentLoaded", function () {
  var ordersTableBody = document.getElementById("ordersTable");

  // Função para preencher a tabela com os dados do localStorage
  function populateTable() {
    var ordemDeServicoJSON = localStorage.getItem("ordemDeServico");
    if (ordemDeServicoJSON) {
      var ordemDeServico = JSON.parse(ordemDeServicoJSON);
      var newRow = document.createElement("tr");
      
      newRow.innerHTML = `
        <td>${ordemDeServico.ambiente}</td>
        <td>${ordemDeServico.nome}</td>
        <td>${ordemDeServico.turma}</td>
        <td>${ordemDeServico.periodo}</td>
        <td>${ordemDeServico.descricao}</td>
        <td>${ordemDeServico.patrimonio}</td>
        <td>${ordemDeServico.professor}</td>
        <td>Pendente</td>
        <td>-</td>
        <td><button class="resolveBtn">Resolver</button></td>
      `;
      
      ordersTableBody.appendChild(newRow);
    }
  }

  // Chamar a função para preencher a tabela quando a página carregar
  populateTable();
});

document.addEventListener("DOMContentLoaded", function () {
  var ordersTableBody = document.getElementById("ordersTable");
  var modal = document.getElementById("modal");
  var modalContent = document.querySelector(".modal-content");
  var resolveBtns = document.querySelectorAll(".resolveBtn");

  function openModal(event) {
    modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function resolveOrder(event) {
    openModal();

    var resolveForm = document.createElement("form");
    resolveForm.innerHTML = `
      <label for="action">Ação Tomada:</label><br>
      <textarea id="action" class="modal-input" required></textarea><br>
      
      <label for="status">Status:</label><br>
      <select id="status" class="modal-input" required>
        <option value="resolvido">Resolvido</option>
        <option value="pendente">Pendente</option>
      </select><br>
      
      <button type="submit">Enviar</button>
    `;

    modalContent.innerHTML = "";
    modalContent.appendChild(resolveForm);

    resolveForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      var action = document.getElementById("action").value;
      var status = document.getElementById("status").value;
      var data = document.getElementById("data").value;

      
      console.log("Ação:", action);
      console.log("Status:", status);

      var row = event.target.parentNode.parentNode;
      var statusCell = row.cells[7];
      var dataCell = row.cells[8];

      statusCell.textContent = status;
      dataCell.textContent = data;

      closeModal();
    });
  }

  resolveBtns.forEach(function (btn) {
    btn.addEventListener("click", resolveOrder);
  });

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
});

