import type { LocaleCode, Localization } from './types'

/* v8 ignore start */
export const locales: Partial<Record<LocaleCode, Localization>> = {
  /**
   * @lang English
   *
   * User-Agent - a string that is sent along to any website you visit. This is a sort of "fingerprint" your browser
   * leaves behind which contains:
   *
   * ⭐️ The name and version of your browser
   * ⭐️ The name of the operating system (Mac, Windows, Linux, etc.) and its version
   * ⭐️ Information about some plugins installed on the browser
   * ⭐️ Other information that identifies and exposes you
   *
   * 🚀 This extension has been created to stop data leakage and emulate different devices in the simplest way!
   *
   * It automatically replaces User-Agent strings after a specified period of time with a randomized one. User-Agent
   * strings can also be set manually. The extension is incredibly lightweight, using very few resources. User-Agent
   * randomization can be customized by the user (what browsers and OS are spoofed, etc.). Exceptions list available
   * with the option of wildcards. Protects against Javascript exploits to hide your identity and protect your
   * anonymity.
   *
   * Completely free and with no ads.
   *
   * Made with ❤️ Source code: https://github.com/tarampampam/random-user-agent
   */
  en: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Automatically change the user agent after specified period of time to a randomly selected one, thus hiding your real user agent',
    manifest_action_default_title: 'Randomize your User-Agent',
    manifest_command_renew_useragent: 'Get new agent',
    active_user_agent: 'Active User-Agent',
    pause_switcher: 'Pause Switcher',
    unpause_switcher: 'Resume Switcher',
    enable_switcher: 'Enable Switcher',
    enabled_on_this_domain: 'Enabled on this domain',
    sync_useragent_with_host_os: 'Sync the current OS with the generated user agent',
    get_new_agent: 'Get new agent',
    open_settings: 'Open settings',
    make_donation: 'Donate',
    bug_report: 'Bug report',
    general_settings: 'General settings',
    general_settings_hint: 'Change the behavior of the switcher to best fit your needs',
    auto_renew: 'Automatically change the User-Agent after specified period of time',
    auto_renew_interval: 'Time (in seconds) to automatically update the User-Agent (e.g. 1 hour = 3600)',
    auto_renew_on_startup: 'Change User-Agent on browser startup',
    js_protection: 'Protect against detection by JavaScript',
    custom_useragent: 'Use one of (in the randomized order) custom User-Agent instead generated',
    custom_useragent_list: 'Custom User-Agents (set a specific User-Agents, one per line)',
    generator_settings: 'Generator settings',
    generator_settings_hint: 'Here you can change the agent switching behavior',
    blacklist_settings: 'Blacklist settings',
    blacklist_settings_hint:
      'Blacklist mode - switching enabled everywhere, except the defined domains & rules. Whitelist - on the contrary, disabled everywhere except the specified domains & rules',
    blacklist_mode: 'Blacklist mode',
    whitelist_mode: 'Whitelist mode',
    blacklist_domains: 'Domain names list (one per line)',
    remove: 'Remove',
    save_changes: 'Save changes',
    error_occurred: 'Error occurred',
    like_this_extension: 'Do you like this extension?',
    give_a_star_on_github: 'Give us a star on GitHub!',
    remote_useragent_list: 'Use one of (in the randomized order) the User-Agents from the list by the following URL',
    remote_useragent_list_hint: 'The extension will periodically download it to keep it up to date',
    remote_useragent_updating_interval: 'Updating interval (in seconds; e.g. every 3 hours = 60×60×3 = 10800)',
    update_now: 'Update now',
    please_rate_extension: 'Please, rate this addon!',
    edge_win: 'Edge on Windows',
    edge_mac: 'Edge on Mac',
    chrome_win: 'Chrome on Windows',
    chrome_mac: 'Chrome on Mac',
    chrome_linux: 'Chrome on Linux',
    chrome_android: 'Chrome on Android',
    firefox_win: 'FireFox on Windows',
    firefox_mac: 'FireFox on Mac',
    firefox_linux: 'FireFox on Linux',
    firefox_android: 'Firefox on Android',
    opera_win: 'Opera on Windows',
    opera_mac: 'Opera on Mac',
    safari_iphone: 'Safari on iPhone',
    safari_mac: 'Safari on Mac',
    why_we_need_permissions: 'To function properly, the extension requires the following permissions',
    read_and_modify_data: 'Read and modify all your data on the websites you visit',
    read_and_modify_data_reason:
      'to inject the necessary scripts into the pages to prevent real user-agent and other data leaks',
    grant_permission_button: 'Grant permissions',
  },

  /**
   * @lang German
   *
   * User-Agent - eine Zeichenfolge die an jede Webseite die du besuchst gesendet wird. Er ist eine Art Fingerabdruck
   * deines Browsers und beinhaltet:
   *
   * ⭐️ Den Namen und die Version deines Browsers
   * ⭐️ Den Namen deines Betriebssystems (Mac, Windows, Linux, usw.) und dessen Version
   * ⭐️ Informationen über manche installierte Plugins
   * ⭐️ Andere Informationen, welche dich indentifizieren
   *
   * 🚀 Diese erweiterung wurde erstellt um Datenlecks zu stoppen.
   *
   * Sie verändert den User-Agent nach einer bestimmten Zeitspanne automatisch zu einem zufällig ausgesuchten.
   * User-Agents können auch manuell gesetzt werden. Die Erweiterung ist unglaublich leichtgewichtig, sie benutzt nur
   * sehr wenige Ressourcen. Die User-Agent zufallsgenerierung kann vom Benutzer angepasst werden (welche Browser und
   * Betriebssysteme ausgewählt werden, usw.). Eine Ausnahmeliste mit optionalen Wildcards ist verfügbar. Schützt vor
   * JavaScript Schwachstellen um deine Identität zu verstecken und deine Anonymität zu schützen.
   *
   * Völlig kostenlos und ohne Werbung.
   *
   * Made with ❤️ Quellcode: https://github.com/tarampampam/random-user-agent
   */
  de: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Ändere den User-Agent automatisch nach einer bestimmten Zeitspanne, was deinen echten User-Agent versteckt',
    manifest_action_default_title: 'Randomisiere deinen User-Agent',
    manifest_command_renew_useragent: 'Neuen Agent anfordern',
    active_user_agent: 'Aktiver User-Agent',
    pause_switcher: 'Switcher pausieren',
    unpause_switcher: 'Switcher fortsetzen',
    enable_switcher: 'Switcher aktivieren',
    enabled_on_this_domain: 'Auf dieser Domain aktiviert',
    sync_useragent_with_host_os: '', // TODO: Translate
    get_new_agent: 'Neuen Agent anfordern',
    open_settings: 'Einstellungen öffnen',
    make_donation: 'Spenden',
    bug_report: 'Fehler melden',
    general_settings: 'Generelle Einstellungen',
    general_settings_hint: 'Ändere das Verhalten des Switchers, um ihn deinen Anforderungen anzupassen',
    auto_renew: 'Ändere den User-Agent nach einer bestimmten Zeitspanne automatisch',
    auto_renew_interval: 'Zeit (in Sekunden) um den User-Agenten zu aktualisieren (z.B. 1 Stunde = 3600)',
    auto_renew_on_startup: 'Ändere den User-Agent beim Starten des Browsers',
    js_protection: 'Schütze vor Erkennung durch JavaScript',
    custom_useragent: 'Benutze eigene User-Agenten statt der generierten',
    custom_useragent_list: 'Benutzerdefinierte User-Agenten (setze einen spezifischen User-Agent, einer pro Zeile)',
    generator_settings: 'Generator Einstellungen',
    generator_settings_hint: 'Hier kannst du das Verhalten des Switchers anpassen',
    blacklist_settings: 'Blacklist Einstellungen',
    blacklist_settings_hint:
      'Blacklist Modus - wechseln überall aktiviert, außer die definierten Domains & Regeln. Whitelist - andersherum, überall deaktiviert außer die definierten Domains & Regeln',
    blacklist_mode: 'Blacklist Modus',
    whitelist_mode: 'Whitelist Modus',
    blacklist_domains: 'Domainnamen Liste (eine pro Zeile)',
    remove: 'Entfernen',
    save_changes: 'Änderungen speichern',
    error_occurred: 'Ein Fehler ist aufgetreten',
    like_this_extension: 'Gefällt dir diese Erweiterung?',
    give_a_star_on_github: 'Gib uns einen Stern auf GitHub!',
    remote_useragent_list:
      'Benutze einen der (in zufälliger Reihenfolge) User-Agenten aus der Liste bei der folgenden URL',
    remote_useragent_list_hint: 'Die Erweiterung wird sie periodisch herunterladen um sie aktuell zu halten',
    remote_useragent_updating_interval:
      'Aktualisierungs Intervall (in Sekunden; z.B. alle 3 Stunden = 60×60×3 = 10800)',
    update_now: 'Jetzt aktualisieren',
    please_rate_extension: 'Bitte bewerten Sie dieses Addon!',
    edge_win: 'Edge auf Windows',
    edge_mac: 'Edge auf Mac',
    chrome_win: 'Chrome auf Windows',
    chrome_mac: 'Chrome auf Mac',
    chrome_linux: 'Chrome auf Linux',
    chrome_android: 'Chrome auf Android',
    firefox_win: 'Firefox auf Windows',
    firefox_mac: 'Firefox auf Mac',
    firefox_linux: 'Firefox auf Linux',
    firefox_android: 'Firefox auf Android',
    opera_win: 'Opera auf Windows',
    opera_mac: 'Opera auf Mac',
    safari_iphone: 'Safari auf iPhone',
    safari_mac: 'Safari auf Mac',
    why_we_need_permissions: 'Um ordnungsgemäß zu funktionieren, benötigt die Erweiterung folgende Berechtigungen',
    read_and_modify_data: 'Lesen und Ändern aller Ihrer Daten auf den von Ihnen besuchten Websites',
    read_and_modify_data_reason:
      'um die erforderlichen Skripte in die Seiten einzufügen, um echte Benutzeragenten und andere Datenlecks zu verhindern',
    grant_permission_button: 'Berechtigungen erteilen',
  },

  /**
   * @lang Spanish
   *
   * User-Agent: cadena que se envía a cualquier sitio web que visite. Se trata de una especie de "huella digital"
   * que deja su navegador y que contiene:
   *
   * ⭐️ El nombre y la versión de su navegador
   * ⭐️ El nombre del sistema operativo (Mac, Windows, Linux, etc.) y su versión
   * ⭐️ Información sobre algunos plugins instalados en el navegador
   * ⭐️ Otros datos que te identifican y te dejan en evidencia
   *
   * 🚀 ¡Esta extensión ha sido creada para detener la fuga de datos y emular diferentes dispositivos de la forma
   * más sencilla!
   *
   * Reemplaza automáticamente las cadenas User-Agent después de un período de tiempo especificado por una aleatoria.
   * Las cadenas User-Agent también se pueden configurar manualmente. La extensión es increíblemente ligera y utiliza
   * muy pocos recursos. La aleatorización de User-Agent puede ser personalizada por el usuario (qué navegadores y SO
   * son suplantados, etc.). Lista de excepciones disponible con la opción de comodines. Protege contra exploits
   * Javascript para ocultar su identidad y proteger su anonimato.
   *
   * Completamente gratuito y sin anuncios.
   *
   * Hecho con ❤️ Código fuente: https://github.com/tarampampam/random-user-agent
   */
  es: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Cambiar automáticamente el agente de usuario después de un período de tiempo especificado a uno seleccionado al azar, ocultando así su agente de usuario real',
    manifest_action_default_title: 'Aleatorice su User-Agent',
    manifest_command_renew_useragent: 'Obtener nuevo agente',
    active_user_agent: 'Agente de usuario activo',
    pause_switcher: 'Conmutador de pausa',
    unpause_switcher: 'Reanudar el cambio',
    enable_switcher: 'Activar conmutador',
    enabled_on_this_domain: 'Activado en este dominio',
    sync_useragent_with_host_os: '', // TODO: Translate
    get_new_agent: 'Obtener nuevo agente',
    open_settings: 'Abrir ajustes',
    make_donation: 'Donar',
    bug_report: 'Informe de error',
    general_settings: 'Configuración general',
    general_settings_hint: 'Cambia el comportamiento del conmutador para adaptarlo mejor a tus necesidades',
    auto_renew: 'Cambiar automáticamente el User-Agent después de un período de tiempo especificado',
    auto_renew_interval:
      'Tiempo (en segundos) para actualizar automáticamente el User-Agent (por ejemplo, 1 hora = 3600)',
    auto_renew_on_startup: 'Cambiar el User-Agent al iniciar el navegador',
    js_protection: 'Protección contra la detección mediante JavaScript',
    custom_useragent: 'Utilice uno de (en el orden aleatorio) User-Agent personalizado en lugar generado',
    custom_useragent_list: 'User-Agents personalizados (establecer un User-Agents específico, uno por línea)',
    generator_settings: 'Ajustes del generador',
    generator_settings_hint: 'Aquí puede cambiar el comportamiento de cambio de agente',
    blacklist_settings: 'Configuración de la lista negra',
    blacklist_settings_hint:
      'Modo Lista Negra - conmutación habilitada en todas partes, excepto en los dominios y reglas definidos. Lista blanca - por el contrario, desactivada en todas partes excepto en los dominios & reglas especificados',
    blacklist_mode: 'Modo lista negra',
    whitelist_mode: 'Modo de lista blanca',
    blacklist_domains: 'Lista de nombres de dominio (uno por línea)',
    remove: 'Eliminar',
    save_changes: 'Guardar cambios',
    error_occurred: 'Se ha producido un error',
    like_this_extension: '¿Le gusta esta extensión?',
    give_a_star_on_github: '¡Danos una estrella en GitHub!',
    remote_useragent_list: 'Utilice uno de los User-Agents (en orden aleatorio) de la lista de la siguiente URL',
    remote_useragent_list_hint: 'La extensión lo descargará periódicamente para mantenerlo actualizado',
    remote_useragent_updating_interval:
      'Intervalo de actualización (en segundos; por ejemplo, cada 3 horas = 60×60×3 = 10800)',
    update_now: 'Actualizar ahora',
    please_rate_extension: 'Por favor, valora este complemento',
    edge_win: 'Edge en Windows',
    edge_mac: 'Edge en Mac',
    chrome_win: 'Chrome en Windows',
    chrome_mac: 'Chrome en Mac',
    chrome_linux: 'Chrome en Linux',
    chrome_android: 'Chrome en Android',
    firefox_win: 'FireFox en Windows',
    firefox_mac: 'FireFox en Mac',
    firefox_linux: 'FireFox en Linux',
    firefox_android: 'Firefox en Android',
    opera_win: 'Opera en Windows',
    opera_mac: 'Opera en Mac',
    safari_iphone: 'Safari en iPhone',
    safari_mac: 'Safari en Mac',
    why_we_need_permissions: 'Para funcionar correctamente, la extensión requiere los siguientes permisos',
    read_and_modify_data: 'Leer y modificar todos tus datos en los sitios web que visitas',
    read_and_modify_data_reason:
      'para inyectar los scripts necesarios en las páginas y evitar la filtración del agente de usuario real y otros datos',
    grant_permission_button: 'Conceder permisos',
  },

  /**
   * @lang French
   *
   * User-Agent - est une en-tête envoyée à chaque site Web visité. Il s'agit d'une sorte d'"empreinte digitale"
   * laissée par votre navigateur qui contient:
   *
   * ⭐️ Le nom et la version de votre navigateur
   * ⭐️ Le nom du système d'exploitation (Mac, Windows, Linux, etc.) et sa version
   * ⭐️ Des informations sur certains plugins installés sur le navigateur
   * ⭐️ D'autres informations qui vous identifient et vous exposent
   *
   * 🚀 Cette extension a été créée pour arrêter la fuite de données.
   *
   * Il remplace automatiquement les en-têtes User-Agent après une certaine période aléatoire. Les en-têtes
   * User-Agent peuvent également être définies manuellement. L'extension est à la fois légère et peu énergivore
   * en ressources. Les paramètres aléatoires de l'extension User-Agent peuvent être personnalisée par l'utilisateur
   * (quels navigateurs et OS sont usurpés, etc.). Il est possible d'utiliser des caractères génériques pour mettre
   * une liste d'exception en place. L'extension protège également contre les failles Javascript en cachant votre
   * identité et protégeant votre anonymat.
   *
   * Entièrement gratuit et sans publicité.
   *
   * Fabriqué avec ❤️ Code source: https://github.com/tarampampam/random-user-agent
   */
  fr: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Mets à jour de manière automatique et aléatoire le User-Agent de ton navigateur afin de masquer au mieux ton identité',
    manifest_action_default_title: 'User-Agent aléatoire',
    manifest_command_renew_useragent: 'Générer un nouveau User-Agent',
    active_user_agent: 'User-Agent actif',
    pause_switcher: 'Mettre en pause le Switcher',
    unpause_switcher: 'Réactiver le Switcher',
    enable_switcher: 'Activer le Switcher',
    enabled_on_this_domain: 'Autoriser ce domaine',
    sync_useragent_with_host_os: '', // TODO: Translate
    get_new_agent: 'Générer un nouveau User-Agent',
    open_settings: 'Ouvrir les paramètres',
    make_donation: 'Faire une donation',
    bug_report: 'Reporter un bug',
    general_settings: 'Paramètres principaux',
    general_settings_hint: 'Changer le comportement du Switcher afin de matcher au mieux avec tes attentes',
    auto_renew: 'Changement automatique du User-Agent après une période de temps donnée',
    auto_renew_interval:
      'Temps (en secondes) qui permettra de mettre à jour automatiquement ton User-Agent (e.g. 1 heure = 3600)',
    auto_renew_on_startup: 'Change ton User-Agent à chaque redémarrage du navigateur',
    js_protection: 'Protection contre les détections basées sur du JavaScript',
    custom_useragent:
      "Utilise un custom User-Agent (sans te soucier de l'ordre dans la liste) au lieu de celui généré par l'extension",
    custom_useragent_list: 'User-Agents custom (sélectionne un User-Agents spécifique, un par ligne)',
    generator_settings: 'Paramètres de génération du User-Agent',
    generator_settings_hint: 'Ici vous pouvez sélectionner les navigateurs générant le User-Agent',
    blacklist_settings: 'Paramètres du blacklist',
    blacklist_settings_hint:
      'Blacklist mode - activée partout, sauf pour les domaines et les règles définies. Whitelist mode - désactivé partout sauf pour les domaines et les règles spécifiées',
    blacklist_mode: 'Blacklist mode',
    whitelist_mode: 'Whitelist mode',
    blacklist_domains: 'Liste des noms de domaines names (un par ligne)',
    remove: 'Supprimer',
    save_changes: 'Sauvegarder les changements',
    error_occurred: "Une erreur s'est produite",
    like_this_extension: "Est-ce que t'aimes cet extension ?",
    give_a_star_on_github: 'Envoie un peu de force sur GitHub!',
    remote_useragent_list:
      "Utilise (sans te soucier de l'ordre dans la liste) un User-Agent à partir de la liste d'URL suivante :",
    remote_useragent_list_hint: "L'extension le téléchargera périodiquement pour être à jour",
    remote_useragent_updating_interval: 'Interval de mise à jour (en secondes; e.g. chaque 3 heures = 60×60×3 = 10800)',
    update_now: 'Mettre à jour maintenant',
    please_rate_extension: 'Veuillez évaluer cet addon!',
    edge_win: 'Edge sur Windows',
    edge_mac: 'Edge sur Mac',
    chrome_win: 'Chrome sur Windows',
    chrome_mac: 'Chrome sur Mac',
    chrome_linux: 'Chrome sur Linux',
    chrome_android: 'Chrome sur Android',
    firefox_win: 'FireFox sur Windows',
    firefox_mac: 'FireFox sur Mac',
    firefox_linux: 'FireFox sur Linux',
    firefox_android: 'Firefox sur Android',
    opera_win: 'Opera sur Windows',
    opera_mac: 'Opera sur Mac',
    safari_iphone: 'Safari sur iPhone',
    safari_mac: 'Safari sur Mac',
    why_we_need_permissions: "Pour fonctionner correctement, l'extension nécessite les autorisations suivantes",
    read_and_modify_data: 'Lire et modifier toutes vos données sur les sites Web que vous visitez',
    read_and_modify_data_reason:
      "pour injecter les scripts nécessaires dans les pages afin de prévenir les fuites de données réelles sur l'utilisateur et autres",
    grant_permission_button: 'Accorder les autorisations',
  },

  /**
   * @lang Indonesian
   *
   * User-Agent - string yang dikirimkan ke situs web mana pun yang kamu kunjungi. Ini adalah semacam "sidik jari"
   * yang ditinggalkan browser kamu yang berisi:
   *
   * ⭐️ Nama dan versi browser kamu
   * ⭐️ Nama dari sistem operasi (Mac, Windows, Linux, dll.) dan versi lainya
   * ⭐️ Informasi tentang beberapa plugin yang diinstal pada peramban
   * ⭐️ Informasi lain yang mengidentifikasi dan memaparkan kamu
   *
   * 🚀 Ekstensi ini telah dibuat untuk menghentikan kebocoran data dan mensimulasi perangkat yang berbeda dengan
   * cara yang paling sederhana!
   *
   * Ini secara otomatis menggantikan string User-Agent setelah periode waktu tertentu dengan string yang diacak.
   * String User-Agent juga dapat diatur secara manual. Ekstensi ini sangat ringan, menggunakan sumber daya yang
   * sangat sedikit. Pengacakan Agen-Pengguna dapat disesuaikan oleh pengguna (browser dan OS apa yang dipalsukan,
   * dll.). Daftar pengecualian tersedia dengan opsi wildcard. Melindungi dari eksploitasi Javascript untuk
   * menyembunyikan identitas kamu dan melindungi anonimitas kamu.
   *
   * Benar-benar gratis dan tanpa iklan.
   *
   * Dibuat dengan ❤️ sumber kode: https://github.com/tarampampam/random-user-agent
   */
  id: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Secara otomatis mengubah User-Agent setelah jangka waktu tertentu menjadi yang dipilih secara acak, sehingga menyembunyikan User-Agent kamu yang sebenarnya',
    manifest_action_default_title: 'Acak User-Agent kamu',
    manifest_command_renew_useragent: 'Dapatkan User-Agent baru',
    active_user_agent: 'User-Agent aktif',
    pause_switcher: 'Tunda Pengalih',
    unpause_switcher: 'Lanjutkan Pengalih',
    enable_switcher: 'Aktifkan Pengalih',
    enabled_on_this_domain: 'Aktifkan pada domain ini',
    sync_useragent_with_host_os: '', // TODO: Translate
    get_new_agent: 'Dapatkan User-Agent baru',
    open_settings: 'Buka pengaturan',
    make_donation: 'Donasi',
    bug_report: 'Laporkan kesalahan',
    general_settings: 'Pengaturan umum',
    general_settings_hint: 'Ubah perilaku pengalih agar sesuai dengan kebutuhan kamu',
    auto_renew: 'Secara otomatis mengubah User-Agent setelah jangka waktu tertentu',
    auto_renew_interval: 'Waktu (dalam detik) untuk memperbarui User-Agent secara otomatis (mis. 1 jam = 3600)',
    auto_renew_on_startup: 'Ubah User-Agent saat memulai browser',
    js_protection: 'Lindungi dari deteksi oleh JavaScript',
    custom_useragent: 'Gunakan salah satu (dalam urutan acak) User-Agent khusus yang dihasilkan',
    custom_useragent_list: 'User-Agent kustom (tetapkan User-Agent tertentu, satu per baris)',
    generator_settings: 'Pengaturan generator',
    generator_settings_hint: 'Di sini Anda dapat mengubah perilaku User-Agent',
    blacklist_settings: 'Pengaturan daftar hitam',
    blacklist_settings_hint:
      'Mode daftar hitam - pengalihan diaktifkan di mana saja, kecuali domain & aturan yang ditentukan. Daftar putih - sebaliknya, dinonaktifkan di mana saja kecuali domain & aturan yang ditentukan',
    blacklist_mode: 'Mode daftar hitam',
    whitelist_mode: 'Mode daftar putih',
    blacklist_domains: 'Daftar nama domain (satu per baris)',
    remove: 'Hapus',
    save_changes: 'Simpan perubahan',
    error_occurred: 'Terjadi kesalahan',
    like_this_extension: 'Kamu suka ekstensi ini?',
    give_a_star_on_github: 'Berikan kami bintang di GitHub!',
    remote_useragent_list: 'Gunakan salah satu (dalam urutan acak) User-Agents dari daftar dengan URL berikut',
    remote_useragent_list_hint: 'Ekstensi akan mengunduh secara berkala agar tetap terbaru',
    remote_useragent_updating_interval: 'Memperbarui interval (dalam detik; misalnya setiap 3 jam = 60×60×3 = 10800)',
    update_now: 'Perbaharui sekarang',
    please_rate_extension: 'Silahkan, beri peringkat addon ini!',
    edge_win: 'Edge pada Windows',
    edge_mac: 'Edge pada Mac',
    chrome_win: 'Chrome pada Windows',
    chrome_mac: 'Chrome pada Mac',
    chrome_linux: 'Chrome pada Linux',
    chrome_android: 'Chrome pada Android',
    firefox_win: 'FireFox pada Windows',
    firefox_mac: 'FireFox pada Mac',
    firefox_linux: 'FireFox pada Linux',
    firefox_android: 'Firefox pada Android',
    opera_win: 'Opera pada Windows',
    opera_mac: 'Opera pada Mac',
    safari_iphone: 'Safari pada iPhone',
    safari_mac: 'Safari pada Mac',
    why_we_need_permissions: 'Untuk berfungsi dengan baik, ekstensi memerlukan izin berikut',
    read_and_modify_data: 'Baca dan ubah semua data Anda pada situs web yang Anda kunjungi',
    read_and_modify_data_reason:
      'untuk menyuntikkan skrip yang diperlukan ke halaman untuk mencegah identitas pengguna asli dan kebocoran data lainnya',
    grant_permission_button: 'Berikan izin',
  },

  /**
   * @lang Japanese
   *
   * User-Agent - あなたが訪問するすべてのウェブサイトに送信される文字列です。これは、あなたのブラウザが残す「指紋」のようなもので、以下の内容を含んでいます。
   *
   * ブラウザの名前とバージョン
   * オペレーティングシステム名（Mac、Windows、Linux など）とそのバージョン。
   * ブラウザにインストールされているいくつかのプラグインに関する情報
   * ⭐️ その他、お客様を特定し、公開する情報
   *
   * 🚀 この拡張機能は、データ漏洩を阻止し、最もシンプルな方法で異なるデバイスをエミュレートするために作成されました!
   *
   * この拡張機能は、一定期間後にUser-Agent文字列を自動的にランダムなものに置き換えます。User-Agent文字列は、手動で設定することもできます。この拡張機能は非常に軽量で、使用するリソースもごくわずかです。User-Agentのランダム化は、ユーザーがカスタマイズすることができます（どのブラウザとOSが詐称されるか、など）。ワイルドカードのオプションで、例外リストを利用可能。Javascriptの悪用から保護し、あなたの身元を隠し、匿名性を保護します。
   *
   * 完全無料、広告なし。
   *
   * で作られた❤️ソースコード： https://github.com/tarampampam/random-user-agent
   */
  ja: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      '指定した時間経過後に自動的にユーザーエージェントをランダムに変更し、実際のユーザーエージェントを隠します。',
    manifest_action_default_title: 'ユーザーエージェントのランダム化',
    manifest_command_renew_useragent: '新しいエージェントを取得する',
    active_user_agent: 'アクティブユーザーエージェント',
    pause_switcher: 'ポーズスイッチャー',
    unpause_switcher: 'レジュームスイッチャー',
    enable_switcher: 'イネーブルスイッチャー',
    enabled_on_this_domain: 'このドメインで有効',
    sync_useragent_with_host_os: '', // TODO: Translate
    get_new_agent: '新しいエージェントを取得する',
    open_settings: 'オープン設定',
    make_donation: '寄付する',
    bug_report: 'バグレポート',
    general_settings: '一般設定',
    general_settings_hint: 'ニーズに合わせてスイッチャーの動作を変更可能',
    auto_renew: '指定時間経過後にUser-Agentを自動的に変更する。',
    auto_renew_interval: 'User-Agentを自動的に更新する時間（秒）（例：1時間＝3600）',
    auto_renew_on_startup: 'ブラウザ起動時のUser-Agentを変更する',
    js_protection: 'JavaScriptによる検出を防止する',
    custom_useragent: '生成されたカスタムUser-Agentのいずれかを（ランダムな順序で）使用します。',
    custom_useragent_list: 'カスタムユーザエージェント (特定のUser-Agentsを1行に1つずつ設定する)',
    generator_settings: 'ジェネレーターの設定',
    generator_settings_hint: 'ここでは、エージェント切り替えの動作を変更することができます',
    blacklist_settings: 'ブラックリストの設定',
    blacklist_settings_hint:
      'ブラックリストモード - 定義されたドメインとルールを除くすべての場所で切り替えが有効です。ホワイトリスト - 逆に、指定されたドメインとルール以外のすべての場所で無効化されます。',
    blacklist_mode: 'ブラックリストモード',
    whitelist_mode: 'ホワイトリストモード',
    blacklist_domains: 'ドメイン名リスト（1行に1つ）',
    remove: '削除',
    save_changes: '変更を保存する',
    error_occurred: 'エラーが発生した',
    like_this_extension: 'このエクステンションが好きですか？',
    give_a_star_on_github: 'GitHubで星を付けてください。',
    remote_useragent_list: '以下のURLのリストにあるUser-Agentのいずれかを（ランダムな順序で）使用します。',
    remote_useragent_list_hint: 'エクステンションは定期的にダウンロードし、最新の状態に保ちます',
    remote_useragent_updating_interval: '更新間隔（秒単位、例：3時間ごと＝60×60×3＝10800）',
    update_now: '現在アップデート中',
    please_rate_extension: 'このアドオンの評価をお願いします。',
    edge_win: 'Edge on Windows',
    edge_mac: 'Edge on Mac',
    chrome_win: 'Chrome on Windows',
    chrome_mac: 'Chrome on Mac',
    chrome_linux: 'Chrome on Linux',
    chrome_android: 'Chrome on Android',
    firefox_win: 'FireFox on Windows',
    firefox_mac: 'FireFox on Mac',
    firefox_linux: 'FireFox on Linux',
    firefox_android: 'Firefox on Android',
    opera_win: 'Opera on Windows',
    opera_mac: 'Opera on Mac',
    safari_iphone: 'Safari on iPhone',
    safari_mac: 'Safari on Mac',
    why_we_need_permissions: '正常に機能するために、拡張機能は次の権限が必要です',
    read_and_modify_data: '訪れるウェブサイトのすべてのデータを読み取り、変更する',
    read_and_modify_data_reason:
      '必要なスクリプトをページに注入し、実際のユーザーエージェントや他のデータ漏洩を防ぐため',
    grant_permission_button: '許可を付与する',
  },

  /**
   * @lang Polish
   *
   * User-Agent - ciąg znaków, który jest wysyłany do każdej odwiedzanej strony internetowej. Jest to rodzaj
   * "odcisku palca", który pozostawia za sobą przeglądarka i który zawiera:
   *
   * ⭐️ Nazwę i wersję Twojej przeglądarki.
   * ⭐️ Nazwę systemu operacyjnego (Mac, Windows, Linux itp.) i jego wersję
   * ⭐️ Informacje o niektórych wtyczkach zainstalowanych w przeglądarce
   * ⭐️ Inne informacje, które Cię identyfikują i eksponują
   *
   * 🚀 To rozszerzenie zostało stworzone, aby zatrzymać wyciek danych i emulować różne urządzenia w najprostszy
   * sposób!
   *
   * Automatycznie zastępuje ciągi User-Agent po określonym czasie losowym. Ciągi User-Agent mogą być również
   * ustawione ręcznie. Rozszerzenie jest niezwykle lekkie, używa bardzo mało zasobów. Randomizacja User-Agent
   * może być dostosowana przez użytkownika (jakie przeglądarki i systemy operacyjne są spoofed, itp.). Lista
   * wyjątków dostępna z opcją symboli wieloznacznych. Chroni przed exploitami Javascript, aby ukryć swoją
   * tożsamość i chronić anonimowość.
   *
   * Całkowicie darmowy i bez reklam.
   *
   * Made with ❤️ Kod źródłowy: https://github.com/tarampampam/random-user-agent
   */
  pl: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Automatycznie zmienia User-Agenta po określonym czasie na losowo wybranego, ukrywając w ten sposób prawdziwego User-Agenta',
    manifest_action_default_title: 'Losuj swojego User-Agenta',
    manifest_command_renew_useragent: 'Zdobądź nowego agenta',
    active_user_agent: 'Aktywny User-Agent',
    pause_switcher: 'Wstrzymaj przełącznik',
    unpause_switcher: 'Wznów przełącznik',
    enable_switcher: 'Włącz przełącznik',
    enabled_on_this_domain: 'Włączone w tej domenie',
    sync_useragent_with_host_os: '', // TODO: Translate
    get_new_agent: 'Zdobądź nowego agenta',
    open_settings: 'Otwórz ustawienia',
    make_donation: 'Darowizna',
    bug_report: 'Zgłoś błąd',
    general_settings: 'Ustawienia ogólne',
    general_settings_hint: 'Zmień zachowanie przełącznika, aby jak najlepiej dopasować go do swoich potrzeb',
    auto_renew: 'Automatycznie zmień User-Agenta po określonym czasie',
    auto_renew_interval: 'Czas (w sekundach) do automatycznej aktualizacji User-Agenta (np. 1 godzina = 3600)',
    auto_renew_on_startup: 'Zmień User-Agenta podczas uruchamiania przeglądarki',
    js_protection: 'Ochrona przed wykryciem za pomocą JavaScript',
    custom_useragent: 'Użyj jednego z (w przypadkowej kolejności) niestandardowych User-Agentów zamiast generowanych',
    custom_useragent_list: 'Niestandardowi User-Agenci (ustaw określonych User-Agentów, jeden na wiersz)',
    generator_settings: 'Ustawienia generatora',
    generator_settings_hint: 'Tutaj możesz zmienić zachowanie przełączania agenta',
    blacklist_settings: 'Ustawienia czarnej listy',
    blacklist_settings_hint:
      'Tryb czarnej listy - przełączanie włączone wszędzie, z wyjątkiem określonych domen i reguł. Biała lista - wręcz przeciwnie, wyłączone wszędzie poza określonymi domenami i regułami',
    blacklist_mode: 'Tryb czarnej listy',
    whitelist_mode: 'Tryb białej listy',
    blacklist_domains: 'Lista nazw domen (jedna w wierszu)',
    remove: 'Usuń',
    save_changes: 'Zapisz zmiany',
    error_occurred: 'Wystąpił błąd',
    like_this_extension: 'Czy podoba Ci się to rozszerzenie?',
    give_a_star_on_github: 'Daj nam gwiazdkę na GitHubie!',
    remote_useragent_list: 'Użyj jednego z (w przypadkowej kolejności) User-Agentów z listy poprzez następujący URL',
    remote_useragent_list_hint: 'Rozszerzenie będzie okresowo je pobierać, aby było zawsze aktualne',
    remote_useragent_updating_interval: 'Częstotliwość aktualizacji (w sekundach; np. co 3 godziny = 60×60×3 = 10800)',
    update_now: 'Aktualizuj teraz',
    please_rate_extension: 'Proszę, oceń to rozszerzenie!',
    edge_win: 'Edge na Windows',
    edge_mac: 'Edge na Mac',
    chrome_win: 'Chrome na Windows',
    chrome_mac: 'Chrome na Mac',
    chrome_linux: 'Chrome na Linux',
    chrome_android: 'Chrome na Android',
    firefox_win: 'FireFox na Windows',
    firefox_mac: 'FireFox na Mac',
    firefox_linux: 'FireFox na Linux',
    firefox_android: 'FireFox na Android',
    opera_win: 'Opera na Windows',
    opera_mac: 'Opera na Mac',
    safari_iphone: 'Safari na iPhone',
    safari_mac: 'Safari na Mac',
    why_we_need_permissions: 'Aby rozszerzenie działało poprawnie, wymaga następujących uprawnień:',
    read_and_modify_data:
      'Odczytywanie i modyfikowanie wszystkich danych na odwiedzanych przez Ciebie stronach internetowych',
    read_and_modify_data_reason:
      'aby wstrzykiwać niezbędne skrypty na strony w celu zapobiegania realnemu przeciekom danych, takim jak prawdziwy identyfikator użytkownika (user-agent) i inne',
    grant_permission_button: 'Udziel uprawnień',
  },

  /**
   * @lang Portuguese (Brazil)
   *
   * User-Agent (Agente de usuário) - é um conjunto de informações que é enviado para qualquer site que você
   * visita. É um tipo de "impressão digital" do seu navegador, que contém:
   *
   * ⭐️ O nome e a versão do seu navegador;
   * ⭐️ O nome de sistema operacional (Mac, Windows, Linux, etc.) e a sua versão;
   * ⭐️ Informações sobre alguns plugins instalados no seu navegador;
   * ⭐️ Outras informações que lhe identifica e expõe.
   *
   * 🚀 Esta extensão foi criada para impedir o vazamento de dados.
   *
   * Ela substitui automaticamente identificação de Agente de usuário, após um período de tempo escolhido, por uma
   * outra aleatória. As informações de Agente de usuário também podem ser especificadas manualmente. A extensão é
   * incrivelmente leve e usa muito pouco recursos. A randomização de Agente de usuário pode ser personalizada pelo
   * usuário (vários tipos de navegadores e SO são disponíveis, etc.). A lista de exceções pode ser criada com a
   * opção de usar os caracteres especiais. Tem proteção contra explorações de Javascript para ocultar sua identidade
   * e proteger seu anonimato.
   *
   * Completamente gratuito e sem anúncios.
   *
   * Feito com ❤️ Código-fonte: https://github.com/tarampampam/random-user-agent
   */
  pt_BR: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Altera automaticamente seu Agente de usuário após um tempo escolhido, para um outro e portanto oculta a sua verdadeira identidade',
    manifest_action_default_title: 'Randomize seu Agente de usuário',
    manifest_command_renew_useragent: 'Alterar para outro Agente',
    active_user_agent: 'Agente de usuário ativo',
    pause_switcher: 'Pausar alteração',
    unpause_switcher: 'Retomar alteração',
    enable_switcher: 'Ativar alteração',
    enabled_on_this_domain: 'Activado neste dominio',
    sync_useragent_with_host_os: '', // TODO: Translate
    get_new_agent: 'Alterar para outro Agente',
    open_settings: 'Abrir configurações',
    make_donation: 'Doar',
    bug_report: 'Relatar falha',
    general_settings: 'Configurações gerais',
    general_settings_hint: 'Mudar o comportamento de alteração para melhor atender às suas necessidades',
    auto_renew: 'Mudar automaticamente seu Agente de usuário após um período de tempo escolhido',
    auto_renew_interval: 'Tempo (em segundos) para alterar automaticamente seu Agente de usuário (ex. 1 hora = 3600)',
    auto_renew_on_startup: 'Alterar seu Agente de usuário na inicialização do navegador',
    js_protection: 'Proteger contra detecção por JavaScript',
    custom_useragent: 'Use um dos Agentes de usuário personalizados em vez de predefinidos (ordem aleatória)',
    custom_useragent_list: 'Agentes de usuário personalizados (definir um Agente de usuário próprio, um por linha)',
    generator_settings: 'Configurações do gerador',
    generator_settings_hint: 'Aqui você pode mudar o comportamento de alteração de Agente',
    blacklist_settings: 'Configurações de lista negra',
    blacklist_settings_hint:
      'Modo de lista negra - alteração ativada em todos os lugares, menos em domínios e regras especificadas. Lista branca - ao contrário, desativada em todos os lugares, menos em domínios e regras especificadas',
    blacklist_mode: 'Lista negra',
    whitelist_mode: 'Lista branca',
    blacklist_domains: 'Lista de nomes de domínio (um por linha)',
    remove: 'Remove',
    save_changes: 'Salvar mudanças',
    error_occurred: 'Ocorreu um erro',
    like_this_extension: 'Você gosta da extensão?',
    give_a_star_on_github: 'Dê-nos uma estrela no GitHub!',
    remote_useragent_list: 'Use um dos Agentes de usuário da lista fornecida via seguinte URL (ordem aleatória)',
    remote_useragent_list_hint: 'A extensão periodicamente baixará Agentes para mantê-los atualizados',
    remote_useragent_updating_interval:
      'Intervalo de atualização (em segundos; por exemplo, a cada 3 horas = 60×60×3 = 10800)',
    update_now: 'Atualizar agora',
    please_rate_extension: 'Por favor, classifique este suplemento!',
    edge_win: 'Edge no Windows',
    edge_mac: 'Edge no Mac',
    chrome_win: 'Chrome no Windows',
    chrome_mac: 'Chrome no Mac',
    chrome_linux: 'Chrome no Linux',
    chrome_android: 'Chrome no Android',
    firefox_win: 'Firefox no Windows',
    firefox_mac: 'Firefox no Mac',
    firefox_linux: 'Firefox no Linux',
    firefox_android: 'Firefox no Android',
    opera_win: 'Opera no Windows',
    opera_mac: 'Opera no Mac',
    safari_iphone: 'Safari no iPhone',
    safari_mac: 'Safari no Mac',
    why_we_need_permissions: 'Para funcionar corretamente, a extensão requer as seguintes permissões',
    read_and_modify_data: 'Leia e modifique todos os seus dados nos sites que você visita',
    read_and_modify_data_reason:
      'para injetar os scripts necessários nas páginas para evitar o vazamento de dados reais do usuário e outros',
    grant_permission_button: 'Conceder permissões',
  },

  /**
   * @lang Russian
   *
   * User-Agent - это строка, которая передается браузером вместе с запросом любой страницы в интернете. Это ваш
   * своеобразный "отпечаток", в котором содержится:
   *
   * ⭐️ Название и версия вашего браузера
   * ⭐️ Название операционной системы (Mac, Windows, Linux и т.д.) и её версия
   * ⭐️ Информация о некоторых установленных плагинах в системе
   * ⭐️ Прочая информация, идентифицирующая и раскрывающая вас
   *
   * 🚀 Для того, чтобы прекратить эту утечку данных и эмулировать различные устройства и было создано это расширение!
   *
   * Оно автоматически подменяет User-Agent через указанный промежуток времени на случайный. Так же строка User-Agent
   * может быть указана вручную. Предоставляет защиту от раскрытия реального User-Agent даже средствами JavaScript!
   * Данное расширение очень небольшое и бережно относится к ресурсам. Генерация случайного User-Agent может быть
   * настроена (имеется выбор браузеров, которые необходимо имитировать). Поддерживаются удобные правила исключений
   * и синхронизация настроек.
   *
   * Абсолютно бесплатное и без рекламы/трекеров.
   *
   * Разработано с ❤️ Исходный код: https://github.com/tarampampam/random-user-agent
   */
  ru: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Автоматически заменяет User-Agent через заданный промежуток времени на случайный, тем самым скрывая настоящий',
    manifest_action_default_title: 'Рандомизировать ваш User-Agent',
    manifest_command_renew_useragent: 'Установить новый',
    active_user_agent: 'Текущий User-Agent',
    pause_switcher: 'Приостановить подмену',
    unpause_switcher: 'Возобновить подмену',
    enable_switcher: 'Включить подмену',
    enabled_on_this_domain: 'Включен на этом домене',
    sync_useragent_with_host_os: '', // TODO: Translate
    get_new_agent: 'Установить новый',
    open_settings: 'Открыть настройки',
    make_donation: 'Купить автору кофе',
    bug_report: 'Сообщить об ошибке',
    general_settings: 'Основные настройки',
    general_settings_hint: 'Измените настройки работы расширения по вашему усмотрению',
    auto_renew: 'Автоматически обновлять User-Agent через заданный промежуток времени',
    auto_renew_interval:
      'Период времени (в секундах) для автоматического обновления User-Agent (например, 1 час = 3600)',
    auto_renew_on_startup: 'Автоматически обновлять User-Agent при запуске браузера',
    js_protection: 'Скрывать настоящий User-Agent средствами JavaScript',
    custom_useragent: 'Использовать один из следующих User-Agent (в случайном порядке) вместо генерируемого',
    custom_useragent_list: 'Список своих User-Agent (по одному на строку)',
    generator_settings: 'Настройки генератора',
    generator_settings_hint: 'Укажите те типы браузеров, User-Agent которых следует генерировать',
    blacklist_settings: 'Настройки черного списка',
    blacklist_settings_hint:
      'При включении режима черного списка подмена включена везде, кроме перечисленных ниже доменов и правил; белый же список наоборот - подмена выключена везде, кроме указанных доменов и правил',
    blacklist_mode: 'Режим черного списка',
    whitelist_mode: 'Режим белого списка',
    blacklist_domains: 'Список имен доменов (по одному на строку)',
    remove: 'Удалить',
    save_changes: 'Сохранить изменения',
    error_occurred: 'Произошла ошибка',
    like_this_extension: 'Вам нравится это расширение?',
    give_a_star_on_github: 'Поставьте ему звёздочку на GitHub!',
    remote_useragent_list: 'Использовать один из User-Agent (в случайном порядке) из списка по URL',
    remote_useragent_list_hint:
      'Это расширение будет периодически скачивать его для того, чтоб поддерживать список в актуальном состоянии',
    remote_useragent_updating_interval: 'Интервал обновления (в секундах; пример - каждые 3 часа = 60×60×3 = 10800)',
    update_now: 'Обновить сейчас',
    please_rate_extension: 'Пожалуйста, оцените это дополнение!',
    edge_win: 'Edge на Windows',
    edge_mac: 'Edge на Mac',
    chrome_win: 'Chrome на Windows',
    chrome_mac: 'Chrome на Mac',
    chrome_linux: 'Chrome на Linux',
    chrome_android: 'Chrome на Android',
    firefox_win: 'FireFox на Windows',
    firefox_mac: 'FireFox на Mac',
    firefox_linux: 'FireFox на Linux',
    firefox_android: 'Firefox на Android',
    opera_win: 'Opera на Windows',
    opera_mac: 'Opera на Mac',
    safari_iphone: 'Safari на iPhone',
    safari_mac: 'Safari на Mac',
    why_we_need_permissions: 'Для правильной работы расширения требуются следующие разрешения',
    read_and_modify_data: 'Чтение и изменение всех ваших данных на посещаемых вами веб-сайтах',
    read_and_modify_data_reason:
      'для вставки необходимых скриптов на страницы для предотвращения реального user-agent и других утечек данных',
    grant_permission_button: 'Предоставить разрешения',
  },

  /**
   * @lang Turkish
   *
   * User-Agent - ziyaret ettiğiniz herhangi bir web sitesine gönderilen bir dize. Bu, tarayıcınızın geride
   * bıraktığı ve içerdiği bir tür "parmak izidir":
   *
   * ⭐️ Tarayıcınızın adı ve sürümü
   * ⭐️ İşletim sisteminin adı (Mac, Windows, Linux, vb.) ve sürümü
   * ⭐️ Tarayıcıda yüklü bazı eklentiler hakkında bilgi
   * ⭐️ Sizi tanımlayan ve ifşa eden diğer bilgiler
   *
   * 🚀 Bu uzantı, veri sızıntısını durdurmak ve farklı cihazları en basit şekilde taklit etmek için oluşturulmuştur!
   *
   * Belirli bir süre sonra User-Agent dizelerini otomatik olarak rastgele bir dizeyle değiştirir. User-Agent
   * dizeleri manuel olarak da ayarlanabilir. Uzantı inanılmaz derecede hafiftir ve çok az kaynak kullanır. User-Agent
   * randomizasyonu kullanıcı tarafından özelleştirilebilir (hangi tarayıcıların ve işletim sistemlerinin taklit
   * edileceği vb.). Joker karakter seçeneği ile istisnalar listesi mevcuttur. Kimliğinizi gizlemek ve anonimliğinizi
   * korumak için Javascript istismarlarına karşı koruma sağlar.
   *
   * Tamamen ücretsiz ve reklamsız.
   *
   * Made with ❤️ Kaynak kodu: https://github.com/tarampampam/random-user-agent
   */
  tr: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Belirli bir süre sonra kullanıcı aracısını otomatik olarak rastgele seçilen bir kullanıcı aracısına değiştirir, böylece gerçek kullanıcı aracınızı gizler',
    manifest_action_default_title: 'Kullanıcı Aracınızı Rastgele Ayarlayın',
    manifest_command_renew_useragent: 'Yeni temsilci alın',
    active_user_agent: 'Aktif Kullanıcı-Agent',
    pause_switcher: 'Duraklatma Değiştirici',
    unpause_switcher: 'Devam Değiştirici',
    enable_switcher: 'Değiştiriciyi Etkinleştir',
    enabled_on_this_domain: 'Bu etki alanında etkinleştirildi',
    sync_useragent_with_host_os: '', // TODO: Translate
    get_new_agent: 'Yeni temsilci alın',
    open_settings: 'Açık ayarlar',
    make_donation: 'Bağış Yapın',
    bug_report: 'Hata raporu',
    general_settings: 'Genel ayarlar',
    general_settings_hint: 'Değiştiricinin davranışını ihtiyaçlarınıza en uygun şekilde değiştirin',
    auto_renew: 'Belirli bir süre sonra Kullanıcı Aracısını otomatik olarak değiştir',
    auto_renew_interval: "User-Agent'ın otomatik olarak güncelleneceği süre (saniye cinsinden) (örn. 1 saat = 3600)",
    auto_renew_on_startup: "Tarayıcı başlangıcında User-Agent'ı değiştirme",
    js_protection: 'JavaScript tarafından algılanmaya karşı koruma',
    custom_useragent: 'Bunun yerine oluşturulan özel Kullanıcı Aracısından birini (rastgele sırayla) kullanın',
    custom_useragent_list:
      'Özel Kullanıcı Temsilcileri (her satır için bir tane olmak üzere belirli bir Kullanıcı Temsilcisi ayarlayın)',
    generator_settings: 'Jeneratör ayarları',
    generator_settings_hint: 'Burada temsilci değiştirme davranışını değiştirebilirsiniz',
    blacklist_settings: 'Kara liste ayarları',
    blacklist_settings_hint:
      'Kara liste modu - tanımlanan etki alanları ve kurallar dışında her yerde etkin anahtarlama. Beyaz liste - tam tersine, belirtilen etki alanları ve kurallar dışında her yerde devre dışı bırakılır',
    blacklist_mode: 'Kara liste modu',
    whitelist_mode: 'Beyaz liste modu',
    blacklist_domains: 'Alan adları listesi (her satır için bir tane)',
    remove: 'Kaldırmak',
    save_changes: 'Değişiklikleri kaydet',
    error_occurred: 'Hata oluştu',
    like_this_extension: 'Bu uzantıyı beğendiniz mi?',
    give_a_star_on_github: "GitHub'da bize bir yıldız verin!",
    remote_useragent_list: 'Aşağıdaki URL ile listedeki Kullanıcı Aracılarından birini (rastgele sırayla) kullanın',
    remote_useragent_list_hint: 'Uzantı, güncel tutmak için periyodik olarak indirecektir',
    remote_useragent_updating_interval:
      'Güncelleme aralığı (saniye cinsinden; örneğin her 3 saatte bir = 60×60×3 = 10800)',
    update_now: 'Şimdi güncelleyin',
    please_rate_extension: 'Lütfen bu eklentiyi değerlendirin!',
    edge_win: 'Edge üzerinde Windows',
    edge_mac: 'Edge üzerinde Mac',
    chrome_win: 'Chrome üzerinde Windows',
    chrome_mac: 'Chrome üzerinde Mac',
    chrome_linux: 'Chrome üzerinde Linux',
    chrome_android: 'Chrome üzerinde Android',
    firefox_win: 'FireFox üzerinde Windows',
    firefox_mac: 'FireFox üzerinde Mac',
    firefox_linux: 'FireFox üzerinde Linux',
    firefox_android: 'Firefox üzerinde Android',
    opera_win: 'Opera üzerinde Windows',
    opera_mac: 'Opera üzerinde Mac',
    safari_iphone: 'Safari üzerinde iPhone',
    safari_mac: 'Safari üzerinde Mac',
    why_we_need_permissions: 'Uzantının düzgün çalışması için aşağıdaki izinlere ihtiyacı vardır',
    read_and_modify_data: 'Ziyaret ettiğiniz web sitelerindeki tüm verilerinizi okuyun ve değiştirin',
    read_and_modify_data_reason:
      'gerçek kullanıcı ajanı ve diğer veri sızıntılarını önlemek için gereken betikleri sayfalara enjekte etmek için',
    grant_permission_button: 'İzinleri ver',
  },

  /**
   * @lang Ukrainian
   *
   * User-Agent - рядок, який надсилається на будь-який веб-сайт, який ви відвідуєте. Це свого роду "відбиток пальця",
   * який залишає ваш браузер:
   *
   * ⭐️ Назва та версія вашого браузера
   * ⭐️ Назва операційної системи (Mac, Windows, Linux тощо) та її версія
   * ⭐️ Інформацію про деякі плагіни, встановлені в браузері
   * ⭐️ Іншу інформацію, яка ідентифікує та викриває вас
   *
   * 🚀 Це розширення було створено, щоб зупинити витік даних і емулювати різні пристрої найпростішим способом!
   *
   * Воно автоматично замінює рядки User-Agent через певний проміжок часу на рандомізовані. Рядки User-Agent також
   * можуть бути встановлені вручну. Розширення неймовірно легке, використовує дуже мало ресурсів. Рандомізація
   * User-Agent може бути налаштована користувачем (які браузери і ОС підміняються і т.д.). Доступний список
   * винятків з можливістю використання підстановочних знаків. Захищає від експлойтів Javascript для приховування
   * вашої особистості та захисту вашої анонімності.
   *
   * Повністю безкоштовний і без реклами.
   *
   * Зроблено за допомогою ❤️ Вихідний код: https://github.com/tarampampam/random-user-agent
   */
  uk: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Автоматична зміна агента користувача через заданий проміжок часу на випадково обраного, таким чином приховуючи вашого реального агента користувача',
    manifest_action_default_title: 'Рандомізуйте свого User-Agent',
    manifest_command_renew_useragent: 'Отримати новий ідентифікатор',
    active_user_agent: 'Поточний User-Agent',
    pause_switcher: 'Призупинити розширення',
    unpause_switcher: 'Запустити розширення',
    enable_switcher: 'Активувати розширення',
    enabled_on_this_domain: 'Включено на цьому домені',
    sync_useragent_with_host_os: '', // TODO: Translate
    get_new_agent: 'Отримати нового агента',
    open_settings: 'Відкрити налаштування',
    make_donation: 'Пожертвувати',
    bug_report: 'Повідомлення про помилку',
    general_settings: 'Загальні налаштування',
    general_settings_hint: 'Змініть поведінку перемикача так, щоб він найкраще відповідав вашим потребам',
    auto_renew: 'Автоматична зміна Користувача-Агента через заданий проміжок часу',
    auto_renew_interval: 'Час (в секундах) для автоматичного оновлення User-Agent (наприклад, 1 година = 3600)',
    auto_renew_on_startup: 'Зміна агента користувача при запуску браузера',
    js_protection: 'Захист від виявлення JavaScript',
    custom_useragent: 'Використовувати один з (у випадковому порядку) користувацьких User-Agent замість згенерованого',
    custom_useragent_list: 'Користувацькі агенти (задати конкретних агентів, по одному на лінію)',
    generator_settings: 'Налаштування генератора',
    generator_settings_hint: 'Тут ви можете змінити поведінку перемикання агентів',
    blacklist_settings: 'Налаштування чорного списку',
    blacklist_settings_hint:
      'Режим чорного списку - перемикання включено скрізь, крім заданих доменів і правил. Білий список - навпаки, відключений всюди, крім зазначених доменів і правил',
    blacklist_mode: 'Режим чорного списку',
    whitelist_mode: 'Режим білого списку',
    blacklist_domains: 'Список доменних імен (по одному в рядку)',
    remove: 'Видалити',
    save_changes: 'Зберегти зміни',
    error_occurred: 'Виникла помилка',
    like_this_extension: 'Вам подобається це розширення?',
    give_a_star_on_github: 'Поставте нам зірку на GitHub!',
    remote_useragent_list: 'Використовуйте один User Agent (у випадковому порядку) зі списку за наступним URL',
    remote_useragent_list_hint: 'Розширення буде періодично завантажувати його для підтримки в актуальному стані',
    remote_useragent_updating_interval: 'Інтервал оновлення (в секундах; наприклад, кожні 3 години = 60×60×3 = 10800)',
    update_now: 'Оновити зараз',
    please_rate_extension: 'Будь ласка, оцініть цей аддон!',
    edge_win: 'Edge на Windows',
    edge_mac: 'Edge на Mac',
    chrome_win: 'Chrome на Windows',
    chrome_mac: 'Chrome на Mac',
    chrome_linux: 'Chrome на Linux',
    chrome_android: 'Chrome на Android',
    firefox_win: 'FireFox на Windows',
    firefox_mac: 'FireFox на Mac',
    firefox_linux: 'FireFox на Linux',
    firefox_android: 'FireFox на Android',
    opera_win: 'Opera на Windows',
    opera_mac: 'Opera на Mac',
    safari_iphone: 'Safari на iPhone',
    safari_mac: 'Safari на Mac',
    why_we_need_permissions: 'Для належної роботи розширення потрібні наступні дозволи',
    read_and_modify_data: 'Читати та змінювати всі ваші дані на відвідуваних вами веб-сайтах',
    read_and_modify_data_reason:
      'для впровадження необхідних скриптів на сторінках для запобігання реального використання користувача та інших витоків даних',
    grant_permission_button: 'Надати дозволи',
  },

  /**
   * @lang Vietnamese
   *
   * User-Agent - một dòng kí tự được gửi đến bất kỳ trang web nào bạn truy cập. Đây là một loại “vân tay” mà trình
   * duyệt của bạn để lại bao gồm:
   *
   * ⭐️ Tên và phiên bản trình duyệt của bạn
   * ⭐️ Tên và phiên bản của hệ điều hành (Mac, Windows, Linux, vv)
   * ⭐️ Thông tin về một số phần mở rộng được cài đặt trên trình duyệt
   * ⭐️ Các thông tin khác cho phép xác định và làm lộ danh tính bạn
   *
   * 🚀 Phần mở rộng này đã được tạo ra để ngăn chặn rò rỉ dữ liệu và giả lập những thiết bị khác một cách đơn giản nhất!
   *
   * Nó tự động thay thế dòng User-Agent sau một khoảng thời gian nhất định với một dòng ngẫu nhiên. Dòng User-Agent
   * cũng có thể được đặt thủ công. Phần mở rộng này cực kỳ nhẹ, sử dụng rất ít tài nguyên. Sự ngẫu nhiên hoá User-Agent
   * có thể được tùy chỉnh bởi người dùng (những trình duyệt và hệ điều hành nào được giả lập, v.v.). Bao gồm danh sách
   * ngoại lệ với tùy chọn ký tự đại diện. Bảo vệ khỏi những lỗ hổng Javascript để ẩn danh tính và bảo vệ sự ẩn danh
   * của bạn.
   *
   * Hoàn toàn miễn phí và không có quảng cáo.
   *
   * Được làm với ❤️ Mã nguồn: https://github.com/tarampampam/random-user-agent
   */
  vi: {
    manifest_name: 'User-Agent ngẫu nhiên (Thay đổi)',
    manifest_description:
      'Tự động thay đổi User-Agent của bạn thành một dòng được chọn ngẫu nhiên, từ đó ẩn User-Agent thực của bạn',
    manifest_action_default_title: 'Ngẫu nhiên hoá User-Agent',
    manifest_command_renew_useragent: 'Tạo User-Agent mới',
    active_user_agent: 'User-Agent hiện tại',
    pause_switcher: 'Tạm dừng thay đổi',
    unpause_switcher: 'Tiếp tục thay đổi',
    enable_switcher: 'Cho phép thay đổi',
    enabled_on_this_domain: 'Được cho phép ở tên miền này',
    sync_useragent_with_host_os: '', // TODO: Translate
    get_new_agent: 'Tạo User-Agent mới',
    open_settings: 'Mở phần cài đặt',
    make_donation: 'Ủng hộ tài chính',
    bug_report: 'Báo lỗi',
    general_settings: 'Cài đặt chung',
    general_settings_hint: 'Thay đổi hành vi của bộ thay đổi sao cho phù hợp với nhu cầu của bạn',
    auto_renew: 'Tự động thay đổi User-Agent sau một khoảng thời gian nhất định',
    auto_renew_interval: 'Thời gian (tính bằng giây) để tự động thay đổi User-Agent (vd: 1 tiếng = 3600)',
    auto_renew_on_startup: 'Thay đổi User-Agent khi khởi động trình duyệt',
    js_protection: 'Bảo vệ trước lỗ hổng JavaScript',
    custom_useragent:
      'Sử dụng một trong (theo thứ tự ngẫu nhiên) những User-Agent tuỳ chỉnh thay vì tự tạo ra ngẫu nhiên',
    custom_useragent_list: 'User-Agent tuỳ chỉnh (viết các dòng User-Agent, 1 dòng 1 lần)',
    generator_settings: 'Cài đặt bộ tạo User-Agent',
    generator_settings_hint: 'Ở đây bạn có thể tuỳ chỉnh hành vi thay đổi',
    blacklist_settings: 'Cài đặt danh sách đen',
    blacklist_settings_hint:
      'Chế độ danh sách đen - cho phép ở tất cả các trang trừ những trang cho trước. Chế độ danh sách trắng - ngược lại, không cho phép ở mọi trang miền trừ những trang cho trước',
    blacklist_mode: 'Chế độ danh sách đen',
    whitelist_mode: 'Chế độ danh sách trắng',
    blacklist_domains: 'Danh sách tên miền (mỗi dòng 1 tên)',
    remove: 'Xoá',
    save_changes: 'Lưu thay đổi',
    error_occurred: 'Đã xảy ra lỗi',
    like_this_extension: 'Bạn có thích phần mở rộng này không?',
    give_a_star_on_github: 'Hãy cho chúng tôi một ngôi sao trên GitHub!',
    remote_useragent_list:
      'Sử dụng một trong (theo thứ tự ngẫu nhiên) những User-Agent tuỳ chỉnh từ danh sách trong URL sau đây',
    remote_useragent_list_hint: 'Phần mở rộng sẽ tải về theo định kỳ để cập nhật bản mới nhất',
    remote_useragent_updating_interval: 'Khoảng thời gian cập nhật (bằng giây; vd: mỗi 3 tiếng = 60×60×3 = 10800)',
    update_now: 'Cập nhật ngay',
    please_rate_extension: 'Hãy đánh giá phần mở rộng này!',
    edge_win: 'Edge trên Windows',
    edge_mac: 'Edge trên Mac',
    chrome_win: 'Chrome trên Windows',
    chrome_mac: 'Chrome trên Mac',
    chrome_linux: 'Chrome trên Linux',
    chrome_android: 'Chrome trên Android',
    firefox_win: 'FireFox trên Windows',
    firefox_mac: 'FireFox trên Mac',
    firefox_linux: 'FireFox trên Linux',
    firefox_android: 'Firefox trên Android',
    opera_win: 'Opera trên Windows',
    opera_mac: 'Opera trên Mac',
    safari_iphone: 'Safari trên iPhone',
    safari_mac: 'Safari trên Mac',
    why_we_need_permissions: 'Để hoạt động đúng cách, tiện ích yêu cầu các quyền sau',
    read_and_modify_data: 'Đọc và chỉnh sửa tất cả dữ liệu của bạn trên các trang web bạn truy cập',
    read_and_modify_data_reason:
      'để chèn các kịch bản cần thiết vào các trang để ngăn chặn thông tin người dùng thật và rò rỉ dữ liệu khác',
    grant_permission_button: 'Cấp quyền',
  },

  /**
   * @lang Chinese (China)
   *
   * 用户代理（User-Agent）是在您访问网站时发送过去的一个标识字符串。这是您的浏览器留下的“指纹”之一。该字符串中包含：
   *
   * ⭐️ 您的浏览器的名称和版本
   * ⭐️ 操作系统的名称（如 Mac、Windows、Linux 等）及其版本
   * ⭐️ 已安装在浏览器中的插件的一些信息
   * ⭐️ 其他可以识别和认出您的信息
   *
   * 🚀 本扩展是为了防止此种数据泄露您的信息。
   *
   * 它将按指定的时间间隔来随机切换一个用户代理字符串。您也可手动设置用户代理字符串。该扩展非常轻量级，只需很少的资源。用户可定制用户代理的随机化，包括伪装为哪种浏览器和操作系统。本扩展提供有一个例外列表来避免特定域名受伪装影响。本扩展还可防止通过 JavaScript 发掘您的真实信息。
   *
   * 完全免费，没有广告。
   *
   * 用❤️制作 源代码：https://github.com/tarampampam/random-user-agent
   */
  zh_CN: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description: '按时自动更改用户代理字符串，隐藏您的真实用户代理。',
    manifest_action_default_title: '随机化您的 User-Agent',
    manifest_command_renew_useragent: '换个新的',
    active_user_agent: '活动 User-Agent',
    pause_switcher: '暂停切换器',
    unpause_switcher: '恢复切换器',
    enable_switcher: '启用切换器',
    enabled_on_this_domain: '已为此域启用',
    sync_useragent_with_host_os: '', // TODO: Translate
    get_new_agent: '换个新的',
    open_settings: '打开设置',
    make_donation: '捐助',
    bug_report: '缺陷报告',
    general_settings: '常规设置',
    general_settings_hint: '您可以根据需求更改切换器的设置。',
    auto_renew: '按时自动更改用户代理字符串',
    auto_renew_interval: '每 x 秒自动更新 User-Agent（如3600秒=1小时）',
    auto_renew_on_startup: '浏览器启动时更改 User-Agent',
    js_protection: '防止通过 JavaScript 检测',
    custom_useragent: '以随机顺序使用自定义的用户代理，不使用生成',
    custom_useragent_list: '自定义 User-Agents（每行一个）',
    generator_settings: '生成器设置',
    generator_settings_hint: '',
    blacklist_settings: '黑名单设置',
    blacklist_settings_hint:
      '黑名单模式 - 默认启用，全面启用用户代理切换，除非符合已定义的域名和规则。白名单模式相反，仅针对符合已定义的域名和规则的访问启用用户代理切换。',
    blacklist_mode: '黑名单模式',
    whitelist_mode: '白名单模式',
    blacklist_domains: '域名列表（每行一条）',
    remove: '移除',
    save_changes: '保存更改',
    error_occurred: '发生错误',
    like_this_extension: '你喜欢这个扩展吗？',
    give_a_star_on_github: '在GitHub上给我们一颗星!',
    remote_useragent_list: '使用以下URL列表中的用户代理之一（按随机顺序）。',
    remote_useragent_list_hint: '该扩展将定期下载，以保持其最新状态',
    remote_useragent_updating_interval: '更新间隔（以秒为单位；例如，每3小时=60×60×3=10800）。',
    update_now: '现在更新',
    please_rate_extension: '请给这个插件评分!',
    edge_win: 'Edge 于 Windows',
    edge_mac: 'Edge 于 Mac',
    chrome_win: 'Chrome 于 Windows',
    chrome_mac: 'Chrome 于 Mac',
    chrome_linux: 'Chrome 于 Linux',
    chrome_android: 'Chrome 于 Android',
    firefox_win: 'FireFox 于 Windows',
    firefox_mac: 'FireFox 于 Mac',
    firefox_linux: 'FireFox 于 Linux',
    firefox_android: 'Firefox 于 Android',
    opera_win: 'Opera 于 Windows',
    opera_mac: 'Opera 于 Mac',
    safari_iphone: 'Safari 于 iPhone',
    safari_mac: 'Safari 于 Mac',
    why_we_need_permissions: '为了使扩展程序正常运行，需要以下权限',
    read_and_modify_data: '读取并修改您在访问的网站上的所有数据',
    read_and_modify_data_reason: '以注入必要的脚本到页面中，防止真实用户代理和其他数据泄漏',
    grant_permission_button: '授予权限',
  },
}
/* v8 ignore stop */
