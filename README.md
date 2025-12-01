# GitHub Dashboard

Uma aplicação para explorar repositórios públicos do GitHub: busca por usuário, tabela paginada com filtro por linguagem e gráfico de distribuição de linguagens.

## Funcionalidades

- Busca com autocomplete (avatar + nome de usuário)  
- Tela inicial minimalista com logo do GitHub  
- Tabela responsiva com paginação (5 itens por padrão) e filtro por linguagem  
- Gráfico de pizza mostrando quantidade de repositórios por linguagem  
- Tema dark premium com glassmorphism e sombras suaves  
- Totalmente internacionalizado (Português e Inglês)  
- Estado global com Zustand  
- 100% TypeScript, ESLint + Prettier  

## Tecnologias

- **React 19** + **TypeScript**
- **Vite** (com Rolldown para builds ultra-rápidas)
- **MUI v7** + **MUI X DataGrid**
- **ECharts** (via `echarts-for-react`)
- **Zustand** (gerenciamento de estado)
- **i18next** (internacionalização)
- **Axios** (requisições à API pública do GitHub)

## Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/Joao0victor01/github-dashboard.git
cd github-dashboard

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
