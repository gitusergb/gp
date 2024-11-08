import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { IoSend } from "react-icons/io5";
import styles from "./Chat.module.css";
import { postData } from "../api/chat";

function Chat() {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const uploadAndAskAI = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("prompt", prompt);
      const result = await postData(formData);
      if (result) {
        const aiResponse = result.data.data.aiResponse;
        setResponse(aiResponse);
        setChatHistory([...chatHistory, { type: 'user', text: prompt }, { type: 'ai', text: aiResponse }]);
        setPrompt("");
      }
    } catch (error) {
      setResponse("Error fetching AI response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatWindow}>
        <h1>Financial_Assistant_Chat</h1>

        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section className={styles.dropzoneSection}>
              <div {...getRootProps({ className: styles.dropzone })}>
                <input {...getInputProps()} />
                <p className={styles.dropzoneText}>
                  {file
                    ? `File selected: ${file.name.slice(0, 15)}...`
                    : "Drag and drop an Excel file here, or click to select one"}
                </p>
              </div>
            </section>
          )}
        </Dropzone>

        <div className={styles.chatHistory}>
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={
                chat.type === 'user' ? styles.userBubble : styles.aiBubble
              }
            >
              <p>{chat.text}</p>
            </div>
          ))}
          {loading && (
            <div className={styles.aiBubble}>
              <div className={styles.typing}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.inputSection}>
          <textarea
            className={styles.textarea}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your query..."
          />
          <button className={styles.button} onClick={uploadAndAskAI}>
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
