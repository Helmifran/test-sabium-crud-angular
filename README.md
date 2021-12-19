* Crie um projeto utilizando Angular 7, para gerenciamento de clientes.
Requisitos:
1) É obrigatório que você utilize Angular 7 ou superior.
2) É necessário que você desenvolva um CRUD no seu projeto.
3) Você pode criar seu backend da forma que preferir. (minimo de 5 atributos)
4) O acesso ao backend, terá que estar disponível para a avalização do material.
5) Crie no minimo 2 páginas:
5.1) Na primeira página:
1. Deve conter uma listagem de registros cadastrados. (Tabela).
* No topo, deve conter um botão “Incluir”, com redirecionamento para o formulário de inclusão.
2. Na grid tem que conter uma coluna de ações com dois botões (Editar, Excluir).
3. Ao clicar em excluir deverá abrir uma caixa perguntando se deseja realmente excluir o registro
caso clique em sim deverá chamar uma requisição passando o id do registro e removê-lo o
mesmo, caso o contrário não faz nada.
4. Ao clicar em editar deverá redirecionar para a página de formulário de cadastro/edição
passando por parâmetro na url o id do registro
5.2) Na segunda página:
1. Deverá ser criada uma página específica de formulário.
* Indispensável a validação dos campos
2. Deverá conter 5 campos .
(nome: String, email: String, cpf: string, data de nascimento: Data, idade: Inteiro)
3. O Campo idade tem que estar somente leitura.
4. Validar se o nome tem mais que 5 letras, validar se o email está válido, validar o cpf se está
válido, validar se a idade é maior que 18 anos. Mostrar uma mensagem em vermelho, no caso
de erro/inválido.
5. Se o formulário estiver inválido desabilitar botão de “salvar”.
6. Usar validação com FormGroup do blibioteca do Angular.
7. Criar um botão “voltar” para a tela de listagem.
8. O Campo CPF deve conter Máscara.
6) Se necessário, você também pode utilizar outras bibliotecas como jquery, bootstrap, socket, etc.
7) Sua criatividade no design, e a lógica utilizada, também valem pontos.