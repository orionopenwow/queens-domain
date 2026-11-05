from PIL import Image
import numpy as np

im = Image.open('C:/Users/campw/.gemini/antigravity/brain/09f35dfa-28fb-4f7b-8af9-7e610df383e3/.user_uploaded/media_1793868849714_becccbc6.png')
print("Original size:", im.size)
arr = np.array(im)
print("Unique alpha values:", np.unique(arr[:, :, 3]))
