const form = document.getElementById("calc-form");

const custoInput = document.getElementById("custo");
const freteInput = document.getElementById("frete");
const taxasInput = document.getElementById("taxas");
const plataformaInput = document.getElementById("plataforma");
const margemInput = document.getElementById("margem");

const custoTotalEl = document.getElementById("custo-total");
const precoVendaEl = document.getElementById("preco-venda");
const lucroEl = document.getElementById("lucro");
const erroEl = document.getElementById("erro");

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function calcular() {
  const custo = Number(custoInput.value);
  const frete = Number(freteInput.value);
  const taxas = Number(taxasInput.value);
  const plataforma = Number(plataformaInput.value);
  const margem = Number(margemInput.value);

  const valores = [custo, frete, taxas, plataforma, margem];

  if (valores.some(valor => !Number.isFinite(valor) || valor < 0) || margem >= 100) {
    erroEl.textContent = "Informe valores válidos. A margem deve ser menor que 100%.";
    custoTotalEl.textContent = "R$ 0,00";
    precoVendaEl.textContent = "R$ 0,00";
    lucroEl.textContent = "R$ 0,00";
    return;
  }

  erroEl.textContent = "";

  const custoTotal = custo + frete + taxas + plataforma;
  const margemDecimal = margem / 100;
  const precoVenda = custoTotal / (1 - margemDecimal);
  const lucro = precoVenda - custoTotal;

  custoTotalEl.textContent = formatarMoeda(custoTotal);
  precoVendaEl.textContent = formatarMoeda(precoVenda);
  lucroEl.textContent = formatarMoeda(lucro);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  calcular();
});

custoInput.addEventListener("input", calcular);
freteInput.addEventListener("input", calcular);
taxasInput.addEventListener("input", calcular);
plataformaInput.addEventListener("input", calcular);
margemInput.addEventListener("input", calcular);

calcular();
