from PIL import Image
import numpy as np

im = Image.open('C:/Users/campw/Desktop/QueensDomain/app/vine_frame_clean.png')
arr = np.array(im)
w, h = im.size

# Check the center region: from y=30 to 138, x=25 to 150
center = arr[30:139, 25:151]
print("Non-zero alpha pixels in center hole:", np.sum(center[:, :, 3] > 0))

# Check top slice: y=0 to 30, x=25 to 151
top_strip = arr[0:30, 25:151]
# Is any pixel white or washed out?
r, g, b, a = top_strip[:, :, 0], top_strip[:, :, 1], top_strip[:, :, 2], top_strip[:, :, 3]
active = a > 0
print("Top strip active pixels:", np.sum(active))
bright_active = active & (r > 180) & (g > 180) & (b > 180)
print("Top strip white/bright active pixels:", np.sum(bright_active))

# What is the minimum and maximum y of pixels in the top strip?
ys, xs = np.where(active)
print(f"Top strip Y range: [{ys.min()}, {ys.max()}]")
