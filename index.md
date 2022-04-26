# Práctica 10 - Sistema de ficheros y creación de procesos en Node.js

# Tareas previas

1. Aceptar la asignación de GitHub Classroom asociada a esta práctica.
2. Familiarizarse con el API de callbacks proporcionada por Node.js para interactuar con el sistema de ficheros.
3. Familiarizarse con el API asíncrona proporcionada por Node.js para crear procesos y, en concreto, con la función spawn.

# Introducción

En esta práctica se plantean una serie de ejercicios o retos a resolver haciendo uso de las APIs proporcionadas por Node.js para interactuar con el sistema de ficheros, así como para crear procesos.

# Ejercicios Explicados

## Ejercicio 1

### Enunciado

En este ejercicio se debe realizar una traza de la ejecución montrando, paso por paso, el contenido de la pila de llamadas, el registro de eventos de la API y la cola de manejadores, además de lo que se muestra por la consola. Mostrar el caso en que se modifique el fichero ```helloworld.txt``` 2 veces.

### Explicación

Antes de empezar se va a mostrar la ejecución sin modificar el fichero ```helloworld.txt```:

```bash
[~/ull-esit-inf-dsi-21-22-prct10-async-fs-process-Pablo400(main)]$ node dist/prueba.js helloworld.txt
Starting to watch file helloworld.txt
File helloworld.txt is no longer watched

```

Como se puede ver el program se ejecuta de forma correcta, pero el evento watcher se queda esperando a que el fichero se haya modificado. 

De momento la traza queda de la siguiente manera: 

  - El primer evento que aparece en la pila de llamadas es el evento ```access```, este evento vomprueba los permisos de un usuario para el archivo o directorio especificado por la ruta. También se utiliza la variable ```constants```, que en este caso comprueba si el fichero pasado como parámetro existe.

  - Este evento se pasa a la API Web para pasar posteriormente pasar el manejador del evento a la cola de manejadores.

  - En la cola de manejadores se espera a que el bucle de eventos se asegure de que la pila de llamadas está vacia, si la pila de llamada está vacía el manejador del evento ```access``` se pasa a la pila de llamadas y se ejecuta.

  - Tras esto se pasa a la pila de llamadas el evento ```watcher```, que se pasa directamente a la API Web donde se quedará esperando hasta que se modifique el fichero.

Lo siguiente que se debe realizar es modificar el fichero ```helloworld.txt```, en la modificación se va a añadir la palabra pablo (introducir un espacio también cuenta como modificación). Cuando se modifica el fichero ocurre lo siguiente:

```bash
[~/ull-esit-inf-dsi-21-22-prct10-async-fs-process-Pablo400(main)]$ node dist/prueba.js helloworld.txt
Starting to watch file helloworld.txt
File helloworld.txt is no longer watched
File helloworld.txt has been modified somehow
File helloworld.txt has been modified somehow

```

Como se puede ver se ha ejecutado el manejador del evento ```watcher```, ¿Porqué ocurre esto?. Esto ocurre porque este evento se quedo esperando en la API Web para poder ejecutarse, después de estar en la API Web al modificarse el fichero se paso a la cola de manejadores y se espero a que el bucle de eventos confirmara que la pila de llamadas está vacía para poder pasar el manejador a la pila de llamadas y ejecutar el evento correspondiente. 

Una cosa curiosa que ocurre es que el evento ```watch``` muestra dos veces el mensaje de que se ha modificado el fichero, esto sucede porque el manejador es invocado dos veces al estar observando el fichero detecta un cambio y se pasa a la pila de llamadas y se ejecuta, pero se vuelve a ejecutar el evento pasando de la pila de llamadas, a la API Web, a la cola de manejadores y por último el bucle de eventos lo pasa a la pila de llamadas para su segunda ejecución.


## Ejercicio 2

### Enunciado

Implemente un programa que devuelva el número de ocurrencias de una palabra en un fichero de texto. Para acceder al contenido del fichero deberá expandir el comando ```cat``` de Unix/Linux, además de expandir el comando ```grep``` con la salida proporcionada por ```cat``` como entrada para obtener las líneas en las que se encuentra la palabra buscada.

### Implementación

En mi implementación he usado una clase donde se recogen las dos funcionalidades necesarias para completar está actividad. Todo el código relacionado con está actividad se encuentra en el siguiente directorio:

```
📦src
 ┗ 📂ejercicio-2
    ┣ 📜catGrep.ts
    ┗ 📜ejercicio-2.ts
```

Por un lado, tenemos el fichero ```ejercicio-2.ts``` donde se crean el objeto para poder invocar la clases. En el fichero ```catGrep.ts``` se encuentra la clase con los dos métodos, uno con la ejecución de los comandos usando pipes y el otro con la ejecución de los comandos sin usar pipes. 

En ambos métodos se crean los procesos hijos usando ```spawn``` de la lib, los procesos ```cat``` y ```grep```. Al proceso  ```cat``` se le pasa como parámetro un fichero y al proceso ```grep``` se le pasa un patrón como parémtro, ambos parámetros se pasan usando el spawn. Este procedimiento se repite en el otro método. 

La codificación del comando con pipes sería la siguiente:

```typescript
const cat = spawn('cat', [`${argv.filename}`]);
const grep = spawn('grep', [`${argv.pattern}`]);

cat.stderr.on('data', (err) => {
  console.error(err.toString());
});

cat.stdout.pipe(grep.stdin);

let wcOutput = '';
grep.stdout.on('data', (piece) => {
  wcOutput += piece;
});

grep.stderr.on('data', (err) => {
  console.error(err.toString());
});

grep.on('close', () => {
  process.stdout.write(wcOutput);
});
```
Primero se crean los procesos hijos usando ```spawn``` como se indico anteriormente. Lo siguiente que se realiza es pasar la sálida del comando ```cat``` al ```pipe```, para que el comando ```grep``` pueda buscar los patrones en el fichero. En la línea ```cat.stdout.pipe(grep.stdin)``` se recoge la sálida del comando ```cat``` usando ```stdout``` y usando el ```pipe``` se le pasa la sálida como entrada a grep para que busque los patrones usando ```stdin```. 

Por último se llama al evento ```close``` para que se muestre el resultado del comando. También se pueden observar los diferentes eventos para procesar los errores.

La codificación del comando sin pipes sería la siguiente:

```typescript
const cat = spawn('cat', [`${argv.filename}`]);
const grep = spawn('grep', [`${argv.pattern}`]);

cat.stdout.on('data', (catResult) => {
  grep.stdin.write(catResult);
});
    
grep.stdout.on('data', (grepResult) => {
  console.log(grepResult.toString());
});
    
cat.stderr.on('data', (err) => {
  console.error(err.toString());
});
    
grep.stderr.on('data', (err) => {
  console.error(err.toString());
});
    
cat.on('close', (code) => {
  if (code !== 0) {
    console.log(`cat process exited with code ${code}`);
  }
  grep.stdin.end();
});
    
grep.on('close', (code) => {
  if (code !== 0) {
    console.log(`grep process exited with code ${code}`);
  }
});
```

Primero se crean los procesos hijos usando ```spawn``` como se indico anteriormente. Después se ejecuta en evento ```data``` del comando ```cat``` y en el manejador se le pasa como entrada al comando ```grep``` el resultado del comando ```cat``` y se invoca el evento ```data``` del comando ```grep``` para que el manejador muestre los datos tras haber ejecutado el comando ```grep```. Y también se utilizan los eventos con sus manejadores correspondientes para poder procesar los errores. 



