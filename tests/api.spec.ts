import { test, expect } from '@playwright/test'

test.describe.parallel('Testando APIs', () => {
  const urlAPI = 'https://reqres.in/api' //salvando a base da url da api numa constante

  /*Nos testes abaixo iremos trabalhar com 4 métodos de requisições HTTP: GET, POST, PUT e DELETE
    https://www.restapitutorial.com/lessons/httpmethods.html*/

  test('Teste básico - Status 200 - cenário positivo', async ({ request }) => {
    const response = await request.get(`${urlAPI}/users/3`) //montar a requisição de busca (GET) com base + endpoint (users) + parametro (id)
    expect(response.status()).toBe(200) //validação de resultado recebido x esperado

    /* Exemplos de status: 
        1xx Informativo, 2xx Sucesso, 3xx Redirecionamento, 4xx Erro no Cliente e 5xx Erro no Servidor
        Referência: https://www.httpstatus.com.br/ */
  })

  test('Teste básico - Status 404 - cenário negativo', async ({ request }) => {
    const response = await request.get(`${urlAPI}/users/id-invalido`) //montar a requisição de busca (GET) com base + endpoint (users) + parametro (id inexistente)
    expect(response.status()).toBe(404) //validação de resultado recebido x esperado
  })

  test('GET Request - Buscando detalhes de um usuário', async ({ request }) => {
    const response = await request.get(`${urlAPI}/users/1`) //montar a requisição de busca (GET) com base + endpoint (users) + parametro (id)
    const responseBody = JSON.parse(await response.text()) //converter resultado em formato json que o código consegue ler

    expect(response.status()).toBe(200) //validação de status recebido x esperado
    // Aqui são as validações de cada elemento retornado pela requisição
    expect(responseBody.data.id).toBe(1) //validação do elemento id "id deve ser igual 1"
    expect(responseBody.data.first_name).toBe('George') //validação do elemento first name "first name deve ser igual George"
    expect(responseBody.data.last_name).toBe('Bluth') //validação do elemento last name "last name deve ser igual Bluth"
    expect(responseBody.data.email).toBeTruthy() //validação da EXISTÊNCIA do elemento email "email deve existir" no retorno "to be truthy" = é verdadeiro/existe
  })

  test('POST Request - Criando um novo usuário', async ({ request }) => {
    const response = await request.post(`${urlAPI}/user`, { //montar a requisição de criação (POST) com base + endpoint (users)
      //dessa vez o parâmetro é enviado a partir de um body (corpo), por isso abrimos o próximo elemento "data"
      data: { 
        id: 1000, //enviando o id do novo usuário
      },
    })
    const responseBody = JSON.parse(await response.text()) //converter resultado em formato json que o código consegue ler
    expect(responseBody.id).toBe(1000) //validação de status recebido x esperado
    expect(responseBody.createdAt).toBeTruthy() //validação da EXISTÊNCIA do elemento createdAt "createdAt deve existir" no retorno "to be truthy" = é verdadeiro/existe
  })

  test('POST Request - Login - Cenário positivo', async ({ request }) => {
    const response = await request.post(`${urlAPI}/login`, { //montar a requisição de criação (POST) com base + endpoint (login)
      //passando o parâmetro no body (corpo) da requisição, por isso abrimos o próximo elemento "data"
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    })
    const responseBody = JSON.parse(await response.text()) //converter resultado em formato json que o código consegue ler
    expect(response.status()).toBe(200) //validação de status recebido x esperado
    expect(responseBody.token).toBeTruthy() //validação da EXISTÊNCIA do elemento token "token deve existir" no retorno "to be truthy" = é verdadeiro/existe
  })

  test('POST Request - Falha no Login - Cenário negativo', async ({ request }) => {
    const response = await request.post(`${urlAPI}/login`, { //montar a requisição de criação (POST) com base + endpoint (login)
      //passando o parâmetro no body (corpo) da requisição, por isso abrimos o próximo elemento "data"
      data: {
        email: 'teste@ulbra.br',
      },
    })
    const responseBody = JSON.parse(await response.text()) //converter resultado em formato json que o código consegue ler
    expect(response.status()).toBe(400) //validação de status recebido x esperado. E como dito anteriormente, dessa vez é 400 pois é um erro do lado do cliente, pois não enviamos a senha
    expect(responseBody.error).toBe('Missing password') //validação do retorno da requisição, a mensagem de erro diz que não adicionamos a senha no corpo da requisição
  })

  test('PUT Request - Atualizar usuário', async ({ request }) => {
    const response = await request.put(`${urlAPI}/users/2`, { //montar a requisição de atualização (PUT) com base + endpoint (users) + parâmetro (id=2)
      //como iremos atualizar informações do usuário, também iremos enviar um corpo com os novos valores para os parâmetros name e job
      data: {
        name: 'namename',
        job: 'jobjob',
      },
    })
    const responseBody = JSON.parse(await response.text()) //converter resultado em formato json que o código consegue ler

    expect(response.status()).toBe(200) //validação de status recebido x esperado
    // Aqui são as validações de cada elemento retornado pela requisição
    expect(responseBody.name).toBe('namename') //validação do elemento name "name deve ser igual namename"
    expect(responseBody.job).toBe('jobjob') //validação do elemento job "job deve ser igual jobjob"
    expect(responseBody.updatedAt).toBeTruthy() //validação da EXISTÊNCIA do elemento token "token deve existir" no retorno "to be truthy" = é verdadeiro/existe
  })

  test('DELETE Request - Deletar usuário', async ({ request }) => {
    const response = await request.delete(`${urlAPI}/users/2`) //montar a requisição de exclusão (DELETE) com base + endpoint (users) + parâmetro (id=2)
    expect(response.status()).toBe(204) //validação do status recebido x esperado. O status 204 significa "No Content". É nosso indício que o usuário foi deletado e esse parâmetro não existe mais, não tem mais conteúdo
  })
})
