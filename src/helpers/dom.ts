export function smoothScroll(distance: number, duration: number) {
  const delta = (distance / duration) * 10;
  let startTime: number | null = null;

  function animate(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;

    // Scroll page
    window.scrollBy(0, delta);

    if (timeElapsed < duration) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
