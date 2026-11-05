from PIL import Image

im = Image.open('C:/Users/campw/Desktop/QueensDomain/app/tome_header_text.png')
bbox = im.getbbox()
print("BBox:", bbox)
cropped = im.crop((bbox[0] - 2, bbox[1] - 2, bbox[2] + 2, bbox[3] + 2))
cropped.save('C:/Users/campw/Desktop/QueensDomain/app/tome_header_text.png')
print("Cropped size:", cropped.size)
