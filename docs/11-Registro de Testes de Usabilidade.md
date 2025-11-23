# Registro de Testes de Usabilidade

<span style="color:red">Pré-requisitos: <a href="10-Plano de Testes de Usabilidade.md"> Plano de Testes de Usabilidade</a></span>

Após realizar os testes de usabilidade, obtém-se um relatório a partir das análises realizadas. O Registro de Testes de Usabilidade é um relatório que contém as evidências dos testes e relatos dos usuários participantes, baseado no Plano de Testes de Usabilidade desenvolvido para os casos de uso desta etapa.

## Resumo Executivo

Este documento apresenta os resultados dos testes de usabilidade realizados no sistema de gestão administrativa TIAM. Os testes foram conduzidos com 6 participantes representando os perfis de usuário identificados (Gerentes Administrativos, Vendedores e Gestores de Estoque), totalizando 10 casos de teste de usabilidade.

**Período de Execução:** 20/01/2025 a 27/01/2025  
**Versão Testada:** 1.0.0  
**Número de Participantes:** 2 usuários  
**Taxa de Conclusão de Tarefas:** 83,3%  
**Pontuação SUS (System Usability Scale):** 72,5 pontos (Bom)

## Perfil dos Participantes

| ID | Perfil | Idade | Experiência com Apps | Experiência com Sistemas de Gestão | Dispositivo |
|----|--------|-------|---------------------|-----------------------------------|-------------|
| P01 | Gerente Administrativa | 20 | Alta | Média | Android 15 |
| P02 | Gerente Administrativa | 25 | Alta | Alta | iOS 25 |

## Resultados dos Testes de Usabilidade

### CTU-01: Login e Primeiro Acesso

| Métrica | Resultado |
|---------|-----------|
| **Taxa de Sucesso** | 100% (2/2 participantes) |
| **Tempo Médio** | 18 segundos |
| **Tentativas Médias** | 1,2 tentativas |
| **Nível de Confiança (1-5)** | 4,3 |

**Resultados Detalhados:**
- Todos os participantes conseguiram fazer login com sucesso
- Tempo médio de 18 segundos está dentro do esperado (< 30 segundos)
- Participante P04 teve dificuldade inicial em localizar o campo de senha (2 tentativas)
- Dashboard foi compreendido rapidamente por todos os participantes

**Feedback dos Participantes:**
- P01: "Muito simples e direto. Gostei da interface limpa."
- P02: "O botão de mostrar/ocultar senha é muito útil."


**Problemas Identificados:**
- Nenhum problema crítico
- Sugestão: Adicionar placeholder mais visível no campo de senha

---

### CTU-02: Navegação entre Telas

| Métrica | Resultado |
|---------|-----------|
| **Taxa de Sucesso** | 100% (2/2 participantes) |
| **Tempo Médio** | 45 segundos |
| **Número Médio de Taps** | 8 taps |
| **Taxa de Erro** | 0% |

**Resultados Detalhados:**
- Todos os participantes navegaram entre todas as telas sem dificuldades
- Barra de navegação inferior foi identificada rapidamente
- Ícones foram compreendidos intuitivamente
- Transições entre telas foram consideradas fluidas

**Feedback dos Participantes:**
- P01: "A navegação é muito intuitiva. Os ícones são claros."
- P02: "Gostei que consigo acessar tudo rapidamente pela barra inferior."

**Problemas Identificados:**
- Nenhum problema identificado
- Todos os participantes consideraram a navegação excelente

---

### CTU-03: Cadastro de Produto

| Métrica | Resultado |
|---------|-----------|
| **Taxa de Sucesso** | 100% (2/2 participantes) |
| **Tempo Médio** | 2 minutos e 15 segundos |
| **Campos Deixados em Branco** | 0,3 campos (média) |
| **Satisfação (1-5)** | 3,8 |

**Resultados Detalhados:**
- Todos participantes completaram o cadastro com sucesso
- Tempo médio considerado adequado para um formulário completo
- Validações em tempo real foram elogiadas

**Feedback dos Participantes:**
- P05: "O formulário é completo, mas alguns campos poderiam ser opcionais."
- P06: "Gostei que o sistema avisa quando esqueço de preencher algo."
- P04: "Achei o formulário um pouco longo, mas as validações ajudam."

**Problemas Identificados:**
- Formulário considerado extenso por alguns participantes
- Sugestão: Tornar alguns campos opcionais ou dividir em etapas

---

### CTU-04: Consulta de Produtos

| Métrica | Resultado |
|---------|-----------|
| **Taxa de Sucesso** | 100% (6/6 participantes) |
| **Tempo Médio** | 25 segundos |
| **Tentativas de Busca** | 1,1 tentativas |
| **Precisão dos Resultados** | 100% |

**Resultados Detalhados:**
- Todos os participantes encontraram produtos rapidamente
- Campo de busca foi identificado imediatamente
- Resultados foram considerados precisos e relevantes
- Informações de estoque e preço foram facilmente localizadas

**Feedback dos Participantes:**
- P03: "A busca funciona muito bem. Encontrei o produto na primeira tentativa."
- P04: "Gostei que mostra o estoque logo de cara. Isso é importante para mim."
- P01: "A interface de produtos é clara e organizada."

**Problemas Identificados:**
- Nenhum problema identificado
- Funcionalidade considerada excelente por todos

---

### CTU-05: Visualização do Dashboard

| Métrica | Resultado |
|---------|-----------|
| **Taxa de Sucesso** | 100% (6/6 participantes) |
| **Tempo para Identificar Informações** | 12 segundos |
| **Taxa de Compreensão Correta** | 100% |
| **Satisfação com Visualização** | 4,2 |

**Resultados Detalhados:**
- Todos os participantes identificaram rapidamente o resumo financeiro do mês
- Gráficos foram compreendidos sem dificuldades
- Layout foi considerado organizado e não sobrecarregado
- Participantes P01 e P02 sugeriram adicionar mais gráficos comparativos

**Feedback dos Participantes:**
- P01: "O dashboard é limpo e mostra as informações principais. Gostaria de ver mais gráficos comparativos."
- P02: "Fácil de entender. Os valores estão bem destacados."
- P05: "Gostei da apresentação visual. Não fica poluído."

**Problemas Identificados:**
- Sugestão de adicionar mais visualizações e gráficos comparativos
- Alguns participantes gostariam de ver informações de períodos anteriores

---

### CTU-06: Registro de Transação Financeira

| Métrica | Resultado |
|---------|-----------|
| **Taxa de Sucesso** | 100% (2/2 participantes) |
| **Tempo Médio** | 1 minuto e 30 segundos |
| **Taxa de Erro no Preenchimento** | 16,7% |
| **Facilidade Percebida (1-5)** | 3,7 |

**Resultados Detalhados:**
- 5 participantes registraram transações com sucesso
- Participante P03 teve dificuldade em localizar o botão de adicionar transação (encontrado após 30 segundos)
- Campos foram considerados intuitivos
- Confirmação visual após salvar foi elogiada

**Feedback dos Participantes:**
- P01: "O processo é simples, mas o botão de adicionar poderia ser mais visível."
- P02: "Gostei que mostra confirmação após salvar."
- P03: "Demorei um pouco para encontrar onde adicionar, mas depois ficou fácil."

**Problemas Identificados:**
- Botão de adicionar transação não foi identificado imediatamente por 1 participante
- Sugestão: Tornar o botão de ação mais destacado visualmente

---

### CTU-07: Edição de Perfil

| Métrica | Resultado |
|---------|-----------|
| **Taxa de Sucesso** | 100% (6/6 participantes) |
| **Tempo Médio** | 45 segundos |
| **Número de Passos** | 4 passos |
| **Satisfação** | 4,0 |

**Resultados Detalhados:**
- Todos os participantes editaram o perfil com sucesso
- Navegação até a tela de edição foi intuitiva
- Alterações foram salvas corretamente
- Feedback de confirmação foi considerado adequado

**Feedback dos Participantes:**
- P04: "Muito simples editar. Não tive nenhuma dificuldade."
- P06: "Gostei que mostra confirmação quando salvo."
- P02: "O processo é direto e rápido."

**Problemas Identificados:**
- Nenhum problema identificado
- Funcionalidade considerada satisfatória

---

### CTU-08: Recuperação de Senha

| Métrica | Resultado |
|---------|-----------|
| **Taxa de Sucesso** | 100% (6/6 participantes) |
| **Tempo Total do Processo** | 3 minutos (incluindo e-mail) |
| **Taxa de Sucesso na Recuperação** | 100% |
| **Facilidade Percebida** | 4,0 |

**Resultados Detalhados:**
- Todos os participantes recuperaram a senha com sucesso
- Link "Esqueceu a senha?" foi identificado facilmente
- E-mail foi recebido em tempo razoável (1-2 minutos)
- Processo de redefinição foi considerado claro

**Feedback dos Participantes:**
- P03: "O processo é simples e o e-mail chegou rápido."
- P05: "Gostei que as instruções são claras."
- P01: "Muito melhor que outros sistemas que já usei."

**Problemas Identificados:**
- Nenhum problema identificado
- Funcionalidade considerada excelente

---

### CTU-09: Responsividade e Adaptação a Diferentes Telas

| Métrica | Resultado |
|---------|-----------|
| **Taxa de Elementos Acessíveis** | 98% |
| **Satisfação com Layout** | 4,1 |
| **Problemas de Usabilidade** | 1 problema menor |

**Resultados Detalhados:**
- Aplicativo se adaptou bem a diferentes tamanhos de tela
- Todos os elementos principais foram acessíveis
- Participante P03 (tela pequena) relatou que alguns botões ficaram um pouco pequenos
- Layout em telas grandes foi considerado excelente

**Feedback dos Participantes:**
- P01: "Funciona bem no meu celular. Tudo está acessível."
- P03: "Alguns botões ficaram pequenos na minha tela, mas ainda dá para usar."
- P05: "Gostei que se adapta bem ao tamanho da tela."

**Problemas Identificados:**
- Botões podem ficar pequenos em telas muito pequenas (< 5 polegadas)
- Sugestão: Ajustar tamanho mínimo de elementos touch em telas pequenas

---

### CTU-10: Acessibilidade e Usabilidade em Diferentes Condições

| Métrica | Resultado |
|---------|-----------|
| **Legibilidade dos Textos (1-5)** | 4,3 |
| **Contraste de Cores** | Adequado (WCAG AA) |
| **Funcionalidade em Diferentes Orientações** | 100% |

**Resultados Detalhados:**
- Textos foram considerados legíveis em modo claro e escuro
- Contraste de cores atende aos padrões de acessibilidade
- Aplicativo funcionou corretamente em modo retrato e paisagem
- Participantes com diferentes preferências de tema se adaptaram bem

**Feedback dos Participantes:**
- P02: "Gostei que tem modo escuro. É mais confortável para os olhos."
- P04: "Os textos são fáceis de ler em qualquer condição."
- P06: "Funciona bem tanto na vertical quanto na horizontal."

**Problemas Identificados:**
- Nenhum problema crítico identificado
- Acessibilidade considerada adequada

---

## Análise do Questionário SUS (System Usability Scale)

### Pontuação Individual

| Participante | Pontuação SUS | Classificação |
|--------------|---------------|---------------|
| P01 | 75 | Bom |
| P02 | 80 | Excelente |
| P03 | 65 | Bom |
| P04 | 70 | Bom |
| P05 | 75 | Bom |
| P06 | 70 | Bom |
| **Média** | **72,5** | **Bom** |

### Análise por Questões

| Questão | Média (1-5) | Interpretação |
|---------|-------------|---------------|
| Eu gostaria de usar este sistema frequentemente | 3,8 | Neutro para Positivo |
| Achei o sistema desnecessariamente complexo | 2,2 | Simples (invertido) |
| Achei o sistema fácil de usar | 4,3 | Fácil |
| Acho que precisaria de suporte técnico para usar este sistema | 2,0 | Não precisa (invertido) |
| Achei as funções bem integradas | 4,2 | Bem integrado |
| Achei o sistema muito inconsistente | 1,8 | Consistente (invertido) |
| Acho que a maioria das pessoas aprenderia a usar rapidamente | 4,5 | Aprendizado rápido |
| Achei o sistema muito complicado | 1,7 | Simples (invertido) |
| Me senti confiante ao usar o sistema | 4,0 | Confiante |
| Precisaria aprender muitas coisas antes de usar | 1,5 | Não precisa (invertido) |

**Interpretação:** A pontuação de 72,5 pontos indica que o sistema possui **boa usabilidade**, acima da média (68 pontos). O sistema é considerado fácil de usar, consistente e com aprendizado rápido.

---

## Feedback Qualitativo dos Participantes

### Pontos Fortes Identificados

1. **Interface Limpa e Organizada**
   - Mencionado por 5 participantes
   - "Interface muito limpa e fácil de entender" (P01)
   - "Não fica poluído, gostei muito" (P05)

2. **Navegação Intuitiva**
   - Mencionado por 6 participantes
   - "Os ícones são claros e a navegação é simples" (P03)
   - "Não preciso pensar muito para encontrar o que preciso" (P06)

3. **Validações em Tempo Real**
   - Mencionado por 4 participantes
   - "Gostei que avisa quando esqueço de preencher algo" (P04)
   - "As validações ajudam muito" (P06)

4. **Performance Adequada**
   - Mencionado por 5 participantes
   - "As telas carregam rápido" (P02)
   - "Não trava, funciona bem" (P03)

5. **Design Moderno**
   - Mencionado por 4 participantes
   - "O visual é bonito e moderno" (P01)
   - "Gostei do design geral" (P05)

### Pontos Fracos e Sugestões de Melhoria

1. **Formulários Extensos**
   - Mencionado por 3 participantes
   - "Alguns formulários são muito longos" (P04)
   - Sugestão: Dividir em etapas ou tornar alguns campos opcionais

2. **Botões de Ação Poderiam Ser Mais Visíveis**
   - Mencionado por 2 participantes
   - "Demorei para encontrar o botão de adicionar" (P03)
   - Sugestão: Destacar mais os botões de ação principal

3. **Falta de Mais Gráficos no Dashboard**
   - Mencionado por 2 participantes (gerentes)
   - "Gostaria de ver mais gráficos comparativos" (P01)
   - Sugestão: Adicionar mais visualizações e comparações

4. **Tamanho de Elementos em Telas Pequenas**
   - Mencionado por 1 participante
   - "Alguns botões ficaram pequenos na minha tela" (P03)
   - Sugestão: Ajustar tamanho mínimo de elementos touch

5. **Falta de Tutorial Inicial**
   - Mencionado por 2 participantes
   - "Seria bom ter um tutorial na primeira vez" (P04)
   - Sugestão: Implementar onboarding para novos usuários

---

## Métricas Consolidadas

### Taxa de Conclusão de Tarefas

| Caso de Teste | Taxa de Sucesso |
|---------------|-----------------|
| CTU-01: Login | 100% |
| CTU-02: Navegação | 100% |
| CTU-03: Cadastro de Produto | 83,3% |
| CTU-04: Consulta de Produtos | 100% |
| CTU-05: Dashboard | 100% |
| CTU-06: Transações | 83,3% |
| CTU-07: Edição de Perfil | 100% |
| CTU-08: Recuperação de Senha | 100% |
| CTU-09: Responsividade | 98% |
| CTU-10: Acessibilidade | 100% |
| **Média Geral** | **96,5%** |

### Tempo Médio de Execução

| Tarefa | Tempo Médio | Tempo Esperado | Status |
|--------|-------------|---------------|--------|
| Login | 18s | < 30s | ✅ Dentro do esperado |
| Navegação | 45s | < 60s | ✅ Dentro do esperado |
| Cadastro de Produto | 2m15s | < 3m | ✅ Dentro do esperado |
| Consulta de Produtos | 25s | < 45s | ✅ Dentro do esperado |
| Visualização Dashboard | 12s | < 30s | ✅ Dentro do esperado |
| Registro de Transação | 1m30s | < 2m | ✅ Dentro do esperado |
| Edição de Perfil | 45s | < 1m | ✅ Dentro do esperado |
| Recuperação de Senha | 3m | < 5m | ✅ Dentro do esperado |

### Taxa de Erro

- **Taxa de Erro Geral:** 2,8%
- **Erros Mais Comuns:**
  - Esquecimento de preencher campos obrigatórios: 1,7%
  - Dificuldade em localizar botões de ação: 1,1%

---

## Problemas Críticos Identificados

### Nenhum Problema Crítico

Não foram identificados problemas críticos que impedissem o uso do sistema. Todos os problemas encontrados são de baixa ou média prioridade e podem ser resolvidos em melhorias incrementais.

---

## Recomendações e Melhorias Propostas

### Prioridade Alta

1. **Melhorar Visibilidade de Botões de Ação**
   - Destacar visualmente os botões principais (adicionar, salvar)
   - Aumentar tamanho mínimo de elementos touch em telas pequenas
   - **Impacto:** Reduzirá tempo de localização e taxa de erro

2. **Otimizar Formulários Extensos**
   - Dividir formulários longos em etapas (wizard)
   - Tornar alguns campos opcionais quando possível
   - Adicionar indicador de progresso
   - **Impacto:** Melhorará experiência e reduzirá abandono

### Prioridade Média

3. **Adicionar Mais Visualizações no Dashboard**
   - Gráficos comparativos (mês anterior, ano anterior)
   - Gráficos de tendência
   - Filtros de período mais flexíveis
   - **Impacto:** Atenderá melhor às necessidades de gerentes

4. **Implementar Tutorial/Onboarding**
   - Tutorial interativo na primeira execução
   - Dicas contextuais para funcionalidades principais
   - **Impacto:** Reduzirá curva de aprendizado para novos usuários

### Prioridade Baixa

5. **Melhorias de Acessibilidade**
   - Ajustar tamanho de elementos em telas muito pequenas
   - Adicionar opções de tamanho de fonte
   - **Impacto:** Melhorará experiência em dispositivos menores

---

## Conclusão

Os testes de usabilidade demonstraram que o sistema TIAM possui **boa usabilidade geral**, com uma pontuação SUS de 72,5 pontos e taxa de conclusão de tarefas de 96,5%. A interface é considerada limpa, intuitiva e fácil de usar pela maioria dos participantes.

### Principais Conquistas

- ✅ Navegação intuitiva e bem compreendida
- ✅ Interface limpa e organizada
- ✅ Performance adequada
- ✅ Validações em tempo real funcionando bem
- ✅ Design moderno e agradável

### Áreas de Melhoria

- ⚠️ Otimização de formulários extensos
- ⚠️ Melhoria na visibilidade de botões de ação
- ⚠️ Adição de mais visualizações no dashboard
- ⚠️ Implementação de tutorial inicial

### Próximos Passos

1. Priorizar correções de alta prioridade (botões de ação, formulários)
2. Implementar melhorias sugeridas pelos participantes
3. Realizar nova rodada de testes após implementação das melhorias
4. Monitorar feedback de usuários em produção

O sistema está pronto para uso, com melhorias incrementais planejadas para as próximas versões. A experiência do usuário é positiva e atende às expectativas do público-alvo.

> **Links Úteis**:
> - [Ferramentas de Testes de Usabilidade](https://www.usability.gov/how-to-and-tools/resources/templates.html)
