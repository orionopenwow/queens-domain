import struct, json

with open('C:/Users/campw/Desktop/QueensDomain/app/meshy_model.glb', 'rb') as f:
    f.seek(12)
    j_len, _ = struct.unpack('<II', f.read(8))
    gltf = json.loads(f.read(j_len).decode('utf-8'))
    b_len, _ = struct.unpack('<II', f.read(8))
    bin_data = f.read(b_len)

print('Accessors:')
for i, acc in enumerate(gltf['accessors']):
    print(f'  [{i}]: type={acc["type"]}, compType={acc["componentType"]}, count={acc["count"]}')

print('BufferViews:')
for i, bv in enumerate(gltf['bufferViews']):
    print(f'  [{i}]: byteOffset={bv.get("byteOffset", 0)}, byteLength={bv["byteLength"]}')
