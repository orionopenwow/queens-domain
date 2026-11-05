from PIL import Image
import numpy as np

im = Image.open('C:/Users/campw/Desktop/QueensDomain/app/vine_frame_clean.png')
w, h = im.size
print(f"Clean frame size: {w}x{h}")

# Slice: top=30, right=26, bottom=26, left=25
# Let's inspect the 4 borders:
top = im.crop((25, 0, w - 26, 30))
bottom = im.crop((25, h - 26, w - 26, h))
left = im.crop((0, 30, 25, h - 26))
right = im.crop((w - 26, 30, w, h - 26))

print("Top edge:", top.size)
print("Bottom edge:", bottom.size)
print("Left edge:", left.size)
print("Right edge:", right.size)

# Corners:
tl = im.crop((0, 0, 25, 30))
tr = im.crop((w - 26, 0, w, 30))
bl = im.crop((0, h - 26, 25, h))
br = im.crop((w - 26, h - 26, w, h))

print("Corners:", tl.size, tr.size, bl.size, br.size)
