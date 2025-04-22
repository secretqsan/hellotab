export default function (dataUrl) {
  if (!dataUrl || dataUrl == '') {
    return '';
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');

      let width = img.width;
      let height = img.height;
      const maxSize = 720;

      if (width > height && width > maxSize) {
        height = (height * maxSize) / width;
        width = maxSize;
      } else if (height > width && height > maxSize) {
        width = (width * maxSize) / height;
        height = maxSize;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      resolve(canvas.toDataURL('image/webp', 0.8));
    };
    img.onerror = reject;
  });
}
  