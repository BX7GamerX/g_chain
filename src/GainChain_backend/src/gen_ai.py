from flask import Flask, request, jsonify
import google.generativeai as genai
import os

app = Flask(__name__)

# Set up Google GenAI key
genai.configure(api_key=os.getenv("GENAI_API_KEY"))

@app.route('/generate_code', methods=['POST'])
def generate_code():
    # Capture input parameters
    description = request.json.get('description')
    language = request.json.get('language')
    
    # Define the prompt for code generation
    prompt = f"Write a {language} code snippet that does the following: {description}"
    
    try:
        # Ensure we use the correct method in case 'generate' doesn't exist
        response = genai.generate_text(prompt=prompt)  # Adjusted method for text generation
        # Check response and format it for return
        generated_code = response.generations[0].text if response and response.generations else None
        
        if generated_code:
            return jsonify({"code": generated_code})
        else:
            return jsonify({"error": "Code generation failed"}), 500
    
    except AttributeError as e:
        return jsonify({"error": f"AttributeError: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
