export const UUID = () => {
  let uuid = '';
  const chars =
    '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length;

  for (let i = 0; i < 8; i++) {
    uuid += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return uuid;
};
