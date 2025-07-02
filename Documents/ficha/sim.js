function mostrarFicha() {
  document.getElementById("inicio").style.display = "none"; 
  document.getElementById("ficha").style.display = "block";
}


function mostrarLore() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("lore").style.display = "block";
}

function mostrarPersonagens() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("personagens").style.display = "block";
  carregarPersonagens();
}

function voltar() {
  document.getElementById("inicio").style.display = "block";
  document.getElementById("ficha").style.display = "none";
  document.getElementById("lore").style.display = "none";
  document.getElementById("personagens").style.display = "none";
}

function mostrarConto(id) {
  const contos = {
    gemeos: {
      titulo: "O conto dos dois gêmeos fundadores",
      texto: `Da terra os gêmeos Justabium e Tordas nascem, do barro continental são concebidos, uma junção complexa e inexplicável, eles eram tudo, decidiram então experimentar formas, felicidades, dores, amarguras, momentos enfadonhos, e com o tempo entenderam muito da existência.

Um dia, o mar começou a tomar a terra, de pouco a pouco enfraquecia os gêmeos, juntos lutavam e resistiam, criando desertos e montanhas para barrar os oceanos. Lentamente algo surgia sob o mar, vida… determinada a existir e mudar, então enxergando a oportunidade, a dupla desfruta das chuvas, tornando a terra apta para os seres, aos milhões e milhões de anos, mudanças vieram, e o povo prístino nasceu, conhecedores do mar e da terra, dominadores da dor e do amor, conversavam com a natureza.

Aos poucos o pélago afrontoso tornava-se, perdendo suas forças os prístinos ajudaram a terra, mas falharam o mar afundava tudo até a montanha mais alta, Justabium segurava a maré com toda força, mas foi engolido, sem mais esperanças, Tordas ouve a voz de uma dama, “O belo vem do sacrifício, sem ele, nada teria valor.” Tordas encrava-se na terra, abrigando o último vestígio de vida, e como seu último suspiro e desejo, se torna a Montanha Cintilante.`
    }
  };

  const conto = contos[id];
  document.getElementById("listaContos").style.display = "none";
  document.getElementById("leituraConto").style.display = "block";
  document.getElementById("tituloConto").textContent = conto.titulo;
  document.getElementById("textoConto").textContent = conto.texto;
}

function voltarParaListaContos() {
  document.getElementById("listaContos").style.display = "block";
  document.getElementById("leituraConto").style.display = "none";
}
