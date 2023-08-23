document.addEventListener("DOMContentLoaded", function () {
  // Event listener para o envio do formulário
  document.getElementById("orderForm").addEventListener("submit", function (event) {
    event.preventDefault(); // previne o envio do formulário
    
    // Obtém os valores dos campos do formulário
    var ambiente = document.getElementById("ambiente").value;
    var nome = document.getElementById("nome").value;
    var turma = document.getElementById("turma").value;
    var periodo = document.getElementById("periodo").value;
    var descricao = document.getElementById("descricao").value;
    var patrimonio = document.getElementById("patrimônio").value;
    var professor = document.getElementById("professor").value;

    // Criar objeto com os dados do formulário
    var ordemDeServico = {
      ambiente: ambiente,
      nome: nome,
      turma: turma,
      periodo: periodo,
      descricao: descricao,
      patrimonio: patrimonio,
      professor: professor,
    };

    // Converter para JSON
    var ordemDeServicoJSON = JSON.stringify(ordemDeServico);

    // Armazenar a ordem de serviço no armazenamento local
    localStorage.setItem("ordemDeServico", ordemDeServicoJSON);

    // Redirecionar para a página de administração
    window.location.href = "admin.html";

    // Limpar os campos do formulário (opcional)
    document.getElementById("ambiente").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("turma").value = "";
    document.getElementById("periodo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("patrimônio").value = "";
    document.getElementById("professor").value = "";

    // Exibir uma mensagem em um modal ou console (opcional)
    console.log("Enviado com sucesso");
  });
});