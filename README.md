# AI Chat Assistant

Uzbek tilida chatbot yaratilgan web application. Flask frameworkida ishlab turilgan va Render platformasida deploy qilinishi mumkin.

## Xususiyatlari

- ✅ Modern va responsive UI design
- ✅ Real-time chat interface
- ✅ Chat history
- ✅ Uzbek tilidagi savollarga javob
- ✅ Vaqt va sana ko'rsatish
- ✅ API endpoints bilan integratsiya imkoniyati
- ✅ Render platformasida oson deploy

## Texnologiyalar

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Database**: In-memory storage (o'zgartirilishi mumkin)

## O'rnatish va Ishga Tushirish

### Lokal Development

1. Repository klonlash:
```bash
git clone https://github.com/saburovogabek99-a11y/ai.git
cd ai
```

2. Virtual environment yaratish:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# yoki
venv\Scripts\activate  # Windows
```

3. Dependencies o'rnatish:
```bash
pip install -r requirements.txt
pip install gunicorn
```

4. Ilovani ishga tushirish:
```bash
python app.py
```

5. Browser oching va `http://localhost:5000` ga o'ting

## Render Platformasida Deploy

### 1. Render Service Yaratish

1. [Render.com](https://render.com) ga o'ting
2. "New +" tugmasini bosing
3. "Web Service" ni tanlang
4. GitHub reposini ulang

### 2. Build va Deploy Sozlamalari

**Environment:**
- Runtime: Python 3.11
- Build Command: `pip install -r requirements.txt && pip install gunicorn`
- Start Command: `gunicorn app:app`

**Environment Variables:**
```
FLASK_ENV=production
PORT=5000
```

### 3. Deploy Qilish

Render avtomatik ravishda GitHub push qilganida deploy qiladi.

## API Endpoints

```
POST /api/chat
- Xabar yuborish
- Body: {"message": "savolingiz", "chat_id": "chat_id"}

GET /api/chat/history/<chat_id>
- Chat tarixini olish

POST /api/chat/new
- Yangi chat session yaratish

DELETE /api/chat/clear/<chat_id>
- Chat tarixini tozalash

GET /health
- Health check
```

## Fayllar Struktura

```
ai/
├── app.py                          # Asosiy Flask ilovasi
├── requirements.txt                # Python dependencies
├── Procfile                        # Render deployment
├── .env                           # Environment variables
├── templates/
│   └── index.html                # Chat interface
└── static/
    ├── css/
    │   └── style.css             # Styling
    └── js/
        └── script.js             # Chat functionality
```

## Sozlash va Kustomizatsiya

### AI Javoblarini O'zgartirish

`app.py` faylida `generate_ai_response()` funksiyasini o'zgartirib, bot javoblarini sozlash mumkin:

```python
def generate_ai_response(user_message):
    message_lower = user_message.lower()
    
    if 'salom' in message_lower:
        return "Assalomu alaykum! Qanday yordam bera olaman?"
    
    # Ko'proq shartlar qo'shish...
```

### OpenAI integrations

Agar OpenAI integrations qilmoqchi bo'lsangiz:

```python
import openai

def generate_ai_response(user_message):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": user_message}]
    )
    return response.choices[0].message.content
```

## Muammolarni Hal Qilish

### Port already in use
```bash
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### ModuleNotFoundError
```bash
pip install -r requirements.txt
```

### 502 Bad Gateway (Render)
- Logs'ni tekshiring
- `PORT` environment variable o'rnatilganini tekshiring
- Build va Start commandlarini tekshiring

## Litsenziya

MIT

## Muallif

saburovogabek99-a11y

---

**Izohlar va takliflar uchun issue ochish yoki pull request yuborish mumkin!** 🚀
