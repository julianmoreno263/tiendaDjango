/* vamos a comenzar nuestro proyecto web completo en python. 


1- creamos el proyecto con django-admin startproject ProyectoWeb 
2- vamos a la carpeta del proyecto y creamos la aplicacion, la llamaremos ProyectoWebApp, 
la creamos con python manage.py startapp. En la app es donde estaran las vistas, el admin,el modelo.
3- probamos si funciona corriendo el servidor, python manage.py runserver.
4- Comenzamos a crear las vistas, vamos a views, importamos primero el objeto HttpResponse.
5- en urls ponemos las respectivas rutas a estas vistas

---------------------------------------------------------------------------------------------

1- Un proyecto puede tener varias app dentro, tambien una app se puede reutilizar en otro proyecto, entonces 
debemos organizar mejor el archivo de urls para que el urlpatterns no tenga todas las rutas de todo y no sea
tan complicado leerlo. En el mismo archivo urls nos da la indicacion de como hacerlo utilizando la funcion include()

2- creamos en nuestra app su propio archivo para sus urls, el urls.py inicial es el de todo el proyecto, entonces
creamos uno que sea solo para la app.Cada app debe tener su archivo urls y el archivo urls del proyecto se enlaza a
cada archivo urls de cada app.

3- en este nuevo archivo importo el path,las views y el urlpatterns, en el urlpatterns de la app elimino 
la ruta del admin y al contrario, en el urlpatterns del proyecto solo dejo la ruta del admin y elimino todo lo demas.

4- ahora, desde urls del proyecto incluimos el archivo urls de la app con include(), el primer parametro donde
va la url lo dejamos vacio igual que antes para que las rutas sigan funcionando como las tenemos,osea asi:

    						path('', include("ProyectoWebApp.urls")),



-------------------------------------------------------------------------------------------------------------

1- ahora vamos a crear los templates que deben de renderizarse desde el archivo de views, creamos en nnuestra app
una carpeta templates y dentro otra carpeta ProyectoWebApp, y aqui van los archivos html de cada vista.

2- ahora registramos nuestra app en el archivo settings del proyecto en installed apps.

3- ahora en views.py utilizamos render() para renderizar las plantillas, se utiliza request y la ruta 
de ProyectoWebApp/home.html, asi para cada vista.

---------------------------------------------------------------------------------------------------------


1- vamos a darle estilos a las plantillas html, el profe deja ya preparado una carpeta que tiene el archivo de
bootstrap y otros archivos, y un index que el ya tiene preparado para reemplazar nuestro home.html.

2- entonces, creamos en nuestra app otra carpeta llamada static, y dentro una subcarpeta con el mismo nombre de la 
app, esto se hace asi por convencion. En esta subcarpeta cargamos todos los archivos que el profe deja de los estilos,
solo las carpetas, el home.html lo reemplazamos por el que el profe nos da.

3- si abrimos el home.html en el navegador, ya tendremos la estructura del sitio pero sin estilo, porque para que tome
los estilos de bootstrap hay que indicar bien las rutas a las carpetas que se incluyeron. Pero antes de corregir las rutas
a estos archivos, se pone en el home.html al principio del head este codigo:  {% load static %}, asi django sabe que debe de
cargar lo que haya dentro de la carpeta static.

4- ahora, para linkar correctamente las rutas a las carpetas de los estilos, se indica toda la ruta empezando con
static, sigue el nombre de la subcarpeta y el resto de la ruta entre comillas simples, y todo va encerrado entre
{%  %} asi:

    <link href="{% static 'ProyectoWebApp/vendor/bootstrap/css/bootstrap.min.css' %}" rel="stylesheet">
	

{% %}  esto le indica a django que busque lo que se le indica entre estas llaves.

5- al linkar las carpetas y recargar el navegador ya aparece la pagina home con estilos css.

---------------------------------------------------------------------------------------------------

1- para hacer herencia de plantillas, osea poner en un archivo base el header y el footer,porque seran comunes
a las demas vistas, creamos este archivo base y pasamos el header y el footer de home.html alli, y en home.html
le indicamos que use este archivo base(que lo herede), asi toma el header y el footer pero heredados,y las demas
plantillas hacen lo mismo, lo que cambia en cada plantilla sera el contenido principal pues sera diferente a cada
vista.

2- en base.html como el contenido principal no va, se indica que ese espacio es donde estara el contenido que
cambia en las otras plantillas asi:  

						<!--Contenido cambiante-->
						   {% block content %}

						   {% endblock %}

3- ahora, en las demas plantillas se hace lo contrario, se borra el header y footer pues lo van a heredar
de base.html y solo se deja el contenido principal. Para indicarle a estas plantillas que heredaran de base
ponemos asi:

								  {% extends "ProyectoWebApp/base.html" %}

								  {% load static %}


y el contenido principal va dentro de estas etiquetas block:

								  {% block content %}

								  {% endblock %}

4- listo!!!  si recargo el navegador todo debe de seguir funcionando, solo que ahora se esta heredando piezas de
codigo, es como usar componentes de React. Esto es bueno porque se puede reutilizar codigo.

--------------------------------------------------------------------------------------------------------

1- ahora debemos modificar las urls de la barra de navegacion para que las rutas a las diferentes vistas 
funcionen. Esto lo hacemos en base.html que es la plantilla que tiene la barra de nav.

2-en cada href se indica la url que esta definida en el archivo urls de la app, por ejemplo para la
url de home sera asi, indicando el nombre de la vista "Home" como lo definimos(osea en mayuscula la primera letra):

						href="{% url 'Home' %}"

asi hacemos para los demas enlaces de las demas vistas. Si vamos al navegador los enlaces del nav ya deben de
funcionar.

NOTA: SI QUEREMOS CAMBIAR LOS ESTILOS,NOS VAMOS A GESTION.CSS Y ALLI HACEMOS LOS CAMBIOS, SI NOS SE REFLEJAN,
BORRAMOS LA CACHE DEL NAVEGADOR, O INTENTAMOS TAMBIEN REINICIANDO EL SERVIDOR, A MI ME FUNCIONO BORRANDO LA CACHE,
OSEA IR A "MAS HERRAMIENTAS - BORRAR DATOS DE NAVEGACION"

-----------------------------------------------------------------------------------------------------

1- listo, ya todas las vista stienen el estilo, pero si vemos el menu, siempre queda resaltado el menu de Inicio, 
aunque estemos en otra pagina el Inicio siempre esta resaltado, para corregir esto debemos usar el request.path. Para
usar el request.path lo hago dentro de un if para establecer una condicion, si vemos el html de base.html, en el nav 
el link de Inicio tiene el atributo "active", entonces este atributo sera la condicion para nuestro if en donde
usamos el request.path para establecer que si estamos en cierta ruta se active ese link, asi:

				{% if request.path == '/' %}active{% endif %}

asi seria por ejemplo si estamos en la pagina d einicio("/") el link se pone active.

2- este codigo va dentro de la clase de los <li> que encierrana a los link, para que asi tome los cambios. Listo, si
probamos los enlaces, se activan dependiendo la pagina en donde estemos.

----------------------------------------------------------------------------------------------------

1- ahora, para la practica, vamos a crear una nueva app para la zona de servicios y asi poder administrar
servicios desde el admin de django,y ademas cuando estemos en la pagina de servicios se puedan reflejar,
un proyecto en django puede tener varias apps, hasta ahora tenemos una sola, cada uno de estos servicios que creemos tendra un titulo, una descripcion, una imagen. Ahora para poder usar estos servicios tendran que estar en la bd, y para esto debemos crear una nueva tabla para estos servicios, y para eso debemos crear un modelo.


2- nos paramos en la carpeta del proyecto, y con python manage.py startapp servicios creamos esta nueva app.

3- ahora registramos esta app en settings del proyecto en installed apps.

4- para crear la tabla de los servicios para la bd debemos usar el "mapeo ORM", osea el mapeo de objetos relacionales, en si es crear un modelo(como en nodejs), este modelo sera el que lleve la descripcion de los atributos que deben de ir en la tabla de la bd.Es un objeto(con sus propiedades) que representa la tabla que se quiere crear en la bd. El mapeo ORM es representar desde codigo una tabla de la bd. En resumen es crear en el archivo models.py una clase y dentro de esta clase un objeto,en este objeto se especifican los campos de la tabla de la bd y con este objeto se crea la tabla en la bd.

5- Para crear este modelo de la tabla servicios, vamos a models.py de la app servicios y aqui es donde lo creamos. Creamos una clase y en esta clase definimos nuestro objeto para el modelo.Esta clase usara el metodo models de la clase Model para poder crear el modelo.

6- se definen los atributos del objeto que seran en si los campos de la tabla. Aparte de los parametros especificados, se deben incluir las opciones Meta(ver documentacion de django), las opciones verbose_name y verbose_name_plural especifican como queremos que tengan el nombre el modelo y los campos de la tabla. Para especificar estas opciones Meta debemos crear una clase interna dentro de la clase del modelo. Y despues creamos una funcion de tipo __str__ para que nos devuelva el titulo de nuestro modelo ya con estas propiedades meta definidas.

7- Como queremos manipular imagenes en este modelo debemos instalar el paquete Pillow con pip.

8- Listo, ahora debemos hacer las migraciones para que estos cambios surgan efecto, hacemos primero la creacion de las migraciones con:

					python manage.py makemigrations

y despues hacemos la migracion como tal con:

					python manage.py migrate

9- asi ya se debe de haber creado la tabla de servicio en la bd, podemos verla utilizando el visor de SQLite.Nos aparecera la tabla servicio-servicios en nuestra bd.

-----------------------------------------------------------------------------------------------

Ahora, debemos registrar nuestra app de servicios en el panel de admin, la logica del proyecto que estamos haciendo indica que seamos nosotros como administradores quienes creemos los servicios que ofreceremos y no el usuario,por eso el admin es el que debe de manejar los servicios.

1- recordar que si creamos el proyecto con startproject el panel de admin se crea por defecto,esto en las nuevas versiones de django. Recordar que para ingresar al panel de admin debemos crear un superusuario con la instruccion "python manage.py createsuperuser", nos sale un username por defecto pero lo podemos cambiar y nos pide un email y un password.

Para este proyecto mis credenciales son:

user: jota
email: el de gmail
password: JAMB1177

2- ahora, con el servidor levantado ya podemos entrar al panel con nuestras credenciales.

3- NOTA: CUANDO REGISTRAMOS LA APP DE SERVICIOS EN SETTINGS.PY DEBEMOS PONERLE UNA COMA AL FINAL.

4-Ahora, vamos a admin.py de la app de servicios y aqui registramos la app importando la clase de servicio. Como admin y models estan en el mismo nivel, indicamos esto con un punto en la importacion asi:

					from .models import Servicio

y con "admin.site.register(Servicio)" registramos la app, si vamos al panel de admin y recargamos nos debe de aparecer nuestra app de servicios.

5- por defecto los campos de created y updated no aparecen, para agregarlos en el admin debemos crear una clase en admin.py la cual le pasamos como parametro admin.ModelAdmin, como estos campos seran solo de lectura porque se modifican automaticamente, lo indicamos con el metodo readonly_fields("created","updated"), esta nueva clase tambien se la pasamos al admin.site.register para que los cambios se reflejen.

6- listo, si queremos pasar el admin a español, vamos a settings.py y en language_code podemos darle "es-eu" y asi lo pasamos a español.

---------------------------------------------------------------------------------------------------------

1- ahora, si queremos subir una imagen en nuestro admin, la podemos cargar pero no la podemos ver, por defecto django esta en modo desarrollo, si vamos a settings.py y en DEBUG=True(aqui sabemos que estamos en desarrollo) lo pasamos a False(ya estaremos en produccion). Cuando cargamos una imagen django la deja en la raiz del proyecto, debemos crear en el proyecto una carpeta para organizar alli las imagenes ,videos,etc, esta carpeta por convencion se llama "media", ahora, en esta carpeta se pueden crear subcarpetas para ordenar los archivos de imagenes o multimedia de cada app del proyecto para que quede mas organizado. Para que django cree estas subcarpetas para las imagenes d eforma automatica, nos vamos al modelo de servicios y en el metodo ImageField le ponemos el parametro upload_to="servicios" y asi al cargar una imagen desde servicios se creara una subcarpeta "servicios en "media" con la imagen.

2- ahora, para decirle a django donde encontrar los archivos media debemos crear en la parte de abajo de settings.py dos variables, una para la url a esta carpeta y otra para la ruta al archivo. Listo, si cargamos una imagen desde admin en servicios, se creara la carpeta servicios dentro de media con la imagen.

3- pero si damos click en la imagen desde admin, nos sale un error, porque debemos registrar la url de la imagen para que podamos verla desde el panel admin, entonces vamos a urls.py del proyecto y aqui le importamos el archivo settings.py del proyecto para tener disponibles las variables que creamos de la url y la ruta a las imagenes. Ponemos estas lineas en urls.py:

							from django.conf import settings
							from django.conf.urls.static import static

y abajo de urlpatterns le indicamos que se le va a agregar las variables que estan en settings asi:

		urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

LISTOO!  si vamos de nuevo al admin y damos click en la imagen ya nos la saca en el navegador.

------------------------------------------------------------------------------------------------------

1- ahora vamos a hacer que los servicios que creamos desde admin se puedan mostrar en la pagina de servicios de nuestro sitio web. Entonces lo que debemos hacer es en el archivo views.py (que son los controladores) importar el modelo se servicios, y en la funcion de servicios decirle que los muestre.

2- Entonces(parecidoa  nodejs) en views(del proyecto, donde estan los controladores) importamos nuestro modelo de servicios.

3- en el controlador creo una variable y uso el metodo all para decirle a django que incluya todos los objetos que tenga en la clase Servicio, y en el render paso tambien esta variable que tendra los servicios importados.

4- listo, ahora vamos a la vista de servicios y con un for in le indicamos que recorra ese array de servicios, en el block content. En las etiquetas html podemos pasar los parametros de lo que quiero mostrar asi:

							{{servicios.titulo}}

y se deben de mostrar en pantalla, ahora, para cargar la imagen lo hago asi:  {{servicio.imagen.url}}, le debo pasar el .url para que django busque la ruta url adecuada y muestre la imagen.

5- Listoo!!, como vamos recorriendo el array con el for in, si voy agregando servicios desde al admin se van reflejando en pantalla. En si es como en nodejs, voy pasando por parametros entre {{}} las propiedades del modelo para que se vean en pantalla.

---------------------------------------------------------------------------------------------------

Ahora, si creamos apps es para poder tener esas apps y que sean reutilizables donde nosotros las necesitemos, asi como esta la app de servicios no es reutilizable porque su template esta creado pero en la app principal, entonces para que la app servicios sea reutilizable y se pueda manipular como una sola unidad vamos a dejar todos sus archivos dentro de ella.(v36)

1- dentro de servicios creamos una carpeta templates para sus propias vistas, ademas dentro de esta carpeta creamos una subcarpeta para el template de servicios, puede que mas adelante la app de servicios necesite otras vistas,entonces vamos organizando cada vista en su propia carpeta.

2- ahora, tambien debemos llevar el controlador de esta app(vista) al archivo views de la propia app de servicios,porque hasta ahora, el controlador esta en views pero de la app principal.

3- tambien el path para la vista de servicios esta en el archivo urls.py d ela app principal, entonces tambien creamos en servicios su propio archivo urls.py y alli ponemos este path. En urls de la app principal quito la path de servicios, y en el urls de servicios pego esa path pero ahora apuntara a la raiz,osea s e pone solo "".

								path("", views.servicios, name="Servicios"),

ademas en la importacion de views ponemos un punto porque ahora es el views pero de la propia app servicios,entonces  debe de buscar a views pero dentro de servicios asi:

								from . import views

4- por ultimo, debemos ir a urls.py pero del proyecto y registrar alli esta app de servicios, se utiliza el metodo include para especificar la url a servicios asi:

    							path('servicios/', include("servicios.urls")),

tambien en el controlador de servicios debemos corregir la ruta porque ahora no apunta desde proyectoWebApp sino desde servicios asi:

	 					return render(request, "servicios/servicios.html", {"servicios": servicios})

5- listoo!! si actualizamos el navegador debe d efuncionar todo pero ahora las app son independientes y reutilizables. TOCA SIEMPRE MIRAR BIEN LAS RUTAS Y SABER DE DONDE VIENE CADA COSA.

----------------------------------------------------------------------------------------------------------

(v37) Le vamos a mejorara la apariencia a la zona de contenido en el template de servicios y terminaremos esta app de servicios.

1- Vamos a poner unas imagenes que sean a fin con la aplicacion, sobre transporte y pedidos. 

2- vamos admin y cargamos estas nuevas imagenes en cada servicios que tenemos.

3- ahora podemos tomar la estructura del heading del home para tener el mismo estilo en las paginas, a esta estructura le paso los parametros que teniamos del titulo,contenido y la imagen para reflejar esos contenidos.

5- podemos cambiar los estilos upper y lower para invertir el tamaño de las letras, que el titulo de cada servicio quede grande y su contenido pequeño. Podemos hacer que la imagen de cada servicio quede al lado de su descripcion y mas pequeña para que se vea mejor, le podemos dar a la etiqueta img un style="width:50%" y asi tomara la mitad del tamaño. LISTOO!!! queda la app de servicios terminada.


----------------------------------------------------------------------------------------------

(v38) ahora vamos a crear la app para el blog.

1- Vamos a crear una app para poder insertar entradas de blog desde el admin, cada entrada de blog tendra una imagen,un titulo,una descripcion y ademas tendra la categoria a la que pertenece esa entrada de blog.Creamos la app con python manage.py starapp blog.

2- creamos los modelos de Categoria y Post en models.py. Para la imagen de los post sera opcional, osea se puede subir un post sin imagen, para que django identifique este campo imagen como opcional le pasamos null=True y blank=True asi:

    					imagen = models.ImageField(upload_to="blog", null=True, blank=True)

3- ahora, podemos indicar que los usuarios de nuestro sitio tambien puedan subir sus propios post, entonces creamos un campo dentro de Post llamado autor y esta campo en si sera una consulta sql que django maneja por detras, si un autor puede crear varios posts esa es una relacion de uno a muchos, asi mismo si se elimina un autor de nuestra bd, se deben de eliminar los posts que ese autor haya creado(en cascada). Para manejar estas consultas debemos usar la clase User de django, entonces se la importamos a nuestro archivo models.py. 

4- ahora en autor, por medio de la llave foranea le especificamos que haga la eliminacion en cascada. Ademas una categoria puede tener varios post, y a la vez un post puede pertenecer avarias categorias(por ejemplo,programacion e informatica), entonces es una relacion de muchos a muchos, asi que para establecer esa relacion entre post y categorias creamos en Post otro campo llamado categoria y aqui le especificamos la relacion ManyTo Many.

5- ahora registramos la app de blog en settings.py del proyecto.

6- ahora para que se creen estos modelos hacemos las migraciones:

				python manage.py makemigrations blog
				python manage.py migrate blog


7- ahora, para que en el admin se puedan reflejar estos modelos, debemos ir al archivo admin.py de blog y alli registramos los modelos.Aqui se importan los modelos y se crean las respectivas clases para el registro de cada uno de ellos.(ver archivo)

8- Listoo!, ahora podemos ir a admin en el navegador y se deben de ver estas nuevas tablas.Si registramos un post nuevo, por medio del campo autor que creamos nos saldra nuestro nombre porque hasta a hora solo hay un autor,si registramos otro usuario dando click en el + al lado de autor, se van grabando los usuarios y asi podemos elegir el usuario que crea ese post,django ya hace todo esto en segundo plano.

------------------------------------------------------------------------------------------------

(v39) vamos a crear las vistas para nuestro blog y ver alli los post que se van creando.

1- recordar que los controladores(views) que habiamos creado estaban en views pero de la app de ProyectoWebApp, entonces tomo ese controlador de blog y lo paso al archivo views.py pero de la app de blog y debere actualizar la ruta en este controlador.

2- creamos la carpeta templates y la subcarpeta blog para la app de blog y alli paso el template de blog que habiamos creado en ProyectoWebApp.

3- creamos en blog el archivo urls.py y alli importamos el views de blog, y ponemos el urlpatterns de la vista que creamos. Quitamos ese path en urls.py de ProyectoWebApp porque alli lo habiamos definido antes y ahora esa ruta ya no estara alli, debemos tener cuidado con las rutas, lo que pasa es que el profe en un principio dejo todo en ProyectoWebApp y las rutas ahora no coinciden, pero en otro proyecto de una vez creamos cada app independiente y las rutas seran propias de cada app y no las confundimos.

4- por ultimo vamos a urls.py del proyecto y alli incluimos la ruta a este blog, ahora si recargamos el navegador todo debe de estar funcionando normal.

5- Listo, ahora para que podamos ver en pantalla los post que hemos creado, debemos ir al controlador del blog y hacer lo mismo que con los servicios, primero importamos en views.py de blog la clase Post, y en la funcion le decimos que traiga todos los objetos del modelo Post y los renderice.

6- listo, ahora hacemos en la plantilla html del blog una estructura para mostrar los post, en si por ahora copiamos la misma estructura de servicios.html y la pegamos en blog.html para ir mostrando los post. Listoo!!, si actualizamos el navegador, podemos ver nuestros post en el blog con la misma estructura de servicios.

---------------------------------------------------------------------------------------------------

(v40) Vamos a agregar el autor de cada blog, por ahora solo estoy yo como autor de los blogs, ademas pondremos las categorias de cada post.

1- para poner el autor simplemente pasamos el parametro <p>Autor: {{post.autor}}</p>, podemos hacerlo dentro de un parrafo o otra etiqueta segun el estilo que queramos.

2- vamos a hacer que aparezcan todas las categorias que hemos echo en la parte de abajo y que estas sean un enlace, asi si damos click en una categoria nos mostrara otra vista solo de esos post de esas categorias. Para poner estas categorias el codigo se debe de poner despues del {% endfor %}.  Para recorrer las categorias que tenga en el controlador de post, hago de nuevo un bucle for in para que me aparezcan las categorias y las recorro estipulando este parametro:  {{post.categoria.all}}.

3- asi me va a mostrar la consulta como tal(la query set), para extraer solo los datos que necesito,osea los nombres de las categorias debo recorrer ese query set, hago un bucle for in anidado que recorra ese query set(osea recorra {{post.categoria.all}} ) y a cada vuelta de bucle que nos muestre del modelo de categoria el nombre de la categoria.(ver codigo)

RECORDAR QUE LA VARIABLE "POSTS" EN PLURAL ES UN ARRAY QUE ALMACENA TODOS LOS POSTS QUE SE VAN CREANDO, Y ESTOS LOS CAPTURAMOS EN ESTE ARRAY POR MEDIO DEL METODO OBJECTS.ALL EN EL CONTROLADOR(VIEWS.PY)

CON LA ENTIDAD &nbsp;  LO QUE HAGO ES CREAR ESPACIO EN BLANCO PARA QUE LOS NOMBRES DE LAS CATEGORIAS NO QUEDEN PEGADOS.


----------------------------------------------------------------------------------------------
(v41) Vamos a hacer que los enlaces de las categorias en la vista de blog funcionen, primero vamos a crear un nuevo template para que al dar click sobre alguna categoria nos muestre los post que haya de esas categorias en esa nueva vista. Ademas para hacer el filtro de los post por categorias debo usar el id que django le da automaticamnete a cada categoria creada, en este momento la categoria Nacionales tiene id de 2 y la de Internacionales tiene id de 1.

1- creamos el template de las categorias, sera el mismo del blog.
2- creamos en urls.py de blog la ruta a esta nueva vista, como la url llevara un id(en la base de  datos el id tiene el nombre de categoria_id) se especifica entre <> y ademas como en la bd este campo id es un entero debemos especificarlo con "int:" asi:  

    				path("categoria/<int:categoria_id>/", views.categoria, name="categoria"),

3- creamos la vista(controlador) de esta vista en views.py, se debe importar el modelo de Categoria y el controlador sera igual al de blog, logico se cambia el Post por Categoria. Ademas tendra un segundo parametro que sera el id(categoria_id). Para filtrar por id usamos el metodo get(id=categoria_id). En el return renderizamos la pagina especificando la ruta donde esta el html. osea desde la carpeta blog/categorias.html

           return render(request, "blog/categoria.html", {"categoria": categoria})


4- hasta aqui ya podemos obtener las categorias, pero para que muestre los post de esas categorias filtradas segun su id debemos usar la misma linea donde capturamos los post, pero en esa linea usamos el metodo filter y le decimos que filtre las cataegorias por su id asi:

			categoria = Categoria.objects.get(id=categoria_id)
    		posts = Post.objects.filter(categorias=categoria)


5- por ultimo le especificamos en el renderizado que muestre tambien esos post filtrados asi:

    return render(request, "blog/categoria.html", {"categoria": categoria, "posts": posts})
    
6- podemos hacer una prueba antes de crear los links a las categorias de forma manual para ver si esta mostrando las categorias por su id y sus respectivos post pasanso en la url la ruta asi:

					/blog/categoria/1

asi debe mostrar los post de la categoria Internacionales.



------------------------------------------------------------------------------------------------

(v42) crear los links a las categorias

1- envolvemos {{categoria.nombre}} dentro de la etiqueta <a> y en esta etiqueta establecemos la ruta a donde nos tiene que llevar por medio de la propiedad url,aqui pasamos la url y el id que se necesita para que nos muestre una categoria en concreto. Si probamos veremos que ahora ya aparecen los links para cada categoria y nos llevan a las categorias indicadas.

2- le damos estilo a estos links para que se vean mejor,vamos a la hoja de estilos css que esta en ProyectoWebApp dentro de static, aqui creamos una clase para estos links.

NOTA: EN EL ESTILO CSS QUE QUEREMOS QUE SE MUESTRE SI LE PASAMOS LA INSTRUCCION !important HACE QUE ESE ESTILO TENGA PREFERENCIA SOBRE OTRO QUE PUDIERA ESTAR APUNTANDO AL MISMO ELEMENTO HTML, ASI NUESTRO ESTILO TENDRA PRELACION SOBRE OTROS.

---------------------------------------------------------------------------------------------------

(v43) vamos a crear la app de contacto

1- python manage.py startapp contacto

2- ahora registramos esta app en settings del proyecto en installed apps.

3- trasladamos la view de contacto(controlador de contacto) de ProyectoWebApp hacia views.py de nuestra app contacto,recordar que en principio comenzamos dejando todo en la app principal.

4- creo el archivo urls.py para contacto y alli  pongo la ruta a la vista de contacto.html, esta ruta como las otras comienza desde la raiz, osea se pone solo comillas vacias "", y la importacion del archivo views tambien se hace desde la raiz,porque es el views.py propio de contacto,entonces ponemos un punto en el from,(ver archivo)

5- ahora, vamos a urls.py del proyecto y en el urlpatterns pongo la ruta a esta app de contacto.

6- movemos el template de contacto que esta en ProyectoWebApp hacia la propia app de contacto y listo, queda la app completa, la app debe de tener todo dentro de ella(MVC) para ser reutilizable. Lista la app de contacto.

7- Ahora debemos crear un formulario de contacto en esta app, para eso debemos usar la clase Form de django(ver documentacion), para esto debemos crear un archivo de nombre forms.py, dentro de este una clase que utilize la clase Form y en esta clase se especifican los campos que vamos a necesitar en el formulario con su tipo de campo,longitud(opcional) y una etiqueta, es como el modelo para construir este formulario.

8- ya creado este archivo forms.py debemos llevarlo a la view de nuestra app, importamos esa clase que tiene ese archivo forms.py, despues antes del render instanciamos esa clase del formulario, y en el render paso un objeto como tercer parametro con la pareja de clave-valor, osea creo un nombre identificativo como clave y el valor sera esa instancia del formulario, es lo que hemos echo en las demas apps:

    return render(request, "contacto/contacto.html", {"miFormulario": formulario_contacto})

9- Por ultimo, para mostrar el formulario en pantalla, vamos a contacto.html y entre {{miFormulario}} pongo la clave del objeto del formulario.

---------------------------------------------------------------------------------------------------
(v44) vamos a darle estilos al formulario de contacto con boostrap, con el paquete forms de django es facil darle estilo al formulario(ver documentacion , escribir forms django en google) y si en la documentacion escribimos form rendering nos dara la informacion para poner bien el formulario. Podemos ver el formulario como table, parrafo oc omo klista <ul>.

1- vamos a utilizarlo como tabla, para esto se debe poner {{nombreFormulario.as_table}} dentro de una etiqueta <table> y el se encarga de darle la estructura adecuada.(ver codigo)

2- para convertir el cuadro de contenido en un textArea de html, en el modelo(forms.py) le pasamos como parametro de este cuadro el widget:  widget=forms.Textarea, asi se pone como un text area.(ver documentacion)

3- para darle estilo al formulario, vamos a la hoja de estilos css y alli se ponene los estilos, cuando le damos un estilo a lago especifico podemos hacerlo inline,como en el color de texto, pero ahora que vamos a centrar el from y darle mas estilos es mejor crear su propia clase en la hoja css.(ver codigo clase contenedorFormulario)

4- para que el div del form solo ocupe la mitad de la pantalla se le da width:50%, y para que se centre es: margin: auto;  y asi ademas queda responsive. Si queremos que tenga separacion por arriba y abajo y quede centrado se pone en el margin asi:  margin: 10px auto; se pondran 10px arriba y abajo y a los lados se centra.

NOTA: NO SOLO POR TRABAJAR CON LA CLASE FORMS DE DJANGO QUEDA EL FORMULARIO BIEN, DEBE DE ESTAR EL FORMULARIO DENTRO DE SU RESPECTIVA ETIQUETA <form> DE HTML.

5- para centrar el formulario propiamente(osea la etiqueta form), le podemos dar un estilo inline directamente para centrarlo con text-align:center, pero como este form tiene un table dentro, toca tambien darle un estilo al table para centrarlo, lo hacemos inline asi:  margin:20px auto; asi le damos un poco de separacion arriba y abajo y a los lados lo centra con auto.

6- listo, como en el modelo especificamos required para los dos primeros campos, la libreria forms de una vez valida. Aparece un error si damos una prueba asi no mas, el error es de CSRF(CROSS SITE REQUEST FORGERY), en si el CSRF es una medida de seguridad para asegurar que en nuestro formulario no se pueda ingresar informacion desde otro sitio web diferente, osea que solo se permita ingresa informacion desde nuestro sitio web que es donde esta nuestro formulario, y asi no se capturen nuestros datos desde otro sitio web. En si el error es que falta implementar el CSRF en nuestro sitio, este CSRF en si lo que hace es agregar un token a nuestro formulario, asi cuando nosotros enviemos el formulario el navegador lee este token y permite enviar los datos, si el token no esta el navegador saca el error y no envia nada, para poner este token lo hacemos en la plantilla del formulario agregando esto:  {% csrf_token %}, asi en segundo plano se estaria creando el token para que el navegador pueda leerlo(es como el token en nodejs pero aqui se hace más facil.)


--------------------------------------------------------------------------------------------------------
(v45) Envio de datos a traves del formulario

Para enviar datos por el formulario se hace con el metodo Post, y debemos utilizar el metodo request. Python envia los datos que se pasan en el formulario por medio e un diccionario. Si por ejemplo en el html del formulario ponemos esta linea despues del div,  <p style="color: white;">{{request.POST}}</p> y si llenamos el formulario y le damos enviar, podemos ver como estos datos se pasan a traves de un diccionario de python.

1- entonces, en la vista(controlador) podemos indicarle a django que si se ha echo Post(enviar) en el formulario, pues que nos rescate esa informacion. Lo hacemos pasandole a la instancia del formulario la data obtenida del request.POST(ver codigo), esto dentro de un condicional if, y una vez la instancia del formulario tenga almacenado esta data, le decimos que evalue si el formulario es valido que vaya almacenanado en variables lo que se escribio en cada campo por medio de request.POST.get("nombre de cada campo")

2- ahora, ya con la informacion enviada, debemos poder mostrar un mensaje en pantalla al usuario que le indique si se envio la informacion, para esto usamos la recarga de la pagina, cada vez que damos submit al formulario la pagina se recarga, entonces podemos enviar a esa recarga un parametro, osea, en el if despues de que capturo la data en sus respectivas variables, le indicamos que en la recarga de la pagina(osea un redirect) envie un parametro, y en el template le decimos que al darse la recarga(osea al haber un get del formualrio html) solo si se ha recibido ese parametro que nos ponga un mensaje, lo que quiere decir que si se recibio el parametro es porque s edio submit al formulario,de otra forma quiere decir que no se ha dado submit sino que se cargo la pagina del formulario por primera vez,por lo que no se estan enviando datos, asis e diferencia si el formulario se esta cargando por primera vez o si esta enviando datos.(ver codigo del controlador).

3- entonces, para decirle al formualrio que redireccione a la url del formulario de contacto lo hacemos con el metodo redirect y le pasamos la url con un signo ? que indicara el parametro. Este redirect hay que importarlo tambien en la linea de django.shortcuts.

4-por ultimo, en el html le debemos decir que verifique si se recibio ese parametro (que llamamos "valido"), y si se recibio quiere decir que se hizo submit, entonces nos debe de mostrar un mensaje en pantalla. Para esto usamos un if que verifique el parametro y si el parametro esta en la url pues que nos muestre un mensaje(ver codigo en el html del formulario)

--------------------------------------------------------------------------------------------------------
(v46) Envio de datos por correo electronico a una cuenta

NOTA: PARA ABRIR LA SHELL DE PYTHON ES:  python manage.py shell

1- en settings.py ponemos los parametros de configuracion para enviar correos electronicos

2- vamos a views.py(controlador) e importamos la clase EmailMessage,(podemos usar como en el video 24 el metodo sendmail).

3- Antes de hacer el redirect, usamos esta clase para enviar el mensaje al correo electronico. Se le pasa el asunto, nombre de quien envia el correo,  direccion de email de quien envia el correo y el cuerpo del correo,osea los campos del formulario, porque se supone que en el formulario nuestros usuarios son los que nos envian correos a nosotros como webmasters.

4- despues se pone coma y se especifica de quien viene este email,osea desde nuestra app de django, como ya lo sabemos lo dejamos en blanco(""), despues la cuenta de la que viene este email(va entre ["julianmoreno263@gmail.com"], para las pruebas estoy utilizando mi cuenta) y por ultimo si queremos que estos mensajes s epuedan contestar o no con el parametro reply_to=[email].

5- ahora enviamos este email con el metodo send(). Pero antes de enviar el email ponemos todo en un try-except para que nos saque si de pronto hay un error. En el try ponemos el redirect con el parametro valido si todo esta bien y si no, en el except ponems otro redirect pero con un parametro de novalido.

NOTA: ESTE CODIGO FUNCIONA BIEN, LO QUE SE TIENE QUE HACER ES EN MI CORREO DE GAMIL IR A :

1- ICONO DE MI CUENTA- GESTIONAR MI CUENTA
2- SEGURIDAD
3- INICIAR SESION CON GOOGLE- CONTRASEÑAS DE APLICACIONES Y GENERAR UNA CONTRASEÑA PONIENDO UN NOMBRE DE APLICACION CUALQUIERA, LA PARTE DE VERIFICACION EN DOS PASOS DEBE ESTAR ACTIVADA.
4- ESTA CONTRASEÑA DE APLICACION LA PONEMOS EN SETTINGS EN EMAIL_HOST_PASSWORD = "vuxbgzgoonmiuvph", POR EJEMPLO YO PUSE ESTA QUE ME GENERO, Y LISTO, ENVIO DESDE EL FORMULARIO UN EMAIL DE PRUEBA Y LO RECIBO BIEN, ESTA CONTRASEÑA DE APLICACION LA PUEDO BORRAR Y DESPUES PUEDO GENERAR OTRA PARA OTRAS PRUEBAS.

ASI YA NUESTROS USUARIOS PUEDEN ENVIAR CORREOS DESDE EL FORMULARIO A NUESTRA CUENTA DE GMAIL PARA COMUNICARSE CON NOSOTROS QUE SEREMOS LOS ADMIN DEL SITIO WEB.!!!!!!!

---------------------------------------------------------------------------------------------------
(v47) vamos a hacer la tienda de nuestra aplicacion.Para esta parte de la tienda tambien vamos a crear los respectivos modelos para productos y categorias(parecido al blog). Cuando un usuario vaya escogiendo productos y los lleve al carrito,estos se deben de ir sumando y al final debe de dar el total, cuando el usuario de "comprar", la aplicacion debera enviarnos un mensaje de email(a nosotros como administradores) para que sepamos que un usuario hizo una compra y asi poder enviarle los productos que compro. El orden para hacer esta parte(como las otras) es el siguiente:

- crear la app
- crear los modelos de categoria y producto
- registro en el admin
- crear las vistas(controladores)
- creacion de urls
- creacion de templates

1- entonces hacemos todos los pasos para crear la app de tienda y que quede todo incluido en ella para que sea reutilizable.

2- creamos los modelos para categorias y productos. Un modelo se llamara CategoriaProducto y el otro sera Producto. Como en esta app de tienda se van a relacionar los modelos de categorias con productos, en el modelo de Producto creo un campo "categorias" que sera llave foranea, osea relaciona a los productos con las categorias del modelo de CategoriaProducto, para indicarle esto se hace asi:

	categorias = models.ForeignKey(CategoriaProducto, on_delete=models.CASCADE)

3- Para el campo de la imagen le especifico en el metodo ImageField() en donde quiero que se almacenen las imagenes, entonces le digo "tienda", asi django crearar una carpeta "tienda" en la carpeta media donde se almacenan todas las imagenes. El campo precio sera de tipo FloatField(), y el de disponibilidad sera de tipo BooleanField(default=True) y por defecto sera True.

4- ya creados los campos hacemos las migraciones, primero: python manage.py makemigrations,  y luego hacemos python manage.py migrate. Asi, ya la bd se deben de ver reflejadas estas tablas con sus campos, si abrimos DB Browser para SQLite3, veremos las tablas creadas.

NOTA: COMO EL PROFE EN EL VIDEO AL MODELO DE PRODUCTO NO LE PUSO LOS CAMPOS CREATED NI UPDATED, Y SE LOS QUIERE AGREGAR, AL VOLVER A HACER LAS MIGRACIONES PARA QUE TOME ESOS CAMBIOS, DJANGO DETECTA QUE SE QUIEREN AGREGAR MAS CAMPOS A UN MODELO, ENTONCES DJANGO POR DEFECTO ASUME QUE PUDIERAN HABER YA REGISTROS CREADOS EN LA TABLA Y ENTONCES NOS PREGUNTA SI PARA ESOS POSIBLES REGISTROS QUEREMOS QUE TENGAN UN VALOR POR DEFECTO (PORQUE DJANGO ASUME POR DEFECTO QUE HAY REGISTROS EN EL MODELO QUE SE QUIERE MODIFICAR), ENTONCES EL PREGUNTA SI QUEREMOS QUE DJANGO SEA EL QUE DE UN VALOR POR DEFECTO O QUE SEAMOS NOSOTROS MISMOS LOS QUE MANUALMENTE ESTABLEZCAMOS UN VALOR POR DEFECTO A ESTOS REGISTROS DE ESTOS CAMPOS,COMO EN EL MOMENTO LA TABLA ESTA VACIA ELEGIMOS LA OPCION 1 PARA QUE SEA DJANGO EL QUE LO HAGA, DESPUES EL PREGUNTA QUE SI ACEPTAMOS QUE DJANGO PONGA EL VALOR POR DEFECTO "TIEMZONE.NOW", LE DECIMOS QUE SEA DJANGO EL QUE PONGA ESE VALOR POR DEFECTO. ESTE PROCESO SE DEBRA HACER CON CADA CAMPO QUE SE HAYA AGREGADO, Y DESPUES SE HACEN LAS MIGRACIONES NUEVAMENTE Y ASI YA SE TOMARAN LOS CAMBIOS.

5- Ahora estos modelos los debemos registrar en el admin para poder comenzar a crear registros. Debemos ir al archivo admin.py de "tienda" y alli registramos los modelos.Aqui se importan los modelos y se crean las respectivas clases para el registro de cada uno de ellos. Aqui lo que se hace es establecer que los campos created y updated son de solo lectura. Asi, si vamos a admin, ya veremos en nuestro panel de admin estas tablas.(ver archivo)

6- listo, podemos comenzar a agregar primero categorias y despues productos para ver que se relacionen.Entonces, si creamos categorias y despues vamos a crear productos, en el campo de categorias nos deben de aparecer las cataegorias que creamos, asi sabemos que se estan relacionanado las tablas.

7- ahora, para mostrar en pantalla estos productos, vamos a nuestro controlador(views.py) e importo el modelo de Producto, porque en la funcion debo crear un array que llamamos "productos" y aqui con el modelo de Producto vamos almacenando los productosque se creen de este modelo, y luego en el render le pasamos por medio de un diccionario(clave:valor) este array de "productos" para recorrerlo en el html con un bucle y mostrar asi essos productos.(ver archivo views.py de tienda)

----------------------------------------------------------------------------------------------

(v50) crear el template html para ver los productos de la tienda.

1- por ahora tomamos el mismo html de blog y lo copiamos en el de tienda para ver si se muestran las imagenes,el nombre y precio de los productos que ingresamos en el admin. 

NOTA: ME SALIA UN ERROR DE QUE LA IMAGEN NO SE ENCONTRABA EN EL MODELO, ERA PORQUE CUANDO CREE UN PRODUCTO SE ME OLVIDO CARGARLE UNA IMAGEN Y CUANDO EL BUCLE FOR EN EL HTML RECORRE EL ARRAY DE PRODUCTOS NO ENCUENTRA ESTA IMAGEN EN LA VUELTA DEL BUCLE Y SACA EL ERROR, TOCA PONER SIEMPRE TODOS LOS DATOS EN CADA REGISTRO.

2- El formato que le daremos a la tienda es de una grilla, en donde apareceran los productos en tarjetas y tendremos 4 cards por cada fila. En cada card aparecera la imagen,nombre,precio de cada producto. Bootstrap ya tiene clases para trabajar con grillas y con cards, si buscamos en google "bootstrap grid" aqui podemos ver ejemplos de grillas.

3- entonces, usamos la clase card de bootstrap para crear las tarjetas y le damos un tamaño especifico.

--------------------------------------------------------------------------------------------------

(v51) Para trabajar dentro de cada card y ponerle texto y mejorar las imagenes, usamos la clase de bootstrap  card-body. En el bootstrap.min.css podemos ver estas clases.

1- dentro de card, podemos crear un div con la clase card-body y dentro un titulo con la clase card-title donde mostramos el nombre del producto. Un parrafo para el precio con la clase card-text. Esta clase card ya tiene varias clases para poder hacer tarjetas muy facil. A la par con estas clases podemos poner estilos online para cuadrar los textos.

2- para centrar las cards en la pantalla debemos crear bien el grid de bootstrap con las clases de container y row. la clase col la ponemos dentro del bucle for para que tome cada vuelta de bucle a las cards. Hay que poner ahora el width de card al 100% para que tome todo el ancho de la columna. 

3- Para que las imagenes queden bien en tamaño, usamos la clase card-img-top.

4- si quiero que por cada fila se muestren 4 cards, especifico el col como : col-md-3, quiere decir que cada fila se divide en 3 columnas cada una con un tamaño de 4, asi la suma total da 12(que es el numero de columnas de bootstarp por cada fila). Elnumero de imagenes se ira adaptando segun el numero de columnas por fila y asi se va viendo responsive. Con d-flex en la col, hace que todos los cards sean uniformes,se adapten.

----------------------------------------------------------------------------------------
(v52) Carrito de compra.

debemos hacer una aplicacion para el carro de la compra, porque se debe de poder manejar la sesion de cada usuario, si un usuario sale de la aplicacion sin haber cerrado sesion, al volver al carro se deben de haber conservado los productos que habia metido al carrito,aunque todavia la aplicacion no tiene login, el carro debe de poder manejar la sesion de cada usuario. A continuacion, se describen las operaciones que debe de poder hacer el carro:

- manejar sesion de usuario
- agregar productos
- eliminar productos
- restar productos(diferente a eliminar el producto, aqui si tengo varios productos iguales, debo poder quitar los que quiera,por ejemplo si tengo 7 unidades d eun mismo producto y quiero quitar uno,debo poder hacerlo).
- vaciar el carro por completo.


1- creamos la app carro.

2- la registramos en settings en installed apps.

3- creamos un archivo carro.py y aqui creamos una clase que hara todas las tareas mencionadas,osea debemos crear esta clase Carro, para que cuando un usuario quiera agreagr cosas al carro,o elimianr,etc, se cree una instancia de Carro para la sesion especifica de ese usuario,osea, a cada usuario se le creara un carrito de compras y esto se hace utilizando esta clase, la cual en su interior tendra todas las funciones que necesita para operar. Para esto es que hacemos esta clase Carro.

4- almacenamos la request en el constructor para poder utilizarla mas adelante, con el self.request=request, el self es como el this de js,  la palabra clave self permite al usuario especificar y acceder a los atributos y métodos de una instancia de la clase. Hacemos lo mismo con la sesion.

5- construimos un carro para esta sesion.Es igualar la sesion del usuario con el carro de esa sesion.

6- con un if, debemos evaluar si el usuario salio de sesion y ya tenia un carro que guarde lo que ya tenia,y si salio de sesion y no tenia un carro pues que lo cree(ver archivo). El carro es un diccionario (clave-valor), la clave sera el id del producto y el valor seran las caracteristicas del producto,osea el valor sera otro diccionario con los parametros de nombre,precio,imagen de ese producto. Si no hay carro se creara un carro, osea un diccionario vacio. Si ya habia un carro de esa sesion, se le dice que el carro sera igual al que ya habia(ver codigo)

7- ahora hacemos un metodo para agregar productos, aqui primero evaluamos si el producto ya esta en el carro, esto lo hacemos con el id del producto, este id es un numero entonces debemos pasarlo a string con el metodo str() para compararlo con el metodo keys() de python, asi compara el id del producto con los que esten en el carro. Si el producto no esta en el carro lo agregamos pasandole el diccionario con los parametros, el parametro cantidad por defecto sera 1, porque lo estamos agregando.El precio en la bd esta como numero, aqui debemos pasarlo como string. Si el producto no esta en el carro lo agregamos dando click sobre el producto, y si queremos agregar otra unidad de ese mismo producto, debemos decirle que sume ese otro producto al darle click.

---------------------------------------------------------------------------------------------------
(v53) vamos a ver como ir sumando unidades de un producto,osea si el producto ya esta y queremos agregar mas.

1- entonces en el else del metodo agregar verificamos con un bucle for si el key y el value de ese producto ya existe en el carro, y si es asi, que incremente en uno el producto, ahora, si en el carro hay almacenados varios productos diferentes, y el que queremos incrementar esta por ejemplo de terceras, cuando el bucle for lo encuentre no necesitamos que siga recorriendo los demas,para eso es el break en el codigo.

2- ahora debemos actualizar el carro para almacenarlo en la sesion, asi que creamos una nueva funcion para actualizar la sesion del usuario, la llamamos guardarCarro(), esta funcion se usara asi guardemos productos,o eliminemos,etc, siempre debe ir actualizando el carro en la sesion.Aqui usamos el metodo modified.

3- para eliminar un producto creamos una funcion y evaluamos por el id del producto si esta en el carro,y si esta,utilizamos el metodo del para borrarlo, y despues de borrarlo, actualizamos de nuevo el carro con la funcion guardarCarro()

4- hacemos la funcion para ir restando unidades d eun mismo producto.Aqui es el mismo codigo del else de la funcion agregar, solo que aqui en vez de sumar 1, se resta 1. Despues de restar debemos ir comprobando si la cantidad del producto es menor a 1, osea si ya no hay unidades de ese producto, y si es asi pues debe eliminar el producto como tal,osea, si solo habia una unidad de ese producto y la eliminamos pues entonces debera eliminar el producto como tal llamando la funcion eliminar(),y se actualiza siempre el carro al final.

5- la ultima funcion que crearemos es para vaciar el carro, la llamamos limpiarCarro(), y aqui le paso el codigo que crea un carro vacio, osea:  self.session["carro"] = self.carro, y tambien se modifica la sesion tambien, con este codigo: self.session.modified = True. LISTOO!!! ESTAS SERAN  EN SI LAS FUNCIONES QUE DEBE DE HACER EL CARRITO DE COMPRA!!!

------------------------------------------------------------------------------------------
(v54) ya creadas las funciones que debe de hacer el carro, vamos a crear las vistas, aqui debemos importar la clase carro y los modelos de los productos.

1- importamos la clase Carro y el modelo Productos a views.py de la app de carro

2- cada vez que hagamos operaciones en el carro debemos redireccionar a la tienda para ver si se reflejan los cambios, entonces debemos importar el redirect de django.

3- Ahora comenzamos a hacer las funciones que agregaran,eliminaran,etc, cosas en el carro de compras, y aqui utilizaremos instancias de la clase Carro que contruimos,hacemos primero la funcion para agregar productos al carro y dentro creamos una instancia del carro.(ver codigo de views.py)

4- al crear la primera funcion para agregar un producto utilizamos la clase Carro para crear instancias de carritos de compra, y por ultimo redirijimos a la tienda para  ver los cambios reflejados en pantalla, el resto de vistas(controladores) para eliminar,etc, son parecidas.(ver codigo)

5- Hasta aqui las vistas ya estaran creadas, ahora debemos tener en cada card un boton para que al darle click podamos agregar los productos al carro. Vamos al html de la tienda, entonces despues del card-body creamos este boton.Este boton tendra la clase card-footer de bootstrap.

6- ahora creamos el widchet para el carrito(el icono) pero este solo debe aparecer en el html de la tienda,y lo ubicamos a la derecha de los articulos, para esto creamos un contenedor div y lo creamos antes del for y despues del div container, y para que se ubique a la derecha de cada fila le damos un estilo rigth(ver html de la tienda), en principio ponemos no un icono sino un texto para la prueba.

----------------------------------------------------------------------------------------
(v55) Vamos a crear una variable que almacene el precio de los articulos y que esa variable este disponible en todo el proyecto.

1- de lo que se trata es de hacer una variable global para que se almacene alli el precio de los articulos, debe ser global porque si el usuario esta en la tienda manejando el carro y cambia de pagina, la variable debe de mantener el valor aunque el usuario este viendo otra vista diferente a la de la tienda, en django para crear variables globales se usa el "procesador de contexto", entonces el texto que tenemos de prueba para el carrito lo vamos a reemplazar por una variable global.(ver documentacion en django, buscar context-ptocessor)

2- vamos a la app de carro y creamos un archivo llamado "context_processor.py", aqui creamos la variale global, para esto creamos una funcion y dentro la variable global que llamaremos total y la iniciamos en 0:

						def importeTotalCarro(request):
    						total = 0

asi con esto ya creamos una variable global.

3- ahora ya creada la variable, dentro de esta misma funcion debemos indicar que se vayan sumando los precios de los articulos agregados al carro, para esto primero debemos evaluar si el usuario esta autenticado, y si esta autenticado ir recorriendo los elementos que esten en ese carro y sumar sus precios.(ver codigo en el archivo processor.py)

				if request.user.is_authenticated:
        			for key,value in request.session["carro"].items():
						 total=total+(float(value["precio"])*value["cantidad"])
				return {"importeTotalCarro": total}

aqui esta el if que evalua si el usuario esta autenticado, y si lo esta, recorra con un for cada pareja (key-value) del carro al que le pertenece esa session, osea que recorra los items de cada producto del carro de esa sesion. Y despues que en la variable global guade la suma de la variable mas el valor de la propiedad "precio" por  el valor de la propiedad "cantidad" de ese producto, osea, si agregamos al carro tres unidades de un producto, pues que multiplique el precio del produto por tres.

4- y por ultimo que esta funcion nos retorne lo que tenemos guardado en la variable total con un return.

5- ahora, para hacer que esta funcion sea global(osea que esta variable que retorna sea global), agregamos en settings.py del proyecto esta funcion en la parte de TEMPLATES-OPTIONS, aqui estan los context_processors, aqui damos toda la ruta donde se encuentra esta funcion(ver archivo settings).

6- listo, ahora para usar esta variable global total(o mejor dicho usar la funcion), vamos al html de la tienda y reemplazamos el texto del carrito por esta funcion asi: Total: {{importeTotalCarro}}, asi nos debe sacar el valor actual de la variable , osea un 0 en este momento.

NOTA IMPORTANTE: SI NOS SALE UN ERROR DE QUE NO SE ENCENTRA O SACA UN ERROR DE EXCEPCION DE VALOR O TIPO,DICE QUE NO RECONOCE LA KEY "CARRO", EN EL VIDEO 59 EL PROFE EXPLICA PORQUE APARECE ESE ERROR, A VECES SE QUITA SI HACEMOS ESTO DE BORRAR LAS COOKIES: DEBEMOS BORRAR LOS DATOS DE NAVEGACION Y ACTUALIZAR CON F5 Y LISTOOO!!!, VEREMOS REFLEJADO EN PANTALLA EL VALOR DE LA VARIABLE GLOBAL. 

PERO EN SI, SI SALIMOS DE LA APLICACION Y VOLVEMOS A ENTRAR VUELVE EL ERROR, ESTO ES PORQUE COMO SALIMOS LA SESION SE CIERRA, Y COMO EN LA CLASE CARRO(EN EL ARCHIVO carro.py) ESTAMOS UTILIZANDO SESIONES PARA QUE SE CONSTRUYA EL CARRO DE CADA SESION CON ESTA KEY DE CARRO,Y ESTE CARRO LO UTILIZAMOS EN EL CONTEXT-PROCESSOR TAMBIEN, POR ESO NOS DA ESE ERROR, PORQUE AL CERRAR SESION ESTE CARRO YA NO EXISTE, ESTO LO ARREGLAMOS HASTA QUE CONSTRUYAMOS EL SISTEMA DE AUTENTICACION COMPLETAMENTE, POR EL MOMENTO LO QUE EL PROFE HACE ES EN LA CLASE CARRO COMENTAR EL CODIGO DEL CONSTRUCTOR Y EN EL CONTEXT-PROCESSOR TAMBIEN COMENTA EL IF Y EL FOR, ASI POR EL MOMENTO SE EJECUTA BIEN LA APLICACION Y NO NOS SACA ESE ERROR.

LISTO, ESTA VARIABLE ES GLOBAL PORQUE SE PUEDE ACCEDER A ELLA DESDE CUALQUIER PARTE DE NUESTRA APLICACION, Y MANTIENE SU VALOR, SI VAMOS AOTRA VISTA Y VOLVEMOS A LA TIENDA, EL VALOR DE ESTA VARIABLE SE MANTIENE.

-----------------------------------------------------------------------------------------------
NOTA PARA CAMBIAR TEMA DEL ADMIN DE DJANGO:

1- DEBEMOS INSTALAR EL PAQUETE JAZZMIN DESDE PIP

						pip install -U django-jazzmin

2- VAMOS A SETTINGS.PY DEL PROYECTO Y EN INSTALLED-APPS PONEMOS A JAZZMIN DE PRIMERAS.

3- PARA CAMBIAR A TEMA OSCURO VAMOS A LA DOCUMENTACION DE JAZZMIN Y EN LA PARTE IZQUIERDA ESTA UN APARTADO DE UI TWEAKS, AQUI BUSCAMOS UN CODIGO DE TEMA OSCURO Y ESTE CODIGO LO PEGAMOS PUEDE SER DEBAJO DE INSTALLED APPS, Y ASI LA INTERFAZ PASA AL MODO OSCURO:

						JAZZMIN_UI_TWEAKS = {

							"theme": "darkly",
						}


----------------------------------------------------------------------------------------------
(v56) Vamos a crear el widget para el carro de la compra.

1- el widget para el carro sera una tabla con el nombre,cantidad y precio del articulo. Entonces, vamos a la app de tienda, aqui dentro de la carpeta templates creamos una subcarpeta donde crearemos el widget del carro,la subcarpeta la llamamos carro y creamos el archivo widget.html.

2- ahora, a modo de prueba, ponemos en el archivo del widget un texto, y para vincular este widget al html de la tienda, vamos debajo donde imprimimos la variable del precio ("importeTotalCarro") y con un include vinculamos la ruta de este archivo widget.html(ponemos la ruta al html del widget) y debe mostrarse(ver codigo)

3- ahora, sabiendo que ya aparece el widget, vamos a crear la tabla para este widget con clases de bootstrap(ver archivo)

4- dentro de la tabla y despues del </thead> creamos el cuerpo de esta tabala, para que nos salga un mensaje si no se ha agregado nada en el carro, y apenas se agrege un producto que nos saque el nombre de ese producto, lo hacemos con una etiqueta <tbody>(ver codigo)

        					{% if request.session.carro.items %}
								{% for key, value in request.session.carro.items %}

con este if le estamos evaluando: si hay items(productos) en el carro en la peticion de esta sesion, que recorra con un for el diccionario(el carro es un diccionario de parejas clave-valor), y con un else mostramos un mensaje de alerta si no hay productos en el carro.

5- ahora, debemos poder decirle al widget del carro que agrege, reste,etc, productos al carro, entonces usamos las vistas de nuestra app de carro que ya habiamos echo, y para poder usarlas debemos crearles las rutas correspondientes a estas vistas en un archivo urls.py en la app de carro.(ver archivo):

    path("agregar/<int:producto_id>/", views.agregarProducto, name="agregar"),

estas rutas quedan asi: la ruta para agregar un producto sera agregar/ y como recibe un parametro para el id de cada producto de tipo numerico se pone <int:producto_id>/. Y esta ruta llamara a la vista agregarProducto, y le ponemos un nombre identificativo("agregar"). Hacemos lo mismo con las otras rutas para las demas vistas de eliminar,vaciar el carro,etc.

6-creadas las rutas, podemos ponerles un nameSpace(nombre identificativo para todas las rutas), esto es, si por ejemplo creamos el nameSpace y lo llamamos "carro", para apuntar a una ruta en especifico simplemente tendremos que poner por ejemplo:  carro.agregar, donde "agregar" es el nombre identificativo de la ruta como tal, asi abreviamos codigo.Para crear este nameSpace sera asi:  app_name = "carro". Esto tambien sive para evitar colision de nombres en las rutas, si tengo otros archivos con el mismo nombre de esta ruta se evitara que choquen entre si.

7- Ahora registramos estas rutas, vamos a urls.py del proyecto y agregamos estas rutas del carro.

8- ahora, en la tienda,los botones de los cards no nos llevan a ningun lado, entonces debemos indicarles que cuando demos click en ellos para agregar el producto nos lleven a la ruta de "agregar" y ademas pasar el id del producto asi: 

	<a href="{% url 'carro:agregar' producto.id %}" class="btn btn-success">Agregar al carro</a>


asi cuando se pulse en los botones de las cards, la ruta llamara a la vista(controlador) de agregarProducto y agregara el producto al carro.

9- echo esto, debemos ir al widget.html(carro de la tienda) y en el bucle for a cada vuelta de bucle se debera crear una fila con el valor del nombre,cantidad,suma y ademas que aparezcan los botones que permitan ir agregando y restando articulos.(ver archivo)

--------------------------------------------------------------------------------------------------
(v57) 

1- siguiendo con el widget vamos a construir esta tabla dentro del bucle for.(ver archivo widget)

2- para mostrar el total en el carro, usamos la variable global que creamos, la mostramos debajo del tbody del carro usando un <tfoot>. Eliminamos en el html de la tienda esa variable porque la teniamos hay mientras haciamos las pruebas.

NOTA: CORREGIMOS UNOS ERRORES QUE SALEN RESPECTO AL carro Y A LA URL DE tienda, PUNTUALMENTE CON LA URL DE "tienda", AL REDIRECCIONAR A "tienda" DEBEMOS HACERLO PERO CON LA PRIMERA LETRA EN MAYUSCULA PORQUE ASI LO ESPECIFICAMOS EN URLS.PY DE TIENDA,OSEA "Tienda" CON LA PRIMERA LETRA EN MAYUSCULA. TODOS LOS REDIREC DEL ARCHIVO "carro.py" DEBEN APUNTAR A "Tienda".(VER VIDEO)

3- Listo, corregidos estos errores, si damos agregar en un producto ya aparece dentro del carro con su nombre, cantidad,precio y los botones de agregar y quitar.

-------------------------------------------------------------------------------------------------
(v58) vamos a completar los detalles del carro de la compra, puntualmente hacer que los precios se actualizen segun vamos agregando o quitando productos, que la suma o resta trabaje bien y se refleje en el total.

1- primero corregimos los precios de cada articulo para que se actualizen bien, vamos a la clase Carro del archivo carro.py y hay tenemos los metodos de agregar o restar, primero en el de agregar, en el else es donde le decimos que si ya hay un producto en el carro vaya sumandole 1 a la cantidad si le agregamos otro producto, entonces debajo de esta linea tambien le decimos que despues de agregar esa cantidad tambien incfremente el precio sumandole el producto.precio,esto lo ponemos en un float para que pueda manejar decimales. Listo, si hacemos una prueba de ir agregando unidades de un mismo producto el precio y la cantidad se iran actualizando.(ver archivo)

2- ahora hacemos que decremente, osea que sirva el boton de "-". Entonces la linea que hicimos para actualizar el precio al agregar unidades sera la misma para actualizar el precio al restar unidades,solo que cambia el signo.(ver archivo)

3- ahora debemos hacer que la suma total se actualize bien, al sumar o al restar. Este codigo esta en el archivo context-processor, porque hay definimos la variable global para la suma, y esta variable no se actualiza porque el codigo esta dentro de un if el cual evalua si el usuario esta autenticado, y como aun no hemos echo un sistema d eautenticacion, pues el if nunca se ejecutara. El sistema d elogin lo haremos mas tarde, mientras tanto para ver si la suma total sirve, dejamos comentado el if y hacemos que el codigo entre en el for, asi se ejecutara este for donde se va actualizando la suma, pero se quita el ultimo pedazo del codigo donde le decimos que multplique el precio por la cantidad, porque si no la suma queda mal,osea eliminamos este pedazo:

								*value["cantidad"])

asi la suma ya queda bien. Listo!! la suma total ya queda bien.

---------------------------------------------------------------------------------------------------
(v59) asi como esta nuestra app, si cerramos sesion, osea si cerramos el servidor, y volvemos a abrirlo nos da un error porque la variable carro no la encuentra, esto es porque en el context processor le estamos definiendo que si hay una sesion utilize esta variale, pero como aun no hemos echo un sistema d eautenticacion para manejar sesion pues falla, si nos logeamos en el admin como superusuarios podemos hacer uq efuncione porque ya abra una sesion,pero al terminarla volvera a fallar, por lo que debemos hacer un sistema de logeo.

1- vamos a crear una nueva app llamada "autenticacion" para crear alli tanto el login de usuarios como el registro.

2- ahora vamos a las views.py de esta app y creamos la vista autenticacion con un pass por el momento,vamos a hacer primero los pasos para que al poner en la url la ruta se nos muestre el template de esta app y ver si todo va funcionando bien(ver video)

3- creamos el archivo urls.py de la app de autenticacion

4- Incluimos desde urls.py del proyecto la ruta a este urls.py de autenticacion, en urlpatterns

5- registramos esta app en settings.py del proyecto en installed_apps.

6- creamos el html para autenticacion dentro de una carpeta templates, y dentro de una carpeta llamada registro, copiamos el html de contacto y lo pegamos en el de autenticacion y le dejamos solo los bloques para que se muestre la misma estructura de los demas templates.

7- por ultimo, en views.py de autenticacion quitamos el pass de la vista que hicimos y le decimos con un return que nos renderice este html, ahora si en el navegador vamos ala rutade autenticacion nos debe d erenderizar este template.

LISTOO!!  AHORA CREAREMOS EL FORMULARIO DE REGISTRO DE USUARIOS UTILIZANDO UNA CLASE QUE TIENE DJANGO PARA ESTO, PUES AYUDA A HACER FORMULARIOS DE REGISTRO MUY FACIL Y COMPLETOS, ESTA CLASE SE LLAMA "UserCreationForm".

ESTA CLASE CREA EL FORMULARIO Y ADEMAS TODOS LOS USUARIOS QUE CREEMOS DESDE ESE FORMULARIO IRAN AUTOMATICAMENTE A LA TABLA USERS EN EL ADMIN.


-------------------------------------------------------------------------------------------------
(v60) Vamos a crear el formualrio de registro de usuarios usando la clase "UserCreationForm"

1- Usando esta clase se creara un formualrio con tres campos y automaticamente se registran los usuarios en la tabla del admin para usuarios. Entonces vamos a las vistas pero en vez de crear una funcion vamos a crear una clase que gestionara el get y el post del formulario, esta clase hereda de "View"(ver video)

2- dentro d ela clase creamos los dos metodos, el get y el post.

3- ahora, como en el urlpatterns de urls.py de autenticacion estabamos haciendo referencia a una funcion, ya no sirve porque estamos manejando una clase, entonces debemos importar aqui la clase y en el path llamar a esta clase como una vista asi:  VRegistro.as_view()  (ver archivo)

4- ahora, si actualizamos ya no se muestra esta pagina de autenticacion porque no encuentra este archivo html, entonces vamos de nuevo a las views.py y aqui es donde creamos el formulario en el metodo get usando la clase de django. Importamos la clase, creamos una instancia de esta clase y se le pasa como parametro del render el html que creamos.(ver archivo)

5- ahora vamos a nuestro html y creamos el codigo del formulario, le ponemos el metodo post para que envie los datos. Dentro de este form ponemos {% csrf_token %} para la seguridad de nuestros formularios y por ultimo para que se nos muestre el formulario de la clase UserCreationForm simplemente ponemos {{form}} (donde form es la instancia de esta clase) y asi podemos ver que se crea el formualrio de registro. Si actualizamos la pagina veremos el formulario, ademas este formulario ya viene con sus respectivas validaciones, aunque no tiene formato css ni el boton de enviar, pero eso se lo damos despues.

--------------------------------------------------------------------------------------------
(v61) Vamos a darle estilos al formulario. Vamos a utilizar bootstrap junto con el paquete de django crispy-forms el cual es un paquete que nos ayudaa a darle estilos a los formularios d eforma rapida y sencilla.

1- instalamos crispy-forms desde pip:  pip install django-crispy-forms(con pip list verificamos que se instalan los paquetes)

2- ahora para utilizar este paquete vamos al html del fomulario y lo importamos despues del load static asi:

						{% load crispy_forms_tags %}

3- ahora en donde llamamos al formulario le decimos que utilizara esta paquete asi:

						{{form|crispy}}

4- ahora este paquete tenemos que registrarlo en settings en installed_apps donde vamos instalando nuestras apps. Y luego en este mismo archivo de settings vamos hasta el final y debemos decirle a bootstrap que utilizara este paquete asi:

						CRISPY_TEMPLATE_PACK="bootstrap4"

utilizaremos la version 4 de bootstrap(o la que estamos trabajando)

5- Listo, ahora si vamos a la url de autenticacion ya veremos el formulario de autenticacion con un estilo. Aqui ya podemos comenzar a darle estilos.

6- las letras salen en gris, en herramientas d edesarrollador podemos ubicar la lista ul y el color de texto de esta lista, si damos click en el color nos sale una paleta de colores apara seleccionar el que queramos,podemos tomar ese codigo de color que queremos y reemplazarlo en el archivo de bootstrap.min.css, en VSC damos en Edit y replace y nos salen dos cuadros,uno para seleccionar el color que queremos reemplazar y el otro para ingresar el que queremos poner,reemplazamos y para que los cambios se apliquen damos CTRL+F5 para actualizar y listoo!!!!.

8- el formulario {{form | crispy}} lo podemos meter en un div junto con el boton y a este div darle margin auto para que lo centre todo y darle un width de 50% para que quede mejor.

NOTA: SI SALGO DE LA APLICACION Y  ENTRO ME DA EL ERROR DEL CARRO PORQUE NO TENGO SESION, PARA ESOMIENTRAS TANTO COMENTAMOS LAS LINEAS DEL CONSTRUCTOR DEL ARCHIVO CARRO.PY Y EN CONTEXT-PROCESSOR COMENTAMOS LAS LINEAS DEL BUCLE FOR, ASI PODEMOS TRABAJAR MIENTRAS TANTO.
------------------------------------------------------------------------------------------------------
(v62) Vamos a crear la cuenta de usuario, osea que el usuario se pueda registrar usando este formulario y esa cuenta quede registrada en la bd, asi una vez el usuario se registre ya quede logeado.

1- Mientras tanto para no tener problemas con el carro, comentamos las lineas en el archivo carro.py del constructor y en context-processor las lineas del bucle for.

2- ahora, la bd tiene una tabla llamada "auth_user", si vemos los registros veremos que por ahora solo tenemos el superusuario que creamos, la idea es que cuando un nuevo usuario se registre, automaticamente s eguarde en la tabla y se redireccione al home.

3- entonces, en nuestra views.py de autenticacion, habiamos creado una funcion post, esta la utilizaremos para enviar los datos que el usuario ingreso en el formulario a la bd, aqui se debe hacer lo mismo que con la funcion get, crear un form de la clase UserCreationForm pero se le pasa request.POST, osea a este form se le esta guardando lo que el usuario envia a la bd mediante el metodo POST de la peticion.(ver archivo)

4- con el metodo save() ya se guarda la informacion en la bd.Ahora, ya registrada la informacion en la bd, se supone que apenas el usuario se registra debe quedar logeado(mas adelante s ehara un formulario de login), para esto s eutiliza el metodo login de django el cual se debe importar, este metodo pide la request y la informacion que se salvo del usuario.

5- luego de logearse se debe redirigir al home(la ruta del home es Home), para esto se utiliza de django shortcuts un redirec a Home.

6- ahora, como este formualrio creado con la clase UserCreationForm ya tiene sus propias validaciones, debemos poner estas lineas del metodo post dentro d eun if para que se ejecuten solo si el formulario isValid. Hasta aqui podemos hacer una prueba teniendo en cuenta las condiciones de validacion del formulario. Si las credenciales estan bien, ya tendre una sesion de usuario y puedo quitar los comentarios del carro para que ya no me salga mas ese error.

PERO OJO, CON ESTE USUARIO TENGO SESION DE USUARIO PERO NO DE ADMIN, PORQUE PARA EL ADMIN TENEMOS NUESTRO SUPERUSUARIO, Y PARA TENER SESION DE SUPERUSUARIO DEBEMOS SEGUIR MANTENIENDO COMENTADAS LAS LINEAS DEL CARRO.

7- ahora en el else, debemos indicar que hacer si el usuario no es valido,osea si la validacion falla por algun motivo.Estos formularios de django tiene unos mensajes de error en rojo para cuando las validaciones fallan, para gestionar estos mensajes toca importar la libreria messages de django. Ahora con un for recorremos esos errores porque un usuario puede comter varios errores, en si esos mensajes d eerror de django se almacenan en un array, entonces los vamos recorriendo con un bucle, y en ese bucle le decimos que nos vaya mostrando el respectivo mensaje de error, por ultimo debemos decirle que como hay errores nos siga dejando en el formulario de registro,osea que nos siga mostrando el formulario hasta que se ingresen bien las credenciales.(ver archivo)

LISTOOO!!! SI HACEMOS PRUEBAS CON CREDENCIALES ERRONEAS NOS SALDRAN LOS MENSAJES DE ERROR!!!!

YO CREE EL USUARIO manolo9 CON PASSWORD fernandez654321 Y SE LOGEA BIEN Y NOS ENVIA AL HOME, AL REFRESCAR LA BD APARECE ESTE NUEVO USUARIO CON SU PASSWORD ENCRIPTADO!!!!!

NOTA: EN VIEWS.PY EN LA IMPORTACION DE LOGIN HAY UNA ADVERTENCIA,PARECE QUE PUDIERA SER QUE POR LA VERSION DE DJANGO LA IMPORTACION YA NO SE MANEJA ASI DEL PAQUETE LOGIN, PERO DE TODAS FORMAS ME FUNCIONA(INVESTIGAR ESTO- PARECE QUE CON VERSIONES D EDJANGO 3 LA IMPORTACION ES ASI,PERO YO TENGO LA ULTIMA QUE ES 4.0)

-----------------------------------------------------------------------------------------------
(v63) vamos a ver como manejar la sesion de usuario, osea, poner en la pagina algo que identifique que el usuario esta logeado, que tiene una sesion, y ademas vamos a poner algo para que se pueda deslogear,como el logout.

1- Vamos a poner el enlace que dice "HOLA <nombre usuario>" cuando un usuario esta logeado, en la parte superior derecha de la pagina, como este enlace debe mostrarse en cualquier parte de la aplicacion donde este el usuario logeado,osea si esta en la tienda,o si esta en  servicios,etc, debemos poner este enlace en el archivo base.html. Este enlace ira entre el h1 del titulo principal y la barra de navegacion.

2-Ahora vamos  a hacer que se muestre la palabra Autenticado si el usuario se logeo, o No autenticado si no lo esta. Entonces en ese div que creamos ponemos un cindicional if de django con su correspondiente else, asi si el usuario esta autenticado o no lo esta apareceran las respectivas palabras.Listooo!! si creo un nuevo usuario al momento de crearlo ya me logueo y me envia al home y aparece "Autenticado", lo mismo si cierro sesion. Ahora, quiero es que me muestre la frase Hola y el nombre de usuario cuando me autentique. Para esto es tan sencillo como indicar en el if que hicimos el nombre de usuario entre llaves asi:  {{user.username}} y aparece el nombre del usuario. Y si el usuario no esta logeado quiero que me aparezca un enlace para poder hacer login(el formulario de login lo haremos mas adelante), entonces en el else pongo por ahora un enlace para login,este enlace por ahora no llevara a ningun lado,mas adelante nos debe llevar al formulario de login. Tambien por ahora crearemos otro enlace al lado del de login para que nos lleve al formulario de registro pasandole el nombre d ela ruta "Autenticacion".

3- Tambien necesitamos poner al lado del nombre del usuario cuando esta logeado un enlace que nos permita cerrar la sesion, pero para cerrar la sesion debemos crear otra vista(controlador), lo hacemos en views.py pero fuera d ela clase.
dentro de esta nueva vista debemos decirle que cierre sesion usando el metodo logout de django, se importa este metodo en la misma linea donde importamos el login.Este metodo logout se le pasa la request y listo, asi se cierra la sesion, pero despues debemos decirle que redireccione por ejemplo al home.Si hacemos una prueba, al cerrar sesion deben aparecer los enlaces pertienentes y si abro sesion tambien.

4- para usar esta vista debemos registrar su ruta en nuestras urls.py(ver archivo), y en base.html ponemos el respectivo enlace que llame a esta vista de cerrarSesion.

LISTOOO!!! SI HACEMOS PRUEBAS, YA FUNCIONA CORRECTAMENTE TODO LO DE LA SESION DE UN USUARIO, AHORA FALTA HACER EL FORMULARIO DE LOGIN.

----------------------------------------------------------------------------------------------------------
(v64) FORMULARIO DE LOGIN

1- creamos una nueva vista llamada logear en views.py. Para crear en django un formulario de login, hay una clase llamada AuthenticationForm, la importamos del mismo paquete de UserCreationForm(en la misma linea), esta vista debe retornar en un nuevo html el formulario de registro,lo creamos en una nueva carpeta dentro de templates de la app de autenticacion.

2- el html del formulario de login sera igual al de registro gracias a que usamos crispy-forms, entonces solo copiamos el codigo y solo cambiamos el texto del boton del formulario.

3- registramos la url de esta vista en urls.py(ver archivo), ahora, si en la url ponemos la ruta "autenticacion/logear" nos muestra este formulario de login, solo que si damos enviar no hace nada, tenemos que decirle como validar el formulario. Entonces debemos capturar lo que el usuario ingresa en los campos de username y password en variables, y con el metodo authenticated de django contrastar esa informacon capturada con lo que este en la bd y ver si el usuario es valido o no.

4- entonces en la vista de logear preguntar si se ha pulsado el boton de logear con el metodo POST, que se guarden los datos que el usuario a ingresado en el formulario con el metodo POST. Despues preguntamos si el formulario es valido guardamos en variables lo que el usuario ha ingresado en los campos de username y password, esto con un metodo get.
Por ultimo ya teniendo estos datos capturados, con el metodo authenticate contrastamos la informacion con la bd, este metodo tambien se importa en la linea de login y logout(ver archivo.)

5- Con el metodo authenticated revisamos las credenciales, y despues con un if se pregunta que si estas no estan vacias(osea que si existen en la bd) pues que puede hacer un login, para este if se pregunta asi: if usuario is not None, esto en si esta validando "si el usuario no esta vacio", por es puede logearse, y despues de logearse que me envie al home.

6- si el usuario no existe ponemos un mensaje de error.Listoo, podemos hacer una prueba logeandonos, si no ponemos credenciales validas nos seguira mostrando el formulario de login. Ahora en la plantilla base.html ponemos la correspondiente url en el enlace para que al pulsar nos muestre el formulario.

7- Debemos incluir mensajes de error en caso de que el login este incorrecto, porque si esta incorrecto me sigue mostrando el formulario pero no indica mensaje alguno, si vamos a la documentacion de django podemos poner "messages" y en el enlace "messages framework" hay toda la informacion de como incluir mensajes, hay niveles de mensajes(ose tipos de mensajes y nos dice que paquetes importar segun el tipo de mensaje) y hay etiquetas segun los niveles de mensaje. Entonces en settings.py es donde debemos espoecificar que etiquetas vamos a utilizar, lo hacemos despues de la linea de import os asi:  

					from django.contrib.messages import constants as mensajesError

podemos poner un alias a estos mensajes de error para referirnos a ellas,(mensajesError), esto esta en la documentacion.

8- ahora, vamos al final del archivo y ponemos un diccionario, en este diccionario es donde se establecen los mensajes de error(ver documentacion).Ponemos 5 niveles de mensajes pero no los vamos  a usar todos,esto es segun lo que necesitemos.

9- ahora ya con esta configuracion, vamos a poner el mensaje de error que creamos en la vista de logear en el template de  login.html, lo pondremos encima del formulario, entonces nos ubicamos junto encima del {{form | crispy}}, aqui creamos un condicional if de django donde preguntamos que si hay mensajes pues que recorra los mensajes(el array messages) de error que hayan podido surgir(porque pueden haber ocurrido varios errores) y que los muestre(ver login.html), entonces si hacemos una prueba logeandonos mal, nos saldra encima del formulario el mensaje de error que hicimos en la vista. Podemos darle un estilo css online al mensaje de error, o utilizar bootstrap(ver archivo login.html)

ESTOS ERRORES SE PUEDEN PERSONALIZAR(VER DOCUMENTACION)

---------------------------------------------------------------------------------------------------
(v66) Aplicacion de pedidos y correccion de carro.

Vamos a hacer la app para pedidos, pero primero vamos a corregir cosas que teniamos en la parte del carro, pues estaba comentado para que nos dejara trabajar sin tener la parte de sesiones construida.

1- quitamos los comentarios del archivo carro.py que habiamos comentado, pero para que no me salga un error de "no hay un atributo carro", entonces quito el else que habiamos creado en el constructor de la clase y el codigo dentro de ese else lo idento al mismo nivel del if, asi siempre se creara el carro de compras y no sale error, tambien descomento el codigo del context-processor.

2- en el context-processor con un if estamos validando que si el usuario esta autenticado(osea esta logeado) debe ir mostrando el total del carro, si nosotros no hacemos login se podra ir sumando productos al carro pero no muestra el total, para esto debemos logearnos, y como la sesion se va guardando nos mostrara el total de los productos que hayamos agregado antes de logearnos,(la sesion se abre cuando abrimos la aplicacion,pero otra cosa es logearnos en la aplicacion)

3- asi como esta el carro, lo mejor es que solo se muestre si el usuario esta logeado, podemos ponerle un mensaje temporal en la varable total diciendo que "debe hacer login para ver el total", pero esto no es lo mas elegante, entonces lo mas optimo es solo mostrar el carro cuando el usuario este logeado, si no lo esta mostrar un mensaje diciendole al usuario que debe logearse para ver el carro. Para esto debemos ir al html de la tienda, ubicamos el div donde incluimos el widget del carro y envolvemos este widget con un if validando si el usuario esta autenticado y si no lo esta mostrar un mensaje al usuario que debe hacer login para ver el carro(ver tienda.html)

4- ahora ya sale el mensaje para el usuario si no esta logeado, pero si nos logeamos aparecera el error de siempre del carro, esto es porque en el context-processor se necesita tener el carro, osea desde que se inicia la aplicacion ya se deberia de crear una instancia de carro para que todo funcione, como la aplicacion cuando se incia lo primero que muestra es el home, pues sera en el home el lugar adecuado para iniciar la instancia del carro, asi que vamos a la vista de home(la cual es el archivo de views.py en la aplicacion de ProyectoWeb) y aqui creamos la instancia de carro para que al inicio de todo se cree el carro y ya este disponible en el context-processor y asi ya no tengamos este error, para crear esta instancia usamos la clase Carro del archivo carro.py,debemos importarla para poder usarla,(ver views.py de Proyectoweb)

LISTOOOO!! EL CARROOOOO!!!! AQUI YA EL CARRO FUNCIONA BIEN, YA PODEMOS COMENZAR A HACER LA APLICACION PARA LOS PEDIDOS.

----------------------------------------------------------------------------------------------------------------
(V67) Vamos a crear la app de pedidos, cuando un usuario vaya agregando productos a su carrito, la app de pedidos debera enviar esos productos al correo electrónico de ese usuario.

1- Creamos la app:  python manage.py startapp pedidos

2- debemos crear dos modelos para manejar los pedidos(dos tablas en la bd), una sera el modelo "Pedido" donde se registra un id del pedido,un campo creado y el id del usuario que hace este pedido, y la otra tabla sera llamada "LineasPedido" donde se registrara la cantidad de cada producto pedido,la fecha de creacion del pedido, un campos para que enlace esta tabla con la de pedido, el id del producto y el id del usuario.Esta tabla sera en si para desglosar los productos que se piden.

3- vamos al archivo models.py y creamos las clases para estos modelos. En el modelo de Pedido debemos utilizar el usuario que esta activo para crear el campo user, para esto utilizamos el paquete get_user_model de django. Este metodo captura el usuario activo,el que e sta logeado, y le decimos que en caso de eliminar el usuario pues elimine en cascada todos los registros relacionados con este usuario asi:

						user=models.ForeignKey(User,on_delete=models.CASCADE)

y creamos un segundo campo para la fecha en que se crea el pedido, el id se crea automaticamente. Tambien no olvidar crear la clase Meta en donde se especifica como queremos que se guarde en la bd el nombre de la tabla en singular y plural. Le especificamos que nos devuelva el string del id, y creamos una propiedad con @property para que nos devuelva el total del pedido, esta sera en si una funcion pero por ahora la dejamos para lo ultimo, por el momento solo dejamos estos campos para ver si se genera bien un pedido.(ver archivo)

4- Ahora vamos a hacer la otra clase para la otra tabla llamada LineaPedido, tendra los campos user,productoID,pedidoID,cantidad el cual tendra por defecto un valor inicial de 1, y el campo de create(para la fecha de creacion). Ademas este modelo devolvera el string de cantidad y nombre de producto.(ver archivo)

5- Hacemos d euna vez la funcion que nos saca el total del pedido, para esto utilizamos unas funciones de django que s eimportan desde el models, con estas funciones hacemos la suma utilizando el modelo de LineaPedido y la salida d eeste calculo lo damos con decimales(para que se puedan usar decimales)(ver codigo en views.py). Hacemos las migraciones para que en la bd aparezcan estas tablas.

--------------------------------------------------------------------------------------------------------
(v68) Seguimos con nuestra app de pedidos, debemos registrarla porque no la habiamos registrado, tambien registraremos los modulos de Pedido y LineaPedido en el admin, ademas debemos crear un boton en el carro de compras para que el usuario pueda darle "comprar" y asi compre su pedido y debemos crear la respectiva vista(controlador) para procesar este pedido,osea que se le envie el pedido por correo electronico al usuario.

1- Vamos a registrar primero nuestra app de pedidos y los modulos en el admin. En settings.py en installed-apps registramos la app de pedidos, y despues hacemos las migraciones: 

								python manage.py makemigration
								python manage.py migrate

y debemos crear el archivo urls.py de esta aplicacion para registrar alli la url y la vista de pedidos(en la vista de pedidos se creara una funcion para procesar el pedido,entonces en este archivo de urls.py se hace referencia a esa funcion y se le da un nombre identificativo ), y despues vamos al urls.py de la aplicacion y registramos el path asi:

						path('pedidos/', include("pedidos.urls")),
		
2- ahora, ya con las tablas en la bd, debemos registrar estas tablas en el panel de admin, para esto como ya hemos echo antes, vamos al archivo admin.py de la app de pedidos y las registramos aqui asi:

							admin.site.register([Pedido,LineaPedido])

logico debemos primero importar estos modelos desde .models.Listoo, si noslogeamos en la aplicacion y vamos al admin debe aparecer esta app de pedidos con sus tablas.

3- Ahora vamos a agregar el boton de "comprar" en el carrito de compras. Al pulsar este boton se debe de procesar el pedido y enviar un mensaje al correo electronico del usuario.El boton se crea en el widget del carro.

4- ya creado el boton, este debe aparecer pero cuando haya articulos en el carro, osea si esta el mensaje de "Sin productos" pues que el boton no se muestre hasta que el usuario comienze a agregar productos al carro, esto lo evaluamos con un if en el widget del carro donde esta ese boton y usamos el request.sesion.carro.items, aqui le estamos diciendo: "si el usuario logeado tiene articulos en el carro" pues muestre el boton. listo, si no hay productos en el carro el boton de comprar no se muestra.

-------------------------------------------------------------------------------------------------
(v69) Vamos a crear la vista(controlador) para procesar el pedido del usuario.

1- Lo primero que debemos especificarle a la vista es que el usuario debe de estar logeado para poder realizar pedidos,osea, hasta ahora, el carro de compras no aparece si el usuario no esta logeado, pero tambien hay que especificar que hasta que el usuario no este logeado no podra realizar pedidos,esto lo conseguimos usando el decorador de django @login_required, el cual se le pasa la url del formulario de login donde tiene que logearse(ver documentacion de django y video)

2- ahora, creamos la funcion que se ejecutara cuando el usuario pulse el boton de comprar, en esta funcion  primero daremos de alta el pedido con este codigo:

						 pedido=Pedido.objects.create(user=request.user)

3- ahora, con este pedido creado, debemos recorrerlo para saber que articulos hay en el, porque este pedido se supone que ya tiene items almacenados, entonces para recorrerlo debemos utilizar el Carro por lo que creamos una instancia de este Carro,osea en si, recorremos el carro que se crea d ela sesion de este usuario.

4- ahora, ya con este carro creado, debemos ir almacenanado en un lugar los productos que vamos recorriendo del carro, entonces creo otra variable que utilizara el metodo list() porque s ealmacenara todo en una lista.

5- ya con el carro creado y esta lista, con un for recorremos cada item de carro y lo agregamos  a la lista, en esta lista es donde utilizamos la tabla(modelo) de LineaPedido que creamos en models, y le especificamos que claves y valores son los que se deben de ir guardando en esta lista,(ver archivo).

6- ya con esta informacion guardada en esta lista, debemos ahora guardar esa informacion en la bd.Para espo utilizamos la tabla LineaPedido y junto con el metodo bulk_create() se guardaran esos datos en la tabla de la bd,este metodo es como si se estuvieran haciendo varios INSERT_INTO en la tabla de la bd, a este metodo se le pasa la lista,osea la informacion a ser guardada.

7- Ahora, como todo esto se ejecuta cuando el usuario de click en el boton de comprar, en esta misma funcion hacemos el llamado de otra funcion que enviara el email al usuario,esta funcion la creamos aparte pero la llamamos en la funcion que se ejecuta cuando el usuario realiza la compra. Esta nueva funcion la llamaremos enviarEmail. Esta funcion se le pasara el pedido,la informacion de la lista(lineas_pedido),el nombre del usuario y el email.

Listoo, por ultimo con messages ponemos un mensaje para el usuario si el pedido se ha creado correctamente.


NOTA: PARA QUE ESTO FUNCIONE, LOS USUARIOS REGISTRADOS EN LA APLICACION DEBEN DE TENER UN CORREO VALIDO O SI NO NO SERVIRA.

8- ya despues de esto, cuando el usuario haya echo el pedido y este se haya creado con exito y se le haya enviado al email del usuario,debemos redirigir al usuario a alguna parte, entonces lo volvemos a redirigir a la tienda por si quiere seguir haciendo pedidos, esto lo hacemos con un redirect a tienda.(ver archivo)

---------------------------------------------------------------------------------------------------------
(v70) Por ultimo creamos la funcion que envia el email al usuario, para esto utilizaremos el metodo de django send_mail(), (ver documentacion)

1- Nuestra funcion debe estar preparada para recibir varios parametros(como lo especificamos en la llamada),entonces usamos en los parametros de la funcion **kwargs que le indica que recibira varios argumentos.

2- dentro de la informacion que debe enviar esta funcion esta el asunto, el mensaje(aqui va toda la informacion del pedido) aqui usamos el metodo de django render_to_string, en este metodo se le pasa un archivo html donde se vera la informacion del pedido, a este archivo lo llamaremos pedido.html y lo crearemos mas adelante, y tambien se le pasa la informacion que tiene que renderizar,osea el pedido en si(ver codigo)

3- ahora, este mensaje lo guardamos en una variable pero con el metodo strip_tags() le decimos que omita las etiquetas html,osea que no envie en el mensaje nada con los simbolos de <>.

4- ahora se especifica la direccion de correo de donde se envia el mensaje, osea el email de la tienda.

5- ponemos el correo a quien va dirigido el mensaje,osea el email del usuario.

6- y aqui ya entra la funcion send_mail de django para enviar el email,la importamos de django.core.mail, este metodo recibe como argumentos el mensaje de texto sin etiquetas html, el correo de donde se envia, el correo a quien se envia(este segun la documentacion de send_mail va entre []) y el mensaje en html.(ver codigo)

7- Para probar que funciona debemos tener un usuario con un correo valido, pero para no ponernos a crear un usuario nuevo para esta prueba, simplemente en el "to" le pasamos un correo(yo pongo el mio de gmail) para la prueba.

8- ahora,ya por ultimo,debemos renderizar el mensaje en el archivo html que especificamos  en la variable mensaje, debemos crear este archivo.Este archivo se crea en los templates de la tienda, aqui va la informacion del pedido que ha echo el usuario y este archivo html es el que se le envia al usuario al correo.

9- listoo, si nos logeamos en la aplicacion y vamos  a la tienda, agregamos productos al carro y al dar comprar se debe enviar el mensaje de correo al usuario.

FUNCIONA BIEEEEN!!!

PARA QUE SE VEA EL CORREO, YO UTILIZO MI CORREO DE GMAIL COMO SI FUERA EL DE LA TIENDA Y ALA VEZ EL DEL USUARIO,OSEA TOMO MI CORREO DE GAMIL PARA QUE SEA EL DE LA TIENDA Y A LA VEZ ESE MISMO SERA EL DEL USUARIO A DONDE LE VA A LLEGAR LA NOTIFICACION DEL PEDIDO(PARA LA PRUEBA), PARA QUE FUNCIONE SIMPLEMENTE DEBO GENERAR UNA "CONTRASEÑA DE APLICACION", OSEA HACER EL MISMO PROCEDIMIENTO QUE SE HACE CUANDO SE UTILIZA EL FORMULARIO DE CONTACTO PORQUE HAY TAMBIEN ESTAMOS ENVIANDO UN EMAIL, SIMPLEMENTE GENERO ESTA CONTRASEÑA Y LA PEGO EN EL PARAMETRO DE EMAIL_HOST_PASSWORD EN SETTINGS DONDE CREAMOS LAS CREDENCIALES PARA EL ENVIO DE CORREOS, NO HAY QUE TOCAR NADA MAS, SOLO CREO LA CONTRASEÑA Y LA PEGO EN ESE PARAMETRO Y LISTO, AL HACER UN PEDIDO Y DARLE CLICK AL BOTON COMPRAR YA REGISTRA LOS PRODUCTOS EN LA BD Y ENVIA EL EMAIL!!!!.

NOTA: EN EL BOTON DE COMPRAR, EN EL ENLACE DE HREF="" SE DEBE PONER LA RUTA HACIA LA APP DE PEDIDOS, OSEA DEBE QUEDAR ASI: href="../pedidos" PARA QUE AL DAR CLICK SE EJECUTE ESTA APLICACION Y HAGA SU TRABAJO, QUE E SPROCESAR EL PEDIDO Y GUARDARLO EN LA BD Y ENVIARLE EL EMAIL AL USUARIO.

TAMBIEN EN LA BD LOS NOMBRES DE LOS CAMPOS producto_id y pedido_id DEBEN SER ASI, YO LOS HABIA NOMBRADO COMO productoID y pedidoID, PERO AL HACER LAS MIGRACIONES DJANGO LE PONE EL _id, ENTONCES QUEDABAN  productoID_id, Y ASI QUEDA MAL,NO HACE FALTA PONERLES EL ID.

LA APLICACION FUNCIONA BIEN!!!  SOLO HAY DETALLES DE CSS PARA MEJORAR.

!!!!!!!!!!!!!!!!!  AQUI ES EL FIN DEL CURSO DE PILDORASINFORMATICAS DJANGO  !!!!!!!!!!!!!!!!!!!!!!!!












*/
