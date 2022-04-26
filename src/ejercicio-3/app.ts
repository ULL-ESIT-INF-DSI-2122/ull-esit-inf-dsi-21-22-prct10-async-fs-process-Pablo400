/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

import {watch} from 'fs';
import * as yargs from 'yargs';
import {AddUserDirectory} from './NoteOperations/addUserDirectory';
import {AddNote} from './NoteOperations/addNote';
import {ModifyNote} from './NoteOperations/modifyNote';
import {RemoveNote} from './NoteOperations/removeNote';
import {ListNotes} from './NoteOperations/listNotes';
import {ReadNotes} from './NoteOperations/readNotes';

const addUser = new AddUserDirectory();
const addNote = new AddNote();
const modifyNote = new ModifyNote();
const removeNote = new RemoveNote();
const listNotes = new ListNotes();
const readNote = new ReadNotes();

addUser.addUserDirectory();
addNote.addNote();
modifyNote.modifyNote();
removeNote.removeNote();
listNotes.listNotes();
readNote.readNote();

yargs.parse();

