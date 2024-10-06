export default function generateOTP({
  length = 4,
  lowerCase = false,
  upperCase = false,
  specialCharacters = false,
}) {
  let collection = "0123456789";
  let otp = "";

  if (length <= 0) {
    throw new Error("Length must be a positive integer");
  }
  if (lowerCase) {
    collection += "abcdefghijklmnopqrstuvwxyz";
  }
  if (upperCase) {
    collection += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (specialCharacters) {
    collection += "~!@#$%^&*_:;,.?";
  }

  for (let i = 0; i < length; i++) {
    otp += collection.charAt(Math.floor(Math.random() * collection.length));
  }

  return otp;
}
