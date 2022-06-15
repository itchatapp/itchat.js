export const Messages = {
  INVALID_TYPE: (name: string, expected: string, an = false) =>
    `Supplied ${name} is not a${an ? 'n' : ''} ${expected}.`,
  INVALID_TOKEN: () => 'Invalid token received',
};
