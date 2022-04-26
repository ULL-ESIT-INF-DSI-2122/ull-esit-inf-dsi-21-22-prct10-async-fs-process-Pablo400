import {spawn} from 'child_process';

const filename = process.argv[2];

// Apartado 1
// const find = spawn('find', ['../src/ejercicio-3', '-type d']);

// find.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// Apartado 2
// // const directoryName = process.argv[2];

// // const mkdir = spawn('mdkir', [directoryName]);

// // mkdir.stdout.on('data', (data) => {
// //   console.log(data);
// // });

// // Prueba con fs
// // fs.mkdir(directoryName, (err: Error) => {
// //   if (err) {
// //     return console.error(err);
// //   }
// //   console.log('Directory created successfully!');
// // });

// Apartado 3 (Funciona)
// // const ls = spawn('ls', ['-lAh', 'src']);
// // const grep = spawn('grep', ['^d', '-v']);

// // ls.stdout.pipe(grep.stdin);

// // let wcOutput = '';
// // grep.stdout.on('data', (piece) => {
// //   wcOutput += piece;
// // });

// // grep.on('close', () => {
// //   process.stdout.write(wcOutput);
// // });
