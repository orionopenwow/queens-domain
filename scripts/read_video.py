import imageio
from PIL import Image

video_path = r'C:/Users/campw/.gemini/antigravity/brain/09f35dfa-28fb-4f7b-8af9-7e610df383e3/.user_uploaded/media_1793870617563_ef77f249.mp4'

reader = imageio.get_reader(video_path, 'ffmpeg')
fps = reader.get_meta_data().get('fps', 10)
duration = reader.get_meta_data().get('duration', 0)
print(f"FPS: {fps}, Duration: {duration}s")

frames = []
for i, frame in enumerate(reader):
    frames.append(frame)
    if i == 0:
        print("Frame shape:", frame.shape)
        Image.fromarray(frame).save("C:/Users/campw/Desktop/QueensDomain/scripts/video_frame_0.png")

print(f"Total frames read: {len(frames)}")
reader.close()
