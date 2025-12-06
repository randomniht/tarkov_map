from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pathlib import Path
import json
import os
app = FastAPI(title="FastAPI", docs_url=None, redoc_url=None)

templates_dir = "./app/templates"

templates = Jinja2Templates(directory=templates_dir)

static_dir = "./app/static/"
app.mount("/static", StaticFiles(directory=static_dir), name="static")

def load_maps_data():
    try:
        json_path = Path(__file__).parent / "static" / "maps" / "maps_all_pars.json"
        if not json_path.exists():
            print(f"⚠️ file not found: {json_path}")
            return {"maps": []}
        
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            print(f"✅Maps: {len(data.get('maps', []))}")
            return data
            
    except json.JSONDecodeError as e:
        print(f"JSON error: {e}")
        return {"maps": []}
    except Exception as e:
        print(f"file: {e}")
        return {"maps": []}


MAPS_DATA = load_maps_data()


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("main.html", {
        "request": request,
        "maps": MAPS_DATA.get("maps", [])  # Список всех карт
    })

@app.get("/map/{map_id}")
async def show_map(request: Request, map_id: str):
    # Ищем конкретную карту
    map_data = next((m for m in MAPS_DATA.get("maps", []) if m.get("id") == map_id), None)
    
    if not map_data:
        raise HTTPException(status_code=404, detail="Карта не найдена")
    
    # Передаём только данные ОДНОЙ карты
    return templates.TemplateResponse("map.html", {
        "request": request,
        "map": map_data  # Данные одной карты
    })