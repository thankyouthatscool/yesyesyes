export type DatabaseItemInput = [
  // Code
  string,
  // Color
  string,
  // Size
  string | null,
  // Description
  string | null,
  // Location
  string
];

export type DatabaseItemInputWithId = [
  // ID
  string,
  ...DatabaseItemInput
];
