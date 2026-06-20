#!/bin/bash
# Convert all JPEG images to WebP with clean filenames
# Keeps originals intact, creates WebP versions alongside

BASE="public/images/all"

convert_folder() {
  local folder="$1"
  local prefix="$2"
  local quality="$3"
  local counter=1

  echo "=== Processing $folder ==="

  # Sort files for consistent numbering
  while IFS= read -r -d '' file; do
    local ext="${file##*.}"
    local ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')

    if [[ "$ext_lower" == "jpeg" || "$ext_lower" == "jpg" ]]; then
      local padded=$(printf "%02d" $counter)
      local outfile="$BASE/$folder/${prefix}-${padded}.webp"
      echo "  Converting: $(basename "$file") → ${prefix}-${padded}.webp"
      cwebp -q "$quality" "$file" -o "$outfile" 2>/dev/null
      counter=$((counter + 1))
    fi
  done < <(find "$BASE/$folder" -maxdepth 1 -type f \( -iname "*.jpeg" -o -iname "*.jpg" \) -print0 | sort -z)

  echo "  Converted $((counter - 1)) images in $folder"
  echo ""
}

# Convert each folder with appropriate prefix and quality
convert_folder "exterior-elevations" "elevation" 80
convert_folder "premium-villas" "villa" 80
convert_folder "interior-promos" "promo" 90
convert_folder "brand-assets" "brand" 90

# Rename videos in brand-assets
echo "=== Renaming videos ==="
VIDEO_DIR="$BASE/brand-assets"
video_counter=1
while IFS= read -r -d '' file; do
  padded=$(printf "%02d" $video_counter)
  newname="$VIDEO_DIR/walkthrough-${padded}.mp4"
  echo "  Renaming: $(basename "$file") → walkthrough-${padded}.mp4"
  mv "$file" "$newname"
  video_counter=$((video_counter + 1))
done < <(find "$VIDEO_DIR" -maxdepth 1 -type f -iname "*.mp4" -print0 | sort -z)

echo ""
echo "=== All done! ==="
echo "Listing WebP files created:"
find "$BASE" -name "*.webp" | sort
