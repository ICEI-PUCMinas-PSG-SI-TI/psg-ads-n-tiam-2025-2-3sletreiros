# Programação de Funcionalidades

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>, <a href="4-Metodologia.md"> Metodologia</a>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>, <a href="5-Arquitetura da Solução.md"> Arquitetura da Solução</a>

Implementação do sistema descritas por meio dos requisitos funcionais e/ou não funcionais. Deve relacionar os requisitos atendidos os artefatos criados (código fonte) além das estruturas de dados utilizadas e as instruções para acesso e verificação da implementação que deve estar funcional no ambiente de hospedagem.

Para cada requisito funcional, pode ser entregue um artefato desse tipo

<<<<<<< Updated upstream

#  Padrão e Projeto de Codificação


**Objetivo:** garantir consistência, legibilidade e segurança no desenvolvimento do front-end e back-end.


##  Regras Gerais
- Nomes claros e consistentes (preferir inglês; se usar português, manter em todo o projeto).
- **KISS** (Keep It Simple, Stupid) e **DRY** (Don’t Repeat Yourself): soluções simples e sem duplicação.
- Funções e métodos curtos, com **responsabilidade única**.
- Comentar **por que**, não **o que**.



##  Front-end (React Native)
- Estrutura recomendada: src /routes /screens /theme
- Usar **componentes funcionais** + **hooks**.
- Utilizar **styled-components**.
- Centralizar chamadas HTTP em um **api service**.
- Tratar erros de rede adequadamente.


##  Versionamento
- **Branches:** `main`, `test`, `dev`, `chore`.
- **Commits:** seguir o padrão **Conventional Commits** (`feat:`, `fix:`, etc.).
- Adicionar descrição, checklist, testes e screenshots quando aplicável.


##  Segurança e Configuração
- **Nunca** commitar secrets.
- **Nunca** subir senhas ou tokens para o repositório.
- Prevenir injeção.
- Usar **variáveis de ambiente**.


##  Checklist Rápido de Revisão de Código
- Código legível e testado?  
- Nomes significativos?  
- Sem credenciais hardcoded?  
- Mensagens de erro e logs adequados?

=======
> **Links Úteis**:
>
> - [Trabalhando com HTML5 Local Storage e JSON](https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045)
> - [JSON Tutorial](https://www.w3resource.com/JSON)
> - [JSON Data Set Sample](https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html)
> - [JSON - Introduction (W3Schools)](https://www.w3schools.com/js/js_json_intro.asp)
> - [JSON Tutorial (TutorialsPoint)](https://www.tutorialspoint.com/json/index.htm)
>>>>>>> Stashed changes
