export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const numberWithComma = (num: string | number = 0) => {
  return Number(num).toLocaleString();
};

export const getFormattedPhoneNumber = (phoneNumber: string) => {
  let newPhoneNumber = phoneNumber.replaceAll('-', '');
  if (phoneNumber.charAt(0) === '0') {
    newPhoneNumber = newPhoneNumber.slice(1);
  }
  return newPhoneNumber;
};

export const obscureEmail = (email: string) => {
  const [name, domain] = email.split('@');
  if (name.length > 3) {
    const slicedName = name.slice(0, 3);
    const remainName = name.slice(2);
    return `${slicedName}${new Array(remainName.length).join('*')}@${domain}`;
  } else {
    return `${name[0]}${new Array(name.length).join('*')}@${domain}`;
  }
};

export const obscurePhoneNumber = (originPhoneNumber: string) => {
  const phoneNumber = `0${originPhoneNumber.split('+82-')[1]}`;
  if (phoneNumber.length === 11) {
    return `010-****-${phoneNumber.slice(7)}`;
  } else if (phoneNumber.length === 10) {
    return `010-***-${phoneNumber.slice(6)}`;
  } else {
    return phoneNumber;
  }
};

export const readUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      resolve(String(e.target?.result));
    };
    reader.readAsDataURL(file);
    reader.onerror = reject;
  });
};

export const blobToFile = (theBlob: Blob, fileName: string): File => {
  return new File([theBlob], fileName, { lastModified: new Date().getTime() });
};
