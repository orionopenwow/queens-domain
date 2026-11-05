import struct, json
import numpy as np

with open('C:/Users/campw/Desktop/QueensDomain/app/meshy_model.glb', 'rb') as f:
    f.seek(12)
    j_len, _ = struct.unpack('<II', f.read(8))
    gltf = json.loads(f.read(j_len).decode('utf-8'))
    b_len, _ = struct.unpack('<II', f.read(8))
    bin_data = f.read(b_len)

# Decode positions
pos_acc = gltf['accessors'][0]
pos_bv = gltf['bufferViews'][pos_acc['bufferView']]
pos_offset = pos_bv.get('byteOffset', 0)
v_count = pos_acc['count']
raw_pos = np.frombuffer(bin_data[pos_offset:pos_offset+v_count*6], dtype=np.uint16).reshape(-1, 3).astype(np.float32)

node = gltf['nodes'][0]
scale = np.array(node['scale'])
trans = np.array(node['translation'])
actual_pos = raw_pos * scale + trans
center = (actual_pos.min(axis=0) + actual_pos.max(axis=0)) / 2
actual_pos -= center

# Decode normals (accessor 1: byte 5120 signed byte 8-bit normalized or similar)
norm_acc = gltf['accessors'][1]
norm_bv = gltf['bufferViews'][norm_acc['bufferView']]
norm_offset = norm_bv.get('byteOffset', 0)
# Normals in gltfpack with KHR_mesh_quantization: signed byte 5120
raw_norm = np.frombuffer(bin_data[norm_offset:norm_offset+v_count*3], dtype=np.int8).reshape(-1, 3).astype(np.float32) / 127.0

# Decode indices (accessor 3: compType 5123 unsigned short)
idx_acc = gltf['accessors'][3]
idx_bv = gltf['bufferViews'][idx_acc['bufferView']]
idx_offset = idx_bv.get('byteOffset', 0)
i_count = idx_acc['count']
indices = np.frombuffer(bin_data[idx_offset:idx_offset+i_count*2], dtype=np.uint16)

print(f"Decoded: {v_count} vertices, {len(indices)//3} triangles")
# Let's save a clean binary and a JSON
# In binary: Float32 positions (v_count*3*4), Float32 normals (v_count*3*4), Uint16 indices (i_count*2)
with open('C:/Users/campw/Desktop/QueensDomain/app/meshy_model.bin', 'wb') as out_bin:
    out_bin.write(actual_pos.astype(np.float32).tobytes())
    out_bin.write(raw_norm.astype(np.float32).tobytes())
    out_bin.write(indices.astype(np.uint16).tobytes())

print(f"Saved meshy_model.bin: {v_count*12 + v_count*12 + i_count*2} bytes")
