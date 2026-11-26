/**
 * Meu Primeiro ChatBot com IA (Gemini API + Modo Demonstração)
 */

// Estado da Aplicação
const state = {
  apiKey: localStorage.getItem('gemini_api_key') || '',
  model: localStorage.getItem('gemini_model') || 'gemini-2.5-flash',
  systemPrompt: localStorage.getItem('gemini_system_prompt') || 'Você é um assistente virtual inteligente, amigável, prestativo e atencioso. Responda em português de forma clara, natural e organizada.',
  history: [], // Histórico para a API [{ role: "user" | "model", parts: [{ text: "..." }] }]
  isWaitingResponse: false
};

// Elementos da Interface
const messagesContainer = document.getElementById('messagesContainer');
const welcomeScreen = document.getElementById('welcomeScreen');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const statusBadge = document.getElementById('statusBadge');
const statusText = document.getElementById('statusText');
const activeModelName = document.getElementById('activeModelName');

// Botões e Menus
const newChatBtn = document.getElementById('newChatBtn');
const clearChatBtn = document.getElementById('clearChatBtn');
const openSettingsBtn = document.getElementById('openSettingsBtn');
const configShortcutBtn = document.getElementById('configShortcutBtn');
const sidebar = document.getElementById('sidebar');
const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');

// Modal de Configurações
const settingsModal = document.getElementById('settingsModal');
const closeSettingsModal = document.getElementById('closeSettingsModal');
const apiKeyInput = document.getElementById('apiKeyInput');
const modelSelect = document.getElementById('modelSelect');
const systemPromptInput = document.getElementById('systemPromptInput');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const removeKeyBtn = document.getElementById('removeKeyBtn');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  updateConnectionStatus();
  setupEventListeners();
  autoResizeTextarea();
});

// Atualiza o indicador de status da conexão
function updateConnectionStatus() {
  if (state.apiKey.trim()) {
    statusBadge.classList.add('connected');
    statusText.textContent = 'IA Online (Gemini)';
    activeModelName.textContent = state.model;
  } else {
    statusBadge.classList.remove('connected');
    statusText.textContent = 'Modo Demonstração';
    activeModelName.textContent = 'Demo Inteligente';
  }
}

// Configuração dos Eventos
function setupEventListeners() {
  // Envio do formulário
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSendMessage();
  });

  // Enter envia, Shift+Enter pula linha
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // Ajuste automático da altura do textarea
  userInput.addEventListener('input', autoResizeTextarea);

  // Sugestões rápidas
  document.querySelectorAll('.suggestion-card').forEach((card) => {
    card.addEventListener('click', () => {
      const prompt = card.getAttribute('data-prompt');
      userInput.value = prompt;
      handleSendMessage();
    });
  });

  // Controle do menu lateral (mobile)
  toggleSidebarBtn.addEventListener('click', () => sidebar.classList.add('open'));
  closeSidebarBtn.addEventListener('click', () => sidebar.classList.remove('open'));

  // Nova conversa e Limpar
  newChatBtn.addEventListener('click', startNewChat);
  clearChatBtn.addEventListener('click', startNewChat);

  // Abrir Modal de Configurações
  const openModal = () => {
    apiKeyInput.value = state.apiKey;
    modelSelect.value = state.model;
    systemPromptInput.value = state.systemPrompt;
    settingsModal.classList.add('active');
  };

  openSettingsBtn.addEventListener('click', openModal);
  configShortcutBtn.addEventListener('click', openModal);

  // Fechar Modal
  closeSettingsModal.addEventListener('click', () => settingsModal.classList.remove('active'));
  settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
      settingsModal.classList.remove('active');
    }
  });

  // Salvar Configurações
  saveSettingsBtn.addEventListener('click', () => {
    state.apiKey = apiKeyInput.value.trim();
    state.model = modelSelect.value;
    state.systemPrompt = systemPromptInput.value.trim();

    localStorage.setItem('gemini_api_key', state.apiKey);
    localStorage.setItem('gemini_model', state.model);
    localStorage.setItem('gemini_system_prompt', state.systemPrompt);

    updateConnectionStatus();
    settingsModal.classList.remove('active');

    appendBotMessage(
      state.apiKey
        ? `✅ **Configurações salvas com sucesso!** Agora estou conectado diretamente ao **${state.model}**. Em que posso te ajudar?`
        : `⚙️ **Modo Demonstração ativado!** Você pode conversar comigo à vontade para testar a interface.`
    );
  });

  // Botão Usar Modo Demo
  removeKeyBtn.addEventListener('click', () => {
    apiKeyInput.value = '';
    state.apiKey = '';
    localStorage.removeItem('gemini_api_key');
    updateConnectionStatus();
    settingsModal.classList.remove('active');
    appendBotMessage('ℹ️ Chave removida. O chatbot voltou para o **Modo Demonstração**.');
  });
}

// Redimensionamento do campo de texto
function autoResizeTextarea() {
  userInput.style.height = 'auto';
  userInput.style.height = Math.min(userInput.scrollHeight, 140) + 'px';
}

// Iniciar nova conversa
function startNewChat() {
  state.history = [];
  messagesContainer.innerHTML = '';
  messagesContainer.appendChild(welcomeScreen);
  welcomeScreen.style.display = 'flex';
  userInput.value = '';
  autoResizeTextarea();
  if (window.innerWidth <= 768) {
    sidebar.classList.remove('open');
  }
}

// Processa o envio da mensagem
async function handleSendMessage() {
  const text = userInput.value.trim();
  if (!text || state.isWaitingResponse) return;

  // Esconder tela de boas-vindas se estiver visível
  if (welcomeScreen.parentNode) {
    welcomeScreen.style.display = 'none';
  }

  // Adicionar mensagem do usuário na tela e no histórico
  appendUserMessage(text);
  state.history.push({
    role: 'user',
    parts: [{ text: text }]
  });

  userInput.value = '';
  autoResizeTextarea();
  state.isWaitingResponse = true;
  sendBtn.disabled = true;

  // Adicionar indicador de digitação (Loading)
  const loadingElement = appendTypingIndicator();

  try {
    let botResponse = '';
    if (state.apiKey) {
      botResponse = await callGeminiAPI(text);
    } else {
      botResponse = await simulateDemoResponse(text);
    }

    loadingElement.remove();
    appendBotMessage(botResponse);

    // Salvar resposta do bot no histórico da API
    state.history.push({
      role: 'model',
      parts: [{ text: botResponse }]
    });
  } catch (error) {
    loadingElement.remove();
    appendBotMessage(`⚠️ **Ops, ocorreu um erro ao gerar a resposta:**\n\n\`${error.message}\`\n\n*Verifique se a sua chave de API está correta nas configurações ou volte para o Modo Demonstração.*`);
  } finally {
    state.isWaitingResponse = false;
    sendBtn.disabled = false;
    userInput.focus();
  }
}

// Chamada real à API do Google Gemini
async function callGeminiAPI(latestText) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${state.model}:generateContent?key=${encodeURIComponent(state.apiKey)}`;

  const payload = {
    contents: state.history,
    systemInstruction: {
      parts: [{ text: state.systemPrompt }]
    },
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 2048
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error?.message || `Erro ${response.status}: ${response.statusText}`;
    throw new Error(message);
  }

  const data = await response.json();
  const candidate = data.candidates?.[0];
  const responseText = candidate?.content?.parts?.[0]?.text;

  if (!responseText) {
    throw new Error('A IA não retornou nenhum texto.');
  }

  return responseText;
}

// Respostas inteligentes para o Modo Demonstração (sem chave)
async function simulateDemoResponse(query) {
  // Simular delay natural de digitação
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 800));

  const lower = query.toLowerCase();

  if (lower.includes('ideia') || lower.includes('projeto')) {
    return `Aqui estão 3 ideias excelentes para você continuar desenvolvendo seu aprendizado:

1. **Calculadora ou Conversor de Moedas Web:** Ótimo para treinar manipulação do DOM e requisições HTTP (com cotações em tempo real).
2. **Aplicativo de Lista de Tarefas (To-Do List):** Permite praticar criação, edição, exclusão e persistência com \`localStorage\`.
3. **Dashboard de Clima (Previsão do Tempo):** Use uma API pública e gratuita como OpenWeather para exibir temperatura e ícones do tempo.

💡 *Dica:* Você pode conectar este chatbot à IA real do Google Gemini clicando em **"Configurar API Key"** no menu lateral!`;
  }

  if (lower.includes('ia') || lower.includes('inteligência artificial')) {
    return `A **Inteligência Artificial (IA)** moderna, especialmente os modelos de linguagem (LLMs como o Gemini), funciona aprendendo padrões em bilhões de textos da internet.

Pense nisso como um leitor extraordinário que leu milhões de livros:
- Ele não "pensa" exatamente como nós, mas calcula qual é a palavra mais coerente e provável para vir a seguir.
- Isso permite que ele escreva códigos, crie poesias, traduza idiomas e converse de maneira muito natural!

Quer testar com o Gemini de verdade? Obtenha uma chave grátis no Google AI Studio e adicione aqui! 🚀`;
  }

  if (lower.includes('receita') || lower.includes('geladeira')) {
    return `🍳 **Omelete Cremosa com Tomate e Queijo (10 minutos):**

**Ingredientes básicos:**
- 2 a 3 ovos
- 1 fatia de queijo (ou o queijo que tiver)
- Meio tomate picado (ou orégano/ervas)
- Uma pitada de sal e azeite/manteiga

**Modo de preparo:**
1. Bata os ovos em um prato com uma pitada de sal.
2. Aqueça uma frigideira com um fio de azeite em fogo médio.
3. Despeje os ovos e deixe firmar a base.
4. Adicione o queijo e os tomates de um lado, dobre a omelete e sirva quentinha!`;
  }

  if (lower.includes('poema') || lower.includes('poesia')) {
    return `*No pulsar dos fios e circuitos da razão,*\n*Nasce a faísca da imaginação.*\n*Linhas de código cruzando o infinito,*\n*Onde o amanhã já se faz tão bonito.*\n\n*A máquina aprende, o humano ensina,*\n*E nessa dança o futuro se ilumina!* ✨`;
  }

  // Resposta padrão
  return `Olá! Recebi sua mensagem: **"${query}"**!

Atualmente estou no **Modo Demonstração** (respostas locais de exemplo). Para liberar todo o potencial da inteligência artificial generativa:

1. Acesse o [Google AI Studio](https://aistudio.google.com/apikey).
2. Crie sua chave gratuita de API.
3. Clique em **"Configurar API Key"** na barra lateral e cole sua chave.

Feito isso, poderei responder sobre qualquer assunto com inteligência de ponta!`;
}

// Renderizar mensagem do usuário na tela
function appendUserMessage(text) {
  const row = document.createElement('div');
  row.className = 'message-row user';

  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.innerHTML = '<i data-lucide="user"></i>';

  const content = document.createElement('div');
  content.className = 'message-content';

  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.textContent = text;

  content.appendChild(bubble);
  row.appendChild(avatar);
  row.appendChild(content);

  messagesContainer.appendChild(row);
  if (window.lucide) window.lucide.createIcons();
  scrollToBottom();
}

// Renderizar mensagem do bot na tela com Markdown formatado
function appendBotMessage(markdownText) {
  const row = document.createElement('div');
  row.className = 'message-row bot';

  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.innerHTML = '<i data-lucide="bot"></i>';

  const content = document.createElement('div');
  content.className = 'message-content';

  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.innerHTML = parseSimpleMarkdown(markdownText);

  // Ações da mensagem (copiar texto)
  const actions = document.createElement('div');
  actions.className = 'message-actions';

  const copyBtn = document.createElement('button');
  copyBtn.className = 'action-small-btn';
  copyBtn.innerHTML = '<i data-lucide="copy"></i><span>Copiar</span>';
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(markdownText);
    copyBtn.innerHTML = '<i data-lucide="check"></i><span>Copiado!</span>';
    if (window.lucide) window.lucide.createIcons();
    setTimeout(() => {
      copyBtn.innerHTML = '<i data-lucide="copy"></i><span>Copiar</span>';
      if (window.lucide) window.lucide.createIcons();
    }, 2000);
  });

  actions.appendChild(copyBtn);
  content.appendChild(bubble);
  content.appendChild(actions);

  row.appendChild(avatar);
  row.appendChild(content);

  messagesContainer.appendChild(row);
  if (window.lucide) window.lucide.createIcons();
  scrollToBottom();
}

// Indicador animado de digitação (Loading)
function appendTypingIndicator() {
  const row = document.createElement('div');
  row.className = 'message-row bot';
  row.id = 'typingIndicator';

  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.innerHTML = '<i data-lucide="bot"></i>';

  const content = document.createElement('div');
  content.className = 'message-content';

  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.innerHTML = `
    <div class="typing-dots">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;

  content.appendChild(bubble);
  row.appendChild(avatar);
  row.appendChild(content);

  messagesContainer.appendChild(row);
  if (window.lucide) window.lucide.createIcons();
  scrollToBottom();
  return row;
}

// Rolagem suave até o fim
function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Conversor leve de Markdown para HTML seguro
function parseSimpleMarkdown(text) {
  if (!text) return '';

  // Escapar HTML básico
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Blocos de código ```linguagem ... ```
  html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code>${code.trim()}</code></pre>`;
  });

  // Código inline `código`
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Negrito **texto**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Itálico *texto*
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Links em Markdown [Texto](url)
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Quebras de linha e parágrafos
  const paragraphs = html.split(/\n\s*\n/);
  return paragraphs.map((p) => {
    // Tratar listas dentro do parágrafo
    const lines = p.split('\n');
    let inList = false;
    let listType = '';
    let processed = [];

    lines.forEach((line) => {
      const trimmed = line.trim();
      const bulletMatch = trimmed.match(/^[-*•]\s+(.*)/);
      const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)/);

      if (bulletMatch) {
        if (!inList || listType !== 'ul') {
          if (inList) processed.push(`</${listType}>`);
          processed.push('<ul>');
          inList = true;
          listType = 'ul';
        }
        processed.push(`<li>${bulletMatch[1]}</li>`);
      } else if (numberMatch) {
        if (!inList || listType !== 'ol') {
          if (inList) processed.push(`</${listType}>`);
          processed.push('<ol>');
          inList = true;
          listType = 'ol';
        }
        processed.push(`<li>${numberMatch[2]}</li>`);
      } else {
        if (inList) {
          processed.push(`</${listType}>`);
          inList = false;
        }
        processed.push(line);
      }
    });

    if (inList) processed.push(`</${listType}>`);
    return `<p>${processed.join('<br>')}</p>`;
  }).join('');
}
