import * as yargs from 'yargs';
import {Check} from './Operations/checkDirFile';
import {CreateDir} from './Operations/newDirectory';
import {ListFiles} from './Operations/listFiles';
import {ShowContent} from './Operations/showContent';
import {MoveOrCopy} from './Operations/moveDirFiles';
import {Delete} from './Operations/deleteDirFile';

const check = new Check();
const create = new CreateDir();
const list = new ListFiles();
const show = new ShowContent();
const moveCopy = new MoveOrCopy();
const deleteDirFile = new Delete();

check.dirOrFile();
create.newDir();
list.listFiles();
show.pathContent();
moveCopy.moveOrCopy();
deleteDirFile.deleteDirFile();

yargs.parse();
