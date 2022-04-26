import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  // Evento 1
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  // Este access comprueba si el fichero existe
  // Evento 2
  access(filename, constants.F_OK, (err) => {
    // Evento 3
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      // Evento 4
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      // Evento 5
      // No entiendo porque lo muestra dos veces
      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      // Evento 6
      console.log(`File ${filename} is no longer watched`);
    }
  });
}
