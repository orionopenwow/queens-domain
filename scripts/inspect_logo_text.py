from PIL import Image
import numpy as np

im = Image.open('C:/Users/campw/.gemini/antigravity/brain/09f35dfa-28fb-4f7b-8af9-7e610df383e3/.user_uploaded/media_1793871562178_524e6790.png').convert('RGBA')
arr = np.array(im)
w, h = im.size

# Background is around [26, 16, 18]
# Letters have high brightness (> 60 or high chroma or text edges)
# Let's inspect brightness across the image
r, g, b = arr[:, :, 0].astype(float), arr[:, :, 1].astype(float), arr[:, :, 2].astype(float)
brightness = np.maximum(np.maximum(r, g), b)

print("Min brightness:", brightness.min(), "Max brightness:", brightness.max())
print("Histogram of brightness:")
for threshold in [30, 40, 50, 60, 80, 100, 150, 200]:
    print(f"  > {threshold}: {np.sum(brightness > threshold)} pixels")
