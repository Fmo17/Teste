const form = document.getElementById('form-inscricao');
const mensagem = document.getElementById('mensagem');

const scriptURL = 'https://script.google.com/macros/s/AKfycbyO-JWjJ6MfWL7N-bwUL4nzuz3_Lr9di8_QHW2c6G9K7ET_9jDnyglkH0MeOaQ6_JU/exec';

form.addEventListener('submit', e => {
  e.preventDefault();

  const dados = {
    nome: form.nome.value,
    categoria: form.categoria.value,
    box: form.box.value,
    nomeExtra: form["nome-extra"].value
  };

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(dados),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    mensagem.innerText = 'Inscrição enviada com sucesso!';
    form.reset();
  })
  .catch(error => {
    mensagem.innerText = 'Erro ao enviar. Tente novamente.';
    console.error('Erro:', error);
  });
});