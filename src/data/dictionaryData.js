/**
 * DICCIONARIO TÉCNICO AVANZADO - MERCANEX V3.0
 * 31 términos técnicos categorizados con definiciones de ingeniería, rol en Mercanex y analogías.
 */

export const TECH_DICTIONARY = [
  // --- PASARELA & FINANZAS ---
  {
    id: "epayco-split",
    term: "ePayco Pagos Divididos (Split 1:N)",
    category: "pagos",
    categoryName: "Pasarela & Finanzas",
    summary: "Mecanismo bancario que cobra un único valor al comprador y dispersa automáticamente los fondos a múltiples comerciantes.",
    definition: "Solución de recaudo agregador provista por ePayco diseñada para Marketplaces. En una sola transacción bancaria (PSE, tarjeta o efectivo), el motor de la pasarela fracciona el importe total y transfiere los saldos netos directamente a las subcuentas bancarias de cada vendedor participante.",
    mercanexRole: "Es el núcleo del Carrito Multi-Vendedor en Colombia. Permite pagar productos de 3 tiendas distintas en un solo checkout, recibiendo cada comerciante su dinero sin que Mercanex toque ni custodie los fondos.",
    analogy: "Como pagar una cuenta conjunta en un restaurante con una sola tarjeta, pero la máquina del datáfono divide automáticamente la propina al mesero, el valor de la comida al chef y la bebida al bartender.",
    badge: "Pasarela Fase 1",
    tagColor: "emerald"
  },
  {
    id: "adyen-platforms",
    term: "Adyen for Platforms",
    category: "pagos",
    categoryName: "Pasarela & Finanzas",
    summary: "Plataforma global de pagos corporativos para marketplaces internacionales multimoneda.",
    definition: "Solución omnicanal de nivel empresarial que opera en más de 30 países. Soporta cobros en USD, EUR y divisas locales, manejando cuentas virtuales de saldo (balance accounts), dispersión masiva y liquidación programada hacia cuentas bancarias globales.",
    mercanexRole: "Es la pasarela definida en la Hoja de Ruta de Mercanex para la Fase 2 (Expansión Internacional), activable sin cambios en base de datos mediante el patrón Adapter.",
    analogy: "El motor de pagos global que utilizan gigantes como Uber, Booking o eBay para cobrar en cualquier moneda y pagarle a conductores o anfitriones en sus respectivos países.",
    badge: "Hoja de Ruta Fase 2",
    tagColor: "blue"
  },
  {
    id: "hosted-onboarding",
    term: "Hosted Onboarding (KYC Delegado)",
    category: "pagos",
    categoryName: "Pasarela & Finanzas",
    summary: "Formularios seguros alojados por la pasarela para verificar la identidad legal y bancaria del vendedor.",
    definition: "Proceso donde el marketplace redirige al vendedor a una interfaz web segura provista por la pasarela. La pasarela recolecta y valida documentos de identidad, RUT/Tax ID y certificaciones bancarias bajo estrictas normas internacionales de Prevención de Lavado de Activos (AML/KYC).",
    mercanexRole: "Permite a Mercanex deslindarse de custodiar cédulas o números de cuenta de vendedores internacionales, reduciendo a cero el alcance de auditorías PCI-DSS en los servidores propios.",
    analogy: "Como cuando un banco te envía un enlace oficial para abrir tu cuenta de ahorros escaneando tu cédula, en vez de entregarle una fotocopia al celador del edificio.",
    badge: "Seguridad Bancaria",
    tagColor: "emerald"
  },
  {
    id: "balance-accounts",
    term: "Balance Accounts (Cuentas de Saldo Virtuales)",
    category: "pagos",
    categoryName: "Pasarela & Finanzas",
    summary: "Subcuentas contables segregadas dentro de la pasarela para cada comercio.",
    definition: "Subcuentas virtuales mantenidas en la infraestructura financiera de la pasarela. Cada comercio acumula allí el saldo de sus ventas netas hasta que se ejecuta la transferencia programada ('payout') hacia su cuenta bancaria real.",
    mercanexRole: "En Adyen for Platforms, garantiza la separación patrimonial total entre vendedores. Si una tienda tiene saldos retenidos por disputas, no afecta el saldo disponible de las demás tiendas.",
    analogy: "Casilleros individuales con llave dentro de una bóveda bancaria; cada vendedor tiene el suyo y nadie puede sacar dinero del casillero vecino.",
    badge: "Contabilidad Aislada",
    tagColor: "blue"
  },
  {
    id: "liable-account",
    term: "Liable Balance Account (Cuenta de Responsabilidad)",
    category: "pagos",
    categoryName: "Pasarela & Finanzas",
    summary: "Cuenta institucional de contingencia del marketplace para absorber saldos negativos o contracargos.",
    definition: "Cuenta especial dentro de la pasarela asignada a la empresa operadora del marketplace. Sirve como respaldo legal y financiero para cubrir reversiones, disputas comerciales o fraudes cometidos por vendedores que dejaron sus cuentas con saldo en cero.",
    mercanexRole: "Garantiza que ante un fallo o estafa de un vendedor en Adyen, la pasarela compense a los compradores afectados sin paralizar las operaciones de los demás comerciantes legítimos.",
    analogy: "El fondo de fianza o depósito de garantía que deja una inmobiliaria para responder si un inquilino daña el inmueble y desaparece.",
    badge: "Garantía Institucional",
    tagColor: "amber"
  },
  {
    id: "split-refunds",
    term: "Split Refunds (Reembolsos Parciales Divididos)",
    category: "pagos",
    categoryName: "Pasarela & Finanzas",
    summary: "Devolución económica que descuenta el dinero exclusivamente del vendedor que cometió el fallo.",
    definition: "Capacidad técnica de la API de pagos para reversar una porción específica de una transacción multi-tienda, debitando el monto reembolsado directamente de la cuenta de saldo del vendedor cuya clave fue defectuosa.",
    mercanexRole: "Si un comprador adquiere 3 claves de 3 vendedores y solo una resulta inválida, Mercanex ejecuta un Split Refund por el valor exacto de esa clave, sin tocar el dinero ni alterar los pedidos de los otros dos vendedores.",
    analogy: "Si compras un libro, un café y un pastel en un centro comercial y el pastel está rancio, la pastelería te devuelve tu dinero sin que la librería tenga que devolver el suyo.",
    badge: "Garantía Transaccional",
    tagColor: "emerald"
  },
  {
    id: "modelo-agregador",
    term: "Modelo Agregador (Pasarelas de Pago)",
    category: "pagos",
    categoryName: "Pasarela & Finanzas",
    summary: "Modelo donde la pasarela procesa los cobros bajo su propio código único sin exigir cuenta bancaria empresarial al comercio.",
    definition: "Modalidad en la que una entidad tecnológica (como ePayco) recauda los pagos de múltiples comercios utilizando sus propios convenios bancarios y redes adquirentes, para luego dispersar los fondos a cada beneficiario previa deducción de tarifas.",
    mercanexRole: "Permite a los pequeños emprendedores de Mercanex vender claves digitales sin necesidad de tramitar contratos complejos con CredibanCo o Redeban, disfrutando de PSE y tarjetas con $0 costo de mantenimiento.",
    analogy: "Una cooperativa que gestiona la cobranza de todos los agricultores del pueblo utilizando una sola cuenta corporativa y luego le entrega a cada campesino lo que le corresponde.",
    badge: "Inclusión Financiera",
    tagColor: "emerald"
  },
  {
    id: "tarifa-epayco",
    term: "Tarifa ePayco (2.68% + $900 COP + IVA)",
    category: "pagos",
    categoryName: "Pasarela & Finanzas",
    summary: "Costo financiero oficial aplicado por la pasarela de pagos por cada transacción exitosa.",
    definition: "Estructura tarifaria pública de ePayco en Colombia para su modelo agregador. Se compone de un porcentaje sobre el valor bruto más un cargo fijo por procesamiento bancario más impuestos legales.",
    mercanexRole: "Es el único cobro que se descuenta en las ventas de Mercanex. La plataforma aplica un 0% de comisión propia; el 100% restante del saldo neto va a la cuenta del comerciante.",
    analogy: "El peaje oficial que cobra la autopista bancaria para transportar el dinero desde la cuenta del cliente hasta la del comerciante.",
    badge: "Estructura de Costo",
    tagColor: "slate"
  },

  // --- ARQUITECTURA & NEGOCIO ---
  {
    id: "saas-freemium",
    term: "Modelo SaaS Freemium",
    category: "arquitectura",
    categoryName: "Arquitectura & Negocio",
    summary: "Software como Servicio accesible vía web con operatividad básica gratuita y planes avanzados de pago.",
    definition: "SaaS define cómo se entrega el software (en la nube, sin instalación local). Freemium define cómo se monetiza (acceso gratuito 100% operativo por defecto, con opciones de suscripción de pago para funciones de valor agregado como analíticas o carga masiva).",
    mercanexRole: "Define la naturaleza del proyecto. Mercanex no cobra comisión por venta a terceros (0%); sus ingresos operacionales provienen de suscripciones opcionales (Planes Emprendedor y Profesional para tiendas, y Comprador Plus).",
    analogy: "Como Spotify o Canva: puedes usar el servicio gratis para siempre con todas las funciones esenciales, o pagar una mensualidad si requieres herramientas profesionales adicionales.",
    badge: "Modelo de Negocio",
    tagColor: "emerald"
  },
  {
    id: "carrito-multitienda",
    term: "Carrito Multi-Vendedor Persistente",
    category: "arquitectura",
    categoryName: "Arquitectura & Negocio",
    summary: "Módulo que agrupa productos de múltiples vendedores en un único proceso de compra consolidado.",
    definition: "Componente de software que almacena en base de datos y sesión los ítems seleccionados por el comprador, agrupándolos lógicamente por vendedor_id y calculando subtotales independientes antes del checkout unificado.",
    mercanexRole: "Sustituye el modelo obsoleto de 'compra directa de 1 solo producto'. Permite un checkout unificado donde el comprador paga una sola vez y el sistema genera una Orden Global con Subórdenes independientes por tienda.",
    analogy: "El carrito del supermercado físico: echas productos de diferentes marcas y pagas una sola vez en la caja, en vez de tener que hacer una fila y un pago por cada producto.",
    badge: "Experiencia de Compra",
    tagColor: "emerald"
  },
  {
    id: "orden-global-suborden",
    term: "Orden Global y Subórdenes (Arquitectura 1:N)",
    category: "arquitectura",
    categoryName: "Arquitectura & Negocio",
    summary: "Estructura jerárquica de pedidos para desacoplar el despacho y reclamos por cada comerciante.",
    definition: "Patrón de modelado transaccional. La 'Orden Global' representa el pago único del cliente frente a la pasarela; las 'Subórdenes' representan los contratos individuales de venta de cada tienda con sus respectivos ítems y estados.",
    mercanexRole: "Permite que si el Vendedor A entrega una clave defectuosa, el reclamo y la garantía se gestionen únicamente en la Suborden A, sin anular la compra ni afectar los fondos del Vendedor B.",
    analogy: "Una factura maestra de Amazon que contiene tres paquetes enviados por distintos proveedores en fechas y transportes separados.",
    badge: "Desacoplamiento",
    tagColor: "emerald"
  },
  {
    id: "adapter-pattern",
    term: "Patrón Adapter (MarketplaceSplitGatewayInterface)",
    category: "arquitectura",
    categoryName: "Arquitectura & Negocio",
    summary: "Patrón de diseño de software que desacopla la aplicación de las particularidades de una pasarela específica.",
    definition: "Patrón estructural de programación orientada a objetos (POO). Define un contrato genérico común que permite intercambiar implementaciones de pasarelas de pago sin alterar la lógica de negocio ni las vistas del sistema.",
    mercanexRole: "En Mercanex, permite que el controlador de Checkout no sepa si está hablando con ePayco o con Adyen. Solo llama a gateway.initializeSplit() y el adaptador correspondiente se encarga del formato de datos.",
    analogy: "Un adaptador universal de viaje: te permite conectar tu enchufe en Colombia, Europa o Estados Unidos sin tener que cambiar el cable de tu computador.",
    badge: "Patrón de Software",
    tagColor: "blue"
  },
  {
    id: "laravel-reverb",
    term: "Laravel Reverb & WebSockets",
    category: "arquitectura",
    categoryName: "Arquitectura & Negocio",
    summary: "Servidor de WebSockets de ultra-alta velocidad para comunicación bidireccional en tiempo real.",
    definition: "Tecnología de conexión TCP persistente en puerto seguro WSS. Permite al servidor enviar eventos al navegador del cliente al instante (<50 ms de latencia) sin que el usuario tenga que recargar la página web.",
    mercanexRole: "Alimenta el chat en tiempo real entre comprador y vendedor en cada subpedido, los indicadores de escritura ('escribiendo...'), las confirmaciones de lectura y la notificación inmediata de liberación de claves.",
    analogy: "Una llamada telefónica abierta en directo donde ambos hablan al mismo tiempo, en lugar de enviarse cartas por correo postal esperando que el cartero las lleve.",
    badge: "Tiempo Real",
    tagColor: "emerald"
  },

  // --- CIBERSEGURIDAD & DATOS ---
  {
    id: "aes-256",
    term: "Cifrado AES-256-CBC",
    category: "seguridad",
    categoryName: "Ciberseguridad & Datos",
    summary: "Estándar militar de cifrado simétrico con claves de 256 bits para proteger información en reposo.",
    definition: "Algoritmo criptográfico aprobado internacionalmente por el NIST. Transforma un texto legible en una cadena ininteligible mediante operaciones matemáticas complejas con un vector de inicialización (IV) y una clave secreta de 32 bytes.",
    mercanexRole: "Protege las claves de activación y licencias de software en la base de datos PostgreSQL. Aunque un atacante robe la base de datos, no podrá leer los códigos de las keys porque solo se descifran en la memoria RAM del servidor al momento del despacho.",
    analogy: "Una caja fuerte blindada con una combinación de 256 dígitos que tardaría billones de años en abrirse por fuerza bruta.",
    badge: "Criptografía Militar",
    tagColor: "emerald"
  },
  {
    id: "argon2id",
    term: "Argon2id (Hashing de Contraseñas)",
    category: "seguridad",
    categoryName: "Ciberseguridad & Datos",
    summary: "El algoritmo más avanzado y seguro para almacenamiento de credenciales de acceso.",
    definition: "Ganador de la Password Hashing Competition. Es una función criptográfica resistente tanto a ataques de canal lateral como a ataques masivos por hardware especializado (GPU y ASIC), mediante el consumo deliberado de memoria RAM y tiempo de CPU.",
    mercanexRole: "Se utiliza para hashear las contraseñas de todos los usuarios (compradores, vendedores y administradores) en la tabla users, superando con creces a algoritmos obsoletos como MD5 o SHA1.",
    analogy: "Un candado que cambia de forma y se vuelve más pesado cada vez que alguien intenta forzarlo con herramientas de cerrajería de alta potencia.",
    badge: "Seguridad de Acceso",
    tagColor: "emerald"
  },
  {
    id: "two-factor",
    term: "2FA TOTP (RFC 6238)",
    category: "seguridad",
    categoryName: "Ciberseguridad & Datos",
    summary: "Autenticación en Dos Factores basada en contraseñas de un solo uso dependientes del tiempo.",
    definition: "Protocolo de seguridad que genera códigos de 6 dígitos que cambian cada 30 segundos, calculados matemáticamente a partir de un secreto compartido cifrado y la hora Unix actual.",
    mercanexRole: "Protege las cuentas de los usuarios y vendedores en Mercanex. Si un hacker roba la contraseña, no podrá ingresar sin el código generado en la app del teléfono (Google Authenticator, Authy).",
    analogy: "Una puerta que requiere tanto tu llave física como un código que llega a tu reloj de pulsera y cambia cada medio minuto.",
    badge: "Doble Factor",
    tagColor: "emerald"
  },
  {
    id: "hmac-sha256",
    term: "Firma Criptográfica HMAC-SHA256",
    category: "seguridad",
    categoryName: "Ciberseguridad & Datos",
    summary: "Mecanismo para validar matemáticamente que un mensaje no fue alterado en el camino.",
    definition: "Hash-based Message Authentication Code. Es un sello digital generado combinando el cuerpo de la petición con una clave secreta privada compartida entre la pasarela y Mercanex.",
    mercanexRole: "Valida la autenticidad de los Webhooks de ePayco. Si un atacante intenta fingir una notificación de 'Pago Aprobado', Mercanex verifica la firma HMAC; al no coincidir, rechaza la entrega y bloquea la IP.",
    analogy: "Un sello de cera con el anillo oficial del rey en una carta confidencial: si el sello está roto o la marca no coincide, la orden se rechaza de inmediato.",
    badge: "Firma Digital",
    tagColor: "emerald"
  },
  {
    id: "idempotencia",
    term: "Idempotencia en Pagos",
    category: "seguridad",
    categoryName: "Ciberseguridad & Datos",
    summary: "Garantía de que procesar una misma petición múltiples veces produce el mismo resultado sin duplicar acciones.",
    definition: "Propiedad de un servicio de software según la cual el efecto de recibir N peticiones idénticas es exactamente el mismo que recibir solo una, evitando efectos secundarios repetidos.",
    mercanexRole: "Evita el 'doble despacho de claves'. Si ePayco reenvía el Webhook de confirmación de pago 3 veces por problemas de red, Mercanex procesa el primero y en los siguientes simplemente responde HTTP 200 sin entregar 3 lotes de claves ni duplicar stock.",
    analogy: "El botón del ascensor: si lo presionas una vez o diez veces seguidas, el ascensor va al mismo piso exactamente una vez, sin triplicar el viaje.",
    badge: "Antiduplicación",
    tagColor: "emerald"
  },
  {
    id: "visor-seguro",
    term: "Visor Seguro de Claves Efímero",
    category: "seguridad",
    categoryName: "Ciberseguridad & Datos",
    summary: "Interfaz web protegida que muestra las claves digitales con controles antifraude.",
    definition: "Módulo frontend desarrollado en Blade y Alpine.js que renderiza los códigos de activación únicamente tras validar la sesión activa del comprador propietario de la orden.",
    mercanexRole: "Permite al cliente copiar su clave digital con un clic, ocultando caracteres con asteriscos por defecto y registrando en auditoría la fecha y hora exacta en que el código fue visualizado para resolver posibles reclamos.",
    analogy: "Una vitrina de seguridad en una joyería que solo se abre cuando el cliente muestra su recibo de compra y su documento de identidad.",
    badge: "Protección Frontend",
    tagColor: "emerald"
  },

  // --- BASE DE DATOS POSTGRESQL ---
  {
    id: "select-for-update",
    term: "SELECT ... FOR UPDATE (Bloqueo Pesimista)",
    category: "bd",
    categoryName: "Base de Datos PostgreSQL",
    summary: "Instrucción SQL que bloquea filas en la base de datos para evitar que dos usuarios compren la misma clave al mismo tiempo.",
    definition: "Mecanismo de control de concurrencia transaccional a nivel de fila en motores relacionales ACID como PostgreSQL 16. Mantiene un cerrojo exclusivo sobre el registro hasta que la transacción se confirme (COMMIT) o se cancele (ROLLBACK).",
    mercanexRole: "Previene la sobreventa de inventario digital. Cuando un comprador inicia checkout por la última key disponible de un juego, la base de datos la bloquea atómicamente; ningún otro usuario puede reservarla en ese instante.",
    analogy: "El cajero automático que congela tu saldo mientras cuenta los billetes para evitar que retires el mismo dinero desde dos cajeros distintos en el mismo segundo.",
    badge: "Bloqueo Concurrente",
    tagColor: "emerald"
  },
  {
    id: "ttl-reserva",
    term: "TTL de Reserva (Time-To-Live de 15 Minutos)",
    category: "bd",
    categoryName: "Base de Datos PostgreSQL",
    summary: "Temporizador de expiración que libera claves retenidas si el comprador no completa el pago.",
    definition: "Mecanismo de expiración programada de estado. Una unidad de inventario pasa al estado 'RESERVADA' durante un tiempo máximo de 15 minutos mientras el cliente diligencia sus datos en la pasarela de pagos.",
    mercanexRole: "Si el usuario cierra el navegador, abandona la pasarela o el banco rechaza la transacción, un comando programado de Laravel (php artisan inventory:release-expired) devuelve automáticamente la clave al estado 'DISPONIBLE'.",
    analogy: "Cuando apartas una silla en el cine por internet: tienes 15 minutos para ingresar la tarjeta; si no pagas, el sistema libera la silla para que otro espectador pueda comprarla.",
    badge: "Liberación Automática",
    tagColor: "emerald"
  },
  {
    id: "uuid-v4",
    term: "UUID v4 (Identificador Único Universal)",
    category: "bd",
    categoryName: "Base de Datos PostgreSQL",
    summary: "Clave primaria pseudoaleatoria de 128 bits que reemplaza los IDs numéricos secuenciales tradicionales.",
    definition: "Estándar RFC 4122 para generar identificadores con una probabilidad infinitesimal de colisión. Formato alfanumérico de 36 caracteres (ej. a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11).",
    mercanexRole: "Se utiliza como Primary Key en las tablas orders, suborders, digital_keys y products. Evita ataques de enumeración (donde un usuario malicioso cambia /orden/1 a /orden/2 para espiar compras ajenas).",
    analogy: "Un código alfanumérico irrepetible como el número de serie de un pasaporte internacional, en lugar de un simple número de turno de carnicería.",
    badge: "Anti-Enumeración",
    tagColor: "emerald"
  },
  {
    id: "postgresql-acid",
    term: "Transacciones ACID en PostgreSQL 16",
    category: "bd",
    categoryName: "Base de Datos PostgreSQL",
    summary: "Conjunto de propiedades que garantizan que las operaciones en la base de datos sean 100% confiables y seguras.",
    definition: "Acrónimo de Atomicidad, Consistencia, Aislamiento y Durabilidad. Garantiza que un grupo de operaciones se ejecuten todas con éxito o ninguna se aplique, manteniendo la integridad de los datos ante apagones o fallos.",
    mercanexRole: "Al confirmar un pago, Mercanex ejecuta en un bloque DB::transaction: 1) Crear subórdenes, 2) Marcar keys como vendidas, 3) Actualizar saldos. Si cualquier paso falla, se revierte todo (Rollback), impidiendo datos corruptos.",
    analogy: "Un intercambio cara a cara: o te entrego el producto y tú me entregas el dinero, o nadie entrega nada si algo sale mal a mitad de camino.",
    badge: "Integridad Relacional",
    tagColor: "emerald"
  },

  // --- FINANZAS & MARCO LEGAL COLOMBIANO ---
  {
    id: "capex-opex",
    term: "Capex vs Opex (Evaluación Financiera)",
    category: "legal",
    categoryName: "Costos & Viabilidad",
    summary: "Diferenciación contable entre la inversión de capital inicial y los costos operativos recurrentes.",
    definition: "Capex (Capital Expenditure) es el costo de adquisición y desarrollo de la solución. Opex (Operational Expenditure) es el gasto periódico recurrente requerido para mantener la infraestructura y el servicio en funcionamiento.",
    mercanexRole: "Mercanex logra un Capex de $0 COP en desarrollo gracias a software libre comunitario (PHP, Laravel, PostgreSQL, Git). Su Opex se limita a ~$235.000 COP anuales (~$15.000 COP/mes de hosting VPS Linux Cloud + $55.000 COP/año de dominio).",
    analogy: "Capex es el dinero que gastas comprando una bicicleta; Opex es lo que gastas mes a mes en aceite para la cadena y parches de llanta para mantenerla rodando.",
    badge: "Viabilidad Financiera",
    tagColor: "emerald"
  },
  {
    id: "tco-breakeven",
    term: "TCO y Punto de Equilibrio (Break-Even)",
    category: "legal",
    categoryName: "Costos & Viabilidad",
    summary: "Costo Total de Propiedad y el umbral comercial donde los ingresos superan los gastos operativos.",
    definition: "El TCO calcula todos los costos directos e indirectos de poseer y operar el software durante su ciclo de vida. El punto de equilibrio es el momento financiero en que los ingresos mensuales igualan exactamente los costos fijos.",
    mercanexRole: "Con un costo operativo de ~$235.000 COP anuales, Mercanex alcanza su punto de equilibrio con tan solo 1 vendedor suscrito al Plan Profesional ($59.000 COP/mes) durante 4 meses, demostrando altísima viabilidad financiera.",
    analogy: "El día en que las ganancias de tu puesto de limonada cubren el costo de los limones, el azúcar y los vasos; a partir de ese vaso, todo es ganancia neta.",
    badge: "Rentabilidad",
    tagColor: "emerald"
  },
  {
    id: "ley-1581",
    term: "Ley 1581 de 2012 (Habeas Data)",
    category: "legal",
    categoryName: "Marco Legal Colombiano",
    summary: "Régimen general de protección de datos personales en el territorio colombiano.",
    definition: "Ley estatutaria que garantiza a todos los ciudadanos el derecho a conocer, actualizar, rectificar y solicitar la supresión de sus datos personales recolectados en bases de datos.",
    mercanexRole: "Mercanex cumple la ley mediante un Protocolo de Anonimización: ante retiro de cuenta de un usuario, se purgan contraseñas, secretos 2FA y correos de contacto, disociando los registros transaccionales bajo un identificador seudonimizado.",
    analogy: "El derecho a pedirle a una empresa que borre tu número de teléfono y dirección de su agenda cuando ya no deseas ser su cliente.",
    badge: "Protección de Datos",
    tagColor: "emerald"
  },
  {
    id: "ley-527",
    term: "Ley 527 de 1999 (Comercio Electrónico y 5 Años)",
    category: "legal",
    categoryName: "Marco Legal Colombiano",
    summary: "Normativa que otorga plena validez jurídica a los mensajes de datos y regula la conservación mercantil.",
    definition: "Ley que establece la equivalencia funcional de los documentos electrónicos frente a los documentos físicos en papel y obliga a conservar libros y comprobantes de comercio durante mínimo cinco (5) años (artículo 60 Código de Comercio).",
    mercanexRole: "Armoniza la supresión de Habeas Data con el deber mercantil: Mercanex no borra las órdenes ni pagos antiguos, sino que los conserva durante 5 años en formato seudonimizado (USUARIO_ANONIMIZADO_UUID) para auditoría contable ante la DIAN.",
    analogy: "Conservar las facturas de una tienda en una carpeta archivadora sellada por 5 años por si el inspector de impuestos viene a revisar las cuentas del negocio.",
    badge: "Validez Jurídica",
    tagColor: "emerald"
  },
  {
    id: "ley-1480",
    term: "Ley 1480 de 2011 (Estatuto del Consumidor / SLA 48h)",
    category: "legal",
    categoryName: "Marco Legal Colombiano",
    summary: "Estatuto legal que protege a los compradores frente a bienes defectuosos y publicidad engañosa.",
    definition: "Normativa colombiana que consagra los derechos de información, reclamación, calidad e idoneidad de bienes y servicios comercializados por canales tradicionales y electrónicos.",
    mercanexRole: "Regula el sistema de Reclamaciones de Mercanex: otorga una ventana formal de 48 horas tras la compra para que el cliente reporte claves inválidas, activando la garantía obligatoria de sustitución de clave o devolución de fondos.",
    analogy: "La garantía legal que tienes cuando compras un televisor y la tienda está obligada a cambiártelo o arreglártelo si no enciende al llegar a casa.",
    badge: "Garantía al Consumidor",
    tagColor: "emerald"
  },
  {
    id: "ley-603",
    term: "Ley 603 de 2000 (Derechos de Autor y Antipiratería)",
    category: "legal",
    categoryName: "Marco Legal Colombiano",
    summary: "Obliga a las empresas a cumplir estrictamente las normas de propiedad intelectual y software legal.",
    definition: "Ley que exige a todas las organizaciones en Colombia certificar que los programas de computador y productos de software utilizados y comercializados cuentan con las licencias y autorizaciones legales de sus titulares.",
    mercanexRole: "Es la base legal por la cual Mercanex prohíbe de forma terminante la venta de software pirateado, keys crackeadas, cuentas compartidas o credenciales ilegítimas, sancionando a comerciantes infractores con expulsión inmediata.",
    analogy: "La ley que prohíbe a una librería vender fotocopias piratas de libros universitarios en lugar de los textos originales autorizados por la editorial.",
    badge: "Antipiratería",
    tagColor: "emerald"
  },
  {
    id: "eula-tos",
    term: "EULA & Términos de Servicio (SaaS Propietario)",
    category: "legal",
    categoryName: "Marco Legal Colombiano",
    summary: "Contrato de adhesión que regula los derechos de uso de la plataforma sin ceder la propiedad intelectual.",
    definition: "End User License Agreement (Acuerdo de Licencia de Usuario Final) y Terms of Service. Documento jurídico vinculante que establece las reglas de navegación, responsabilidades, prohibiciones y límites de garantía del servicio.",
    mercanexRole: "Protege la autoría intelectual del equipo de aprendices del SENA: Mercanex se ofrece bajo suscripción como servicio en la nube (SaaS); los usuarios tienen derecho de uso de la interfaz, pero el código fuente es propiedad exclusiva del equipo.",
    analogy: "El contrato de alquiler de un apartamento: tienes derecho a vivir en él y usar sus comodidades, pero no puedes vender las paredes ni cambiar la estructura del edificio.",
    badge: "Propiedad Intelectual",
    tagColor: "emerald"
  },
  {
    id: "p95-latency",
    term: "Percentil 95 (Latencia P95)",
    category: "seguridad",
    categoryName: "Calidad de Software QA",
    summary: "Métrica estadística que mide el tiempo de respuesta del 95% de las peticiones de los usuarios.",
    definition: "Indicador cuantitativo de rendimiento en pruebas de estrés. Significa que de cada 100 solicitudes atendidas por el servidor, 95 tardan un tiempo menor o igual al umbral fijado, dejando solo al 5% más lento como cola extrema.",
    mercanexRole: "Es el SLA de rendimiento fijado para Mercanex: P95 <= 250 ms en lecturas del catálogo de juegos, y P95 <= 600 ms en operaciones de checkout y reserva de claves.",
    analogy: "Si atiendes a 100 clientes en una fila de banco, significa que 95 salieron en menos de 4 minutos y solo 5 tuvieron que esperar un poco más por trámites especiales.",
    badge: "SLA de Rendimiento",
    tagColor: "emerald"
  }
];

export function getTermById(id) {
  return TECH_DICTIONARY.find(t => t.id === id);
}
