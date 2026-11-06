# Niche image library

Drop photographs here. When a niche is checked in the website editor, the site uses these files instead of the built-in fallback photos.

One folder per niche. Inside each niche, five slots:

| Folder | Used for |
|---|---|
| `heroes/` | Home and page heroes |
| `gallery/` | Project grids |
| `services/` | Service cards |
| `about/` | About and studio images |
| `people/` | Portraits |

Accepted files: `.webp`, `.jpg`, `.jpeg`, `.png`, `.avif`. Names are sorted alphabetically, so `01-hero.webp` comes before `02-hero.webp`.

If a slot is empty, the site keeps a built-in photo for that niche so previews still render. Your files replace that slot as soon as they are saved here.

Combination niches mix the folders of every niche that is checked, in catalog order.

```
public/images/niches/
  interior-design/
  architecture/
  landscape/
  general-construction/
  home-builders/
  remodeling/
  trades/
  engineering/
  supplies/
  real-estate/
```
