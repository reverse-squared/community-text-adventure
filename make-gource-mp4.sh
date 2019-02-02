# Linux Only :smiley:
# Im sure something very similar would work on windows you'd just
# have to install something or encode the video differetly

# You also have to install libav
#   git clone git://git.libav.org/libav.git
#   cd libav 
#   ./configure --disable-yasm
#   make
#   sudo make install 

gource \
  -s .06 \
  -1920x1080 \
  --auto-skip-seconds .5 \
  --seconds-per-day 2 \
  --multi-sampling \
  --stop-at-end \
  --user-image-dir res/avatars \
  --highlight-users \
  --hide mouse,progress \
  --output-ppm-stream - \
  --output-framerate 60 \
  | avconv -y -r 30 -f image2pipe -vcodec ppm -i - -b 65536K gource.mp4