e
# Metodologia

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a></span>

Descreva aqui a metodologia de trabalho do grupo para atacar o problema. Definições sobre os ambiente de trabalho utilizados pela  equipe para desenvolver o projeto. Abrange a relação de ambientes utilizados, a estrutura para gestão do código fonte, além da definição do processo e ferramenta através dos quais a equipe se organiza (Gestão de Times).

### Relação de Ambientes de Trabalho

O desenvolvimento do projeto ocorre em diferentes ambientes, cada um com um propósito específico.  
A tabela abaixo apresenta os ambientes utilizados, suas respectivas plataformas e os links de acesso.  

| **Ambiente**       | **Plataforma**                     | **Link de Acesso**                               | **Propósito**                                                                 |
|---------------------|------------------------------------|-------------------------------------------------|-------------------------------------------------------------------------------|
| **Repositório Git** | GitHub                             | [https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-3sletreiros](https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-3sletreiros) | Controle de versão e colaboração entre a equipe.                              |
| **Gerenciamento**   | Github KanBan                    | [https://github.com/orgs/ICEI-PUCMinas-PSG-SI-TI/projects/146](https://github.com/orgs/ICEI-PUCMinas-PSG-SI-TI/projects/146) | Gestão de tarefas, backlog e acompanhamento do fluxo de desenvolvimento.      |
| **Banco de Dados**  | Firebase (dev/prod)              | -                                               | Persistência de dados.                                                        |
| **Ambiente Dev**    | Localhost                 | [http://localhost:3000](http://localhost:3000)  | Desenvolvimento local da aplicação.                                     |
| **Produção**        | Servidor em nuvem (Render)     | A definir      | Ambiente final utilizado pelos usuários.                                      |
| **Mobile (Dev)**    | React Native + Expo CLI            | Emulador Android/iOS / Expo Go                  | Desenvolvimento e testes de aplicações móveis.                                |
| **Mobile (Prod)**   | Google Play / App Store            | A definir                               | Distribuição oficial das aplicações móveis.                                   |
| **Documentação**    | Github                | [https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-3sletreiros](https://github.com/ICEI-PUCMinas-PSG-SI-TI/psg-ads-n-tiam-2025-2-3sletreiros)  | Centralização de documentos e artefatos do projeto.                           |


## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o
[Git](https://git-scm.com/), sendo que o [Github](https://github.com)
foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

1. Todas as partes do nome de uma branch deve ser escrito em kebab-case (Letras minúsculas, palavras separadas por hifén).

2. Os nomes das branchs devem descrever um caminho lógico, até chegar no escopo das alterações: <objetivo_branch>/<tipo_issue>/<escopo_alteracao>/<descrição>

- Objetivo branch pode assumir as formas:
  - `test`: branchs que lidam com testes de software
  - `dev`: branchs para desenvolvimento de software
  - `chore`: branchs para configurações internas

- Tipo de issue pode assumir as formas:
  - `feat`: desenvolvimento de novas funcionalidades
  - `doc`: alterações, melhorias ou acréscimos à documentação
  - `fix`: correção de bugs relacionados ao código
  - `config`: alterações de configuração do projeto
  - `refactor`: refatoração de código existente

- Escopo refere-se ao delimitador de onde a alteração será feita. Exemplos:
  - `controller`
  - `interface`
  - `service`

- Descrição refere-se à uma breve explicação do que será feito. Exemplos:
  - `user-controller`
  - `home-page-screen`

- Exemplo de comando git para criação de uma branch, seguindo esta convenção:
  - `git checkout -b dev/feat/service/user-service`


Discuta como a configuração do projeto foi feita na ferramenta de versionamento escolhida. Exponha como a gerência de tags, merges, commits e branchs é realizada. Discuta como a gerência de issues foi realizada.

> **Links Úteis**:
> - [Microfundamento: Gerência de Configuração](https://pucminas.instructure.com/courses/87878/)
> - [Tutorial GitHub](https://guides.github.com/activities/hello-world/)
> - [Git e Github](https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA)
>  - [Comparando fluxos de trabalho](https://www.atlassian.com/br/git/tutorials/comparing-workflows)
> - [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)
> - [The gitflow workflow - in less than 5 mins](https://www.youtube.com/watch?v=1SXpE08hvGs)

## Gerenciamento de Projeto

### Divisão de Papéis

Apresente a divisão de papéis entre os membros do grupo.

Exemplificação: A equipe utiliza metodologias ágeis, tendo escolhido o Scrum como base para definição do processo de desenvolvimento. A equipe está organizada da seguinte maneira:
- Scrum Master: Felipe Domingos;
- Product Owner: Rommel Carneiro;
- Equipe de Desenvolvimento: Pedro Penna, Pedro Ivo, Rodrigo Richard;
- Equipe de Design: Simone Nogueira.

> **Links Úteis**:
> - [11 Passos Essenciais para Implantar Scrum no seu Projeto](https://mindmaster.com.br/scrum-11-passos/)
> - [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)
> - [Os papéis do Scrum e a verdade sobre cargos nessa técnica](https://www.atlassian.com/br/agile/scrum/roles)

### Processo

Coloque  informações sobre detalhes da implementação do Scrum seguido pelo grupo. O grupo deverá fazer uso do recurso de gerenciamento de projeto oferecido pelo GitHub, que permite acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.
 
> **Links Úteis**:
> - [Planejamento e Gestáo Ágil de Projetos](https://pucminas.instructure.com/courses/87878/pages/unidade-2-tema-2-utilizacao-de-ferramentas-para-controle-de-versoes-de-software)
> - [Sobre quadros de projeto](https://docs.github.com/pt/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)
> - [Project management, made simple](https://github.com/features/project-management/)
> - [Sobre quadros de projeto](https://docs.github.com/pt/github/managing-your-work-on-github/about-project-boards)
> - [Como criar Backlogs no Github](https://www.youtube.com/watch?v=RXEy6CFu9Hk)
> - [Tutorial Slack](https://slack.com/intl/en-br/)

### Ferramentas

As ferramentas empregadas no projeto são:

- **Editor de código**: VS Code  
- **Ferramentas de comunicação**: Microsoft Teams e WhatsApp  
- **Ferramentas de desenho de tela (wireframing)**: Figma  
- **Controle de versão**: Git + GitHub  
- **Gerenciamento de dependências**: npm  
- **Banco de dados**: Firebase  

O editor de código VS Code foi escolhido por permitir integração com o sistema de versão e facilitar o desenvolvimento da aplicação.  

As ferramentas de comunicação, como Microsoft Teams e WhatsApp, foram selecionadas para manter a equipe alinhada, permitindo troca de mensagens, chamadas e compartilhamento de arquivos.  

O Figma foi utilizado para criar diagramas e protótipos de interface, ajudando a captar as necessidades da solução de forma visual.  

Git + GitHub garantem controle de versão e colaboração eficiente entre os membros da equipe.  

O npm gerencia as dependências do projeto, garantindo que todas as bibliotecas necessárias para o desenvolvimento com React estejam organizadas.  

 
> **Possíveis Ferramentas que auxiliarão no gerenciamento**: 
> - [Slack](https://slack.com/)
> - [Github](https://github.com/)
