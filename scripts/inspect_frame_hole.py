from PIL import Image
import numpy as np

im = Image.open('C:/Users/campw/.gemini/antigravity/brain/09f35dfa-28fb-4f7b-8af9-7e610df383e3/.user_uploaded/media_1793868849714_becccbc6.png').convert('RGB')
w, h = im.size
arr = np.array(im)

# Let's find what is NOT white background:
# Any pixel with min(r, g, b) < 220 or sat > 20
r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
is_bg = (r > 230) & (g > 230) & (b > 230)
# Also check if it is part of the white central hole or outer white border
print("Total pixels:", w*h, "Non-bg pixels:", np.sum(~is_bg))

# Let's inspect rows and columns to find the inner hole boundary and outer frame boundary
# Center of the frame:
cx, cy = w // 2, h // 2
print(f"Center ({cx}, {cy}) color: {arr[cy, cx]}")

# Find hole bounds from center
hole_x_min, hole_x_max = cx, cx
while hole_x_min > 0 and is_bg[cy, hole_x_min]:
    hole_x_min -= 1
while hole_x_max < w - 1 and is_bg[cy, hole_x_max]:
    hole_x_max += 1

hole_y_min, hole_y_max = cy, cy
while hole_y_min > 0 and is_bg[hole_y_min, cx]:
    hole_y_min -= 1
while hole_y_max < h - 1 and is_bg[hole_y_max, cx]:
    hole_y_max += 1

print(f"Inner hole approx bounds: X=[{hole_x_min}, {hole_x_max}], Y=[{hole_y_min}, {hole_y_max}]")
