from PIL import Image
import numpy as np

im = Image.open('C:/Users/campw/.gemini/antigravity/brain/09f35dfa-28fb-4f7b-8af9-7e610df383e3/.user_uploaded/media_1793871562178_524e6790.png').convert('RGB')
arr = np.array(im, dtype=np.float32)
h, w = arr.shape[:2]

# Sample background color from edges
bg_samples = np.concatenate([
    arr[:5, :].reshape(-1, 3),
    arr[-5:, :].reshape(-1, 3),
    arr[:, :5].reshape(-1, 3),
    arr[:, -5:].reshape(-1, 3)
], axis=0)
bg_color = np.median(bg_samples, axis=0)
print("Median background color:", bg_color)

# Difference from background
diff = np.linalg.norm(arr - bg_color, axis=2)
# Max channel above background
excess = np.maximum(0, arr - bg_color)
max_excess = np.max(excess, axis=2)

# Alpha calculation:
# Below 12 diff -> 0
# 12 to 50 -> linear ramp
# > 50 -> 255
alpha = np.clip((diff - 12.0) / (45.0 - 12.0), 0.0, 1.0) * 255.0

# Also where text is bright, full opacity
brightness = np.max(arr, axis=2)
alpha = np.maximum(alpha, np.clip((brightness - 35.0) / 25.0, 0.0, 1.0) * 255.0)

# Un-premultiply text colors slightly so dark bg doesn't fringe
out = np.zeros((h, w, 4), dtype=np.uint8)
out[:, :, :3] = np.clip(arr, 0, 255).astype(np.uint8)
out[:, :, 3] = alpha.astype(np.uint8)

# Save result
img_out = Image.fromarray(out, 'RGBA')
img_out.save('C:/Users/campw/Desktop/QueensDomain/app/tome_header_text.png')
print("Saved tome_header_text.png successfully!")

# Let's test previewing it on top of gunmetal slate header color [20, 26, 36]
preview = Image.new('RGB', (w + 20, h + 20), (20, 26, 36))
preview.paste(img_out, (10, 10), img_out)
preview.save('C:/Users/campw/Desktop/QueensDomain/scripts/tome_text_preview.png')
print("Saved preview on slate background")
