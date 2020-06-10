var listElement = document.querySelector('#app ul');
var buttonElement = document.querySelector('#app button');
var inputElement = document.querySelector('#app input');

var todos = JSON.parse(localStorage.getItem('listaDeTodos')) || [];

/*
    Na etapa acima, fazemos a primeira etapa de qualquer interação entre o Javascript
    e nossa página HTML: importamos os elementos que precisaremos manipular, os armazenando
    em variáveis. Trouxemos nossa lista 'ul', nosso botão 'button' e nosso campo de digitação
    'input'. Os valores da lista não foram trazidos do HTML, mas sim criados aqui em nosso 
    arquivo Javascript, no array 'todos'. A exibição dos dados em nossa página, então, é feita
    pela função 'renderTodos()' abaixo. Ela usa o recurso 'for of', para ler a quantidade exata
    de itens no array e rodar quantas vezes forem necessárias (é um tipo de 'for' específico para arrays).
    Com ele, criamos nossas linhas 'todoElement'. A função 'createTextNode()' cria os textos da página,
    pegando o valor passado no parâmetro. Nesse caso, como está rodando no 'for of', ela vai escrever
    cada um dos valores que estiverem no array 'todos', quando ele for lido pela função 'renderTodos()'.
    Por fim, cada texto criado se torna filho de cada 'li', bem como cada 'li' se torna filha a lista 'ul',
    permitindo que todo o conteúdo gerado se torne visível para o usuário.
*/     


function renderTodos(){

    listElement.innerHTML = '';

    for(todo of todos){
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);

        var linkElement = document.createElement('a');

        linkElement.setAttribute('href', '#');

        var pos = todos.indexOf(todo);
        linkElement.setAttribute('onclick', 'deleteTodos('+ pos +')');

        var linkText = document.createTextNode('Excluir');        

        todoElement.appendChild(todoText);
        linkElement.appendChild(linkText);

        listElement.appendChild(todoElement);
        listElement.appendChild(linkElement);
    }
}

renderTodos();

/*
    A função push adiciona um novo elemento ao fim do Array.
    Aqui, dizemos que o array 'todos' recebe o 'todoText', 
    que representa o conteúdo digitado pelo usuário no inputElement.
    Após fazermos isso e limparmos o campo de busca, pedimos à função
    que chame a anteiror, que realiza a leitura dos elementos do array
    e os adiciona à lista da nossa página web.
    Porém, quando fazia a nova leitura, a função 'rendertodos()', 
    além do valor digitado, tambem lia, outra vez, os valores que já existiam
    e duplicava todos na tela. Para resolver esse problema, chamamos o recurso
    'innerHTML' em nossa lista. A função dele é manipular todo o conteúdo
    dentro do elemento que o chama. Assim, zeramos os valores que a página exibia,
    antes que ela lesse o array 'todos' novamente, agora com o novo valor.
*/
function addTodos(){
    var todoText = inputElement.value;
    todos.push(todoText);

    inputElement.value = '';
    renderTodos();
    saveStorage()
}

buttonElement.onclick = addTodos;

function deleteTodos(pos){
    todos.splice(pos, 1);
    renderTodos();
    saveStorage()
}

function saveStorage(){
    localStorage.setItem('listaDeTodos', JSON.stringify(todos));
}