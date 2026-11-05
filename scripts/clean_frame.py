from PIL import Image
import numpy as np
from collections import deque

# Load original user image
im_orig = Image.open('C:/Users/campw/.gemini/antigravity/brain/09f35dfa-28fb-4f7b-8af9-7e610df383e3/.user_uploaded/media_1793868849714_becccbc6.png').convert('RGB')
w, h = im_orig.size
arr = np.array(im_orig)

r = arr[:, :, 0].astype(np.float32)
g = arr[:, :, 1].astype(np.float32)
b = arr[:, :, 2].astype(np.float32)

chroma = np.maximum(np.maximum(r, g), b) - np.minimum(np.minimum(r, g), b)
min_c = np.minimum(np.minimum(r, g), b)
brightness = (r + g + b) / 3.0

# In the original image:
# White background is high brightness and low chroma
# Let's mark background seeds:
# Any pixel with brightness > 220 and chroma < 30 is definitely white background
is_definitely_bg = (brightness > 220) & (chroma < 35)

# Outer background flood fill from 4 corners
outer_bg = np.zeros((h, w), dtype=bool)
q = deque([(0, 0), (w-1, 0), (0, h-1), (w-1, h-1)])
for x, y in q:
    outer_bg[y, x] = True

while q:
    x, y = q.popleft()
    for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
        nx, ny = x + dx, y + dy
        if 0 <= nx < w and 0 <= ny < h and not outer_bg[ny, nx]:
            # It's background if brightness > 165 and chroma < 30, or brightness > 195
            p_bright = brightness[ny, nx]
            p_chroma = chroma[ny, nx]
            if (p_bright > 165 and p_chroma < 35) or (p_bright > 200):
                outer_bg[ny, nx] = True
                q.append((nx, ny))

# Inner background flood fill from center
inner_bg = np.zeros((h, w), dtype=bool)
cx, cy = 95, 89
inner_bg[cy, cx] = True
q = deque([(cx, cy)])

while q:
    x, y = q.popleft()
    for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
        nx, ny = x + dx, y + dy
        if 0 <= nx < w and 0 <= ny < h and not inner_bg[ny, nx]:
            p_bright = brightness[ny, nx]
            p_chroma = chroma[ny, nx]
            if (p_bright > 165 and p_chroma < 35) or (p_bright > 200):
                inner_bg[ny, nx] = True
                q.append((nx, ny))

# Let's inspect the frame
rgba = np.zeros((h, w, 4), dtype=np.uint8)
rgba[:, :, :3] = arr

# Set alpha to 255 for frame, 0 for outer and inner bg
frame_pixels = (~outer_bg) & (~inner_bg)
rgba[frame_pixels, 3] = 255
rgba[~frame_pixels, 3] = 0

# Now, also decontaminate the edge pixels:
# If a frame pixel has high brightness (> 170) and low chroma (< 30), or is near the hole/outer and looks whitish, it's fringe!
# Let's find any remaining whitish fringe pixels in the frame
fringe = frame_pixels & (brightness > 160) & (chroma < 25)
rgba[fringe, 3] = 0
frame_pixels = frame_pixels & (~fringe)

# For any frame pixel adjacent to alpha=0 that has whitish color (brightness > 140, chroma < 25), clear it
for _ in range(2):
    # dilate background by 1 pixel if the neighbor is light/washed out
    alpha_0 = rgba[:, :, 3] == 0
    for y in range(1, h-1):
        for x in range(1, w-1):
            if rgba[y, x, 3] > 0:
                if alpha_0[y-1, x] or alpha_0[y+1, x] or alpha_0[y, x-1] or alpha_0[y, x+1]:
                    if brightness[y, x] > 140 and chroma[y, x] < 35:
                        rgba[y, x, 3] = 0

# Crop to non-zero alpha bounding box
active_ys, active_xs = np.where(rgba[:, :, 3] > 0)
y_min, y_max = active_ys.min(), active_ys.max()
x_min, x_max = active_xs.min(), active_xs.max()

cropped = rgba[y_min:y_max+1, x_min:x_max+1]
crop_h, crop_w = cropped.shape[:2]
print(f"Cropped frame size: {crop_w}x{crop_h}")

# Check hole in cropped frame:
cropped_alpha = cropped[:, :, 3]
# In the center region, is everything 0?
# Find hole boundaries in cropped
cropped_inner_bg = inner_bg[y_min:y_max+1, x_min:x_max+1]
hole_ys, hole_xs = np.where(cropped_inner_bg)
print(f"Hole in cropped: Y=[{hole_ys.min()}, {hole_ys.max()}], X=[{hole_xs.min()}, {hole_xs.max()}]")

# Let's verify top, bottom, left, right border thicknesses in the cropped frame:
top_thick = hole_ys.min()
bottom_thick = crop_h - 1 - hole_ys.max()
left_thick = hole_xs.min()
right_thick = crop_w - 1 - hole_xs.max()
print(f"Border thicknesses: Top={top_thick}, Right={right_thick}, Bottom={bottom_thick}, Left={left_thick}")

# Ensure the entire hole region is strictly 0 alpha
cropped[hole_ys.min():hole_ys.max()+1, hole_xs.min():hole_xs.max()+1, 3] = 0

img = Image.fromarray(cropped, 'RGBA')
img.save('C:/Users/campw/Desktop/QueensDomain/app/vine_frame_clean.png')
print("Saved vine_frame_clean.png successfully")
