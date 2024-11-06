import os
import google.generativeai as genai
import time

# Set environment variable for API key (for secure storage)
os.environ["GENAI_API_KEY"] = "AIzaSyD1vXf95QjgdwRqTAGfTlOXF43LHxMOjto"

# Configure the API key
genai.configure(api_key=os.environ["GENAI_API_KEY"])

# Set generation configuration
generation_config = {
  "temperature": 0.7,
  "top_p": 0.9,
  "top_k": 40,
  "max_output_tokens": 1024,
  "response_mime_type": "text/plain",
}

# Initialize the model
model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
)

# Start chat session
chat_session = model.start_chat(history=[])

# Welcoming message
print("\n🌟 Welcome to the Coding with G-CHAIN ! 🌟")
time.sleep(0.5)
print("Ask me anything about coding, or type 'quit' to exit the chat.\n")

# Interactively prompt the user for input
while True:
    user_input = input("💬 You: ")
    if user_input.lower() in ["quit", "exit"]:
        print("\n👋 Thank you for using the Coding with G-CHAIN. Have a great time!")
        break
    
    # Send user input to the model
    response = chat_session.send_message(user_input)
    
    # Print the model's response with slight delay for realism
    print("🤖 Bot: Thinking...", end="", flush=True)
    time.sleep(0.5)  # Simulate typing delay
    print(f"\r🤖 G-chain: {response.text}\n")
