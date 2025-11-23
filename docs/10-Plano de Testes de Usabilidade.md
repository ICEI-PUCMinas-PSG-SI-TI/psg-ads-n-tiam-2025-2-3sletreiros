# Plano de Testes de Usabilidade

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="4-Projeto de Interface.md"> Projeto de Interface</a>

O teste de usabilidade permite avaliar a qualidade da interface com o usuário da aplicação interativa. O Plano de Testes de Usabilidade é gerado a partir da especificação do sistema e consiste em casos de testes que deverão ser executados quando a implementação estiver parcial ou totalmente pronta.

## Objetivos dos Testes

Os testes de usabilidade têm como objetivo principal avaliar a experiência do usuário ao interagir com o sistema, identificando pontos de melhoria na interface, navegação e usabilidade geral. Os objetivos específicos incluem:

- Avaliar a facilidade de uso das principais funcionalidades do sistema
- Identificar problemas de navegação e interface
- Verificar se os usuários conseguem realizar tarefas básicas sem dificuldades
- Medir a satisfação dos usuários com a interface
- Validar se o sistema atende às necessidades das personas identificadas

## Perfil dos Participantes

Os testes serão realizados com usuários que representam o público-alvo do sistema:

- **Gerentes Administrativos**: Profissionais responsáveis por acompanhar o desempenho da empresa e tomar decisões estratégicas
- **Vendedores**: Profissionais que utilizam o sistema para cadastrar clientes, consultar produtos e registrar vendas
- **Gestores de Estoque**: Profissionais responsáveis pelo controle de entrada e saída de produtos

**Critérios de Seleção:**
- Experiência com aplicativos mobile (Android ou iOS)
- Familiaridade com sistemas de gestão (mesmo que básica)
- Idade entre 25 e 45 anos
- Número mínimo de participantes: 6 usuários (2 de cada perfil)

## Metodologia

### Tipo de Teste
Teste de usabilidade moderado, onde um facilitador acompanha o usuário durante a execução das tarefas, observando e registrando dificuldades, tempo de execução e feedback verbal.

### Ambiente de Teste
- Dispositivos móveis (Android e iOS)
- Ambiente controlado ou remoto (via videoconferência)
- Aplicativo instalado e configurado previamente

### Duração
Cada sessão de teste terá duração estimada de 30 a 45 minutos, incluindo:
- Apresentação e contextualização (5 minutos)
- Execução das tarefas (20-30 minutos)
- Questionário pós-teste e feedback (10 minutos)

## Casos de Teste de Usabilidade

### CTU-01: Login e Primeiro Acesso
**Objetivo:** Avaliar a facilidade de login e compreensão da interface inicial

**Tarefa:** O usuário deve fazer login no sistema e navegar até o dashboard principal.

**Passos:**
1. Abrir o aplicativo
2. Inserir e-mail e senha
3. Clicar em "Entrar"
4. Observar a tela de dashboard

**Critérios de Sucesso:**
- Login realizado em menos de 30 segundos
- Usuário consegue identificar os principais elementos do dashboard
- Nenhuma dúvida sobre onde encontrar informações principais

**Métricas:**
- Tempo para completar o login
- Número de tentativas até sucesso
- Nível de confiança do usuário (escala 1-5)

---

### CTU-02: Navegação entre Telas
**Objetivo:** Verificar a intuitividade da navegação entre as diferentes seções do aplicativo

**Tarefa:** O usuário deve navegar entre as principais telas: Dashboard, Transações, Produtos e Minha Conta.

**Passos:**
1. Partir do dashboard
2. Navegar para a tela de Transações
3. Navegar para a tela de Produtos
4. Navegar para a tela Minha Conta
5. Retornar ao Dashboard

**Critérios de Sucesso:**
- Navegação realizada sem dificuldades
- Usuário compreende a função de cada aba
- Transições entre telas são fluidas

**Métricas:**
- Tempo para navegar entre todas as telas
- Número de cliques/taps necessários
- Taxa de erro (navegação incorreta)

---

### CTU-03: Cadastro de Produto
**Objetivo:** Avaliar a usabilidade do formulário de cadastro de produtos

**Tarefa:** O usuário (gestor de estoque) deve cadastrar um novo produto no sistema.

**Passos:**
1. Acessar a tela de Produtos
2. Clicar no botão de adicionar produto
3. Preencher os campos obrigatórios (nome, descrição, categoria, preço, quantidade, fornecedor)
4. Salvar o produto

**Critérios de Sucesso:**
- Cadastro realizado sem erros
- Campos claros e de fácil compreensão
- Feedback visual após salvar

**Métricas:**
- Tempo para completar o cadastro
- Número de campos deixados em branco (erro)
- Satisfação com o processo (escala 1-5)

---

### CTU-04: Consulta de Produtos
**Objetivo:** Verificar a eficácia da busca e filtros de produtos

**Tarefa:** O usuário (vendedor) deve buscar um produto específico e verificar sua disponibilidade em estoque.

**Passos:**
1. Acessar a tela de Produtos
2. Utilizar o campo de busca para encontrar um produto
3. Verificar informações do produto (nome, preço, estoque)
4. Filtrar produtos por categoria (se aplicável)

**Critérios de Sucesso:**
- Produto encontrado rapidamente
- Informações claras e acessíveis
- Filtros funcionam corretamente

**Métricas:**
- Tempo para encontrar o produto
- Número de tentativas de busca
- Precisão dos resultados

---

### CTU-05: Visualização do Dashboard
**Objetivo:** Avaliar a compreensão dos indicadores e gráficos apresentados

**Tarefa:** O usuário (gerente administrativo) deve interpretar as informações do dashboard e identificar o resumo financeiro do mês.

**Passos:**
1. Acessar o dashboard
2. Identificar o valor total de transações do mês
3. Localizar indicadores de lucro/prejuízo
4. Interpretar os gráficos apresentados

**Critérios de Sucesso:**
- Usuário consegue identificar rapidamente as informações principais
- Gráficos são compreensíveis
- Layout organizado e não sobrecarregado

**Métricas:**
- Tempo para identificar informações principais
- Taxa de compreensão correta dos dados
- Satisfação com a apresentação visual

---

### CTU-06: Registro de Transação Financeira
**Objetivo:** Avaliar a usabilidade do processo de registro de transações

**Tarefa:** O usuário deve registrar uma nova transação financeira (entrada ou saída).

**Passos:**
1. Acessar a tela de Transações
2. Clicar para adicionar nova transação
3. Preencher os campos necessários (tipo, valor, descrição, data)
4. Salvar a transação

**Critérios de Sucesso:**
- Transação registrada corretamente
- Campos intuitivos e bem organizados
- Confirmação visual do registro

**Métricas:**
- Tempo para registrar a transação
- Taxa de erro no preenchimento
- Facilidade percebida (escala 1-5)

---

### CTU-07: Edição de Perfil
**Objetivo:** Verificar a facilidade de edição de informações pessoais

**Tarefa:** O usuário deve acessar e editar suas informações de perfil.

**Passos:**
1. Acessar a tela "Minha Conta"
2. Localizar a opção de editar perfil
3. Modificar informações (nome, e-mail, telefone)
4. Salvar as alterações

**Critérios de Sucesso:**
- Edição realizada sem dificuldades
- Alterações salvas corretamente
- Feedback de confirmação apresentado

**Métricas:**
- Tempo para editar o perfil
- Número de passos necessários
- Satisfação com o processo

---

### CTU-08: Recuperação de Senha
**Objetivo:** Avaliar o processo de recuperação de senha

**Tarefa:** O usuário deve recuperar sua senha através do e-mail.

**Passos:**
1. Na tela de login, clicar em "Esqueceu a senha?"
2. Inserir o e-mail cadastrado
3. Verificar o recebimento do e-mail de recuperação
4. Seguir as instruções para redefinir a senha

**Critérios de Sucesso:**
- Processo claro e intuitivo
- E-mail recebido em tempo razoável
- Redefinição de senha bem-sucedida

**Métricas:**
- Tempo total do processo
- Taxa de sucesso na recuperação
- Facilidade percebida

---

### CTU-09: Responsividade e Adaptação a Diferentes Telas
**Objetivo:** Verificar se o aplicativo se adapta bem a diferentes tamanhos de tela

**Tarefa:** O usuário deve utilizar o aplicativo em dispositivos com diferentes tamanhos de tela.

**Passos:**
1. Testar em dispositivo com tela pequena (até 5 polegadas)
2. Testar em dispositivo com tela média (5-6 polegadas)
3. Testar em dispositivo com tela grande (acima de 6 polegadas)
4. Verificar se todos os elementos são acessíveis

**Critérios de Sucesso:**
- Todos os elementos visíveis e acessíveis
- Layout adaptado corretamente
- Nenhum elemento cortado ou sobreposto

**Métricas:**
- Taxa de elementos acessíveis
- Satisfação com o layout em diferentes telas
- Problemas de usabilidade identificados

---

### CTU-10: Acessibilidade e Usabilidade em Diferentes Condições
**Objetivo:** Avaliar a usabilidade em diferentes condições de uso

**Tarefa:** O usuário deve utilizar o aplicativo em diferentes condições (iluminação, orientação da tela).

**Passos:**
1. Testar com tela em modo claro
2. Testar com tela em modo escuro (se disponível)
3. Testar em modo retrato e paisagem
4. Verificar contraste e legibilidade

**Critérios de Sucesso:**
- Textos legíveis em todas as condições
- Contraste adequado
- Interface funcional em ambas as orientações

**Métricas:**
- Legibilidade dos textos (escala 1-5)
- Contraste de cores (WCAG)
- Funcionalidade em diferentes orientações

## Métricas de Usabilidade

### Métricas Quantitativas
- **Taxa de Conclusão de Tarefas:** Percentual de tarefas completadas com sucesso
- **Tempo de Execução:** Tempo médio para completar cada tarefa
- **Taxa de Erro:** Número de erros cometidos durante a execução das tarefas
- **Eficiência:** Número de cliques/taps necessários para completar uma tarefa
- **Satisfação do Usuário:** Pontuação média em escala de 1 a 5 (SUS - System Usability Scale)

### Métricas Qualitativas
- **Feedback Verbal:** Comentários e observações dos usuários durante os testes
- **Expressões Faciais:** Reações observadas durante a interação
- **Dificuldades Identificadas:** Problemas específicos encontrados pelos usuários
- **Sugestões de Melhoria:** Ideias propostas pelos participantes

## Questionário Pós-Teste

Após a execução das tarefas, os participantes responderão ao questionário SUS (System Usability Scale) e questões específicas sobre:

1. Facilidade de uso geral
2. Clareza das informações apresentadas
3. Velocidade de aprendizado
4. Satisfação com o design visual
5. Probabilidade de recomendação do sistema
6. Pontos fortes identificados
7. Pontos fracos e sugestões de melhoria

## Critérios de Aceitação

O sistema será considerado com boa usabilidade se:
- Taxa de conclusão de tarefas ≥ 80%
- Tempo médio de execução das tarefas dentro do esperado
- Pontuação SUS ≥ 70 pontos
- Nenhum problema crítico de usabilidade identificado
- Feedback geral positivo dos participantes

> **Links Úteis**:
> - [Teste De Usabilidade: O Que É e Como Fazer Passo a Passo (neilpatel.com)](https://neilpatel.com/br/blog/teste-de-usabilidade/)
> - [Teste de usabilidade: tudo o que você precisa saber! | by Jon Vieira | Aela.io | Medium](https://medium.com/aela/teste-de-usabilidade-o-que-voc%C3%AA-precisa-saber-39a36343d9a6/)
> - [Planejando testes de usabilidade: o que (e o que não) fazer | iMasters](https://imasters.com.br/design-ux/planejando-testes-de-usabilidade-o-que-e-o-que-nao-fazer/)
> - [Ferramentas de Testes de Usabilidade](https://www.usability.gov/how-to-and-tools/resources/templates.html)
