# GitHub Dashboard

Uma aplicação moderna e elegante para explorar repositórios públicos do GitHub: busca por usuário, tabela paginada com filtro por linguagem e gráfico de distribuição de linguagens.

**Deploy ao vivo** → [https://github-dashboard-seunome.vercel.app](https://github-dashboard-seunome.vercel.app) *(substitua pelo seu link quando publicar)*

![preview](https://i.imgur.com/XXXXXXX.png)  
*(substitua pela screenshot do seu projeto quando tiver)*

## Funcionalidades

- Busca com autocomplete (avatar + nome de usuário)  
- Tela inicial minimalista com logo do GitHub  
- Tabela responsiva com paginação (5 itens por padrão) e filtro por linguagem  
- Gráfico de pizza mostrando quantidade de repositórios por linguagem  
- Tema dark premium com glassmorphism e sombras suaves  
- Totalmente internacionalizado (Português e Inglês)  
- Estado global com Zustand  
- 100% TypeScript, sem `any`, ESLint + Prettier  

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
git clone https://github.com/seu-usuario/github-dashboard.git
cd github-dashboard

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
