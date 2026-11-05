from PIL import Image
import numpy as np

im = Image.open('C:/Users/campw/Desktop/QueensDomain/scripts/preview_card.png')
arr = np.array(im)

# Check the border area (top 15 rows)
top_area = arr[0:15, :]
# Find any white/near-white pixel: r>200 and g>200 and b>200
near_white = (top_area[:, :, 0] > 180) & (top_area[:, :, 1] > 180) & (top_area[:, :, 2] > 180)
print("Near white pixels in top 15 rows:", np.sum(near_white))

# Check inside the card (rows 12 to 25): are there any strange pixels?
inner_top = arr[12:25, 12:-12]
# They should all be exactly the background color (20, 26, 36)
bg = np.array([20, 26, 36, 255])
diff = np.abs(inner_top.astype(int) - bg)
print("Max diff from background inside card:", diff.max())
