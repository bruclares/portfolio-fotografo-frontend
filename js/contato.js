const formulario = document.querySelector("#form-contato");

formulario.addEventListener("submit", async function (event) {
  event.preventDefault();

  const dadosFormulario = new FormData(formulario);
  const dados = Object.fromEntries(dadosFormulario.entries());

  try {
    let resposta = await fetch("http://127.0.0.1:5000/api/contatos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    resposta = await resposta.json();

    if ("erro" in resposta) {
      throw new Error(resposta.erro);
    }

    formulario.reset();

    const alerta = document.querySelector(".alert");
    alerta.innerText = resposta.sucesso;

    if (alerta.classList.contains("alert-error")) {
      alerta.classList.remove("alert-error");
    }
    alerta.classList.add("alert-success");

    if (!alerta.classList.contains("show")) {
      alerta.classList.add("show");
    }
  } catch (erro) {
    const alerta = document.querySelector(".alert");
    alerta.innerText = erro;
    alerta.classList.add("alert-error");

    if (!alerta.classList.contains("show")) {
      alerta.classList.add("show");
    }
  }
});
