const fileOptions = {
  types: [
    {
      description: "Images",
      accept: { "image/*": [".png", ".gif", ".jpeg", ".jpg"] },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};

export const getFile = async () => {
  let file;
  try {
    const [fileHandle] = await window.showOpenFilePicker(fileOptions);
    file = await fileHandle.getFile();
  } catch (error) {
    if (error) {
      return;
    }
  }

  return checkFileSize(file);
};

const checkFileSize = (file) => {
  const sizeLimit = 1024 * 1024;
  if (file.size > sizeLimit) {
    alert("Image must not exceed 1MB");
    return;
  }
  return file;
};

export const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (err) => reject(err);
    fileReader.readAsDataURL(file);
  });
};

  
// file.type = "image/jpeg"
