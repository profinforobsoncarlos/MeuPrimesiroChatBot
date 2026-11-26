# 📜 Registro de Alterações (Changelog)

Todas as criações, atualizações, melhorias e correções feitas neste projeto serão documentadas neste arquivo.

O formato é baseado no padrão [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/), e este projeto adota o [Versionamento Semântico](https://semver.org/lang/pt-BR/) (`MAJOR.MINOR.PATCH`):
- **MAJOR:** Mudanças incompatíveis ou reestruturações completas.
- **MINOR:** Novas funcionalidades adicionadas de forma compatível.
- **PATCH:** Correções de bugs ou pequenos ajustes visuais.

---

## 📌 Guia Rápido: Como registrar suas futuras atualizações

Sempre que você criar uma funcionalidade, corrigir um bug ou mudar o visual, adicione uma nova seção no topo seguindo este modelo:

```markdown
## [Versão] - AAAA-MM-DD
### ✨ Adicionado
- Nova funcionalidade que você criou.

### 🔄 Modificado
- Algo que já existia e foi alterado (ex: cores, textos, layout).

### 🐛 Corrigido
- Algum problema ou bug consertado.

### 🗑️ Removido
- Recursos ou código que foram retirados.
```

---

## [1.0.0] - 2026-11-26

### ✨ Adicionado (Criação Inicial do Projeto)

#### 🖥️ Interface e Estrutura (`index.html`)
- Interface web com layout estilo aplicações de chat modernas (Dark Mode).
- Barra lateral retrátil com:
  - Identidade visual do bot (*ChatBot IA*).
  - Botão de **Nova Conversa** e **Limpar Histórico**.
  - Indicador visual dinâmico do **Status da Conexão** (*Modo Demonstração* ou *IA Online*).
  - Atalho para configuração de credenciais da IA.
- Cabeçalho superior com indicador do modelo ativo e botão de menu responsivo para dispositivos móveis.
- Tela de boas-vindas (*Welcome Screen*) com 4 cartões de sugestões interativas:
  - *Ideias de Projetos*
  - *O que é IA?*
  - *Receita Rápida*
  - *Poema Tecnológico*
- Campo de entrada de texto expansível dinamicamente com suporte a envio por `Enter` e quebra de linha por `Shift + Enter`.
- Modal interativo para gerenciar chave de API do Gemini, modelo escolhido e personalizar o prompt de sistema.
- Integração de biblioteca de ícones vetoriais modernos ([Lucide Icons](https://lucide.dev/)).

#### 🎨 Design e Estilo (`style.css`)
- Paleta de cores moderna em tons escuros (*Dark Palette* com acentos em Índigo e Roxo).
- Efeitos visuais de vidro fosco (*Glassmorphism*), transições suaves e sombras projetadas.
- Balões de conversa diferenciados para o usuário (verde gradiente) e para o bot (azul escuro com borda sutil).
- Animação pulsante com 3 pontos para indicar que a IA está gerando resposta (*typing indicator*).
- Formatação tipográfica avançada para códigos (`Fira Code`), blocos de código com fundo escuro e listas estilizadas.
- Responsividade total com regras de mídia (`@media`) para celulares, tablets e computadores.

#### ⚙️ Lógica e Inteligência (`script.js`)
- **Modo Demonstração Integrado:**
  - Respostas inteligentes e contextuais locais para testar a interface imediatamente sem necessitar de API key.
- **Integração com a Google Gemini API:**
  - Conexão REST direta com a API do Gemini (`gemini-2.5-flash`, `gemini-1.5-flash` e `gemini-1.5-pro`).
  - Suporte ao envio do histórico completo de conversa para manter contexto.
  - Envio de instruções personalizadas do sistema (*System Instructions*) para definir o tom e regras do bot.
- **Persistência de Dados Local (`localStorage`):**
  - Armazenamento seguro no próprio navegador da chave de API, modelo selecionado e prompt de personalidade.
- **Renderizador de Markdown:**
  - Suporte a negrito, itálico, listas numeradas, marcadores, código em linha, blocos de código e links.
- **Ações Rápidas:**
  - Botão de **Copiar** no rodapé de cada resposta gerada pelo assistente com feedback visual.
- Rolagem automática suave (*smooth scroll*) para a última mensagem gerada.

#### 📚 Documentação
- Criação do [`README.md`](README.md) com instruções detalhadas de inicialização, passo a passo para obter a chave do Google Gemini e dicas de customização.
- Criação deste arquivo [`CHANGELOG.md`](CHANGELOG.md) para rastreabilidade de todas as versões e melhorias futuras.
