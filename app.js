let count = 0;
const counterBtn = document.getElementById('incrementBtn');
counterBtn.addEventListener('click', () => {
  count++;
  counterBtn.innerHTML = count;
});
async function OllamaReq(requestObj) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3", 
      prompt: requestObj.prompt,
      stream: false
    })
  };
  try {
    const response = await fetch("http://localhost:11434/api/generate", options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error calling Ollama API:", error);
    return { response: "Error occurred. Please try again later." };
  }
}
const chatSendBtn = document.getElementById('chatSendBtn');
const chatPrompt = document.getElementById('chatPrompt');
const chatResponse = document.getElementById('chatResponse');
chatSendBtn.addEventListener('click', async () => {
  const prompt = chatPrompt.value.trim();
  if (!prompt) {
    chatResponse.innerHTML = "Please enter a prompt.";
    return;
  }
  chatResponse.innerHTML = "Generating response...";
  const result = await OllamaReq({ prompt });
  chatResponse.innerHTML = result.response || "No response returned.";
});
