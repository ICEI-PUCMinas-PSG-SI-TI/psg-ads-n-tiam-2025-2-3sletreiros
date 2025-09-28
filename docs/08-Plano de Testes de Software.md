# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

# Roteiro de Testes – Sistema de Gestão

## 1. Cadastro de Clientes (RF-001)
- **Objetivo:** Verificar se é possível cadastrar novos clientes corretamente.
- **Passos:**
  1. Acessar a tela de cadastro de clientes.
  2. Preencher todos os campos obrigatórios.
  3. Clicar em “Salvar”.
- **Tipo de Teste:** Funcional
- **Resultado Esperado:** Cliente cadastrado e listado na base de dados.
- **Caso Negativo:** Deixar CPF ou e-mail em branco → sistema exibe mensagem de erro e não permite salvar.
- **Ferramentas:** Selenium, Postman (API)

## 2. Consulta de Produtos (RF-008)
- **Objetivo:** Validar filtros de pesquisa de produtos.
- **Passos:**
  1. Acessar a tela de consulta de produtos.
  2. Informar filtro por nome ou categoria.
  3. Clicar em “Pesquisar”.
- **Tipo de Teste:** Funcional
- **Resultado Esperado:** Lista de produtos exibida conforme os filtros.
- **Caso Negativo:** Inserir nome inexistente → lista vazia ou mensagem “Nenhum produto encontrado”.
- **Ferramentas:** Selenium, JMeter (performance de filtro)

## 3. Registro de Venda (RF-012)
- **Objetivo:** Testar o registro de vendas e atualização de estoque.
- **Passos:**
  1. Abrir a tela de vendas.
  2. Selecionar cliente e produtos.
  3. Informar quantidade e preço unitário.
  4. Confirmar venda.
- **Tipo de Teste:** Funcional / Integração
- **Resultado Esperado:** Venda registrada, total calculado corretamente, estoque atualizado.
- **Caso Negativo:** Informar quantidade maior que o estoque disponível → erro “Quantidade insuficiente”.
- **Ferramentas:** Selenium, Postman, SQL Server Management Studio

## 4. Alertas de Estoque Baixo (RF-011)
- **Objetivo:** Garantir que o sistema alerta quando o estoque está abaixo do mínimo.
- **Passos:**
  1. Reduzir manualmente ou registrar vendas até o produto ficar abaixo do estoque mínimo.
  2. Acessar a tela de alertas.
- **Tipo de Teste:** Funcional / Automático
- **Resultado Esperado:** Sistema exibe alerta indicando produtos com estoque baixo.
- **Caso Negativo:** Produto com estoque suficiente não deve gerar alerta.
- **Ferramentas:** Selenium, Jenkins (automatização)

## 5. Relatórios de Vendas (RF-015)
- **Objetivo:** Validar geração de relatórios (diário, semanal, mensal).
- **Passos:**
  1. Acessar a tela de relatórios de vendas.
  2. Selecionar período desejado.
  3. Gerar relatório.
- **Tipo de Teste:** Funcional / Relatório
- **Resultado Esperado:** Relatório gerado com informações corretas.
- **Caso Negativo:** Selecionar período sem vendas → relatório vazio ou mensagem informativa.
- **Ferramentas:** Power BI, Crystal Reports, Selenium

## 6. Cadastro de Produtos (RF-005)
- **Objetivo:** Verificar cadastro de produtos.
- **Passos:**
  1. Abrir a tela de cadastro de produtos.
  2. Preencher todos os campos obrigatórios: nome, descrição, categoria, preço, quantidade e fornecedor.
  3. Salvar.
- **Tipo de Teste:** Funcional
- **Resultado Esperado:** Produto cadastrado e listado.
- **Caso Negativo:** Preço ou quantidade em branco → mensagem de erro.
- **Ferramentas:** Selenium, Postman

## 7. Registro de Aluguel (RF-016)
- **Objetivo:** Testar registro de aluguel e cálculo de valores.
- **Passos:**
  1. Abrir tela de registro de aluguel.
  2. Selecionar cliente e produto.
  3. Informar data de início, data de término e valor.
  4. Confirmar registro.
- **Tipo de Teste:** Funcional / Integração
- **Resultado Esperado:** Aluguel registrado, produto marcado como alugado, valor calculado corretamente.
- **Caso Negativo:** Data de término anterior à data de início → erro.
- **Ferramentas:** Selenium, Postman, SQL Server Management Studio

## 8. Login e Autenticação de Usuários (RF-023)
- **Objetivo:** Garantir que somente usuários cadastrados consigam acessar o sistema.
- **Passos:**
  1. Abrir tela de login.
  2. Informar usuário e senha válidos.
  3. Clicar em “Entrar”.
- **Tipo de Teste:** Funcional / Segurança
- **Resultado Esperado:** Usuário autenticado e direcionado ao dashboard.
- **Caso Negativo:** Usuário ou senha incorretos → mensagem “Usuário ou senha inválidos”.
- **Ferramentas:** Selenium, OWASP ZAP (teste de segurança)

 
## Ferramentas de Testes (Opcional)

Comente sobre as ferramentas de testes utilizadas.
 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
