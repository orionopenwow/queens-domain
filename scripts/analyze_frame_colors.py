from PIL import Image
import numpy as np

im = Image.open('C:/Users/campw/.gemini/antigravity/brain/09f35dfa-28fb-4f7b-8af9-7e610df383e3/.user_uploaded/media_1793868849714_becccbc6.png').convert('RGBA')
arr = np.array(im)
w, h = im.size

print(f"Dimensions: {w}x{h}")

# Let's inspect the color distribution:
# Vines are green: g > r and g > b
# Wood is brown: r > b and g > b, r > 40
# Flowers are blue: b > r and b > g
# White background: r, g, b all high and close to each other (low saturation)
# Let's compute saturation and brightness
rgb = arr[:, :, :3].astype(np.float32)
r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
max_c = np.maximum(np.maximum(r, g), b)
min_c = np.minimum(np.minimum(r, g), b)
chroma = max_c - min_c

# White/near-white/gray background is characterized by high brightness and low chroma:
# Or brightness > 160 with chroma < 25 (grayish white)
# Or brightness > 210 with chroma < 40
# Let's see what pixels exist:
print("Bright low chroma pixels (>170, chroma < 30):", np.sum((min_c > 170) & (chroma < 30)))
print("Bright (>190):", np.sum(min_c > 190))
print("Pure white (>245):", np.sum(min_c > 245))
