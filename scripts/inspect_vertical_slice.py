from PIL import Image
import numpy as np

im = Image.open('C:/Users/campw/.gemini/antigravity/brain/09f35dfa-28fb-4f7b-8af9-7e610df383e3/.user_uploaded/media_1793868849714_becccbc6.png').convert('RGB')
arr = np.array(im)
w, h = im.size

# Let's inspect a horizontal slice through the frame to see the outline colors:
# E.g. at x = 95, from y = 0 to 50
print("Vertical slice at x=95 (middle of top border):")
for y in range(0, 50):
    p = arr[y, 95]
    print(f"y={y:2d}: RGB=({p[0]:3d}, {p[1]:3d}, {p[2]:3d})")
