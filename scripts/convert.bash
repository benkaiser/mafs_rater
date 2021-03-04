for f in `ls ./assets/`;
  do
  echo $f;
  BASE="$(basename $f .jfif)"
  magick convert "./assets/$f" -gravity Center -extent 600x720 "./public/images/individual/$BASE.jpg"
done