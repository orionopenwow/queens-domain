import imageio
from PIL import Image

video_path = r'C:/Users/campw/.gemini/antigravity/brain/09f35dfa-28fb-4f7b-8af9-7e610df383e3/.user_uploaded/media_1793870617563_ef77f249.mp4'

reader = imageio.get_reader(video_path, 'ffmpeg')
frames = []

# Target height = 180px, width = 192px (centered / padded or clean fit)
target_h = 180
# Crop: X=[608, 1346], Y=[181, 873]
# Let's square it or crop closely
cx = (608 + 1346) // 2
cy = (181 + 873) // 2
half_size = max(739, 693) // 2 + 10 # ~380
x0 = max(0, cx - half_size)
x1 = min(1920, cx + half_size)
y0 = max(0, cy - half_size)
y1 = min(1080, cy + half_size)

# Sample every 3rd or 4th frame for smooth ~15-20 fps GIF
for i, frame in enumerate(reader):
    if i % 3 == 0:
        im = Image.fromarray(frame).crop((x0, y0, x1, y1))
        im_resized = im.resize((190, 190), Image.Resampling.LANCZOS)
        frames.append(im_resized)

reader.close()
print(f"Total GIF frames: {len(frames)}")

# Save animated GIF
out_gif = 'C:/Users/campw/Desktop/QueensDomain/app/pixel_art.gif'
frames[0].save(
    out_gif,
    save_all=True,
    append_images=frames[1:],
    duration=50, # 50ms per frame = 20 fps
    loop=0,
    optimize=True
)
print("Saved pixel_art.gif successfully!")
