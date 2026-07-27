# Render Deployment Guide

## Qadam 1: Repository Tayyorlash

Barcha fayllar repository'da joylashganligi tekshiring:
- ✅ `app.py` - asosiy Python fayli
- ✅ `requirements.txt` - Python kutubxonalari
- ✅ `Procfile` - Render startup command
- ✅ `templates/index.html` - HTML template
- ✅ `static/css/style.css` - CSS styling
- ✅ `static/js/script.js` - JavaScript kod

## Qadam 2: Render'ga Connection

1. https://render.com ga kiring
2. GitHub account ulang
3. "New+" tugmasini bosing
4. "Web Service" ni tanlang
5. Repository ni tanlang

## Qadam 3: Sozlama

| Setting | Value |
|---------|-------|
| **Name** | ai-chat-assistant |
| **Region** | Singapore (closest to UZ) |
| **Branch** | main |
| **Runtime** | Python 3.11 |
| **Build Command** | `pip install -r requirements.txt && pip install gunicorn` |
| **Start Command** | `gunicorn app:app` |

## Qadam 4: Environment Variables

Render dashboard'da "Environment" section'ga o'ting:

```
FLASK_ENV=production
PORT=5000
```

## Qadam 5: Deploy

"Create Web Service" tugmasini bosing va kutish...

Deploy tugallanganda sizga URL beriladi:
```
https://ai-chat-assistant.onrender.com
```

## Tahrirlashlarni Deploy Qilish

Biron bir tahrir qilganingizdan so'ng:
```bash
git add .
git commit -m "Update changes"
git push origin main
```

Render avtomatik ravishda yangi versiyani deploy qiladi (2-5 minut kutish kerak).

## Muammolarni Tekshirish

### Build Logs
- Settings → Logs bo'limiga o'ting
- "Deploy Logs" va "Runtime Logs" ni tekshiring

### Common Errors

**502 Bad Gateway:**
- Runtime logs'ni tekshiring
- PORT variable o'rnatilganini tekshiring
- Start command to'g'ri yozilganini tekshiring

**Build Failed:**
- requirements.txt to'g'ri yozilganini tekshiring
- requirements.txt faylining UTF-8 encoding'i bo'lishini tekshiring

**Module not found:**
- `pip install -r requirements.txt` local'da test qiling
- Barcha dependencies requirements.txt'da joylashganligi tekshiring

## Deployment URLs

```
Main URL: https://ai-chat-assistant.onrender.com
API: https://ai-chat-assistant.onrender.com/api/chat
Health: https://ai-chat-assistant.onrender.com/health
```

## Performance Tips

1. **Cold Start:** Render free tier'da 15 daqiqalik inactivity'dan so'ng app sleep mode'ga o'tadi
2. **Yaqinroq Region:** Singapore yoki Istanbul region tanlang
3. **Memory:** Free tier 512MB RAM ta'minlaydi

## Paid Plan Features

- Foydalanuvchi base grow qilganda paid plan'ga o'tamiz
- $7/oy dan boshlanadi
- Always-on, custom domains, SSL, backup

---

**Endi deploy qilishga tayyorsiz!** 🚀
