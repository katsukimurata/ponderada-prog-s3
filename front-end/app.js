const apiUrl = 'http://100.25.150.68:3000'; 

function createUser() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const cpf = document.getElementById('cpf').value;

    axios.post(`${apiUrl}/users`, { nome, idade, cpf })
        .then(response => {
            alert('Usuario criado!');
            document.getElementById('nome').value = '';
            document.getElementById('idade').value = '';
            document.getElementById('cpf').value = '';
        })
        .catch(error => {
            console.error('Erro ao cirar usuario!', error);
        });
}

function getUsers() {
    axios.get(`${apiUrl}/users`)
        .then(response => {
            const users = response.data;
            const userList = document.getElementById('user-list');
            userList.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `ID: ${user.id}, Nome: ${user.nome}, Idade: ${user.idade}, CPF: ${user.cpf}`;
                userList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar usuarios!', error);
        });
}

function deleteUser() {
    const userId = document.getElementById('userId').value;

    axios.delete(`${apiUrl}/users/${userId}`)
        .then(response => {
            alert('Usuario Deletado!');
            document.getElementById('userId').value = '';
        })
        .catch(error => {
            console.error('Erro ao deletar o usuario!', error);
        });
}
