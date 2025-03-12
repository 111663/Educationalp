let count = 0;
const button = document.getElementById('incrementBtn');

button.addEventListener('click', () => {
  count++;
  button.innerHTML = count;
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

const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('promptInput');
const responseContainer = document.getElementById('responseContainer');

generateBtn.addEventListener('click', async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) {
    responseContainer.innerHTML = "Please enter a prompt.";
    return;
  }
  
  responseContainer.innerHTML = "Generating response...";

  const result = await OllamaReq({ prompt });
  
  responseContainer.innerHTML = result.response || "No response returned.";
});
