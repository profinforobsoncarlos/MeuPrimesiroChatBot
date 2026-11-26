# 🤖 Meu Primeiro ChatBot com Inteligência Artificial

Um chatbot web moderno, responsivo e inteligente desenvolvido com **HTML5, CSS3 e JavaScript puro**. Funciona diretamente no seu navegador, sem necessidade de instalar programas ou dependências adicionais no seu computador!

---

## ✨ Funcionalidades

- 💬 **Interface Moderna:** Design responsivo no estilo ChatGPT/Gemini com suporte a Dark Mode.
- ⚡ **Pronto para Usar:** Inclui um **Modo Demonstração** inteligente para você testar imediatamente mesmo sem chave de API.
- 🧠 **Conexão com IA Real:** Integração nativa com a **Gemini API (Google AI Studio)** usando os modelos mais recentes como `gemini-2.5-flash` e `gemini-1.5-flash`.
- 📝 **Suporte a Markdown:** Renderiza blocos de código com formatação, listas, links e negrito.
- 📋 **Ações Rápidas:** Botão para copiar respostas do bot com um clique.
- ⚙️ **Personalização:** Modifique o "Prompt do Sistema" (personalidade e regras do assistente) diretamente na tela de configurações.
- 🔒 **Privacidade:** Sua chave de API fica armazenada localmente apenas no seu navegador (`localStorage`).

---

## 🚀 Como Executar

1. Abra a pasta do projeto no seu computador.
2. Dê **dois cliques** no arquivo [`index.html`](file:///c:/Users/robso/OneDrive/Documents/GitHub/MeuPrimesiroChatBot/index.html) para abri-lo no seu navegador favorito (Chrome, Edge, Firefox, Brave, etc.).
3. Pronto! O chatbot já estará funcionando no modo de demonstração.

---

## 🔑 Como Obter uma Chave Gratuita do Google Gemini

Para permitir que seu chatbot responda perguntas reais e complexas com inteligência artificial:

1. Acesse o [Google AI Studio](https://aistudio.google.com/apikey).
2. Entre com sua conta Google.
3. Clique no botão azul **"Create API Key"** (ou "Criar chave de API").
4. Copie a chave gerada (ela começa com `AIzaSy...`).
5. No chatbot, clique no botão **"Configurar API Key"** (ou no ícone de engrenagem no topo).
6. Cole sua chave e clique em **"Salvar Configurações"**.

A partir desse momento, seu chatbot estará conectado aos servidores do Google e responderá como uma IA completa!

---

## 📁 Estrutura de Arquivos

```text
MeuPrimesiroChatBot/
├── index.html        # Estrutura visual da aplicação (cabeçalho, chat, sugestões, modal)
├── style.css         # Estilização completa, variáveis de cor, responsividade e animações
├── script.js         # Lógica da aplicação, chamadas à API, Markdown e controle de estado
├── CHANGELOG.md      # Histórico e documentação de todas as criações e atualizações
└── README.md         # Instruções completas do projeto
```

---

## 📜 Histórico de Atualizações

Todas as novidades, melhorias e correções do projeto são documentadas no arquivo [CHANGELOG.md](file:///c:/Users/robso/OneDrive/Documents/GitHub/MeuPrimesiroChatBot/CHANGELOG.md).

---

## 🎨 Como Personalizar seu Bot

- **Mudar o Nome ou Tema:** Altere as variáveis de cores no início de [`style.css`](file:///c:/Users/robso/OneDrive/Documents/GitHub/MeuPrimesiroChatBot/style.css) (ex: `--accent-primary`, `--bg-primary`).
- **Mudar a Personalidade:** Clique em **"Configurar API Key"** e personalize o campo **"Personalidade do Bot"**, por exemplo:
  > *"Você é um tutor especialista em programação e deve sempre ensinar com metáforas divertidas."*
- **Adicionar Novas Sugestões:** Edite a seção `.suggestions-grid` em [`index.html`](file:///c:/Users/robso/OneDrive/Documents/GitHub/MeuPrimesiroChatBot/index.html).

---

Feito com dedicação para o seu primeiro projeto de ChatBot! 🚀
