from PIL import Image
import numpy as np

im = Image.open('C:/Users/campw/Desktop/QueensDomain/app/vine_frame.png')
w, h = im.size
print(f"Image size: {w}x{h}")

arr = np.array(im)

# Let's inspect the top strip from y=0 to y=50, x=36 to x=w-36
top_slice = arr[0:40, 36:w-36]
print(f"Top slice shape: {top_slice.shape}")

# Find any near-white pixels: r > 200, g > 200, b > 200 and alpha > 0
near_white = (top_slice[:, :, 0] > 180) & (top_slice[:, :, 1] > 180) & (top_slice[:, :, 2] > 180) & (top_slice[:, :, 3] > 0)
print(f"Near white pixels count in top slice: {np.sum(near_white)}")

# Find any semi-transparent or transparent pixels with color
# Also let's inspect what is in top_slice from y=25 to 40
for y in range(25, 40):
    row_alpha = top_slice[y, :, 3]
    active = np.sum(row_alpha > 0)
    print(f"y={y}: active pixels={active}")

# Let's print out what colors exist at y=30 to 39 where active > 0
for y in range(30, 40):
    for x in range(top_slice.shape[1]):
        if top_slice[y, x, 3] > 0:
            print(f"  y={y}, x={x+36}: RGBA={top_slice[y, x]}")
