const qtd_func = [
  17000,//arcelor
  2000, //cbmm
  8000, //terniun
  6500, //usiminas
  2000,//aperam
  30000, // csn
  3400, //belgo
  4800,// cba
  17000, // suzanno
  10000 // gerdau
]

const empresas = [
  document.getElementById('org1'),
  document.getElementById('org2'),
  document.getElementById('org3'),
  document.getElementById('org4'),
  document.getElementById('org5'),
  document.getElementById('org6'),
  document.getElementById('org7'),
  document.getElementById('org8'),
  document.getElementById('org9'),
  document.getElementById('org10')

];

let quantidade = 0;
let somaValor = 0
let value_func = 20

let assinaturaPosterior = 3000
let assinatura = 3000



function agrupar(event) {
 // value_func= document.getElementById('valor_func').value
  const empresaClicada = event.target;
  if (empresaClicada.classList.contains('clicada')) {
    quantidade--;
    desmarcar(empresaClicada.id)
    const indice = empresas.findIndex(empresa => empresa === empresaClicada);
    somaValor -= qtd_func[indice] * value_func; // Subtrai o valor da empresa da soma
  } else {
    quantidade++;
    marcar(empresaClicada.id)
    const indice = empresas.findIndex(empresa => empresa === empresaClicada);
    somaValor += qtd_func[indice] * value_func; // Adiciona o valor da empresa à soma
    

    alert(`a empresa ${empresaClicada.getAttribute('name')} possui ${qtd_func[indice]} colaboradores`)

  }
  empresaClicada.classList.toggle('clicada');

}


/**calcula o primeiro valor pago pelo sistema de pulse card, 
 * valor assinatura: 5000
 * valor de funcionario  no primeiro mes: 50,00
 * valor apos a adesão
 */
function calculaFirstReceita(valor_plano) {


}


/**adcionando o evento a todas as empresas */
document.getElementById('org1').addEventListener('click', agrupar, false)
document.getElementById('org2').addEventListener('click', agrupar, false)
document.getElementById('org3').addEventListener('click', agrupar, false)
document.getElementById('org4').addEventListener('click', agrupar, false)
document.getElementById('org5').addEventListener('click', agrupar, false)
document.getElementById('org6').addEventListener('click', agrupar, false)
document.getElementById('org7').addEventListener('click', agrupar, false)
document.getElementById('org8').addEventListener('click', agrupar, false)
document.getElementById('org9').addEventListener('click', agrupar, false)
document.getElementById('org10').addEventListener('click', agrupar, false)


/**modificar o estilo da empresa selecionada */
function marcar(id) {
  document.getElementById(id).style.boxShadow = '0px 4px 40px 0px rgba(240, 126, 20, 0.63)';
}

/**Desmarcar a empresa */
function desmarcar(id) {
  document.getElementById(id).style.boxShadow = 'none';
}




function open() {

  var janela = document.getElementById('janela').style
  janela.display = 'block'

}
function close() {
  var janela = document.getElementById('janela').style
  janela.display = 'none'

}

//abertura da popup
var botão = document.getElementById('btn-click')
botão.addEventListener('click', open, true)

//fechamento da popup
var btn_close = document.getElementById('close')
btn_close.addEventListener('click', close, true)

//procedimento de calculo roi
const btn_plane1 = document.getElementById('plane1')
const btn_plane2 = document.getElementById('plane2')
const btn_plane3 = document.getElementById('plane3')

//indicadores
const roi = document.getElementById('ROI')
const payback = document.getElementById('PAYBACK')


//tabela do faturamento
let all_meses = document.getElementById('fatMensal')
const start = document.getElementById('firstMes')
const fat_ano = document.getElementById('fatAnual')





/**Calculo de roi  */
function return_Roi(tempo, valor, investimento) {
  let receita = (tempo * valor);
  let calc = (receita - investimento) / investimento;
  let calc2 = calc * 100;
  roi.innerText = `${calc2.toFixed(2)}%`
}





/**calculo payback */
function return_Payback(investimento, receita) {
  let valor = investimento / receita
  payback.innerText = `${valor.toFixed(2)} meses`
}





/*zera os valores de roi and payback*/
function zerar() {
  roi.innerText = 0.00
  payback.innerText = 0.00
  assinatura =  2000.00
  valor_add=false;
  //value_func= 0
}


//.toLocaleString('pt-BR')

let valor_add = false
/**calculo do perfil conservador */
function calculate_economy() {
  zerar()
  let investimento = 346000.00
  let tempo = document.getElementById('tmp').value
  if (!valor_add) {
    assinatura += somaValor
    valor_add = true
    
  }else{
    assinatura =  assinaturaPosterior
  }
 
  assinatura = assinatura * quantidade

  let mes = 'R$' + assinaturaPosterior.toFixed(2).replace('.', ',');
  let faturamentoMes = 'R$' + assinatura.toFixed(2).replace('.', ',');
  let faturamentoAno = 'R$' + (assinaturaPosterior * 12 + somaValor).toFixed(2).replace('.', ',');

  mes = mes.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  faturamentoMes = faturamentoMes.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  faturamentoAno = faturamentoAno.replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  all_meses.innerText = mes 
  start.innerText = faturamentoMes
  fat_ano.innerText = faturamentoAno

  return_Roi(tempo, assinatura, investimento)
  return_Payback(investimento, assinatura)
}



btn_plane1.addEventListener('click', calculate_economy, true)


