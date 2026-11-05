from PIL import Image
import numpy as np

im = Image.open('C:/Users/campw/.gemini/antigravity/brain/09f35dfa-28fb-4f7b-8af9-7e610df383e3/.user_uploaded/media_1793868849714_becccbc6.png').convert('RGB')
arr = np.array(im)
w, h = im.size

# Frame pixel mask: not white background
# A pixel is background if r > 215 and g > 215 and b > 215 (or r > 170 and chroma < 25)
r, g, b = arr[:, :, 0].astype(int), arr[:, :, 1].astype(int), arr[:, :, 2].astype(int)
chroma = np.maximum(np.maximum(r, g), b) - np.minimum(np.minimum(r, g), b)
min_c = np.minimum(np.minimum(r, g), b)

is_bg = (min_c > 200) | ((min_c > 160) & (chroma < 30))

# Let's find the bounding box of non-bg
ys, xs = np.where(~is_bg)
print(f"Non-bg Y range: [{ys.min()}, {ys.max()}] (height = {ys.max() - ys.min() + 1})")
print(f"Non-bg X range: [{xs.min()}, {xs.max()}] (width = {xs.max() - xs.min() + 1})")
