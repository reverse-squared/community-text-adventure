# Linux Only :smiley:
# Im sure something very similar would work on windows you'd just
# have to install something or encode the video differetly
gource \
  -s .06 \
  -1280x720 \
  --auto-skip-seconds .5 \
  --seconds-per-day 2 \
  --multi-sampling \
  --stop-at-end \
  --user-image-dir res/avatars \
  --highlight-users \
  --hide mouse,progress \
  --output-ppm-stream - \
  --output-framerate 30 \
  | avconv -y -r 30 -f image2pipe -vcodec ppm -i - -b 65536K gource.mp4