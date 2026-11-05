from PIL import Image
import numpy as np

im = Image.open("C:/Users/campw/Desktop/QueensDomain/scripts/video_frame_0.png")
w, h = im.size
print(f"Size: {w}x{h}")

# Let's save a thumbnail and find non-black/active regions
arr = np.array(im)
# Find bounding box of active content (not pure black or dark background)
# Let's check brightness
brightness = arr.mean(axis=2)
active = brightness > 15
ys, xs = np.where(active)
if len(ys) > 0:
    print(f"Active Y range: [{ys.min()}, {ys.max()}], X range: [{xs.min()}, {xs.max()}]")
    crop = im.crop((xs.min(), ys.min(), xs.max(), ys.max()))
    crop.save("C:/Users/campw/Desktop/QueensDomain/scripts/video_active_crop.png")
    print("Saved active crop: size", crop.size)
else:
    print("No active region found above threshold 15")
