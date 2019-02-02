gource --seconds-per-day 2 --user-image-dir res/avatars --auto-skip-seconds 0.5 --hide mouse,progress -f -o gource.ppm
ffmpeg -y -r 60 -f image2pipe -vcodec ppm -i gource.ppm -vcodec libx264 -preset medium -pix_fmt yuv420p -crf 1 -threads 0 -bf 0 gource.mp4
del gource.ppm
