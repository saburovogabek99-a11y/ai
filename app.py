from flask import Flask, render_template, request, jsonify, session
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
from datetime import datetime
import secrets

load_dotenv()

app = Flask(__name__)
app.secret_key = secrets.token_hex(32)
CORS(app)

# Simple in-memory chat storage
chats = {}
chat_counter = 0


def generate_ai_response(user_message):
    """
    Simple AI response generator.
    You can integrate OpenAI, Gemini, or other AI services here.
    """
    message_lower = user_message.lower()
    
    # Simple pattern matching for demo
    if 'hello' in message_lower or 'hi' in message_lower:
        return "Assalomu alaykum! Men AI assistant. Sizga qanday yordam bera olaman?"
    
    elif 'qanday' in message_lower or 'how' in message_lower:
        return "Men savollaringizga javob berishga, ma'lumot berish va murakkab masalalarni yechishga tayinman."
    
    elif 'ko\'mak' in message_lower or 'help' in message_lower:
        return "Menga istalgan savolni bering, men sizga javob berib, yordamchi bolaman."
    
    elif 'thanks' in message_lower or 'rahmat' in message_lower:
        return "Xush kelibsiz! Yana sizga yordam bera olsam, menga ayting."
    
    elif 'vaqt' in message_lower or 'time' in message_lower:
        return f"Hozirgi vaqt: {datetime.now().strftime('%H:%M:%S')}"
    
    elif 'sana' in message_lower or 'date' in message_lower:
        return f"Bugungi sana: {datetime.now().strftime('%d.%m.%Y')}"
    
    else:
        # Default response for any other input
        responses = [
            "Qiziq savol! Buning haqida ko'proq ayting.",
            "Tushundim. Siz nima haqida ko'proq bilishni xohlaysiz?",
            "Bu ajoyib fikr. Yana nimani bilmoqchisiz?",
            "Sizning fikringiz muhim. Davom etamiz.",
        ]
        import random
        return random.choice(responses)


@app.route('/')
def index():
    """Main chat interface"""
    return render_template('index.html')


@app.route('/api/chat', methods=['POST'])
def chat():
    """Chat endpoint - process user message and return AI response"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        chat_id = data.get('chat_id')
        
        if not user_message:
            return jsonify({'error': 'Message cannot be empty'}), 400
        
        # Generate AI response
        ai_response = generate_ai_response(user_message)
        
        # Store in chat history
        if chat_id not in chats:
            chats[chat_id] = []
        
        chats[chat_id].append({
            'timestamp': datetime.now().isoformat(),
            'user': user_message,
            'ai': ai_response
        })
        
        return jsonify({
            'success': True,
            'response': ai_response,
            'timestamp': datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/chat/history/<chat_id>', methods=['GET'])
def get_chat_history(chat_id):
    """Get chat history"""
    try:
        history = chats.get(chat_id, [])
        return jsonify({
            'success': True,
            'chat_id': chat_id,
            'messages': history
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/chat/new', methods=['POST'])
def new_chat():
    """Create new chat session"""
    try:
        global chat_counter
        chat_id = f"chat_{chat_counter}_{datetime.now().timestamp()}"
        chat_counter += 1
        
        chats[chat_id] = []
        
        return jsonify({
            'success': True,
            'chat_id': chat_id
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/chat/clear/<chat_id>', methods=['DELETE'])
def clear_chat(chat_id):
    """Clear chat history"""
    try:
        if chat_id in chats:
            chats[chat_id] = []
        
        return jsonify({
            'success': True,
            'message': 'Chat cleared'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok'}), 200


@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404


@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Server error'}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
