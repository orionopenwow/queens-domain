from PIL import Image
import numpy as np

# Load clean frame
frame = Image.open('C:/Users/campw/Desktop/QueensDomain/app/vine_frame_clean.png')
fw, fh = frame.size

# Let's render a 400x300 card with dark gunmetal background and this border!
# Border width: 12px
bw = 12
card_w, card_h = 400, 300
card = Image.new('RGBA', (card_w, card_h), (20, 26, 36, 255))

# Slices:
# tl: (0, 0, 25, 30) -> render at (0, 0, bw, bw)
tl = frame.crop((0, 0, 25, 30)).resize((bw, bw), Image.Resampling.NEAREST)
tr = frame.crop((fw - 26, 0, fw, 30)).resize((bw, bw), Image.Resampling.NEAREST)
bl = frame.crop((0, fh - 26, 25, fh)).resize((bw, bw), Image.Resampling.NEAREST)
br = frame.crop((fw - 26, fh - 26, fw, fh)).resize((bw, bw), Image.Resampling.NEAREST)

card.paste(tl, (0, 0), tl)
card.paste(tr, (card_w - bw, 0), tr)
card.paste(bl, (0, card_h - bw), bl)
card.paste(br, (card_w - bw, card_h - bw), br)

# Top edge:
top = frame.crop((25, 0, fw - 26, 30)).resize((card_w - 2 * bw, bw), Image.Resampling.NEAREST)
bottom = frame.crop((25, fh - 26, fw - 26, fh)).resize((card_w - 2 * bw, bw), Image.Resampling.NEAREST)
left = frame.crop((0, 30, 25, fh - 26)).resize((bw, card_h - 2 * bw), Image.Resampling.NEAREST)
right = frame.crop((fw - 26, 30, fw, fh - 26)).resize((bw, card_h - 2 * bw), Image.Resampling.NEAREST)

card.paste(top, (bw, 0), top)
card.paste(bottom, (bw, card_h - bw), bottom)
card.paste(left, (0, bw), left)
card.paste(right, (card_w - bw, bw), right)

card.save('C:/Users/campw/Desktop/QueensDomain/scripts/preview_card.png')
print("Rendered preview card successfully!")
