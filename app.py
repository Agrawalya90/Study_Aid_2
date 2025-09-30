from flask import Flask, request, jsonify
import base64
from io import BytesIO
from PIL import Image
import pytesseract
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

openai.api_key = "API_KEY"

@app.route("/process_image", methods=["POST"])
def process_image():
    data = request.get_json()
    image_data = data["image"].split(",")[1]

    image_bytes = base64.b64decode(image_data)
    image = Image.open(BytesIO(image_bytes))

    extracted_text = pytesseract.image_to_string(image)

    messages_summary = [
        {"role": "user", "content": f"Summarize this text: {extracted_text}"}
    ]
    messages_mcq = [
        {"role": "user", "content": f"Generate 5 MCQs from this text: {extracted_text}"}
    ]

    response_summary = openai.ChatCompletion.create(
        model="gemini-1.5",
        messages=messages_summary
    )
    response_mcq = openai.ChatCompletion.create(
        model="gemini-1.5",
        messages=messages_mcq
    )

    summary = response_summary.choices[0].message.content
    mcqs = response_mcq.choices[0].message.content

    return jsonify({"summary": summary, "mcqs": mcqs, "text": extracted_text})
if __name__ == "__main__":
    app.run(debug=True, port=5019)
