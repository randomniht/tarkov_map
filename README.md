## Tarkov Map: Installation & Run 🚀

Complete guide to install and run Tarkov Map locally. Works on all platforms with Git and Python. Perfect for development and customization in VSCode. 😎

## Prerequisites ✅

- Git installed
- Python 3.8+ with `pip` and `venv`
- VSCode or any IDE (optional)
- Terminal/Command Prompt

## Download Repository 📥

```bash
git clone https://github.com/randomniht/tarkov_map.git
cd tarkov_map
```

**Or via ZIP:** Download → Extract → `cd tarkov_map-main`

## Setup Environment 🐍

```bash
# Create virtual environment
python -m venv venv

# Activate (Windows/Linux/Mac)
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

✅ See `(venv)` in prompt? Ready!

## Run Server ⚡

```bash
uvicorn app.main:app --reload
```

🔥 Open http://localhost:8000 in browser. Auto-reloads on changes! 🚀

**For dev:** `code .` (opens VSCode)

## Update Project 🔄

```bash
git pull origin main

# Reinstall deps
rm -rf venv  # or deactivate + delete manually
python -m venv venv
# Activate & pip install -r requirements.txt
```

## Make Changes 💾

```bash
# Create branch
git checkout -b feature-name

# Edit files
git add .
git commit -m "Describe changes"
git push origin feature-name
```

🌟 Create Pull Request on GitHub!
09.01.2026 test readme_upt