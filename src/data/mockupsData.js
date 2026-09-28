import { driveAsset, driveImage } from './driveAssets';
/* Nombres y asociaciones extraídos del inventario de ERF del informe técnico. */
const mockups = [
  {
    "id": "M01",
    "file": "M01.png",
    "cat": "auth",
    "catName": "Autenticación",
    "title": "Registro de usuario",
    "desc": "Permitir que un visitante cree una cuenta personal en Mercanex para acceder posteriormente a las funciones disponibles para usuarios registrados.",
    "erf": "ERF-01.01"
  },
  {
    "id": "M02",
    "file": "M02.png",
    "cat": "auth",
    "catName": "Autenticación",
    "title": "Verificación de correo",
    "desc": "Permitir que el propietario de una cuenta confirme que tiene acceso al correo electrónico utilizado durante el registro.",
    "erf": "ERF-01.02"
  },
  {
    "id": "M03",
    "file": "M03.png",
    "cat": "auth",
    "catName": "Autenticación",
    "title": "Inicio de sesión",
    "desc": "Permitir que un usuario registrado acceda a Mercanex utilizando su correo electrónico y contraseña.",
    "erf": "ERF-01.03"
  },
  {
    "id": "M04",
    "file": "M04.png",
    "cat": "auth",
    "catName": "Autenticación",
    "title": "Cierre de sesión",
    "desc": "Permitir que un usuario autenticado finalice voluntariamente su sesión en Mercanex.",
    "erf": "ERF-01.04"
  },
  {
    "id": "M05",
    "file": "M05.png",
    "cat": "auth",
    "catName": "Autenticación",
    "title": "Recuperación de contraseña",
    "desc": "Permitir que un usuario recupere el acceso a su cuenta cuando no recuerde su contraseña.",
    "erf": "ERF-01.05"
  },
  {
    "id": "M06",
    "file": "M06.png",
    "cat": "auth",
    "catName": "Autenticación",
    "title": "Autenticación en dos factores",
    "desc": "Proporcionar un segundo nivel de comprobación mediante un código temporal enviado al correo electrónico.",
    "erf": "ERF-01.06"
  },
  {
    "id": "M07",
    "file": "M07.png",
    "cat": "auth",
    "catName": "Autenticación",
    "title": "Cambio de correo electrónico",
    "desc": "Permitir que un usuario sustituya el correo electrónico asociado a su cuenta.",
    "erf": "ERF-01.07"
  },
  {
    "id": "M08",
    "file": "M08.png",
    "cat": "auth",
    "catName": "Autenticación",
    "title": "Eliminación o desactivación de cuenta",
    "desc": "Permitir que un usuario solicite eliminar o desactivar su cuenta de Mercanex.",
    "erf": "ERF-01.08"
  },
  {
    "id": "M09",
    "file": "M09.png",
    "cat": "tiendas",
    "catName": "Usuarios y vendedores",
    "title": "Perfil y configuración del usuario",
    "desc": "Permitir que un usuario autenticado consulte y actualice la información general asociada a su cuenta.",
    "erf": "ERF-02.01"
  },
  {
    "id": "M10",
    "file": "M10.png",
    "cat": "tiendas",
    "catName": "Usuarios y vendedores",
    "title": "Solicitud para convertirse en vendedor",
    "desc": "Permitir que un usuario registrado solicite la habilitación de funciones de vendedor dentro de Mercanex.",
    "erf": "ERF-02.02"
  },
  {
    "id": "M11",
    "file": "M11.png",
    "cat": "tiendas",
    "catName": "Usuarios y vendedores",
    "title": "Configuración inicial de tienda",
    "desc": "Registrar la tienda asociada a una solicitud de vendedor y habilitarla una vez que haya sido aprobada por administración.",
    "erf": "ERF-02.03"
  },
  {
    "id": "M12",
    "file": "M12.png",
    "cat": "tiendas",
    "catName": "Usuarios y vendedores",
    "title": "Edición de tienda",
    "desc": "Permitir que un vendedor modifique la información editable de su tienda.",
    "erf": "ERF-02.04"
  },
  {
    "id": "M13",
    "file": "M13.png",
    "cat": "tiendas",
    "catName": "Usuarios y vendedores",
    "title": "Configuración de subcuenta ePayco Split",
    "desc": "Permitir que un vendedor vincule una cuenta propia de ePayco mediante Pagos Divididos Split 1:N para poder recibir los pagos correspondientes a sus ventas.",
    "erf": "ERF-02.05"
  },
  {
    "id": "M14",
    "file": "M14.png",
    "cat": "tiendas",
    "catName": "Usuarios y vendedores",
    "title": "Estado de ePayco",
    "desc": "Permitir al vendedor conocer el estado de su vinculación con ePayco y mostrar públicamente que la tienda dispone de una cuenta vinculada cuando corresponda.",
    "erf": "ERF-02.06"
  },
  {
    "id": "M15",
    "file": "M15.png",
    "cat": "tiendas",
    "catName": "Usuarios y vendedores",
    "title": "Gestión de configuración de subcuenta ePayco Split",
    "desc": "Permitir que un vendedor finalice una vinculación existente con ePayco y posteriormente conecte otra cuenta compatible.",
    "erf": "ERF-02.07"
  },
  {
    "id": "M16",
    "file": "M16.png",
    "cat": "tiendas",
    "catName": "Usuarios y vendedores",
    "title": "ePayco desconectado",
    "desc": "Impedir nuevas ventas cuando Mercanex detecte que la subcuenta de ePayco del vendedor dejó de estar vinculada o autorizada.",
    "erf": "ERF-02.08"
  },
  {
    "id": "M17",
    "file": "M17.png",
    "cat": "productos",
    "catName": "Publicaciones e inventario",
    "title": "Creación de publicación",
    "desc": "Permitir que un vendedor cree una nueva publicación para ofrecer un bien digital dentro de Mercanex.",
    "erf": "ERF-03.01"
  },
  {
    "id": "M18",
    "file": "M18.png",
    "cat": "productos",
    "catName": "Publicaciones e inventario",
    "title": "Edición de publicación",
    "desc": "Permitir al vendedor modificar la información editable de una publicación de su propiedad.",
    "erf": "ERF-03.02"
  },
  {
    "id": "M19",
    "file": "M19.png",
    "cat": "productos",
    "catName": "Publicaciones e inventario",
    "title": "Estado de revisión de publicación",
    "desc": "Gestionar el envío de una publicación a revisión administrativa antes de permitir su aparición pública para venta.",
    "erf": "ERF-03.03"
  },
  {
    "id": "M20",
    "file": "M20.png",
    "cat": "productos",
    "catName": "Publicaciones e inventario",
    "title": "Gestión del estado de publicación",
    "desc": "Permitir al vendedor retirar temporalmente una publicación de la venta y volver a habilitarla cuando las condiciones lo permitan.",
    "erf": "ERF-03.04"
  },
  {
    "id": "M21",
    "file": "M21.png",
    "cat": "productos",
    "catName": "Publicaciones e inventario",
    "title": "Carga de claves o códigos",
    "desc": "Permitir al vendedor agregar claves, códigos o unidades digitales al inventario de una publicación.",
    "erf": "ERF-03.05"
  },
  {
    "id": "M22",
    "file": "M22.png",
    "cat": "productos",
    "catName": "Publicaciones e inventario",
    "title": "Inventario de publicación",
    "desc": "Permitir al vendedor consultar el inventario digital asociado a sus publicaciones.",
    "erf": "ERF-03.06"
  },
  {
    "id": "M23",
    "file": "M23.png",
    "cat": "productos",
    "catName": "Publicaciones e inventario",
    "title": "Retiro de clave del inventario",
    "desc": "Permitir al vendedor retirar del inventario una clave que todavía no haya sido vendida y, si lo necesita, registrar posteriormente una nueva unidad en su lugar.",
    "erf": "ERF-03.07"
  },
  {
    "id": "M24",
    "file": "M24.png",
    "cat": "productos",
    "catName": "Publicaciones e inventario",
    "title": "Estado de disponibilidad",
    "desc": "Actualizar automáticamente la disponibilidad de una publicación según la cantidad de unidades de inventario que puedan venderse.",
    "erf": "ERF-03.08"
  },
  {
    "id": "M25",
    "file": "M25.png",
    "cat": "productos",
    "catName": "Publicaciones e inventario",
    "title": "Advertencia de publicación duplicada",
    "desc": "Evitar que un mismo vendedor mantenga múltiples publicaciones equivalentes del mismo producto.",
    "erf": "ERF-03.09"
  },
  {
    "id": "M26",
    "file": "M26.png",
    "cat": "catalogo",
    "catName": "Catálogo y búsqueda",
    "title": "Catálogo principal",
    "desc": "Permitir a visitantes y usuarios registrados consultar las publicaciones disponibles dentro del catálogo de Mercanex.",
    "erf": "ERF-04.01"
  },
  {
    "id": "M27",
    "file": "M27.png",
    "cat": "catalogo",
    "catName": "Catálogo y búsqueda",
    "title": "Búsqueda de bienes digitales",
    "desc": "Permitir localizar publicaciones utilizando términos relacionados con los bienes digitales ofrecidos.",
    "erf": "ERF-04.02"
  },
  {
    "id": "M28",
    "file": "M28.png",
    "cat": "catalogo",
    "catName": "Catálogo y búsqueda",
    "title": "Filtros y ordenamiento",
    "desc": "Permitir que el usuario refine y organice las publicaciones mostradas según diferentes características.",
    "erf": "ERF-04.03"
  },
  {
    "id": "M29",
    "file": "M29.png",
    "cat": "catalogo",
    "catName": "Catálogo y búsqueda",
    "title": "Detalle de bien digital",
    "desc": "Permitir consultar la información completa de una publicación antes de iniciar una operación de compra.",
    "erf": "ERF-04.04"
  },
  {
    "id": "M30",
    "file": "M30.png",
    "cat": "catalogo",
    "catName": "Catálogo y búsqueda",
    "title": "Visualización de precio internacional",
    "desc": "Mostrar el precio establecido para una publicación y, cuando corresponda, proporcionar una referencia aproximada en la moneda asociada al país del usuario.",
    "erf": "ERF-04.05"
  },
  {
    "id": "M31",
    "file": "M31.png",
    "cat": "catalogo",
    "catName": "Catálogo y búsqueda",
    "title": "Perfil público de tienda",
    "desc": "Permitir consultar la información pública y reputación disponible sobre un vendedor.",
    "erf": "ERF-04.06"
  },
  {
    "id": "M32",
    "file": "M32.png",
    "cat": "catalogo",
    "catName": "Catálogo y búsqueda",
    "title": "Favoritos",
    "desc": "Permitir que un usuario registrado guarde publicaciones para consultarlas posteriormente sin tener que buscarlas nuevamente.",
    "erf": "ERF-04.07"
  },
  {
    "id": "M33",
    "file": "M33.png",
    "cat": "carrito",
    "catName": "Compra y pago",
    "title": "Agregar al Carrito / Checkout",
    "desc": "Permitir que un comprador inicie una operación directamente desde una publicación disponible.",
    "erf": "ERF-05.01"
  },
  {
    "id": "M34",
    "file": "M34.png",
    "cat": "carrito",
    "catName": "Compra y pago",
    "title": "Selección de cantidad",
    "desc": "Permitir adquirir una o varias unidades de una misma publicación dentro de una sola operación.",
    "erf": "ERF-05.02"
  },
  {
    "id": "M35",
    "file": "M35.png",
    "cat": "carrito",
    "catName": "Compra y pago",
    "title": "Reserva de producto",
    "desc": "Reservar temporalmente las unidades necesarias para evitar que sean asignadas simultáneamente a otra compra mientras el comprador realiza el pago.",
    "erf": "ERF-05.03"
  },
  {
    "id": "M36",
    "file": "M36.png",
    "cat": "carrito",
    "catName": "Compra y pago",
    "title": "Resumen y continuación al pago",
    "desc": "Iniciar el proceso de pago utilizando la subcuenta de ePayco vinculada por el vendedor.",
    "erf": "ERF-05.04"
  },
  {
    "id": "M37",
    "file": "M37.png",
    "cat": "carrito",
    "catName": "Compra y pago",
    "title": "Procesando pago",
    "desc": "Recibir y procesar las actualizaciones relacionadas con una operación de pago y asociarlas a la compra correspondiente.",
    "erf": "ERF-05.05"
  },
  {
    "id": "M38",
    "file": "M38.png",
    "cat": "carrito",
    "catName": "Compra y pago",
    "title": "Estado pendiente o pago no completado",
    "desc": "Gestionar operaciones cuyo pago continúa pendiente o termina sin aprobación.",
    "erf": "ERF-05.06"
  },
  {
    "id": "M39",
    "file": "M39.png",
    "cat": "carrito",
    "catName": "Compra y pago",
    "title": "Compra aprobada y entrega digital",
    "desc": "Entregar automáticamente al comprador la cantidad correspondiente de claves o códigos digitales después de confirmar correctamente el pago.",
    "erf": "ERF-05.07"
  },
  {
    "id": "M40",
    "file": "M40.png",
    "cat": "carrito",
    "catName": "Compra y pago",
    "title": "Compra aprobada con entrega pendiente",
    "desc": "Gestionar de forma segura una incidencia interna cuando el pago fue aprobado pero el proceso automático de entrega no pudo completarse correctamente.",
    "erf": "ERF-05.08"
  },
  {
    "id": "M41",
    "file": "M41.png",
    "cat": "carrito",
    "catName": "Compra y pago",
    "title": "Detalle de compra",
    "desc": "Permitir que el comprador vuelva a consultar los bienes digitales obtenidos mediante sus compras anteriores.",
    "erf": "ERF-05.09"
  },
  {
    "id": "M42",
    "file": "M42.png",
    "cat": "carrito",
    "catName": "Compra y pago",
    "title": "Historial de operaciones",
    "desc": "Permitir consultar las compras y ventas asociadas a una cuenta.",
    "erf": "ERF-05.10"
  },
  {
    "id": "M43",
    "file": "M43.png",
    "cat": "carrito",
    "catName": "Compra y pago",
    "title": "Reportar problema desde una compra",
    "desc": "Permitir que un comprador inicie un reclamo asociado directamente a una compra cuando exista un inconveniente con el producto recibido.",
    "erf": "ERF-05.11"
  },
  {
    "id": "M44",
    "file": "M44.png",
    "cat": "chat",
    "catName": "Comunicación",
    "title": "Inicio de conversación desde una publicación",
    "desc": "Permitir que un usuario registrado inicie una conversación con el vendedor de una publicación para realizar consultas antes de comprar.",
    "erf": "ERF-06.01"
  },
  {
    "id": "M45",
    "file": "M45.png",
    "cat": "chat",
    "catName": "Comunicación",
    "title": "Chat asociado a una compra",
    "desc": "Permitir que comprador y vendedor accedan a una conversación vinculada con una compra realizada.",
    "erf": "ERF-06.02"
  },
  {
    "id": "M46",
    "file": "M46.png",
    "cat": "chat",
    "catName": "Comunicación",
    "title": "Conversación en tiempo real",
    "desc": "Permitir que los participantes de una conversación intercambien mensajes de texto en tiempo real mediante WebSockets.",
    "erf": "ERF-06.03"
  },
  {
    "id": "M47",
    "file": "M47.png",
    "cat": "chat",
    "catName": "Comunicación",
    "title": "Envío de archivos en el chat",
    "desc": "Permitir que compradores y vendedores compartan imágenes y archivos dentro de una conversación.",
    "erf": "ERF-06.04"
  },
  {
    "id": "M48",
    "file": "M48.png",
    "cat": "chat",
    "catName": "Comunicación",
    "title": "Indicadores de actividad del chat",
    "desc": "Informar al usuario sobre el estado de sus mensajes y la actividad disponible del otro participante.",
    "erf": "ERF-06.05"
  },
  {
    "id": "M49",
    "file": "M49.png",
    "cat": "chat",
    "catName": "Comunicación",
    "title": "Reportar mensaje o archivo",
    "desc": "Permitir que un participante reporte mensajes, imágenes o archivos enviados dentro de una conversación cuando considere que contienen material indebido o incumplen las reglas de Mercanex.",
    "erf": "ERF-06.06"
  },
  {
    "id": "M50",
    "file": "M50.png",
    "cat": "chat",
    "catName": "Comunicación",
    "title": "Bandeja de conversaciones",
    "desc": "Permitir que un usuario consulte y vuelva a abrir las conversaciones en las que participa.",
    "erf": "ERF-06.07"
  },
  {
    "id": "M51",
    "file": "M51.png",
    "cat": "chat",
    "catName": "Comunicación",
    "title": "Centro de notificaciones",
    "desc": "Informar a los usuarios sobre eventos relevantes producidos dentro de Mercanex.",
    "erf": "ERF-06.08"
  },
  {
    "id": "M52",
    "file": "M52.png",
    "cat": "chat",
    "catName": "Comunicación",
    "title": "Preferencia visual / referencia de correo",
    "desc": "Enviar avisos importantes al correo verificado del usuario cuando ocurran determinados eventos de seguridad u operaciones relevantes.",
    "erf": "ERF-06.09"
  },
  {
    "id": "M53",
    "file": "M53.png",
    "cat": "reclamos",
    "catName": "Valoraciones y reclamos",
    "title": "Valoración de compra",
    "desc": "Permitir que un comprador valore una operación realizada dentro de Mercanex mediante una puntuación y un comentario opcional.",
    "erf": "ERF-07.01"
  },
  {
    "id": "M54",
    "file": "M54.png",
    "cat": "reclamos",
    "catName": "Valoraciones y reclamos",
    "title": "Edición de valoración",
    "desc": "Permitir que el autor de una valoración modifique posteriormente su puntuación o comentario.",
    "erf": "ERF-07.02"
  },
  {
    "id": "M55",
    "file": "M55.png",
    "cat": "reclamos",
    "catName": "Valoraciones y reclamos",
    "title": "Reputación del vendedor",
    "desc": "Mostrar información obtenida de la actividad del vendedor dentro de Mercanex para ayudar a los usuarios a conocer su historial.",
    "erf": "ERF-07.03"
  },
  {
    "id": "M56",
    "file": "M56.png",
    "cat": "reclamos",
    "catName": "Valoraciones y reclamos",
    "title": "Crear reclamo",
    "desc": "Permitir que un comprador registre formalmente un inconveniente relacionado con una compra realizada en Mercanex.",
    "erf": "ERF-07.04"
  },
  {
    "id": "M57",
    "file": "M57.png",
    "cat": "reclamos",
    "catName": "Valoraciones y reclamos",
    "title": "Evidencias del reclamo",
    "desc": "Permitir que el comprador adjunte evidencia que ayude a explicar y posteriormente revisar un reclamo.",
    "erf": "ERF-07.05"
  },
  {
    "id": "M58",
    "file": "M58.png",
    "cat": "reclamos",
    "catName": "Valoraciones y reclamos",
    "title": "Respuesta del vendedor",
    "desc": "Permitir que el vendedor conozca y responda a un reclamo registrado sobre una de sus ventas.",
    "erf": "ERF-07.06"
  },
  {
    "id": "M59",
    "file": "M59.png",
    "cat": "reclamos",
    "catName": "Valoraciones y reclamos",
    "title": "Revisión administrativa de reclamo",
    "desc": "Permitir que administración revise la información de un reclamo y determine si el problema reportado queda confirmado o no confirmado.",
    "erf": "ERF-07.07"
  },
  {
    "id": "M60",
    "file": "M60.png",
    "cat": "reclamos",
    "catName": "Valoraciones y reclamos",
    "title": "Publicación suspendida por reclamos",
    "desc": "Suspender automáticamente una publicación cuando acumule múltiples problemas confirmados procedentes de compradores diferentes.",
    "erf": "ERF-07.08"
  },
  {
    "id": "M61",
    "file": "M61.png",
    "cat": "reclamos",
    "catName": "Valoraciones y reclamos",
    "title": "Estado de vendedor en revisión",
    "desc": "Iniciar una revisión administrativa del vendedor cuando existan problemas confirmados repetidos en diferentes operaciones.",
    "erf": "ERF-07.09"
  },
  {
    "id": "M62",
    "file": "M62.png",
    "cat": "reclamos",
    "catName": "Valoraciones y reclamos",
    "title": "Reportar vendedor o publicación",
    "desc": "Permitir que los usuarios reporten una publicación o vendedor cuando consideren que existe contenido o comportamiento que requiere revisión administrativa.",
    "erf": "ERF-07.10"
  },
  {
    "id": "M63",
    "file": "M63.png",
    "cat": "admin",
    "catName": "Administración",
    "title": "Acceso y panel administrativo",
    "desc": "Permitir exclusivamente a cuentas administrativas autorizadas acceder a las funciones de gestión y control de Mercanex.",
    "erf": "ERF-08.01"
  },
  {
    "id": "M64",
    "file": "M64.png",
    "cat": "admin",
    "catName": "Administración",
    "title": "Gestión de usuarios y vendedores",
    "desc": "Permitir a administración consultar usuarios, vendedores y solicitudes pendientes, así como realizar las acciones administrativas autorizadas sobre dichas cuentas.",
    "erf": "ERF-08.02"
  },
  {
    "id": "M65",
    "file": "M65.png",
    "cat": "admin",
    "catName": "Administración",
    "title": "Revisión de solicitud de vendedor",
    "desc": "Permitir que un administrador evalúe y resuelva las solicitudes enviadas por usuarios que desean habilitar funciones de vendedor.",
    "erf": "ERF-08.03"
  },
  {
    "id": "M66",
    "file": "M66.png",
    "cat": "admin",
    "catName": "Administración",
    "title": "Moderación de publicaciones",
    "desc": "Permitir que administración revise publicaciones antes de su activación y actúe posteriormente sobre publicaciones que incumplan las condiciones de Mercanex.",
    "erf": "ERF-08.04"
  },
  {
    "id": "M67",
    "file": "M67.png",
    "cat": "admin",
    "catName": "Administración",
    "title": "Bandeja administrativa de casos",
    "desc": "Permitir a administración consultar, organizar y atender los diferentes casos que requieran revisión humana.",
    "erf": "ERF-08.05"
  },
  {
    "id": "M68",
    "file": "M68.png",
    "cat": "admin",
    "catName": "Administración",
    "title": "Aplicar sanción o medida administrativa",
    "desc": "Permitir que un administrador aplique, modifique o retire medidas sobre una cuenta después de una revisión correspondiente.",
    "erf": "ERF-08.06"
  },
  {
    "id": "M69",
    "file": "M69.png",
    "cat": "admin",
    "catName": "Administración",
    "title": "Vista administrativa de inventario protegido",
    "desc": "Limitar la información sensible visible para las cuentas administrativas durante sus tareas de gestión.",
    "erf": "ERF-08.07"
  },
  {
    "id": "M70",
    "file": "M70.png",
    "cat": "admin",
    "catName": "Administración",
    "title": "Configuración del catálogo",
    "desc": "Permitir que administración configure elementos utilizados para clasificar y organizar el catálogo de Mercanex.",
    "erf": "ERF-08.08"
  },
  {
    "id": "M71",
    "file": "M71.png",
    "cat": "admin",
    "catName": "Administración",
    "title": "Dashboard administrativo",
    "desc": "Proporcionar a administración información resumida sobre la actividad y estado general de la plataforma.",
    "erf": "ERF-08.09"
  },
  {
    "id": "M72",
    "file": "M72.png",
    "cat": "admin",
    "catName": "Administración",
    "title": "Historial de acciones administrativas",
    "desc": "Registrar las acciones administrativas importantes realizadas dentro de Mercanex para conservar trazabilidad sobre los cambios y decisiones.",
    "erf": "ERF-08.10"
  }
];

export const MOCKUPS_DATA = mockups.map(item => ({ ...item, driveUrl: driveAsset('mockups', item.file)?.url, imageUrl: driveImage('mockups', item.file, 800) }));
