import imageio.v3 as iio
from PIL import Image

video_path = r'C:/Users/campw/.gemini/antigravity/brain/09f35dfa-28fb-4f7b-8af9-7e610df383e3/.user_uploaded/media_1793870617563_ef77f249.mp4'

frames = []
for i, frame in enumerate(iio.imiter(video_path, plugin="ffmpeg")):
    frames.append(frame)
    if i == 0:
        print("Frame 0 shape:", frame.shape)
        img = Image.fromarray(frame)
        img.save("C:/Users/campw/Desktop/QueensDomain/scripts/video_frame_0.png")

print(f"Total frames: {len(frames)}")
