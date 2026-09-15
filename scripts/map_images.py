import xml.etree.ElementTree as ET
import zipfile

with zipfile.ZipFile('Details.docx') as z:
    rels_xml = z.read('word/_rels/document.xml.rels')
    doc_xml = z.read('word/document.xml')

rels_tree = ET.fromstring(rels_xml)
rel_map = {}
for r in rels_tree:
    r_id = r.attrib.get('Id')
    target = r.attrib.get('Target')
    if target and target.startswith('media/'):
        rel_map[r_id] = target.replace('media/', '')

doc_tree = ET.fromstring(doc_xml)

last_text = ""
for elem in doc_tree.iter():
    if elem.tag.endswith('}p'):
        text = ''.join(elem.itertext()).strip()
        if text:
            last_text = text
        blips = elem.findall('.//{http://schemas.openxmlformats.org/drawingml/2006/main}blip')
        if blips:
            imgs = [rel_map.get(b.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')) for b in blips]
            print(f"Context: {last_text[:80]} -> Images: {imgs}")
