from PIL import Image
import numpy as np
from collections import deque

im = Image.open('C:/Users/campw/.gemini/antigravity/brain/09f35dfa-28fb-4f7b-8af9-7e610df383e3/.user_uploaded/media_1793868849714_becccbc6.png').convert('RGB')
arr = np.array(im)
w, h = im.size

r, g, b = arr[:, :, 0].astype(int), arr[:, :, 1].astype(int), arr[:, :, 2].astype(int)
chroma = np.maximum(np.maximum(r, g), b) - np.minimum(np.minimum(r, g), b)
min_c = np.minimum(np.minimum(r, g), b)

# True background is bright and low chroma
is_bg = (min_c > 200) | ((min_c > 165) & (chroma < 30))

# Flood fill outer from (0,0)
outer_bg = np.zeros((h, w), dtype=bool)
q = deque([(0, 0), (w-1, 0), (0, h-1), (w-1, h-1)])
for x, y in q:
    outer_bg[y, x] = True

while q:
    x, y = q.popleft()
    for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
        nx, ny = x + dx, y + dy
        if 0 <= nx < w and 0 <= ny < h and not outer_bg[ny, nx] and is_bg[ny, nx]:
            outer_bg[ny, nx] = True
            q.append((nx, ny))

# Flood fill inner hole from center (95, 89)
inner_bg = np.zeros((h, w), dtype=bool)
q = deque([(95, 89)])
inner_bg[89, 95] = True
while q:
    x, y = q.popleft()
    for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
        nx, ny = x + dx, y + dy
        if 0 <= nx < w and 0 <= ny < h and not inner_bg[ny, nx] and is_bg[ny, nx]:
            inner_bg[ny, nx] = True
            q.append((nx, ny))

# The frame itself is where not outer_bg and not inner_bg
frame_mask = (~outer_bg) & (~inner_bg)

# Let's see the inner hole bounds:
hole_ys, hole_xs = np.where(inner_bg)
print(f"Hole Y range: [{hole_ys.min()}, {hole_ys.max()}] (height = {hole_ys.max() - hole_ys.min() + 1})")
print(f"Hole X range: [{hole_xs.min()}, {hole_xs.max()}] (width = {hole_xs.max() - hole_xs.min() + 1})")

# Bounding box of the frame:
frame_ys, frame_xs = np.where(frame_mask)
print(f"Frame bbox: Y=[{frame_ys.min()}, {frame_ys.max()}], X=[{frame_xs.min()}, {frame_xs.max()}]")
print(f"Top border thickness (from frame top to hole top): {hole_ys.min() - frame_ys.min()}")
print(f"Bottom border thickness: {frame_ys.max() - hole_ys.max()}")
print(f"Left border thickness: {hole_xs.min() - frame_xs.min()}")
print(f"Right border thickness: {frame_xs.max() - hole_xs.max()}")
