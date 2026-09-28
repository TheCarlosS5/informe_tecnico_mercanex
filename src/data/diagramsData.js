import { driveAsset, driveImage } from './driveAssets';
/**
 * CATÁLOGO DE DIAGRAMAS OFICIALES DE INGENIERÍA (16 ARTEFACTOS UML Y DER)
 * Resolución nativa 300 DPI para sustentación SENA ADSO
 */

const diagrams = [
  {
    id: "D01",
    file: "D01_Registro_y_Verificacion.png",
    title: "D01: Registro de Usuarios y Verificación",
    category: "Actividad UML",
    desc: "Modelado del flujo de registro dual (comprador y comerciante), validación asíncrona de correo vía SMTP y aceptación formal de Términos de Servicio."
  },
  {
    id: "D02",
    file: "D02_Inicio_Sesion_y_2FA.png",
    title: "D02: Inicio de Sesión y Autenticación 2FA TOTP",
    category: "Seguridad & Acceso",
    desc: "Flujo de verificación de credenciales con hashing Argon2id y desafío de segundo factor mediante el estándar RFC 6238."
  },
  {
    id: "D03",
    file: "D03_Habilitacion_Vendedor_y_Tienda.png",
    title: "D03: Habilitación de Vendedor y Configuración de Tienda",
    category: "Onboarding Comercial",
    desc: "Proceso de entrega de RUT, certificación bancaria y asignación de subcuenta en la pasarela agregadora ePayco."
  },
  {
    id: "D04",
    file: "D04_Secuencia_ePayco_Split_1_a_N.png",
    title: "D04: Secuencia ePayco Pagos Divididos (Split 1:N)",
    category: "Transaccional & Pasarela",
    desc: "Diagrama de secuencia cardinal que describe el cobro unificado al cliente y la dispersión automática a múltiples comercios con 0% de comisión de Mercanex."
  },
  {
    id: "D05",
    file: "D05_Creacion_y_Aprobacion_Publicacion.png",
    title: "D05: Creación, Validación y Aprobación de Publicación",
    category: "Ciclo de Producto",
    desc: "Ciclo de vida de una publicación: desde el borrador inicial del comerciante hasta la validación de cumplimiento de la Ley 603 de 2000."
  },
  {
    id: "D06",
    file: "D06_Ciclo_Inventario_Digital.png",
    title: "D06: Ciclo de Vida del Inventario Digital",
    category: "Máquina de Estados",
    desc: "Transiciones de una clave digital: DISPONIBLE -> RESERVADA (TTL 15m con SELECT FOR UPDATE) -> VENDIDA / LIBERADA."
  },
  {
    id: "D07",
    file: "D07_Navegacion_del_Catalogo.png",
    title: "D07: Navegación del Catálogo y Caché",
    category: "Rendimiento & Búsqueda",
    desc: "Arquitectura de indexación para garantizar tiempos de respuesta P95 inferiores a 250 ms en consultas con filtros múltiples."
  },
  {
    id: "D08",
    file: "D08_Carrito_Multivendedor_y_Checkout.png",
    title: "D08: Carrito Multi-Vendedor y Orquestación del Checkout",
    category: "Arquitectura Transaccional",
    desc: "Agrupación de productos por tienda, reserva atómica de inventario y generación jerárquica de la Orden Global con N Subórdenes."
  },
  {
    id: "D09",
    file: "D09_Entrega_Digital_y_Recuperacion_Fallo.png",
    title: "D09: Entrega Digital Instantánea y Manejo de Contingencias",
    category: "Despacho Criptográfico",
    desc: "Despacho atómico en memoria tras la validación de la firma criptográfica HMAC-SHA256 del Webhook bancario."
  },
  {
    id: "D10",
    file: "D10_WebSockets_Mensajeria_Tiempo_Real.png",
    title: "D10: Mensajería en Tiempo Real con Laravel Reverb",
    category: "WebSockets & Eventos",
    desc: "Canal bidireccional sobre WSS para soporte directo por subpedido con latencia inferior a 50 milisegundos."
  },
  {
    id: "D11",
    file: "D11_Distribucion_de_Notificaciones.png",
    title: "D11: Distribución Asíncrona de Notificaciones",
    category: "Colas & Workers",
    desc: "Encolamiento asíncrono con Redis y Laravel Queues para el envío masivo de correos transaccionales y notificaciones push."
  },
  {
    id: "D12",
    file: "D12_Ciclo_Completo_de_un_Reclamo.png",
    title: "D12: Ciclo de Vida de una Reclamación (SLA 48h)",
    category: "Marco Legal Ley 1480",
    desc: "Flujo de garantía legal: apertura de reclamo, revisión de evidencia, reemplazo de clave o ejecución de Split Refund."
  },
  {
    id: "D13_DER",
    file: "D13_DER_Modelo_Entidad_Relacion_PostgreSQL16.png",
    title: "D13: DER Modelo Entidad-Relación PostgreSQL 16",
    category: "Base de Datos Relacional",
    desc: "Esquema relacional maestro de 14 tablas en 3FN con claves UUID v4, campos cifrados AES-256 e integridad referencial estricta."
  },
  {
    id: "D13_REC",
    file: "D13_Reincidencias_y_Medidas_Revision.png",
    title: "D13-B: Gestión de Reincidencias y Medidas Correctivas",
    category: "Políticas & Moderación",
    desc: "Algoritmo de detección de fallas reiteradas por tienda que gatilla suspensiones temporales o expulsión definitiva."
  },
  {
    id: "D14",
    file: "D14_Revision_y_Aprobacion_Vendedor.png",
    title: "D14: Flujo de Aprobación Documental de Tienda",
    category: "Auditoría Administrativa",
    desc: "Puntos de control administrativo para certificar la validez legal del RUT y la certificación bancaria antes de permitir ventas."
  },
  {
    id: "D15",
    file: "D15_Moderacion_Administrativa.png",
    title: "D15: Moderación y Auditoría Global de la Plataforma",
    category: "Gobernanza del Software",
    desc: "Capas de supervisión del marketplace y trazabilidad inmutable de operaciones sensibles para cumplimiento normativo."
  }
];

export const DIAGRAMS_DATA = diagrams.map(item => ({ ...item, driveUrl: driveAsset('diagrams', item.file)?.url, imageUrl: driveImage('diagrams', item.file, 1000) }));
