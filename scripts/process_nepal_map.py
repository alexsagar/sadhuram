import json
import math

with open('data/nepal-provinces.geojson', 'r', encoding='utf-8') as f:
    geo = json.load(f)

# Approximate geographic bounds of Nepal
min_lon, max_lon = 80.05, 88.20
min_lat, max_lat = 26.35, 30.45

WIDTH = 1000
HEIGHT = 560
PADDING = 24

def project(lon, lat):
    x = PADDING + (lon - min_lon) / (max_lon - min_lon) * (WIDTH - 2 * PADDING)
    y = HEIGHT - (PADDING + (lat - min_lat) / (max_lat - min_lat) * (HEIGHT - 2 * PADDING))
    return round(x, 1), round(y, 1)

def simplify_points(pts, tol=1.5):
    if len(pts) <= 2:
        return pts
    res = [pts[0]]
    for p in pts[1:-1]:
        d = math.hypot(p[0] - res[-1][0], p[1] - res[-1][1])
        if d >= tol:
            res.append(p)
    res.append(pts[-1])
    return res

province_names = {
    'NP01': 'Koshi Province',
    'NP02': 'Madhesh Province',
    'NP03': 'Bagmati Province',
    'NP04': 'Gandaki Province',
    'NP05': 'Lumbini Province',
    'NP06': 'Karnali Province',
    'NP07': 'Sudurpashchim Province'
}

provinces_output = []

for feat in geo['features']:
    pcode = feat['properties']['ADM1_PCODE']
    name = province_names.get(pcode, f"Province {feat['properties']['ADM1_EN']}")
    geom = feat['geometry']
    paths = []
    
    rings = []
    if geom['type'] == 'Polygon':
        rings = geom['coordinates']
    elif geom['type'] == 'MultiPolygon':
        for poly in geom['coordinates']:
            rings.extend(poly)
            
    for ring in rings:
        pts = [project(pt[0], pt[1]) for pt in ring]
        simplified = simplify_points(pts, tol=2.2)
        if len(simplified) >= 3:
            d_str = f"M {simplified[0][0]} {simplified[0][1]} " + " ".join(f"L {p[0]} {p[1]}" for p in simplified[1:]) + " Z"
            paths.append(d_str)
            
    provinces_output.append({
        'id': pcode,
        'name': name,
        'd': " ".join(paths)
    })

print(f"Processed {len(provinces_output)} provinces.")

locations = [
    {'id': 'purchaudi', 'name': 'Purchaudi, Baitadi', 'region': 'Sudurpashchim', 'lat': 29.62, 'lon': 80.68, 'project': 'Risk-Sensitive Land Use Plan (RSLUP)', 'year': '2026', 'type': 'Land Use Planning'},
    {'id': 'gaumul', 'name': 'Gaumul, Bajura', 'region': 'Sudurpashchim', 'lat': 29.80, 'lon': 81.55, 'project': 'Municipal Land Zoning & Classification', 'year': '2026', 'type': 'Land Use Planning'},
    {'id': 'patarasi', 'name': 'Patarasi, Jumla', 'region': 'Karnali', 'lat': 29.35, 'lon': 82.35, 'project': 'Land Use Classification', 'year': '2026', 'type': 'Land Use Planning'},
    {'id': 'phukot', 'name': 'Phukot Karnali, Kalikot', 'region': 'Karnali', 'lat': 29.18, 'lon': 81.65, 'project': 'Hydroelectric GIS Mapping (VUCL)', 'year': '2022', 'type': 'GIS & Hydropower'},
    {'id': 'manang', 'name': 'Manang & Chame', 'region': 'Gandaki', 'lat': 28.65, 'lon': 84.24, 'project': 'High-Altitude Land Use Planning', 'year': '2024–2026', 'type': 'Land Use Planning'},
    {'id': 'gharapjhong', 'name': 'Gharapjhong, Mustang', 'region': 'Gandaki', 'lat': 28.78, 'lon': 83.72, 'project': 'Himalayan Land Classification', 'year': '2024', 'type': 'Land Use Planning'},
    {'id': 'pokhara', 'name': 'Pokhara Valley, Kaski', 'region': 'Gandaki', 'lat': 28.21, 'lon': 83.99, 'project': 'Seti Flood Simulation & GNSS Workshop', 'year': '2017–2022', 'type': 'Hydrology / Surveying'},
    {'id': 'gorkha', 'name': 'Ghyampesal–Baarpaak, Gorkha', 'region': 'Gandaki', 'lat': 28.18, 'lon': 84.75, 'project': 'Road DPR & Geodetic Survey (MoPIT)', 'year': '2021–2022', 'type': 'Highway Engineering'},
    {'id': 'chitwan', 'name': 'Narayanghat–Mugling, Chitwan', 'region': 'Bagmati / Lumbini', 'lat': 27.81, 'lon': 84.52, 'project': 'Highway NH44 Slope UAV Survey', 'year': '2026', 'type': 'UAV & Geotechnics'},
    {'id': 'kathmandu', 'name': 'Kathmandu / Lalitpur', 'region': 'Bagmati', 'lat': 27.67, 'lon': 85.32, 'project': 'Bagmati BRBIP & UESC HOD Leadership', 'year': '2022–Present', 'type': 'Academic & River GIS'},
    {'id': 'kavre', 'name': 'Kavrepalanchok Middle Hills', 'region': 'Bagmati', 'lat': 27.68, 'lon': 85.49, 'project': 'DEM Terrain & Watershed Modeling', 'year': '2021–2026', 'type': 'Remote Sensing'},
    {'id': 'dudhkoshi', 'name': 'Dudhkoshi Reservoir, Khotang/Solu', 'region': 'Koshi', 'lat': 27.42, 'lon': 86.68, 'project': 'LiDAR Reservoir Rim Risk Register (ADB)', 'year': '2026', 'type': 'LiDAR & Dam Safety'},
    {'id': 'saptari', 'name': 'Surunga, Saptari', 'region': 'Madhesh', 'lat': 26.68, 'lon': 86.65, 'project': 'Digital Asset & Orchard GIS Inventory', 'year': '2026', 'type': 'Agricultural GIS'},
    {'id': 'sunsari', 'name': 'Inaruwa, Sunsari', 'region': 'Koshi', 'lat': 26.60, 'lon': 87.15, 'project': 'Municipal Land Use Plan', 'year': '2023', 'type': 'Land Use Planning'}
]

for loc in locations:
    x, y = project(loc['lon'], loc['lat'])
    loc['x'] = x
    loc['y'] = y

output_data = {
    'viewBox': f"0 0 {WIDTH} {HEIGHT}",
    'provinces': provinces_output,
    'locations': locations
}

with open('data/nepal-map-data.json', 'w', encoding='utf-8') as f:
    json.dump(output_data, f, indent=2)

print("Successfully written data/nepal-map-data.json")
