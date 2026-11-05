from PIL import Image
import numpy as np

# Load clean cropped
im = Image.open('C:/Users/campw/Desktop/QueensDomain/app/vine_frame_clean.png')
arr = np.array(im)
h, w = arr.shape[:2] # 165, 177

# Current thicknesses: Top=30, Right=26, Bottom=26, Left=25
# Hole: Y=[30, 138], X=[25, 150] -> height = 109, width = 126
# If we keep:
# border-image-slice: 30 26 26 25
print(f"Size: {w}x{h}")
