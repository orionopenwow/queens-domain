import imageio
from PIL import Image
import numpy as np

video_path = r'C:/Users/campw/.gemini/antigravity/brain/09f35dfa-28fb-4f7b-8af9-7e610df383e3/.user_uploaded/media_1793870617563_ef77f249.mp4'

reader = imageio.get_reader(video_path, 'ffmpeg')
# Let's find global bounding box across all frames
min_x, max_x = 1920, 0
min_y, max_y = 1080, 0

frames_sampled = []
for i, frame in enumerate(reader):
    if i % 6 == 0: # sample 50 frames
        frames_sampled.append(frame)
        active = frame.mean(axis=2) > 20
        ys, xs = np.where(active)
        if len(ys) > 0:
            min_x = min(min_x, xs.min())
            max_x = max(max_x, xs.max())
            min_y = min(min_y, ys.min())
            max_y = max(max_y, ys.max())

print(f"Global active bbox: X=[{min_x}, {max_x}] (W={max_x - min_x + 1}), Y=[{min_y}, {max_y}] (H={max_y - min_y + 1})")
reader.close()
