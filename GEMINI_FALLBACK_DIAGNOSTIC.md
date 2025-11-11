# Gemini Fallback System - Diagnostic Guide

## 🔍 Current Status: FALLBACK NOT WORKING

Based on the screenshot showing a 429 error reaching the user, the fallback system is not functioning. This guide will help you diagnose and fix the issue.

---

## ✅ Improvements Made

### 1. Enhanced Error Detection
- Added comprehensive 429 error detection
- Checks multiple error properties: `status`, `statusCode`, `response.status`
- Searches for keywords: "429", "rate limit", "quota", "resource exhausted"
- **New:** Detailed logging of what error detection finds

### 2. Better API Key Validation
- Now checks if keys are placeholder values
- Logs partial API key for verification (first 8 + last 4 chars)
- Clear error messages when keys aren't configured

### 3. Improved Error Catching
- Added try-catch blocks inside handler functions
- Logs detailed error information before re-throwing
- Ensures errors are properly caught and analyzed

### 4. Enhanced Logging
All operations now log with clear prefixes:
- `🧭 [BRÚJULA MODE]` - Brújula navigation requests
- `🎓 [TUTOR MODE]` - Tutor AI requests
- `🔍 isRateLimitError` - Error detection analysis
- `💥 [MODE] API call error` - Actual API errors
- `🔄 Rate limit detected` - Fallback trigger
- `✅/❌ API success/failed` - Results with timing

---

## 🚨 Diagnostic Steps

### Step 1: Check Your Environment Variables

**In your `.env.local` file, verify:**

```bash
# PRIMARY API (REQUIRED)
GEMINI_API_KEY=AIza...your_real_key_here

# FALLBACK API (REQUIRED for fallback to work!)
GEMINI_API_KEY_2=AIza...your_different_key_here
```

**Common Issues:**
- ❌ `GEMINI_API_KEY_2` not set
- ❌ Both keys are the same (fallback will also be rate limited!)
- ❌ Key is still set to `INSERT_YOUR_SECOND_GEMINI_API_KEY_HERE`

**How to verify:**
1. Restart your dev server after changing `.env.local`
2. Look for this in server logs on startup:
   ```
   ✅ PRIMARY Gemini API key configured (GEMINI_API_KEY: AIzaSyAB...xyz)
   ✅ FALLBACK Gemini API key configured (GEMINI_API_KEY_2: AIzaSyCD...abc)
   ```

### Step 2: Check Server Logs When Error Occurs

**Make a Brújula request and look for these logs:**

**If fallback is configured correctly, you should see:**
```
🧭 [BRÚJULA MODE] Starting request
📝 Query: "¿Cómo uso Cursor?"
✅ PRIMARY Gemini API key configured (GEMINI_API_KEY: ...)
✅ FALLBACK Gemini API key configured (GEMINI_API_KEY_2: ...)
🚀 [BRÚJULA] Attempting PRIMARY API...
⚙️  [BRÚJULA] Processing with PRIMARY API (gemini)
📚 [BRÚJULA] Content knowledge loaded (45123 chars)
⚠️ [BRÚJULA] PRIMARY API failed (234ms)
Error details: { status: 429, ... }
🔍 isRateLimitError result: true     ← THIS IS CRITICAL
   Status: 429
   Message snippet: ...
🔄 [BRÚJULA] Rate limit detected, attempting FALLBACK API...
⚙️  [BRÚJULA] Processing with FALLBACK API (gemini-secondary)
✨ [BRÚJULA] Successfully parsed response with 4 links
📤 [BRÚJULA] Returning response
✅ [BRÚJULA] FALLBACK API success (1876ms)
```

**If fallback is NOT configured:**
```
❌ FALLBACK Gemini API key not configured (GEMINI_API_KEY_2)
⚠️ [BRÚJULA] PRIMARY API failed (234ms)
🔍 isRateLimitError result: true
❌ [BRÚJULA] No fallback configured, returning rate limit error
```

**If both APIs are rate limited:**
```
🔄 [BRÚJULA] Rate limit detected, attempting FALLBACK API...
⚙️  [BRÚJULA] Processing with FALLBACK API (gemini-secondary)
⚠️ [BRÚJULA] FALLBACK API failed (567ms)
❌ [BRÚJULA] FALLBACK API also failed (567ms)
```

### Step 3: Verify Error Structure

**If you see:**
```
🔍 isRateLimitError result: false
```

This means the error detection isn't recognizing the 429. Look at the next line:
```
   Status: undefined     ← Error doesn't have expected structure
   Message snippet: [whatever the actual error is]
```

**This indicates:** The error object structure is different than expected. Share the full error details with your team.

---

## 🛠️ Solutions by Scenario

### Scenario A: GEMINI_API_KEY_2 Not Configured
**Symptoms:** 
- Logs show: `❌ FALLBACK Gemini API key not configured`
- User sees rate limit error

**Solution:**
1. Get a second Gemini API key from https://aistudio.google.com/app/apikey
2. Add to `.env.local`:
   ```bash
   GEMINI_API_KEY_2=your_second_key_here
   ```
3. Restart dev server: `npm run dev`

### Scenario B: Both Keys Rate Limited
**Symptoms:**
- Logs show: `✅ FALLBACK API key configured`
- Logs show: `🔄 Rate limit detected, attempting FALLBACK API...`
- Logs show: `❌ FALLBACK API also failed`

**Solution:**
- Both of your API keys have hit their rate limits
- Wait 1 minute, then try again
- Consider getting more API keys for higher capacity

### Scenario C: Error Detection Not Working
**Symptoms:**
- Logs show: `🔍 isRateLimitError result: false`
- User sees error but status is 429

**Solution:**
- Check the "Status:" and "Message snippet:" in logs
- The error structure might be different than expected
- Share logs with developer to update detection logic

### Scenario D: Keys Are Identical
**Symptoms:**
- Fallback attempts but also fails immediately
- Both PRIMARY and FALLBACK have same key ending

**Solution:**
- Ensure `GEMINI_API_KEY` ≠ `GEMINI_API_KEY_2`
- They must be different keys to provide true fallback

---

## 📊 Testing the Fix

After configuring `GEMINI_API_KEY_2`, test it:

### Test 1: Verify Both Keys Work
```bash
# In your terminal, watch the logs
# Make ONE Brújula request

# Expected log:
✅ PRIMARY Gemini API key configured (GEMINI_API_KEY: AIzaSy...xyz)
✅ FALLBACK Gemini API key configured (GEMINI_API_KEY_2: AIzaSy...abc)
✅ [BRÚJULA] PRIMARY API success (1432ms)
```

### Test 2: Exhaust Primary Key
```bash
# Make 15+ requests quickly to hit rate limit
# 
# Expected behavior:
# Requests 1-14: ✅ PRIMARY API success
# Request 15: 
#   ⚠️ PRIMARY API failed (234ms)
#   🔄 Rate limit detected
#   ✅ FALLBACK API success (1876ms)
#
# User should NEVER see an error message!
```

### Test 3: Check Response Metadata
```javascript
// In browser console (Network tab), check the response:
{
  "success": true,
  "fallbackUsed": true,  // ← This indicates fallback worked!
  "provider": "gemini-secondary"
}
```

---

## 🎯 Success Criteria

✅ Fallback is working correctly when:
1. **No user-visible errors** during rate limits
2. Logs show `✅ FALLBACK API success` after PRIMARY fails
3. Response includes `"fallbackUsed": true`
4. Service continues uninterrupted during high traffic

---

## 🆘 Still Not Working?

**Share these logs with your developer:**
1. Full startup logs (showing API key configuration)
2. Full error logs from a failed request
3. The output of `🔍 isRateLimitError` check
4. Screenshot of the error the user sees

**Also verify:**
- Both API keys are valid (test them independently)
- Keys are from Google AI Studio (not Google Cloud)
- `.env.local` is in the root directory
- Server was restarted after changing `.env.local`

---

## 📝 Next Steps for You

1. ✅ **Restart your dev server** to load the improved code
2. ✅ **Check if `GEMINI_API_KEY_2` is configured** in `.env.local`
3. ✅ **Make a Brújula request** and check the server logs
4. ✅ **Look for the diagnostic messages** mentioned in Step 2
5. ✅ **Share the logs** so we can see exactly what's happening

The improved logging will now show exactly where the fallback system is failing!

