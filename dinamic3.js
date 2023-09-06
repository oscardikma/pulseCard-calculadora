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
  
];

let quantidade = 0;

function agrupar(event) {
  const empresaClicada = event.target;

  if (empresaClicada.classList.contains('clicada')) {
      quantidade--;
      desmarcar(empresaClicada.id)
  } else {
      quantidade++;
      marcar(empresaClicada.id)
      
  }

  empresaClicada.classList.toggle('clicada');

}
/**adcionando o evento a todas as empresas */
document.getElementById('org1').addEventListener('click',agrupar,false)
document.getElementById('org2').addEventListener('click',agrupar,false)
document.getElementById('org3').addEventListener('click',agrupar,false)
document.getElementById('org4').addEventListener('click',agrupar,false)
document.getElementById('org5').addEventListener('click',agrupar,false)
document.getElementById('org6').addEventListener('click',agrupar,false)
document.getElementById('org7').addEventListener('click',agrupar,false)
document.getElementById('org8').addEventListener('click',agrupar,false)
document.getElementById('org9').addEventListener('click',agrupar,false)


/**modificar o estilo da empresa selecionada */
function marcar(id){
  document.getElementById(id).style.boxShadow = '0px 4px 40px 0px rgba(240, 126, 20, 0.63)';
}

/**Desmarcar a empresa */
function desmarcar(id){
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
const tir = document.getElementById('TIR')

//tabela do faturamento
const fat_mes =  document.getElementById('fatMensal')
const fat_ano =  document.getElementById('fatAnual')


  


/**Calculo de roi  */
function return_Roi(tempo,valor,investimento) {
  let receita = tempo * valor;
  let calc = (receita - investimento) / investimento;
  let calc2 = calc * 100;
    roi.innerText = calc2.toFixed(2)
}






function return_Payback(investimento, receita) {
    let valor = investimento / receita
    payback.innerText = valor.toFixed(2)
}


/*função para calculo do tir */
function return_Tir(cashFlows) {
  
        const epsilon = 1e-6; // Precisão desejada
        const maxIterations = 1000; // Número máximo de iterações
      
        // Função que calcula o valor presente líquido (NPV) para uma taxa de desconto dada
        function calculateNPV(rate) {
          let npv = 0;
          for (let i = 0; i < cashFlows.length; i++) {
            npv += cashFlows[i] / Math.pow(1 + rate, i);
          }
          return npv;
        }
      
        let guess = 0.1; // Taxa de desconto inicial para tentativa
        let previousGuess = guess;
      
        for (let i = 0; i < maxIterations; i++) {
          const npv = calculateNPV(guess);
          const derivative = (calculateNPV(guess + epsilon) - npv) / epsilon;
          
          guess = guess - npv / derivative;
      
          // Verifica se a diferença entre as tentativas é menor que a precisão desejada
          if (Math.abs(guess - previousGuess) < epsilon) {
            return guess;
          }
      
          previousGuess = guess;
        }
      
        // Se não convergiu após o número máximo de iterações
        return null;
      }
      
    
      





/*zera os valores de roi and payback*/
function zerar() {

    roi.innerText = 0.00
    payback.innerText = 0.00
    tir.innerText = 0.00
}


//.toLocaleString('pt-BR')


/**calculo do perfil conservador */
function calculate_economy() {
    zerar()
    let investimento = 312365.00
    let receita = 6000.00 
    receita =receita*quantidade
    let faturamentoMes = 'R$' + receita.toFixed(2).replace('.', ',');
    let faturamentoAno = 'R$' + (receita * 12).toFixed(2).replace('.', ',');

    faturamentoMes= faturamentoMes.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    faturamentoAno =  faturamentoAno.replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    fat_mes.innerText = faturamentoMes
    fat_ano.innerText=faturamentoAno
    let tempo = document.getElementById('tmp').value
    const cashFlows = [investimento*-1, receita,receita,receita,receita]
    return_Roi(tempo,receita,investimento)
    return_Payback(investimento, receita)
   tir.innerText=  return_Tir(cashFlows).toFixed(2)
}


/**calculo do perfil realista */
function calculate_real() {
    zerar()
    let investimento = 312365.00
    let receita = 8000.00 
    receita = receita*quantidade
    let tempo = document.getElementById('tmp').value
    let faturamentoMes = 'R$' + receita.toFixed(2).replace('.', ',');
    let faturamentoAno = 'R$' + (receita * 12).toFixed(2).replace('.', ',');

    faturamentoMes= faturamentoMes.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    faturamentoAno =  faturamentoAno.replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    fat_mes.innerText = faturamentoMes
    fat_ano.innerText=faturamentoAno
    const cashFlows = [investimento*-1, receita,receita,receita,receita]
    return_Roi(tempo,receita,investimento)
    return_Payback(investimento, receita)
    tir.innerText=  return_Tir(cashFlows).toFixed(2)
}


/**calculo do perfil otimista */
function calculate_optmize() {
    zerar()
    let investimento = 312365.00
    let receita = 10000.00 
    receita= receita*quantidade
    let tempo = document.getElementById('tmp').value
    let faturamentoMes = 'R$' + receita.toFixed(2).replace('.', ',');
    let faturamentoAno = 'R$' + (receita * 12).toFixed(2).replace('.', ',');

    faturamentoMes= faturamentoMes.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    faturamentoAno =  faturamentoAno.replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    fat_mes.innerText = faturamentoMes
    fat_ano.innerText=faturamentoAno
    const cashFlows = [investimento*-1, receita,receita,receita,receita]
    return_Roi(tempo,receita,investimento)
    return_Payback(investimento, receita)
    tir.innerText=  return_Tir(cashFlows).toFixed(2)
}



btn_plane1.addEventListener('click', calculate_economy, true)
btn_plane2.addEventListener('click', calculate_real, true)
btn_plane3.addEventListener('click', calculate_optmize, true)

