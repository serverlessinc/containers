/**
 * Asynchronously sends a message to the specified AI provider with the selected model version and streams the response.
 *
 * @param {Object} options - Options object.
 * @param {string} options.provider - The AI provider (e.g., "openai" or "anthropic").
 * @param {string} options.model - The model version (e.g., "gpt-4", "claude-3-5-sonnet-20241022").
 */
async function sendMessage({ provider, model }) {
  const input = document.getElementById('user-input');
  const output = document.getElementById('chat-output');
  const messageText = input.value.trim();

  if (!messageText) return;

  // Create user message element with sender label
  const userMessageDiv = document.createElement('div');
  userMessageDiv.className = 'message user-message';

  const userLabel = document.createElement('span');
  userLabel.className = 'sender-label';
  userLabel.textContent = 'User:';

  const userTextSpan = document.createElement('span');
  userTextSpan.className = 'message-text';
  userTextSpan.textContent = messageText;

  userMessageDiv.appendChild(userLabel);
  userMessageDiv.appendChild(userTextSpan);
  output.appendChild(userMessageDiv);

  // Clear the input field
  input.value = '';

  // Create AI message element with sender label using the provider name
  const aiMessageDiv = document.createElement('div');
  aiMessageDiv.className = 'message model-message';

  const aiLabel = document.createElement('span');
  aiLabel.className = 'sender-label';
  // Capitalize the provider to serve as the model name label.
  aiLabel.textContent = provider.charAt(0).toUpperCase() + provider.slice(1) + ':';
  // Apply loading class to reduce opacity while waiting
  aiLabel.classList.add('loading');

  const aiTextSpan = document.createElement('span');
  aiTextSpan.className = 'message-text';
  // Set initial loading text for AI response with reduced opacity
  aiTextSpan.textContent = 'Loading...';
  aiTextSpan.classList.add('loading');

  aiMessageDiv.appendChild(aiLabel);
  aiMessageDiv.appendChild(aiTextSpan);
  output.appendChild(aiMessageDiv);

  try {
    const response = await fetch(`/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider,
        model,
        messages: [{ role: 'user', content: messageText }],
      }),
    });

    // Flag to clear the loading text/classes on the first chunk of data
    let firstChunk = true;
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            const { content } = parsed;
            if (firstChunk) {
              // Remove the loading class from both the sender label and text span
              aiLabel.classList.remove('loading');
              aiTextSpan.classList.remove('loading');
              // Clear the "Loading..." text on first chunk received
              aiTextSpan.textContent = '';
              firstChunk = false;
            }
            // Append the streamed content to the AI message text
            aiTextSpan.textContent += content;
          } catch (e) {
            console.error('Error parsing SSE data:', e);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
    aiTextSpan.textContent = 'Error: Failed to get AI response';
  }

  // Scroll to the bottom of the chat output
  output.scrollTop = output.scrollHeight;
}

/**
 * Triggers the send message action by extracting the selected provider and model version from the dropdown.
 */
function triggerSendMessage() {
  const modelSelect = document.getElementById('model-select');
  // The value is expected to be in the format "provider:model"
  const [provider, model] = modelSelect.value.split(':');
  sendMessage({ provider, model });
}

// Add an event listener to send the message when the Enter key is pressed in the textarea
document.getElementById('user-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    triggerSendMessage();
  }
});

// Add an event listener to the Send button
document.getElementById('send-button').addEventListener('click', () => {
  triggerSendMessage();
}); 