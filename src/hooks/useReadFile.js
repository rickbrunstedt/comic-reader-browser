import { useState } from 'react';

export function useReadFile() {
  const [fileData, setfileData] = useState(null);

  function readFile(file) {
    if (file == null) {
      setfileData(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      setfileData(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  return [fileData, readFile];
}
