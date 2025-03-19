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
import { useState } from "react";

const FileUploader = () => {
  const [fileName, setFileName] = useState(null);
  const [fileContent, setFileContent] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    console.log(`File selected: ${file.name}`);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setFileContent(content);
      console.log("File successfully loaded.");
    };

    try {
      if (file.type === "text/plain" || file.type === "text/markdown") {
        reader.readAsText(file);
      } else if (file.type === "application/pdf") {
        const formData = new FormData();
        formData.append("file", file);
        console.log("PDF file prepared for server-side processing.");
      } else {
        console.error("Unsupported file type.");
      }
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  const clearFile = () => {
    setFileName(null);
    setFileContent(null);
    console.log("File selection cleared.");
  };

  return (
    <div className="file-uploader">
      <input type="file" onChange={handleFileChange} />
      {fileName && (
        <div>
          <p>Uploaded File: {fileName}</p>
          <button onClick={clearFile}>Clear File</button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
