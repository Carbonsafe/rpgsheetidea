let atributos = {
  vida: { atual: 10, max: 100 },
  egni: { atual: 10, max: 100 },
  sanidade: { atual: 10, max: 100 }
};


let indiceEdicao = null;

function esconderTudo() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("ficha").style.display = "none";
  document.getElementById("lore").style.display = "none";
  document.getElementById("personagens").style.display = "none";
  document.getElementById("visualizacaoFicha").style.display = "none"; 
}


function mostrarFicha() {
  esconderTudo();
  document.getElementById("ficha").style.display = "block";
}

function mostrarLore() {
  esconderTudo();
  document.getElementById("lore").style.display = "block";
}

function mostrarPersonagens() {
  esconderTudo();
  document.getElementById("personagens").style.display = "block";
  carregarPersonagens();
}

function voltar() {
  esconderTudo();
  document.getElementById("inicio").style.display = "block";
}

function baixarFicha() {
  const nome = document.getElementById("nomePersonagem").value;
  const historico = document.getElementById("historico").value;
  const raca = document.getElementById("raca").value;
  const classe = document.getElementById("classe").value;
  const marca = document.getElementById("marca").value;
  const ascendencia = document.getElementById("ascendencia").value;

  const texto = `Nome: ${nome}\nAscendência: ${ascendencia}\nHistórico: ${historico}\nRaça: ${raca}\nClasse: ${classe}\nMarca: ${marca}`;
  const blob = new Blob([texto], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "ficha.txt";
  link.click();
}
function lerImagemComoBase64(inputFile, callback) {
  if (inputFile.files && inputFile.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      callback(e.target.result); 
    };
    reader.readAsDataURL(inputFile.files[0]);
  } else {
    callback(null);
  }
}


function salvarPersonagem() {
  lerImagemComoBase64(document.getElementById("imagemUpload"), (base64Imagem) => {
    const nome = document.getElementById("nomePersonagem").value;
    const historico = document.getElementById("historico").value;
    const raca = document.getElementById("raca").value;
    const classe = document.getElementById("classe").value;
    const marca = document.getElementById("marca").value;
    const ascendencia = document.getElementById("ascendencia").value;

    
    const imagemInput = document.getElementById("imagemUpload");
    const imagemAtual = imagemInput.getAttribute("data-imagem-anterior");
    const imagem = base64Imagem || imagemAtual || "";

    const personagem = { nome, historico, raca, classe, marca, ascendencia, imagem };
    let salvos = JSON.parse(localStorage.getItem("personagens") || "[]");

    if (indiceEdicao !== null) {
      salvos[indiceEdicao] = personagem;
      indiceEdicao = null;
      alert("Personagem editado com sucesso!");
    } else {
      salvos.push(personagem);
      alert("Personagem salvo com sucesso!");
    }

    localStorage.setItem("personagens", JSON.stringify(salvos));
    imagemInput.value = ""; 
    imagemInput.removeAttribute("data-imagem-anterior");
  });
}

function carregarPersonagens() {
  let container = document.getElementById("painelPersonagens");
  container.innerHTML = "";

  let salvos = JSON.parse(localStorage.getItem("personagens") || "[]");

  if (salvos.length === 0) {
    container.innerHTML = "<p>Nenhum personagem salvo ainda.</p>";
    return;
  }

  salvos.forEach((p, i) => {
    let div = document.createElement("div");
    div.className = "personagem-card";

    let img = document.createElement("img");
    img.src = p.imagem || "https://via.placeholder.com/100"; 

    let nome = document.createElement("h3");
    nome.textContent = p.nome || "[Sem nome]";

    let info = document.createElement("p");
    info.innerHTML = `${p.raca}, ${p.classe}<br>Marca: ${p.marca}<br>Ascendência: ${p.ascendencia}`;

    let acoes = document.createElement("div");
    acoes.className = "acoes";

    let btnVer = document.createElement("button");
    btnVer.textContent = "Acessar Ficha";
    btnVer.onclick = () => acessarFicha(i);


    let btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => editarPersonagem(i);

    let btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.style.backgroundColor = "#aa0000";
    btnExcluir.onclick = () => excluirPersonagem(i);

    acoes.append(btnVer, btnEditar, btnExcluir);

    div.append(img, nome, info, acoes);
    container.appendChild(div);
  });
}


function excluirPersonagem(index) {
  let salvos = JSON.parse(localStorage.getItem("personagens") || "[]");
  salvos.splice(index, 1);
  localStorage.setItem("personagens", JSON.stringify(salvos));
  carregarPersonagens();
}

function editarPersonagem(index) {
  const salvos = JSON.parse(localStorage.getItem("personagens") || "[]");
  const p = salvos[index];

  document.getElementById("nomePersonagem").value = p.nome;
  document.getElementById("historico").value = p.historico;
  document.getElementById("raca").value = p.raca;
  document.getElementById("classe").value = p.classe;
  document.getElementById("marca").value = p.marca;
  document.getElementById("ascendencia").value = p.ascendencia;

  const imagemInput = document.getElementById("imagemUpload");
  imagemInput.setAttribute("data-imagem-anterior", p.imagem || "");
  imagemInput.value = ""; 

  indiceEdicao = index;
  mostrarFicha();
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

function acessarFicha(index) {
  esconderTudo();
  atributos.vida = { atual: 10, max: 10 };
atributos.egni = { atual: 10, max: 10 };
atributos.sanidade = { atual: 10, max: 10 }; 

atualizarBarra("vida");
atualizarBarra("egni");
atualizarBarra("sanidade");


  const salvos = JSON.parse(localStorage.getItem("personagens") || "[]");
  const p = salvos[index];

  document.getElementById("visualizacaoFicha").style.display = "block";

  document.getElementById("nomeFicha").textContent = p.nome || "[Sem nome]";
  document.getElementById("dadosBasicosFicha").innerHTML = `
    Classe: ${p.classe || "—"} | Raça: ${p.raca || "—"} | Ascendência: ${p.ascendencia || "—"}
  `;

 
  document.getElementById("sabedoriaPassiva").textContent = "15";
  document.getElementById("grauVigor").textContent = "3";
  
 atributos.vida = { atual: 10, max: 10 };
atributos.egni = { atual: 10, max: 10 };
atualizarBarra("vida");
atualizarBarra("egni");


  document.getElementById("defesa").textContent = "25";
  document.getElementById("esquiva").textContent = "35";
  document.getElementById("estadoMental").textContent = "Estável";
}


function atualizarBarra(atributo) {
  const dados = atributos[atributo];
  const porcentagem = Math.max(0, Math.min(dados.atual / dados.max, 1)) * 100;

  document.getElementById(`barra${capitalize(atributo)}`).style.width = porcentagem + "%";
  document.getElementById(`texto${capitalize(atributo)}`).textContent = `${dados.atual}/${dados.max}`;
}

function ajustarAtributo(atributo, delta) {
  atributos[atributo].atual = Math.max(0, Math.min(atributos[atributo].atual + delta, atributos[atributo].max));
  atualizarBarra(atributo);
}
function ajustarMaximo(atributo, delta) {
  const dados = atributos[atributo];
  dados.max = Math.max(1, dados.max + delta); 
  dados.atual = dados.max; 
  atualizarBarra(atributo);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarBarra("vida");
  atualizarBarra("egni");
  atualizarBarra("sanidade");

});
