/**
 * Add note interface
 */
export interface addNoteInterface {
  addNote(): void;
}

/**
 * Add user directory interface
 */
export interface addUserDirectoryInterface {
  addUserDirectory(): void;
}

/**
 * List notes interface
 */
export interface listNotesInterface {
  listNotes(): void;
}

/**
 * Modify notes interface
 */
export interface modifyNoteInterface {
  modifyNote(): void;
}

/**
 * Read notes interface
 */
export interface readNoteInterface {
  readNote(): void;
}

/**
 * Remove note interface
 */
export interface removeNoteInterface {
  removeNote(): void;
}

/**
 * Chlak Color interface
 */
export interface chalkColorInterface {
  getColor(color: string, print: string): string | undefined;
}
