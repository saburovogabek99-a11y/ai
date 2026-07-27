// Global variables
let currentChatId = null;
let isLoading = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
    setupEventListeners();
});

// Initialize chat
function initializeChat() {
    currentChatId = generateChatId();
    console.log('Chat initialized with ID:', currentChatId);
}

// Setup event listeners
function setupEventListeners() {
    // Send message on form submit
    document.getElementById('chatForm').addEventListener('submit', handleSendMessage);

    // New chat button
    document.getElementById('newChatBtn').addEventListener('click', handleNewChat);

    // Clear chat button
    document.getElementById('clearChatBtn').addEventListener('click', handleClearChat);

    // Suggestion buttons
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('messageInput').value = this.textContent;
            document.getElementById('chatForm').dispatchEvent(new Event('submit'));
        });
    });

    // Allow Enter key to send message
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            document.getElementById('chatForm').dispatchEvent(new Event('submit'));
        }
    });
}

// Handle send message
async function handleSendMessage(e) {
    e.preventDefault();

    const input = document.getElementById('messageInput');
    const message = input.value.trim();

    if (!message || isLoading) return;

    // Clear input
    input.value = '';
    input.focus();

    // Add user message to chat
    addMessageToChat('user', message);

    // Show loading indicator
    isLoading = true;
    addLoadingIndicator();

    try {
        // Send message to backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                chat_id: currentChatId
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        const data = await response.json();

        // Remove loading indicator
        removeLoadingIndicator();

        // Add AI response to chat
        addMessageToChat('ai', data.response);

    } catch (error) {
        console.error('Error:', error);
        removeLoadingIndicator();
        addMessageToChat('ai', 'Afsuski, xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
    } finally {
        isLoading = false;
    }
}

// Add message to chat
function addMessageToChat(sender, text) {
    const chatMessages = document.getElementById('chatMessages');

    // Remove welcome message if it exists
    const welcome = chatMessages.querySelector('.welcome-message');
    if (welcome) {
        welcome.remove();
    }

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add loading indicator
function addLoadingIndicator() {
    const chatMessages = document.getElementById('chatMessages');

    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai';
    messageDiv.id = 'loadingIndicator';

    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        typingDiv.appendChild(dot);
    }

    messageDiv.appendChild(typingDiv);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove loading indicator
function removeLoadingIndicator() {
    const indicator = document.getElementById('loadingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// Handle new chat
function handleNewChat() {
    if (confirm('Yangi chat boshlamoqchisiz? Joriy chat tarixiy qoladi.')) {
        currentChatId = generateChatId();
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = `
            <div class="welcome-message">
                <h2>Assalomu alaykum!</h2>
                <p>Men AI assistantman. Sizga yordam berishga tayyorman.</p>
                <div class="suggestions">
                    <button class="suggestion-btn">Salom</button>
                    <button class="suggestion-btn">Vaqt nima?</button>
                    <button class="suggestion-btn">Sana nima?</button>
                    <button class="suggestion-btn">Ko'mak kerakmi?</button>
                </div>
            </div>
        `;
        
        // Re-setup suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.getElementById('messageInput').value = this.textContent;
                document.getElementById('chatForm').dispatchEvent(new Event('submit'));
            });
        });
    }
}

// Handle clear chat
function handleClearChat() {
    if (confirm('Chatni tozalashga ishonchingiz komilmi? Bu amalni qaytarish mumkin emas.')) {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = `
            <div class="welcome-message">
                <h2>Assalomu alaykum!</h2>
                <p>Men AI assistantman. Sizga yordam berishga tayyorman.</p>
                <div class="suggestions">
                    <button class="suggestion-btn">Salom</button>
                    <button class="suggestion-btn">Vaqt nima?</button>
                    <button class="suggestion-btn">Sana nima?</button>
                    <button class="suggestion-btn">Ko'mak kerakmi?</button>
                </div>
            </div>
        `;
        
        // Re-setup suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.getElementById('messageInput').value = this.textContent;
                document.getElementById('chatForm').dispatchEvent(new Event('submit'));
            });
        });
    }
}

// Generate unique chat ID
function generateChatId() {
    return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}
