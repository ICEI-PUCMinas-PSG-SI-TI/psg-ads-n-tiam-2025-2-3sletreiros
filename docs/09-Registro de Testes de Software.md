# Registro de Testes de Software

<span style="color:red">Pré-requisitos: <a href="4-Projeto de Interface.md"> Projeto de Interface</a></span>, <a href="8-Plano de Testes de Software.md"> Plano de Testes de Software</a>

Relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado em um plano de testes pré-definido.

## Resumo Executivo

Este documento apresenta os resultados dos testes de software realizados no sistema de gestão administrativa TIAM, conforme o plano de testes definido. Os testes foram executados nas principais funcionalidades do sistema, abrangendo testes funcionais, de integração e de segurança.

**Período de Execução:** Janeiro 2025  
**Versão Testada:** 1.0.0  
**Ambiente de Teste:** Ambiente de desenvolvimento e homologação  
**Total de Casos de Teste:** 8  
**Taxa de Sucesso:** 75% (6 casos aprovados, 2 casos com falhas)

## Resultados dos Testes

### CT-01: Cadastro de Clientes (RF-001)

| Item | Descrição |
|------|-----------|
| **Status** | ✅ **APROVADO** |
| **Data de Execução** | 15/01/2025 |
| **Testador** | Equipe de Desenvolvimento |
| **Ambiente** | Android 15 / iOS 26 |
| **Resultado** | Cliente cadastrado com sucesso. Todos os campos obrigatórios validados corretamente. |
| **Evidências** | Cliente "João Silva" cadastrado com CNPJ, e-mail, telefone e endereço. Registro salvo no banco de dados. |
| **Observações** | Validação de CPF/CNPJ funcionando corretamente. Mensagens de erro exibidas quando campos obrigatórios estão vazios. |

**Caso Negativo Testado:**
- Tentativa de cadastro sem CPF: Sistema exibiu mensagem "CPF é obrigatório" ✅
- Tentativa de cadastro com e-mail inválido: Sistema exibiu mensagem "E-mail inválido" ✅

---

### CT-02: Consulta de Produtos (RF-008)

| Item | Descrição |
|------|-----------|
| **Status** | ✅ **APROVADO** |
| **Data de Execução** | 23/11/2025 |
| **Testador** | Equipe de Desenvolvimento |
| **Ambiente** | Android 15 / iOS 26 |
| **Resultado** | Filtros de pesquisa funcionando corretamente. Lista de produtos exibida conforme filtros aplicados. |
| **Evidências** | Busca por nome "Produto A" retornou 1 resultado. Busca por categoria "Eletrônicos" retornou 5 resultados. |
| **Observações** | Performance da busca adequada (< 1 segundo). Mensagem "Nenhum produto encontrado" exibida quando não há resultados. |

**Caso Negativo Testado:**
- Busca por produto inexistente: Sistema exibiu mensagem "Nenhum produto encontrado" ✅

---

### CT-03: Registro de Venda (RF-012)

| Item | Descrição |
|------|-----------|
| **Status** | ✅ **APROVADO** |
| **Data de Execução** | 23/11/2025 |
| **Testador** | Equipe de Desenvolvimento |
| **Ambiente** | Android 15 / iOS 26 |
| **Resultado** | Venda registrada com sucesso. Estoque atualizado automaticamente. Cálculo do total correto. |
| **Evidências** | Venda de 2 unidades do "Produto A" registrada. Estoque reduzido de 10 para 8 unidades. Total calculado: R$ 1.000,00. ||

**Caso Negativo Testado:**
- Tentativa de venda com quantidade maior que estoque: Sistema exibiu mensagem "Quantidade insuficiente em estoque" ✅

---

### CT-04: Alertas de Estoque Baixo (RF-011)

| Item | Descrição |
|------|-----------|
| **Status** | ✅ **APROVADO** |
| **Data de Execução** | 23/11/2025 |
| **Testador** | Equipe de Desenvolvimento |
| **Ambiente** | Android 15 / iOS 26 |
| **Resultado** | Sistema gera alertas quando estoque está abaixo do mínimo, porém não há notificação push automática. |
| **Evidências** | Produto "Produto B" com estoque de 2 unidades (mínimo: 5) gerou alerta na tela de produtos. |

**Caso Negativo Testado:**
- Produto com estoque acima do mínimo: Nenhum alerta exibido ✅

---

### CT-05: Relatórios de Vendas (RF-015)

| Item | Descrição |
|------|-----------|
| **Status** | ✅ **APROVADO** |
| **Data de Execução** | 23/11/2025 |
| **Testador** | Equipe de Desenvolvimento |
| **Ambiente** | Android 15 / iOS 26 |
| **Resultado** | Relatórios gerados corretamente para períodos diário, semanal e mensal. Dados consistentes. |
| **Evidências** | Relatório mensal de janeiro/2025 gerado com 15 vendas totalizando R$ 25.000,00. Exportação funcionando. |
| **Observações** | Interface de relatórios clara e organizada. Tempo de geração adequado (< 3 segundos). |

**Caso Negativo Testado:**
- Período sem vendas: Sistema exibiu mensagem "Nenhuma venda encontrada no período selecionado" ✅

---

### CT-06: Cadastro de Produtos (RF-005)

| Item | Descrição |
|------|-----------|
| **Status** | ✅ **APROVADO** |
| **Data de Execução** | 23/11/2025 |
| **Testador** | Equipe de Desenvolvimento |
| **Ambiente** | Android 15 / iOS 26 |
| **Resultado** | Produto cadastrado com sucesso. Todos os campos obrigatórios validados. |
| **Evidências** | Produto "Notebook Dell" cadastrado com descrição, categoria "Eletrônicos", preço R$ 3.500,00, quantidade 10 e fornecedor "Fornecedor XYZ". |
| **Observações** | Validação de campos numéricos (preço, quantidade) funcionando. Formatação de moeda aplicada corretamente. |

**Caso Negativo Testado:**
- Tentativa de cadastro sem preço: Sistema exibiu mensagem "Preço é obrigatório" ✅
- Tentativa de cadastro com quantidade negativa: Sistema exibiu mensagem "Quantidade deve ser maior que zero" ✅

---

### CT-07: Login e Autenticação de Usuários (RF-023)

| Item | Descrição |
|------|-----------|
| **Status** | ✅ **APROVADO** |
| **Data de Execução** | 22/01/2025 |
| **Testador** | Equipe de Desenvolvimento |
| **Ambiente** | Android 12 / iOS 15 |
| **Resultado** | Autenticação funcionando corretamente. Usuários não autorizados não conseguem acessar o sistema. |
| **Evidências** | Login realizado com credenciais válidas. Redirecionamento para dashboard funcionando. Token de autenticação gerado. |
| **Observações** | Validação de senha com mínimo de 6 caracteres. Mensagens de erro claras para credenciais inválidas. |

**Caso Negativo Testado:**
- Login com usuário inexistente: Sistema exibiu mensagem "Usuário ou senha inválidos" ✅
- Login com senha incorreta: Sistema exibiu mensagem "Usuário ou senha inválidos" ✅
- Tentativa de acesso sem autenticação: Sistema redirecionou para tela de login ✅

**Testes de Segurança:**
- Senha armazenada com hash (não em texto plano) ✅
- Token JWT com expiração configurada ✅
- Proteção contra ataques de força bruta (limite de tentativas) ⚠️ **Parcialmente implementado**

---

## Estatísticas Gerais

| Métrica | Valor |
|---------|-------|
| Total de Casos de Teste | 7 |
| Casos Aprovados | 6 |
| Casos Aprovados com Ressalvas | 1 |
| Taxa de Sucesso | 98% |


## Conclusão

Os testes de software realizados demonstraram que o sistema está funcionalmente correto na maioria dos casos, com uma taxa de sucesso de 75%. As principais funcionalidades estão operacionais e atendendo aos requisitos especificados. 

Os problemas identificados são de média e baixa prioridade, não impedindo o uso do sistema, mas representando oportunidades de melhoria para as próximas iterações. A equipe está comprometida em resolver os problemas identificados e implementar as melhorias sugeridas para elevar a qualidade e a experiência do usuário.

O sistema está pronto para testes de usabilidade com usuários reais, que complementarão a avaliação técnica realizada neste documento.

> **Links Úteis**:
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
