# 💻 Desafio 01 - Rocketseat Node.js - Fundamentos de Node.js
Desafio referente ao módulo Fundamentos do Node.js - Rocketseat
Desenvolvimento de uma API para realizar o CRUD de suas *tasks* (tarefas).

## Estrutura da Task:

  - `id` - Identificador único de cada task
  - `title` - Título da task
  - `description` - Descrição detalhada da task
  - `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser `null`
  - `created_at` - Data de quando a task foi criada.
  - `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.

## Rotas:

### Criar task - `POST - /tasks`
Deve ser possível criar uma task no banco de dados, enviando os campos `title` e `description` por meio do `body` da requisição.
Ao criar uma task, os campos: `id`, `created_at`, `updated_at` e `completed_at` devem ser preenchidos automaticamente, conforme a orientação das propriedades acima.

**body:**
```
{
  "title": "Title 01",
  "description": "Description 01"
}
```

**response:**
```
No body returned for response
```
    
### Listar tasks -`GET - /tasks`
Deve ser possível listar todas as tasks salvas no banco de dados.
Também deve ser possível realizar uma busca, filtrando as tasks pelo `title` e `description`

**query:**
```
search=texto-a-ser-buscado
```

**response:**
```
[
  {
   "id": "82aa40e5-f1b0-4669-bc18-3e284a2faab7",
    "title": "Title 01",
    "description": "Description 01",
    "completed_at": null,
    "created_at": "2024-06-05T17:52:29.630Z",
    "updated_at": "2024-06-05T17:52:29.630Z"
  },
  ...
]
```

### Editar task pelo ID - `PUT - /tasks/:id`
Deve ser possível atualizar uma task pelo `id`.
No `body` da requisição, deve receber somente o `title` e/ou `description` para serem atualizados.
Se for enviado somente o `title`, significa que o `description` não pode ser atualizado e vice-versa.
Antes de realizar a atualização, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.

**body:**
```
{
  "title": "Title 01 updated",
  "description": "Description 01 updated"
}
```
or
 ```
{
  "title": "Title 01 updated"
}
```
or
 ```
{
  "description": "Description 01 updated"
}
```

**response:**
```
No body returned for response
```

### Deletar task pelo ID - `DELETE - /tasks/:id`
Deve ser possível remover uma task pelo `id`.
Antes de realizar a remoção, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.

**response:**
```
No body returned for response
```

### Marcar task como completa ou não - `PATCH - /tasks/:id/complete`
Deve ser possível marcar a task como completa ou não. Isso significa que se a task estiver concluída, deve voltar ao seu estado “normal”.
Antes da alteração, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.

**response:**
```
No body returned for response
```

## Como rodar a API
No terminal, acesse a pasta raiz do projeto e insira o comando `npm run dev` para rodar o projeto em modo de desenvolvimento. 

### Importação do CSV
Normalmente em uma API, a importação de um CSV acontece enviando o arquivo pela rota, por meio de outro formato, chamado `multipart/form-data`.
Como ainda não vimos isso em aula, a importação será feita de outra forma.

No nosso projeto, para fazer a importação do arquivo `tasks.csv` devemos acessar a pasta raiz do projeto e inserir o comando `node node src/stream-import-csv/import-csv.js `

