const url = 'https://opensheet.vercel.app/15XWAISDRX3bPjaTBj0KWK-SIFGiJMi530cDdsns3Eug/Página1';

const categorias = {
  "RX Masculino": [],
  "RX Feminino": [],
  "Dupla Scaled Masculino": [],
  "Dupla Scaled Feminino": []
};

fetch(url)
  .then(res => res.json())
  .then(data => {
    data.forEach(entry => {
      const wods = [
        Number(entry["WOD1"] || 0),
        Number(entry["WOD2"] || 0),
        Number(entry["WOD3"] || 0),
        Number(entry["WOD4"] || 0),
        Number(entry["WOD5"] || 0)
      ];

      const atleta = {
        nome: entry["Nome"],
        categoria: entry["Categoria"],
        box: entry["Box"],
        nomeExtra: entry["Nome Extra"],
        wods: wods,
        total: wods.reduce((acc, val) => acc + val, 0)
      };

      if (categorias[atleta.categoria]) {
        categorias[atleta.categoria].push(atleta);
      }
    });

    iniciarLeaderboards();
  });

function iniciarLeaderboards() {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(c => c.classList.remove('active'));
      document.getElementById(tab.dataset.tab).classList.add('active');

      gerarTabela(tab.dataset.tab);
    });
  });

  gerarTabela('rx-m'); // inicial
}

function gerarTabela(id) {
  const mapaIds = {
    'rx-m': 'RX Masculino',
    'rx-f': 'RX Feminino',
    'scaled-m': 'Dupla Scaled Masculino',
    'scaled-f': 'Dupla Scaled Feminino'
  };

  const categoria = mapaIds[id];
  const lista = categorias[categoria] || [];
  const container = document.getElementById(id);
  container.innerHTML = '';

  lista.sort((a, b) => b.total - a.total);

  let tabela = '<table><thead><tr><th>Pos</th><th>Nome</th>';
  for (let i = 1; i <= 5; i++) tabela += `<th>WOD ${i}</th>`;
  tabela += '<th>Total</th></tr></thead><tbody>';

  lista.forEach((atleta, index) => {
    tabela += `<tr><td>${index + 1}</td><td>${atleta.nome}</td>`;
    atleta.wods.forEach(p => tabela += `<td>${p}</td>`);
    tabela += `<td>${atleta.total}</td></tr>`;
  });

  tabela += '</tbody></table>';
  container.innerHTML = tabela;
}