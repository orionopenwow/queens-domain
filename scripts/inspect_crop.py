from PIL import Image

im = Image.open("C:/Users/campw/Desktop/QueensDomain/scripts/video_active_crop.png")
print("Crop size:", im.size)
# Let's inspect the middle section and colors
im_small = im.resize((185, 173), Image.Resampling.LANCZOS)
im_small.save("C:/Users/campw/Desktop/QueensDomain/scripts/video_crop_small.png")
