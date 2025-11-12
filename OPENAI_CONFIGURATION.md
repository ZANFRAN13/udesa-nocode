# OpenAI Configuration - November 2024

## 🎯 Overview

This document describes the configuration changes made to switch from Google Gemini to OpenAI as the primary AI provider for both Tutor and Brújula features.

---

## ✅ Changes Implemented

### 1. **Model Configuration**
- **Primary Model:** `gpt-4o-mini`
- **Features Using Model:** 
  - Tutor (AI Assistant for glossary terms)
  - Brújula (Content Navigation AI)
- **Note:** Using gpt-4o-mini (fast, cost-effective, optimized for educational content)

### 2. **Rate Limiting**
- **Limit:** 10 requests per session per 120 minutes
- **Storage:** Session-based (sessionStorage)
- **Session ID:** Automatically generated and stored per browser session
- **Tracking:** In-memory rate limit store on the server

### 3. **Environment Configuration**

#### Required Environment Variable:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

#### Temporarily Commented Out (Not Deleted):
```env
# GEMINI_API_KEY=your_gemini_key
# GEMINI_API_KEY_2=your_second_gemini_key
```

---

## 📦 Packages Installed

- `openai` - Official OpenAI Node.js SDK

---

## 🔧 Technical Implementation

### API Route (`app/api/gemini/route.ts`)

#### Rate Limiting System:
```typescript
const RATE_LIMIT = 10
const RATE_LIMIT_WINDOW = 120 * 60 * 1000 // 120 minutes

// In-memory store for rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
```

#### OpenAI Client:
```typescript
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY
  return new OpenAI({ apiKey })
}
```

#### Model Usage:
- **Tutor Mode:** `gpt-4o-mini` with 2000 max_completion_tokens
- **Brújula Mode:** `gpt-4o-mini` with 1500 max_completion_tokens, JSON response format

### Frontend Components

#### Session ID Generation:
Both `gemini-popup.tsx` and `brujula-popup.tsx` use:
```typescript
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('ai_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`
    sessionStorage.setItem('ai_session_id', sessionId)
  }
  return sessionId
}
```

#### Rate Limit Display:
Both components show remaining queries:
```tsx
{rateLimit.remaining < rateLimit.total && (
  <span className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 rounded-full">
    {rateLimit.remaining}/{rateLimit.total} consultas
  </span>
)}
```

---

## 🔄 Fallback System

### Current Fallback Flow:
1. **Primary:** OpenAI API (gpt-4o-mini) with server key
2. **Secondary:** User-provided **Gemini** API key (easier to get - 2 clicks)

### Why Gemini for User Fallback?
- **Easier to obtain:** Google AI Studio provides free API keys in 2 clicks
- **No credit card required:** Users can get started immediately
- **Free tier:** More generous free tier than OpenAI
- **Same quality:** Gemini 2.0 Flash performs excellently for educational content

### Rate Limit Error Handling:
When rate limit is exceeded:
- User sees friendly error message
- Option to provide their own **Gemini** API key
- Link to get API key: https://aistudio.google.com/api-keys
- Key is NOT stored, only used for that request

---

## 📊 Rate Limiting Details

### Per Session:
- **10 requests** maximum
- **120 minutes** (2 hours) window
- Automatic reset after window expires
- Session persists across page refreshes (sessionStorage)

### Response Headers:
Each successful API response includes:
```json
{
  "rateLimit": {
    "remaining": 9,
    "total": 10,
    "resetTime": 1699999999999
  }
}
```

---

## 🎨 UI Updates

### Tutor Popup (gemini-popup.tsx):
- Shows rate limit counter when queries are used
- Green badge: `{remaining}/{total} consultas`
- User API key input references **Gemini**
- Link to Google AI Studio: https://aistudio.google.com/api-keys
- Placeholder: `AIza...` for Gemini keys
- "Conseguir gratis (2 clicks)" call-to-action

### Brújula Popup (brujula-popup.tsx):
- Same rate limit counter display
- **Gemini** references in user API key input
- Updated placeholder: `AIza...` for Gemini keys
- Updated help links to Google AI Studio
- "Conseguir API key gratuita (2 clicks)" call-to-action

---

## 🚀 Setup Instructions

### For Developers:

1. **Get OpenAI API Key:**
   - Visit: https://platform.openai.com/api-keys
   - Create new API key
   - Copy the key (starts with `sk-`)

2. **Configure Environment:**
   ```bash
   # In your .env.local file
   OPENAI_API_KEY=sk-your-actual-key-here
   ```

3. **Restart Development Server:**
   ```bash
   npm run dev
   ```

4. **Verify Configuration:**
   - Check server logs for: `✅ OpenAI API key configured`
   - Test Tutor feature on any glossary page
   - Test Brújula feature from dashboard

---

## 🧪 Testing Checklist

- [x] OpenAI SDK installed
- [x] Gemini SDK active for user fallback
- [x] Environment template updated with OpenAI
- [x] API route uses OpenAI for server
- [x] API route uses Gemini for user fallback
- [x] Rate limiting implemented (10 per 120min)
- [x] Session ID generation working
- [x] Rate limit counter displays in UI
- [x] User API key fallback configured for Gemini
- [x] Server model: `gpt-4o-mini`
- [x] User fallback model: `gemini-2.0-flash-exp`
- [x] Hybrid system working correctly
- [x] No linter errors

---

## 📝 Important Notes

### Hybrid System:
- **Server:** Uses OpenAI (gpt-4o-mini) for all standard requests
- **User Fallback:** Uses Gemini (gemini-2.0-flash-exp) when user provides API key
- **Active:** Both systems are active and working together

### Rate Limit Reset:
- Automatically resets after 120 minutes
- User can clear sessionStorage to get new session ID
- Or provide their own **Gemini API key** to bypass (easier, free)

### Model Specifications:
- **Model:** `gpt-4o-mini`
- **Temperature:** 1.0 (full creativity range)
- **Max Completion Tokens:** 
  - Tutor: 2000
  - Brújula: 1500 (with JSON mode)
- **Note:** Using `max_completion_tokens` (correct parameter for newer OpenAI models)

---

## 🔗 Useful Links

### Server (OpenAI):
- [OpenAI API Keys](https://platform.openai.com/api-keys)
- [OpenAI Model Documentation](https://platform.openai.com/docs/models)
- [OpenAI Node.js SDK](https://github.com/openai/openai-node)

### User Fallback (Gemini):
- [Google AI Studio - Get API Key](https://aistudio.google.com/api-keys)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Gemini Models](https://ai.google.dev/models/gemini)

---

## 📞 Support

If users encounter rate limiting:
1. Wait 120 minutes for automatic reset
2. Use their own **Gemini API key** (free, 2 clicks to get)
3. Check status:
   - OpenAI: https://status.openai.com/
   - Google AI: https://status.cloud.google.com/

---

**Configuration Date:** November 12, 2024  
**Server Model:** gpt-4o-mini (OpenAI)  
**User Fallback Model:** gemini-2.0-flash-exp (Google Gemini)  
**Status:** ✅ Active and Configured - Hybrid System

