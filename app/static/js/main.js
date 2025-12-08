// static/js/main.js - alternative implementation

(async function() {
    console.log('main.js started');
    
    // Wait for Leaflet to load
    await waitForLeaflet();
    
    // Wait for MAP_DATA to be defined
    await waitForMapData();
    
    // Initialize the map
    initMap();
    
    console.log('main.js finished');
})();

// Helper functions
function waitForLeaflet() {
    return new Promise((resolve) => {
        if (typeof L !== 'undefined') {
            resolve();
            return;
        }
        
        const checkInterval = setInterval(() => {
            if (typeof L !== 'undefined') {
                clearInterval(checkInterval);
                resolve();
            }
        }, 100);
        
        // Timeout in case Leaflet never loads
        setTimeout(() => {
            clearInterval(checkInterval);
            console.warn('Leaflet not found, but continuing...');
            resolve();
        }, 5000);
    });
}

function waitForMapData() {
    return new Promise((resolve) => {
        if (window.MAP_DATA) {
            resolve();
            return;
        }
        
        const checkInterval = setInterval(() => {
            if (window.MAP_DATA) {
                clearInterval(checkInterval);
                resolve();
            }
        }, 100);
        
        setTimeout(() => {
            clearInterval(checkInterval);
            window.MAP_DATA = window.MAP_DATA || {
                id: 'default',
                name: 'Default Map'
            };
            console.warn('MAP_DATA not found, using defaults');
            resolve();
        }, 3000);
    });
}

function initMap() {
    try {
        console.log('Initializing map with:', window.MAP_DATA);
        
        if (!document.getElementById('map')) {
            throw new Error('Map element not found');
        }
        
        const map = L.map('map', {
            crs: L.CRS.Simple,
            minZoom: -2,
            maxZoom: 4
        });
        
        const mapSize = [200, 200];
        const southWest = map.options.crs.pointToLatLng(L.point(0, mapSize[1]), 0);
        const northEast = map.options.crs.pointToLatLng(L.point(mapSize[0], 0), 0);
        const bounds = L.latLngBounds(southWest, northEast);
        
        L.tileLayer(`https://minio.tarkov.help/maps/${window.MAP_DATA.id}/{z}/{x}/{y}.webp`, {
            bounds: bounds,
            noWrap: true,
            crs: L.CRS.Simple,
            tms: false,
            attribution: `Map: ${window.MAP_DATA.name}`
        }).addTo(map);
        
        map.fitBounds(bounds);
        L.control.zoom({ position: 'topright' }).addTo(map);
        
        window.addEventListener('resize', () => {
            map.fitBounds(bounds);
        });
        
        console.log('Map initialized successfully');
        
    } catch (error) {
        console.error('Map initialization failed:', error);
    }
}