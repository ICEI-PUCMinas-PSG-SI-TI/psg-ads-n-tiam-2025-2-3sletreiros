# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da Solução](img/02-mob-arch.png)

## Diagrama de Classes

![Diagrama de Classes](img/Diagrama_Classe.png)

## Modelo ER

![Modelo ER](img/Modelo_ER1.png)

## Modelo Físico

```
// ================== COLEÇÃO EMPRESA ==================
db.createCollection("empresas")
db.empresas.insertOne({
  _id: ObjectId(),
  nome: "Tech Solutions",
  social: "Tech Solutions LTDA",
  cnpj: "12.345.678/0001-90",
  ramo: "Tecnologia",
  tipo: "Privada",
  assinatura_ativa: true,
  email: "contato@tech.com",
  senha: "123456",
  endereco: {
    rua: "Av. Paulista",
    numero: 1000,
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    uf: "SP",
    cep: "01310-100"
  }
})

// ================== COLEÇÃO FUNCIONARIO ==================
db.createCollection("funcionarios")
db.funcionarios.insertOne({
  _id: ObjectId(),
  empresa_id: ObjectId("..."), // referência empresa
  nome: "João",
  sobrenome: "Silva",
  data_nascimento: ISODate("1990-05-10"),
  rg: "12.345.678-9",
  cpf: "123.456.789-00",
  email: "joao@tech.com",
  senha: "senha123",
  ctps: "1234567",
  status: true,
  cargo: "Gerente",
  endereco: {
    rua: "Rua A",
    numero: 45,
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP",
    uf: "SP",
    cep: "01311-000"
  }
})

// ================== COLEÇÃO PRODUTO ==================
db.createCollection("produtos")
db.produtos.insertOne({
  _id: ObjectId(),
  empresa_id: ObjectId("..."), // referência empresa
  nome: "Notebook Dell",
  preco: 4500.00,
  descricao: "Notebook i7 16GB RAM",
  estoque: 20
})

// ================== COLEÇÃO SERVIÇO ==================
db.createCollection("servicos")
db.servicos.insertOne({
  _id: ObjectId(),
  empresa_id: ObjectId("..."), // referência empresa
  descricao: "Manutenção de servidor",
  data: ISODate("2025-09-28"),
  nome_cliente: "Empresa X",
  titulo: "Contrato de suporte"
})

// ================== COLEÇÃO VENDAS ==================
db.createCollection("vendas")
db.vendas.insertOne({
  _id: ObjectId(),
  empresa_id: ObjectId("..."),     // referência empresa
  vendedor_id: ObjectId("..."),    // referência funcionário
  data: ISODate("2025-09-28"),
  valor_total: 9000.00,
  itens: [
    {
      produto_id: ObjectId("..."), // referência produto
      quantidade: 2,
      valor: 4500.00,
      observacao: "Entrega em 7 dias"
    }
  ]
})
```
## Tecnologias Utilizadas

Descreva aqui qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.

| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| SGBD           | MongoDB         |
| Front end      | JS+React        |
| Back end       | Node+Express    |
| Deploy Front   | Vercel          |
| ORM            | Mongoose        |
| Deploy Back    | Render          |
| API Externa    | Google Maps     |
| API Externa    | ViaCEP          |

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de Software

# Qualidade de Software no Projeto (ISO/IEC 25010)

Este projeto foi desenvolvido considerando algumas características da norma **ISO/IEC 25010**, garantindo que o sistema seja confiável, seguro e fácil de evoluir.

## Características Selecionadas

| Característica  | Sub-característica | Por que | Métricas de Avaliação |
|-----------------|--------------------|---------|------------------------|
| **Manutenibilidade** | Modificabilidade | Arquitetura em camadas (Front-end separado do Back-end) para facilitar evolução. Novas funcionalidades podem ser adicionadas ou regras alteradas sem grandes impactos. | - Tempo médio para adicionar uma funcionalidade simples<br>- Número de bugs reportados após atualizações |
| **Confiabilidade** | Tolerância a Falhas | O sistema lida com dados financeiros e deve continuar funcionando mesmo diante de erros (ex.: saque inválido, falha de conexão). | - Percentual de requisições à API que retornam erro **5xx**<br>- Tempo Médio de Recuperação (**MTTR**) após falhas críticas |
| **Segurança** | Integridade | A integridade dos dados (saldo, informações pessoais) deve ser preservada. Uso de modelagem relacional e validações no back-end. | - Vulnerabilidades encontradas em testes de **SQL Injection**<br>- Logs de acessos negados (tentativas de alteração sem permissão) |

---

## Resumo
O projeto segue três pilares principais:  

- ✅ **Fácil de evoluir (Manutenibilidade)**  
- ✅ **Funciona mesmo em situações de erro (Confiabilidade)**  
- ✅ **Protege os dados (Segurança)**  


> **Links Úteis**:
>
> - [ISO/IEC 25010:2011 - Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models](https://www.iso.org/standard/35733.html/)
> - [Análise sobre a ISO 9126 – NBR 13596](https://www.tiespecialistas.com.br/analise-sobre-iso-9126-nbr-13596/)
> - [Qualidade de Software - Engenharia de Software 29](https://www.devmedia.com.br/qualidade-de-software-engenharia-de-software-29/18209/)
