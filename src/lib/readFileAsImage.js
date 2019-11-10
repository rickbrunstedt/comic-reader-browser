export function readFileAsImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      resolve(e.target.result);
    };
    reader.onerror = function() {
      reject(new Error("Couldn't read file"));
    };
    reader.readAsDataURL(file);
  });
}
