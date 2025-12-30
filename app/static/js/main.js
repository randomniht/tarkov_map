const map_id_vis = document.getElementsByClassName('map-id');
for (let i = 0; i < map_id_vis.length; i++) {
    map_id_vis[i].style.display = 'none';
}// visible add none!!! in begin page might
// static/js/main.js - SIMPLE & WORKING
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready, initializing map...');
    
    // Simple check
    if (!window.MAP_DATA || !window.MAP_DATA.id) {
        console.warn('No MAP_DATA, using defaults');
        window.MAP_DATA = { id: 'default', name: 'Default Map' };
        
    }
    
    // Create map WITHOUT zoom limit
    const map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -2,
        maxZoom: 999, // High number
        zoomSnap: 0.1
    });
    
    // Set bounds
    const mapSize = [200, 200];
    const southWest = map.options.crs.pointToLatLng(L.point(0, mapSize[1]), 0);
    const northEast = map.options.crs.pointToLatLng(L.point(mapSize[0], 0), 0);
    const bounds = L.latLngBounds(southWest, northEast);
    
    // Add tiles
    L.tileLayer(`https://minio.tarkov.help/maps/${window.MAP_DATA.id}/{z}/{x}/{y}.webp`, {
        bounds: bounds,
        noWrap: true,
        crs: L.CRS.Simple,
        tms: false
    }).addTo(map);
    
    // Fit to bounds
    map.fitBounds(bounds);
    
    // RESIZE HANDLER
    window.addEventListener('resize', () => {
        map.fitBounds(bounds);
    });
    
    // FIX: Remove ALL default zoom controls
    if (map.zoomControl) {
        map.removeControl(map.zoomControl);
    }
    
    // Create our OWN buttons
    createSimpleZoomButtons(map);
    
    console.log('Map ready!');
});

function createSimpleZoomButtons(map) {
    // Container
    const container = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
    container.style.cssText = `
        background: #333;
        border: 2px solid #ff6b00;
        border-radius: 4px;
        margin-top: 60px;
        overflow: hidden;
    `;
    
    // Zoom In Button
    const zoomInBtn = L.DomUtil.create('a', '', container);
    zoomInBtn.href = '#';
    zoomInBtn.title = 'Zoom in';
    zoomInBtn.innerHTML = '+';
    zoomInBtn.style.cssText = `
        display: block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #ff6b00;
        font-size: 20px;
        font-weight: bold;
        background: #333;
        text-decoration: none;
        border-bottom: 1px solid #555;
        cursor: pointer;
    `;
    
    // Zoom Out Button
    const zoomOutBtn = L.DomUtil.create('a', '', container);
    zoomOutBtn.href = '#';
    zoomOutBtn.title = 'Zoom out';
    zoomOutBtn.innerHTML = '−';
    zoomOutBtn.style.cssText = `
        display: block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #ff6b00;
        font-size: 20px;
        font-weight: bold;
        background: #333;
        text-decoration: none;
        cursor: pointer;
    `;
    
    // Hover effects
    [zoomInBtn, zoomOutBtn].forEach(btn => {
        btn.onmouseover = () => btn.style.background = '#444';
        btn.onmouseout = () => btn.style.background = '#333';
        btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };
    });
    
    // Actual zoom functionality
    L.DomEvent.on(zoomInBtn, 'click', (e) => {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
        map.zoomIn(1);
        console.log('Zooming in, current zoom:', map.getZoom());
    });
    
    L.DomEvent.on(zoomOutBtn, 'click', (e) => {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
        map.zoomOut(1);
        console.log('Zooming out, current zoom:', map.getZoom());
    });
    
    // Create and add control
    const CustomControl = L.Control.extend({
        options: { position: 'topright' },
        onAdd: () => container
    });
    
    map.addControl(new CustomControl());
    
    console.log('Custom zoom buttons created - they will NEVER disable');
}