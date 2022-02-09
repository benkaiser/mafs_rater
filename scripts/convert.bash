for f in `ls ./assets/individuals/*.png`;
  do
  echo $f;
  BASE="$(basename $f .png)"
  magick convert "$f" -gravity Center -extent 600x720 "./public/images/individual/$BASE.jpg"
done
for f in `ls ./assets/individuals/*.jpeg`;
  do
  echo $f;
  BASE="$(basename $f .jpeg)"
  magick convert "$f" -gravity Center -extent 600x720 "./public/images/individual/$BASE.jpg"
done