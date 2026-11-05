import re

file_path = 'C:/Users/campw/Desktop/QueensDomain/app/index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'<div style="display:inline-flex;align-items:center;gap:6px;padding:3\.5px 14px;background:rgba\(251,191,36,0\.08\)[^>]*>[\s\S]*?START TYPING A GAME IDEA[\s\S]*?<\/div>\s*'

m = re.search(pattern, text)
if m:
    text = text[:m.start()] + text[m.end():]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(text)
    print("Successfully removed gold pill banner!")
else:
    print("Banner not found!")
