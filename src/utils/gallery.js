export function galleryPhotos(manifest, activityId) {
  const photos = manifest?.activities?.[activityId];
  if (!Array.isArray(photos)) return [];
  return photos.filter(photo => photo && typeof photo.src === 'string' && /^activities\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)$/i.test(photo.src)).slice(0, 6).map(photo => ({src:photo.src,caption:typeof photo.caption === 'string' ? photo.caption.slice(0,180) : ''}));
}
