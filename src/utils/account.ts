function generateAccountNumber(): string {
  const prefix = '89';
  const randomDigits = Math.floor(Math.random() * 1_0000_0000) // 8 digits
    .toString()
    .padStart(8, '0');
  return prefix + randomDigits;
}

export default generateAccountNumber
