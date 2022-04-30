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

Una cosa curiosa que ocurre es que el evento ```watch``` muestra dos veces el mensaje de que se ha modificado el fichero, esto sucede porque ```watch``` es un método poco fiable y algunas veces muestra lo mismo dos veces pero no es algo que haga que el programa sea más lento.

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

## Ejercicio 3

### Enunciado

La aplicación a desarrollar deberá controlar los cambios realizados sobre todo el directorio especificado al mismo tiempo que dicho usuario interactúa con la aplicación de procesamiento de notas. Nótese que no hace falta modificar absolutamente nada en la aplicación de procesamiento de notas. Es una aplicación que se va a utilizar para provocar cambios en el sistema de ficheros.

### Implementación

En está actividad no hay mucho que comentar al utilizar el mismo código que en la práctica anterior, pero se añade un fichero adicional donde se implementa el método ```watch``` que se encarga de observar todos los cambios en un directorio de las notas en concreto o en todos los directorios al mismo tiempo.

En dicho fichero se crea un clase llamada ```Watcher```, donde se crea un método llamado ```watchDirHound``` que utiliza el paquete ```hound```. El paquete ```hound``` utiliza la funcionalidad de ```watch``` para poder observar un árbol de directorios, a parte de observar cualquier directorio individidual como ya realiza el método ```watch```. Existe un parámetro que permite realizar un watch recursivo y de está manera recorrer un árbol de directorios en busca de cambios, pero por problemas con la versión de node no he podido utilizar y con ayuda de ```hound``` he podido realizar esto.

A parte de observar también debemos mostrar el contenido de un fichero, si se ha creado un nuevo fichero o si se ha modificado el fichero. Para realizar esto utilizo un ```spawn``` para invocar al proceso hijo ```cat``` y poder mostrar el contenido del fichero modificado o creado.

Para ejecutar el programa basta con ejecutarlo como se realizaba en la práctica anterior, pero con el añadido de que en en otro fichero se ejecute lo que es el watcher en otra terminal para poder observar los cambios mientrás se va ejecutando el programa de Notas.

## Ejercicio 4

### Enunciado

Desarrolle una aplicación que permita hacer de wrapper de los distintos comandos empleados en Linux para el manejo de ficheros y directorios. En concreto, la aplicación deberá permitir:

  1. Dada una ruta concreta, mostrar si es un directorio o un fichero.
  2. Crear un nuevo directorio a partir de una nueva ruta que recibe como parámetro.
  3. Listar los ficheros dentro de un directorio.
  4. Mostrar el contenido de un fichero (similar a ejecutar el comando cat).
  5. Borrar ficheros y directorios.
  6. Mover y copiar ficheros y/o directorios de una ruta a otra. Para este caso, la aplicación recibirá una ruta origen y una ruta destino. En caso de que   la ruta origen represente un directorio, se debe copiar dicho directorio y todo su contenido a la ruta destino.

### Implementación

En está actividad he seguido una implementación similar a la de la práctica anterior, utilizando una serie de clases para cada función a implementar y usando un fichero donde creo todos los objetos que se han invocado con las clases.

El directorio de está actividad contiene lo siguiente:

```
📦ejercicio-4
 ┣ 📂Operations
 ┃ ┣ 📜checkDirFile.ts
 ┃ ┣ 📜deleteDirFile.ts
 ┃ ┣ 📜listFiles.ts
 ┃ ┣ 📜moveDirFiles.ts
 ┃ ┣ 📜newDirectory.ts
 ┃ ┗ 📜showContent.ts
 ┗ 📜app.ts
```

En el directorio ```Operations``` se encuentran las principales funciones del **wrapper**, donde cada fichero contiene una clase con la implementación de una función,  y en el fichero ```app.ts``` se invocan a todas las clases. Esto se realiza solamente por cuestiones de orden y depuración de problemas.

En la implementación de cada clase, he decidido lo siguiente:

  - En la clase ```Check``` del fichero ```checkDirFile.ts```.

    - Utilizo la función de ```lstat``` de ```fs``` donde se comprueba si un **path** es un fichero o un directorio.

  - En la clase ```Delete``` del fichero ```deleteDirFile.ts```.

    - Utilizo también la función ````lstat``` para comprobar si el **path** pasado que se quiere eliminar es un directorio o un fichero. Si es un directorio se utiliza la función de ```mkdir``` disponible en ```fs``` y si es un fichero utilizo el método ```unlink```.

  - En la clase ```ListFiles``` del fichero ```listFiles.ts```.

    - En está clase se utiliza la función ```spawn``` para invocar al comando ```ls``` y usamos un pipe (similar al de la actividad 2) para unirlo con el comando ```grep``` y filtar la salida para que solo se muestren los ficheros de un directorio dado. También se utiliza la función ````lstat``` para comprobar si está listando un directorio y en caso de ser un fichero se muestra un error.

    - El comando utilizado en Linux sería el siguiente: ```ls -lAh | grep -v ^d```.

  - En la clase ```MoveOrCopy``` del fichero ```moveDirFiles.ts```.

    - En está clase se utilizan dos funciones ```spawn```, uno con el comando ```mv``` y ```cp```. Para saber si el usuario quiere mover o copiar un fichero o directorio, se comprueba con un flag si el usuario quiere copiar o mover un fichero.

  - En la clase ```CreateDir``` del fichero ```newDirectory.ts```.

    - Se utiliza la función ```mkdir``` de la API ```fs```. 

  - En la clase ```ShowContent``` del fichero ```showContent.ts```.

    - Se utiliza la función ```access``` para comprobar si el fichero existe, posteriormente se utiliza el método ```readFile``` para leer el contenido de un fichero.

Todas las funcionalidades de la API ```fs``` se han usado en su versión asincrona, ya que es un requerimiento básico en la práctica y todas las funcionalidades se invocan usando el paquete ```yargs```. 
