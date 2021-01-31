//Consumindo a API DO BACKEND -- SERVER.JS

let data
async function teste() {
  try {
    const response = await fetch('http://localhost:1234/')
    data = await response.json()
    show(data.results.forecast.slice(0, 7))
  } catch (error) {
    console.error(error)
  }
}
teste()
// FUNCAO RESPONSAVEL POR RENDERIZAR A TABELA NA VIEW
function show(data) {
  console.log(data)
  var inserir = data.map(function (item, indice) {

    return `<tr>
                        <td>${item.date}</td>
                        <td>${item.weekday}</td>
                        <td>${item.max + '°C'}</td>
                        <td>${item.min + '°C'}</td>
                        <td>${item.description}</td>
                    </tr>`;
  });


  document.querySelector("#tbPodio tbody").innerHTML = inserir.join("");
}
// FILTRO DA TABELA
$(document).ready(function () {
  $('.filterable .btn-filter').click(function () {
    var $painel = $(this).parents('.filterable'),
      $filtro = $painel.find('.filtro input'),
      $tbody = $painel.find('.table tbody');
    if ($filtro.prop('disabled') == true) {
      $filtro.prop('disabled', false);
      $filtro.first().focus();
    } else {
      $filtro.val('').prop('disabled', true);
      $tbody.find('.no-result').remove();
      $tbody.find('tr').show();
    }
  });

  $("#filtro").on("change", function () {
    document.querySelector("#tbPodio tbody").innerHTML = "";
    if (this.value == "7") {
      show(data.results.forecast.slice(0, 7));
    } else if (this.value == "all") {
      show(data.results.forecast);
    }
  })

  $('.filterable .filtro input').keyup(function (e) {
    /* Ignorar tecla tab  */
    var code = e.keyCode || e.which;
    if (code == '9') return;
    /* Dados DOM úteis e seletores */
    var $input = $(this),
      inputContent = $input.val().toLowerCase(),
      $painel = $input.parents('.filterable'),
      column = $painel.find('.filtro th').index($input.parents('th')),
      $table = $painel.find('.table'),
      $rows = $table.find('tbody tr');

    var $filteredRows = $rows.filter(function () {
      var value = $(this).find('td').eq(column).text().toLowerCase();
      return value.indexOf(inputContent) === -1;
    });
    /* Limpa sem resultados anteriores, se houver */
    $table.find('tbody .no-result').remove();
    /* Mostrar todas as linhas, ocultar as filtradas (nunca faça isso fora de uma demonstração! XD) */
    $rows.show();
    $filteredRows.hide();
    /* Incluir linha sem resultado se todas as linhas forem filtradas */
    if ($filteredRows.length === $rows.length) {
      $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filtro th').length + '">No result found</td></tr>'));
    }
  });
});

