/**
 * CATÁLOGO COMPLETO DE MOCKUPS UI/UX (72 PANTALLAS OFICIALES)
 * Agrupadas en 8 módulos funcionales del SRS Mercanex V3.0
 */

export const MOCKUPS_DATA = [
  // Módulo 1: Autenticación & Identidad (M01 - M08)
  { id: "M01", file: "M01.png", cat: "auth", catName: "Autenticación", title: "Pantalla de Bienvenida / Splash", desc: "Portada de la plataforma con branding institucional y acceso directo al catálogo de licencias." },
  { id: "M02", file: "M02.png", cat: "auth", catName: "Autenticación", title: "Registro de Nuevo Comprador", desc: "Formulario de alta con validación de correo y aceptación de Términos de Servicio y Habeas Data." },
  { id: "M03", file: "M03.png", cat: "auth", catName: "Autenticación", title: "Confirmación de Correo Electrónico", desc: "Pantalla de activación de cuenta mediante token criptográfico enviado vía SMTP." },
  { id: "M04", file: "M04.png", cat: "auth", catName: "Autenticación", title: "Inicio de Sesión (Login Clásico)", desc: "Autenticación segura con rate-limiting y hashing de contraseñas con Argon2id." },
  { id: "M05", file: "M05.png", cat: "auth", catName: "Autenticación", title: "Autenticación en Dos Factores (2FA TOTP)", desc: "Desafío de código dinámico de 6 dígitos generado por Google Authenticator / Authy (RFC 6238)." },
  { id: "M06", file: "M06.png", cat: "auth", catName: "Autenticación", title: "Configuración Inicial de 2FA", desc: "Presentación del código QR secreto y códigos de recuperación de emergencia (recovery codes)." },
  { id: "M07", file: "M07.png", cat: "auth", catName: "Autenticación", title: "Recuperación de Contraseña", desc: "Solicitud de restablecimiento de acceso con envío de enlace temporal con expiración." },
  { id: "M08", file: "M08.png", cat: "auth", catName: "Autenticación", title: "Restablecimiento de Credenciales", desc: "Validación de nueva contraseña bajo políticas de complejidad de la información." },

  // Módulo 2: Tiendas & Onboarding Vendedor (M09 - M18)
  { id: "M09", file: "M09.png", cat: "tiendas", catName: "Tiendas & Vendedores", title: "Solicitud de Alta como Vendedor", desc: "Inicio del flujo de postulación comercial para publicar software y videojuegos." },
  { id: "M10", file: "M10.png", cat: "tiendas", catName: "Tiendas & Vendedores", title: "Carga de Documentación Legal", desc: "Carga de RUT y certificación bancaria para vinculación con la pasarela agregadora ePayco." },
  { id: "M11", file: "M11.png", cat: "tiendas", catName: "Tiendas & Vendedores", title: "Estado de Aprobación de Tienda", desc: "Pantalla de seguimiento con retroalimentación administrativa sobre el estado del expediente." },
  { id: "M12", file: "M12.png", cat: "tiendas", catName: "Tiendas & Vendedores", title: "Configuración de Perfil de Tienda", desc: "Personalización de banner comercial, logotipo, horarios y políticas de soporte postventa." },
  { id: "M13", file: "M13.png", cat: "tiendas", catName: "Tiendas & Vendedores", title: "Selección de Planes Freemium", desc: "Matriz comparativa de planes: Gratis (0% comisión), Emprendedor y Profesional con analíticas." },
  { id: "M14", file: "M14.png", cat: "tiendas", catName: "Tiendas & Vendedores", title: "Suscripción al Plan Profesional", desc: "Pasarela de pago recurrente a $59.000 COP/mes para herramientas avanzadas de venta." },
  { id: "M15", file: "M15.png", cat: "tiendas", catName: "Tiendas & Vendedores", title: "Dashboard Principal del Vendedor", desc: "Métricas consolidadas de ventas netas, subpedidos activos y alertas de stock bajo." },
  { id: "M16", file: "M16.png", cat: "tiendas", catName: "Tiendas & Vendedores", title: "Resumen Financiero y Saldos", desc: "Visualización de fondos dispersados vía ACH por ePayco y comisiones $0 de Mercanex." },
  { id: "M17", file: "M17.png", cat: "tiendas", catName: "Tiendas & Vendedores", title: "Ajustes de Notificaciones y Webhooks", desc: "Preferencias de alertas instantáneas para nuevas ventas, reclamos y mensajes de clientes." },
  { id: "M18", file: "M18.png", cat: "tiendas", catName: "Tiendas & Vendedores", title: "Gestión de Personal y Permisos", desc: "Configuración de roles y accesos delegados para operadores dentro de la misma tienda." },

  // Módulo 3: Gestión de Productos & Claves Cifradas (M19 - M28)
  { id: "M19", file: "M19.png", cat: "productos", catName: "Productos & Claves", title: "Listado de Productos del Vendedor", desc: "Inventario activo de títulos con estado de stock disponible, reservado y agotado." },
  { id: "M20", file: "M20.png", cat: "productos", catName: "Productos & Claves", title: "Formulario de Nuevo Producto", desc: "Registro de ficha técnica, plataforma (Steam, Xbox, Windows, EA), región y precio en COP." },
  { id: "M21", file: "M21.png", cat: "productos", catName: "Productos & Claves", title: "Carga Individual de Claves Digitales", desc: "Ingreso unitario de códigos de activación con cifrado AES-256-CBC en reposo." },
  { id: "M22", file: "M22.png", cat: "productos", catName: "Productos & Claves", title: "Carga Masiva de Claves (CSV / TXT)", desc: "Subida de lotes de hasta 500 claves por archivo con descarte automático de duplicados." },
  { id: "M23", file: "M23.png", cat: "productos", catName: "Productos & Claves", title: "Monitor de Stock Digital Disponible", desc: "Indicador gráfico de unidades listas para entrega inmediata en el checkout." },
  { id: "M24", file: "M24.png", cat: "productos", catName: "Productos & Claves", title: "Edición de Precios y Promociones", desc: "Actualización de precios con programación de descuentos por tiempo limitado." },
  { id: "M25", file: "M25.png", cat: "productos", catName: "Productos & Claves", title: "Auditoría de Ingesta Criptográfica", desc: "Registro forense inmutable con firma SHA-256 de las claves inyectadas al almacén." },
  { id: "M26", file: "M26.png", cat: "productos", catName: "Productos & Claves", title: "Desactivación / Pausa de Publicación", desc: "Ocultamiento preventivo de títulos sin eliminar el historial de ventas pasadas." },
  { id: "M27", file: "M27.png", cat: "productos", catName: "Productos & Claves", title: "Historial de Claves Asignadas", desc: "Trazabilidad de entrega con hash anonimizado vinculado a subórdenes específicas." },
  { id: "M28", file: "M28.png", cat: "productos", catName: "Productos & Claves", title: "Reporte de Inventario Agotado", desc: "Notificaciones automáticas al comerciante cuando el stock cae a cero unidades." },

  // Módulo 4: Catálogo & Búsqueda Avanzada (M29 - M36)
  { id: "M29", file: "M29.png", cat: "catalogo", catName: "Catálogo & Búsqueda", title: "Home Marketplace Mercanex", desc: "Vitrina principal con carrusel de lanzamientos, ofertas del día y tiendas destacadas." },
  { id: "M30", file: "M30.png", cat: "catalogo", catName: "Catálogo & Búsqueda", title: "Explorador de Catálogo con Filtros", desc: "Búsqueda facetada por plataforma, género, rango de precio en COP y reputación del vendedor." },
  { id: "M31", file: "M31.png", cat: "catalogo", catName: "Catálogo & Búsqueda", title: "Resultados de Búsqueda Dinámica", desc: "Renderizado reactivo con latencia P95 inferior a 250 ms en consultas complejas." },
  { id: "M32", file: "M32.png", cat: "catalogo", catName: "Catálogo & Búsqueda", title: "Ficha Detallada del Producto", desc: "Requisitos de sistema, idiomas soportados y comparativa de precios entre distintas tiendas." },
  { id: "M33", file: "M33.png", cat: "catalogo", catName: "Catálogo & Búsqueda", title: "Página Pública de Tienda Vendedora", desc: "Perfil público del comerciante con insignias de confianza, catálogo propio y opiniones." },
  { id: "M34", file: "M34.png", cat: "catalogo", catName: "Catálogo & Búsqueda", title: "Sección de Ofertas Relámpago", desc: "Espacio dedicado a promociones con temporizador dinámico de cuenta regresiva." },
  { id: "M35", file: "M35.png", cat: "catalogo", catName: "Catálogo & Búsqueda", title: "Lista de Deseos del Comprador", desc: "Almacenamiento de títulos favoritos con alertas automáticas de reducción de precio." },
  { id: "M36", file: "M36.png", cat: "catalogo", catName: "Catálogo & Búsqueda", title: "Vista de Reseñas y Calificaciones", desc: "Comentarios verificados únicamente por usuarios con suborden completada satisfactoriamente." },

  // Módulo 5: Carrito Multi-Vendedor & Checkout ePayco (M37 - M46)
  { id: "M37", file: "M37.png", cat: "carrito", catName: "Carrito & Checkout", title: "Carrito Multi-Vendedor Persistente", desc: "Agrupación inteligente de productos por vendedor con subtotales y cálculo de tarifas." },
  { id: "M38", file: "M38.png", cat: "carrito", catName: "Carrito & Checkout", title: "Mini-Carrito Desplegable (Flyout)", desc: "Acceso rápido a los artículos seleccionados desde cualquier sección de la plataforma." },
  { id: "M39", file: "M39.png", cat: "carrito", catName: "Carrito & Checkout", title: "Resumen Previo de Checkout", desc: "Desglose claro de subtotales por tienda, tarifa ePayco y monto global único a pagar." },
  { id: "M40", file: "M40.png", cat: "carrito", catName: "Carrito & Checkout", title: "Formulario de Facturación y Datos", desc: "Captura de correo de recepción de licencias y datos para emisión de factura legal." },
  { id: "M41", file: "M41.png", cat: "carrito", catName: "Carrito & Checkout", title: "Selección de Método de Pago ePayco", desc: "Pasarela con PSE, Tarjeta de Crédito, Débito y pagos en efectivo (Efecty, Gana, SuRed)." },
  { id: "M42", file: "M42.png", cat: "carrito", catName: "Carrito & Checkout", title: "Bloqueo Concurrente de Claves", desc: "Activación del bloqueo pesimista en PostgreSQL con temporizador TTL de 15 minutos." },
  { id: "M43", file: "M43.png", cat: "carrito", catName: "Carrito & Checkout", title: "Pasarela Hosted Segura ePayco", desc: "Entorno bancario certificado PCI-DSS donde se efectúa la transacción financiera." },
  { id: "M44", file: "M44.png", cat: "carrito", catName: "Carrito & Checkout", title: "Confirmación de Pago Exitoso", desc: "Recepción del Webhook con firma HMAC y creación atómica de Orden Global y Subórdenes." },
  { id: "M45", file: "M45.png", cat: "carrito", catName: "Carrito & Checkout", title: "Pantalla de Transacción Rechazada", desc: "Liberación inmediata del inventario retenido con opción de reintento de pago." },
  { id: "M46", file: "M46.png", cat: "carrito", catName: "Carrito & Checkout", title: "Comprobante de Pago y Factura", desc: "Descarga de recibo digital en PDF con identificador único de transacción." },

  // Módulo 6: Entrega Digital, Visor Seguro & Chat (M47 - M56)
  { id: "M47", file: "M47.png", cat: "chat", catName: "Entrega Digital & Chat", title: "Centro de Despacho Digital", desc: "Bandeja consolidada con las claves adquiridas listas para ser reveladas por el usuario." },
  { id: "M48", file: "M48.png", cat: "chat", catName: "Entrega Digital & Chat", title: "Visor Seguro de Claves Efímero", desc: "Componente frontend con ofuscación por asteriscos, revelado temporal y copiado seguro." },
  { id: "M49", file: "M49.png", cat: "chat", catName: "Entrega Digital & Chat", title: "Guía de Canje Oficial de la Licencia", desc: "Instrucciones detalladas para activar la clave en Steam, Microsoft Store, Xbox o EA App." },
  { id: "M50", file: "M50.png", cat: "chat", catName: "Entrega Digital & Chat", title: "Chat en Tiempo Real por Subpedido", desc: "Canal bidireccional sobre WebSockets (Laravel Reverb) entre comprador y comerciante." },
  { id: "M51", file: "M51.png", cat: "chat", catName: "Entrega Digital & Chat", title: "Indicador de Escritura y Doble Check", desc: "Eventos reactivos de estado de presencia, 'escribiendo...' y confirmación de lectura." },
  { id: "M52", file: "M52.png", cat: "chat", catName: "Entrega Digital & Chat", title: "Envío de Capturas en el Chat", desc: "Carga saneada de imágenes para brindar asistencia en el proceso de activación." },
  { id: "M53", file: "M53.png", cat: "chat", catName: "Entrega Digital & Chat", title: "Bandeja de Conversaciones del Usuario", desc: "Listado cronológico de chats activos agrupados por código de suborden." },
  { id: "M54", file: "M54.png", cat: "chat", catName: "Entrega Digital & Chat", title: "Notificaciones Flotantes en Vivo", desc: "Alertas toast reactivas ante nuevos mensajes y actualizaciones del estado de la orden." },
  { id: "M55", file: "M55.png", cat: "chat", catName: "Entrega Digital & Chat", title: "Confirmación de Recepción por Comprador", desc: "Opción voluntaria del cliente para calificar la tienda y certificar la entrega exitosa." },
  { id: "M56", file: "M56.png", cat: "chat", catName: "Entrega Digital & Chat", title: "Cierre Automático de Subpedido", desc: "Transición a estado 'Completada' una vez superada la ventana legal de garantía." },

  // Módulo 7: Garantías & Reclamaciones 48h (M57 - M64)
  { id: "M57", file: "M57.png", cat: "reclamos", catName: "Garantías & Reclamos", title: "Apertura de Reclamo Formal (48h)", desc: "Formulario bajo Ley 1480 de 2011 para reportar clave inválida o ya canjeada." },
  { id: "M58", file: "M58.png", cat: "reclamos", catName: "Garantías & Reclamos", title: "Adjuntar Evidencias de Error", desc: "Carga de captura de pantalla oficial emitida por el launcher (Steam/Xbox) con el error." },
  { id: "M59", file: "M59.png", cat: "reclamos", catName: "Garantías & Reclamos", title: "Panel de Disputa del Vendedor", desc: "Bandeja donde el comerciante es notificado del reclamo y dispone de 48h para resolver." },
  { id: "M60", file: "M60.png", cat: "reclamos", catName: "Garantías & Reclamos", title: "Sustitución Inmediata de Clave", desc: "Entrega automática de una nueva key de respaldo desde el inventario del vendedor." },
  { id: "M61", file: "M61.png", cat: "reclamos", catName: "Garantías & Reclamos", title: "Escalamiento a Mediación Administrativa", desc: "Intervención del equipo de soporte de Mercanex si las partes no alcanzan un acuerdo." },
  { id: "M62", file: "M62.png", cat: "reclamos", catName: "Garantías & Reclamos", title: "Resolución de Disputa y Dictamen", desc: "Cierre formal del caso con dictamen técnico motivado y registro en el expediente." },
  { id: "M63", file: "M63.png", cat: "reclamos", catName: "Garantías & Reclamos", title: "Ejecución de Split Refund", desc: "Reembolso automático debitado exclusivamente de la cuenta del vendedor responsable." },
  { id: "M64", file: "M64.png", cat: "reclamos", catName: "Garantías & Reclamos", title: "Historial de Reclamaciones", desc: "Expediente del usuario con trazabilidad de garantías atendidas y fallos." },

  // Módulo 8: Backoffice & Auditoría Forense (M65 - M72)
  { id: "M65", file: "M65.png", cat: "admin", catName: "Backoffice & Auditoría", title: "Panel de Control del Administrador", desc: "Métricas globales de volumen transaccionado, comercios activos y estabilidad del sistema." },
  { id: "M66", file: "M66.png", cat: "admin", catName: "Backoffice & Auditoría", title: "Bandeja de Moderación de Vendedores", desc: "Validación documental de RUT y certificaciones bancarias antes de habilitar la tienda." },
  { id: "M67", file: "M67.png", cat: "admin", catName: "Backoffice & Auditoría", title: "Supervisión de Catálogo y Precios", desc: "Detección preventiva de software ilícito o activadores no autorizados (Ley 603 de 2000)." },
  { id: "M68", file: "M68.png", cat: "admin", catName: "Backoffice & Auditoría", title: "Monitor de Webhooks de Pasarela", desc: "Registro técnico de peticiones entrantes de ePayco con validación de firmas HMAC." },
  { id: "M69", file: "M69.png", cat: "admin", catName: "Backoffice & Auditoría", title: "Log Inmutable de Auditoría", desc: "Trazabilidad forense con IP, User-Agent y timestamp de operaciones sensibles." },
  { id: "M70", file: "M70.png", cat: "admin", catName: "Backoffice & Auditoría", title: "Gestión de Bloqueos y Sanciones", desc: "Suspensión preventiva o expulsión definitiva de tiendas infractoras de políticas." },
  { id: "M71", file: "M71.png", cat: "admin", catName: "Backoffice & Auditoría", title: "Reporte Contable de Suscripciones", desc: "Monitoreo de ingresos generados por los planes SaaS Freemium y cálculo de viabilidad." },
  { id: "M72", file: "M72.png", cat: "admin", catName: "Backoffice & Auditoría", title: "Centro de Anonimización Habeas Data", desc: "Ejecución protocolaria de supresión de datos conforme a la Ley 1581 de 2012." }
];
