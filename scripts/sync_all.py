import shutil, os

# 1. Sync app/index.html to root index.html
shutil.copy2('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'C:/Users/campw/Desktop/QueensDomain/index.html')
print("Synced root index.html")

# 2. Sync to dirkei-and-marloo
shutil.copy2('C:/Users/campw/Desktop/QueensDomain/app/index.html', 'C:/Users/campw/Desktop/dirkei-and-marloo/Marloo/app/index.html')
shutil.copy2('C:/Users/campw/Desktop/QueensDomain/index.html', 'C:/Users/campw/Desktop/dirkei-and-marloo/Marloo/index.html')
shutil.copy2('C:/Users/campw/Desktop/QueensDomain/app/vine_frame.png', 'C:/Users/campw/Desktop/dirkei-and-marloo/Marloo/app/vine_frame.png')
shutil.copy2('C:/Users/campw/Desktop/QueensDomain/app/vine_frame.png', 'C:/Users/campw/Desktop/dirkei-and-marloo/Marloo/vine_frame.png')
print("Synced to dirkei-and-marloo")

# 3. Sync to ai-game-studio-main
target_studio = 'C:/Users/campw/Desktop/ai-game-studio-main/ai-game-studio-main'
if os.path.exists(target_studio):
    shutil.copy2('C:/Users/campw/Desktop/QueensDomain/app/index.html', os.path.join(target_studio, 'app', 'index.html'))
    shutil.copy2('C:/Users/campw/Desktop/QueensDomain/index.html', os.path.join(target_studio, 'index.html'))
    shutil.copy2('C:/Users/campw/Desktop/QueensDomain/app/vine_frame.png', os.path.join(target_studio, 'app', 'vine_frame.png'))
    print("Synced to ai-game-studio-main/ai-game-studio-main")
