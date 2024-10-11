import type { LocaleCode, Localization } from './types'

/* v8 ignore start */
export const locales: Partial<Record<LocaleCode, Localization>> = {
  /**
   * @lang English
   *
   * User-Agent is like a secret code your browser shares with every website you visit. It reveals details about
   * your browser, your operating system, and even some plugins you have installed. Essentially, it's your browser's
   * fingerprint!
   *
   * But here's the thing - sometimes you don't want to leave such a clear trail behind. That's where this
   * extension comes in!
   *
   * 🚀 We created this extension to shield your online privacy and make it super easy to appear as if you're
   * browsing from different devices.
   *
   * With this extension, your User-Agent string gets automatically swapped out with a randomized one at regular
   * intervals. You can also manually set your User-Agent if you prefer. And guess what? It's super light on your
   * system resources, so you won't even notice it's there.
   *
   * Plus, you're in control! You can customize which browsers and operating systems you want to emulate. We've
   * even got an exceptions list for those special cases.
   *
   * And the best part? It keeps you safe from sneaky JavaScript tricks designed to uncover your identity. Best of
   * all, it's completely free and ad-free. Give your online privacy a boost today!
   *
   * Made with ❤️ Check out the source code: https://github.com/tarampampam/random-user-agent
   */
  en: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Automatically change the user agent after specified period of time to a randomly selected one, ' +
      'thus hiding your real user agent',
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
      'Blacklist mode - switching enabled everywhere, except the defined domains & rules. Whitelist - on the ' +
      'contrary, disabled everywhere except the specified domains & rules',
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
   * User-Agent ist wie ein geheimes Code, den dein Browser mit jeder Website teilt, die du besuchst. Es verrät
   * Details über deinen Browser, dein Betriebssystem und sogar einige Plugins, die du installiert hast. Im
   * Wesentlichen ist es der Fingerabdruck deines Browsers!
   * Aber hier ist die Sache - manchmal möchtest du keine so klare Spur hinterlassen. Genau da kommt diese
   * Erweiterung ins Spiel!
   *
   * 🚀 Wir haben diese Erweiterung entwickelt, um deine Online-Privatsphäre zu schützen und es supereinfach zu
   * machen, als ob du von verschiedenen Geräten aus surfst.
   *
   * Mit dieser Erweiterung wird dein User-Agent-String automatisch in regelmäßigen Abständen durch einen
   * zufälligen ersetzt. Du kannst deinen User-Agent auch manuell festlegen, wenn du möchtest. Und weißt du was?
   * Es ist superleicht für deine Systemressourcen, sodass du es nicht einmal bemerkst.
   *
   * Außerdem hast du die Kontrolle! Du kannst festlegen, welche Browser und Betriebssysteme du emulieren möchtest.
   * Wir haben sogar eine Ausnahmeliste für diese speziellen Fälle.
   *
   * Und das Beste daran? Es schützt dich vor hinterhältigen JavaScript-Tricks, die darauf abzielen, deine
   * Identität aufzudecken. Und das Beste von allem: Es ist komplett kostenlos und werbefrei. Gib deiner
   * Online-Privatsphäre heute einen Schub!
   *
   * Mit ❤️ Entdecke den Quellcode: https://github.com/tarampampam/random-user-agent
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
    sync_useragent_with_host_os: 'Synchronisieren Sie das aktuelle Betriebssystem mit dem generierten Benutzer-Agenten',
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
      'Blacklist Modus - wechseln überall aktiviert, außer die definierten Domains & Regeln. Whitelist - ' +
      'andersherum, überall deaktiviert außer die definierten Domains & Regeln',
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
      'um die erforderlichen Skripte in die Seiten einzufügen, um echte Benutzeragenten und andere Datenlecks ' +
      'zu verhindern',
    grant_permission_button: 'Berechtigungen erteilen',
  },

  /**
   * @lang Spanish
   *
   * User-Agent es como un código secreto que tu navegador comparte con cada sitio web que visitas. Revela detalles
   * sobre tu navegador, tu sistema operativo e incluso algunos complementos que tienes instalados. ¡Básicamente, es
   * la huella digital de tu navegador!
   * Pero aquí está la cosa: a veces no quieres dejar una huella tan clara. ¡Ahí es donde entra esta extensión!
   *
   * 🚀 Creamos esta extensión para proteger tu privacidad en línea y hacer que sea súper fácil aparecer como si
   * estuvieras navegando desde diferentes dispositivos.
   *
   * Con esta extensión, tu cadena de User-Agent se intercambia automáticamente por una aleatoria a intervalos
   * regulares. También puedes configurar manualmente tu User-Agent si lo prefieres. ¿Y sabes qué? Es súper ligero
   * en tus recursos del sistema, así que ni siquiera te darás cuenta de que está ahí.
   *
   * ¡Además, tienes el control! Puedes personalizar qué navegadores y sistemas operativos quieres emular. Incluso
   * tenemos una lista de excepciones para esos casos especiales.
   *
   * ¿Y la mejor parte? Te mantiene a salvo de los trucos astutos de JavaScript diseñados para descubrir tu
   * identidad. Lo mejor de todo es que es completamente gratis y sin publicidad. ¡Dale un impulso a tu privacidad
   * en línea hoy mismo!
   *
   * Hecho con ❤️ Consulta el código fuente: https://github.com/tarampampam/random-user-agent
   */
  es: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Cambiar automáticamente el agente de usuario después de un período de tiempo especificado a uno seleccionado ' +
      'al azar',
    manifest_action_default_title: 'Aleatorice su User-Agent',
    manifest_command_renew_useragent: 'Obtener nuevo agente',
    active_user_agent: 'Agente de usuario activo',
    pause_switcher: 'Conmutador de pausa',
    unpause_switcher: 'Reanudar el cambio',
    enable_switcher: 'Activar conmutador',
    enabled_on_this_domain: 'Activado en este dominio',
    sync_useragent_with_host_os: 'Sincronizar el sistema operativo actual con el agente de usuario generado',
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
      'Modo Lista Negra - conmutación habilitada en todas partes, excepto en los dominios y reglas definidos. ' +
      'Lista blanca - por el contrario, desactivada en todas partes excepto en los dominios & reglas especificados',
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
      'para inyectar los scripts necesarios en las páginas y evitar la filtración del agente de usuario real y ' +
      'otros datos',
    grant_permission_button: 'Conceder permisos',
  },

  /**
   * @lang French
   *
   * User-Agent est comme un code secret que votre navigateur partage avec chaque site Web que vous visitez. Il révèle
   * des détails sur votre navigateur, votre système d'exploitation et même certains plugins que vous avez installés.
   * Fondamentalement, c'est l'empreinte digitale de votre navigateur!
   * Mais voici la chose - parfois, vous ne voulez pas laisser une trace aussi claire. C'est là que cette extension
   * intervient!
   *
   * 🚀 Nous avons créé cette extension pour protéger votre vie privée en ligne et vous permettre de paraître
   * facilement comme si vous naviguiez à partir de différents appareils.
   *
   * Avec cette extension, votre chaîne User-Agent est automatiquement remplacée par une chaîne aléatoire à
   * intervalles réguliers. Vous pouvez également définir manuellement votre User-Agent si vous le préférez. Et
   * devinez quoi? Elle est super légère sur vos ressources système, vous ne la remarquerez même pas.
   *
   * De plus, vous avez le contrôle! Vous pouvez personnaliser les navigateurs et systèmes d'exploitation que
   * vous souhaitez émuler. Nous avons même une liste d'exceptions pour ces cas spéciaux.
   *
   * Et la meilleure partie? Elle vous protège des astuces sournoises de JavaScript conçues pour découvrir votre
   * identité. Et le meilleur de tout, c'est complètement gratuit et sans publicité. Donnez un coup de pouce à
   * votre vie privée en ligne dès aujourd'hui!
   *
   * Fait avec ❤️ Consultez le code source: https://github.com/tarampampam/random-user-agent
   */
  fr: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Mets à jour de manière automatique et aléatoire le User-Agent de ton navigateur afin de masquer au mieux ' +
      'ton identité',
    manifest_action_default_title: 'User-Agent aléatoire',
    manifest_command_renew_useragent: 'Générer un nouveau User-Agent',
    active_user_agent: 'User-Agent actif',
    pause_switcher: 'Mettre en pause le Switcher',
    unpause_switcher: 'Réactiver le Switcher',
    enable_switcher: 'Activer le Switcher',
    enabled_on_this_domain: 'Autoriser ce domaine',
    sync_useragent_with_host_os: "Synchroniser le système d'exploitation actuel avec l'agent utilisateur généré",
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
      'Blacklist mode - activée partout, sauf pour les domaines et les règles définies. Whitelist mode - désactivé ' +
      'partout sauf pour les domaines et les règles spécifiées',
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
      'pour injecter les scripts nécessaires dans les pages afin de prévenir les fuites de données réelles ' +
      "sur l'utilisateur et autres",
    grant_permission_button: 'Accorder les autorisations',
  },

  /**
   * @lang Indonesian
   *
   * User-Agent seperti kode rahasia yang dibagikan oleh browser Anda ke setiap situs web yang Anda kunjungi. Ini
   * mengungkapkan detail tentang browser Anda, sistem operasi Anda, dan bahkan beberapa plugin yang Anda instal.
   * Pada dasarnya, ini adalah sidik jari browser Anda!
   * Tapi inilah masalahnya: kadang-kadang Anda tidak ingin meninggalkan jejak yang begitu jelas. Di situlah peran
   * ekstensi ini!
   *
   * 🚀 Kami menciptakan ekstensi ini untuk melindungi privasi online Anda dan membuatnya sangat mudah untuk muncul
   * seolah-olah Anda sedang menjelajah dari perangkat yang berbeda.
   *
   * Dengan ekstensi ini, string User-Agent Anda otomatis diganti dengan salah satu yang diacak pada interval reguler.
   * Anda juga bisa menyetel User-Agent secara manual jika Anda lebih suka. Dan tebak apa? Sangat ringan untuk sumber
   * daya sistem Anda, sehingga Anda bahkan tidak akan menyadarinya.
   *
   * Plus, Anda memiliki kendali! Anda dapat menyesuaikan browser dan sistem operasi mana yang ingin Anda tiru. Kami
   * bahkan memiliki daftar pengecualian untuk kasus-kasus khusus.
   *
   * Dan yang terbaik? Ini melindungi Anda dari trik JavaScript yang licik yang dirancang untuk mengungkap identitas
   * Anda. Dan yang terbaik dari semua, ini benar-benar gratis dan bebas iklan. Berikan dorongan pada privasi online
   * Anda hari ini!
   *
   * Dibuat dengan ❤️ Periksa kode sumber: https://github.com/tarampampam/random-user-agent
   */
  id: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Secara otomatis mengubah User-Agent setelah jangka waktu tertentu menjadi yang dipilih secara acak, ' +
      'sehingga menyembunyikan User-Agent kamu yang sebenarnya',
    manifest_action_default_title: 'Acak User-Agent kamu',
    manifest_command_renew_useragent: 'Dapatkan User-Agent baru',
    active_user_agent: 'User-Agent aktif',
    pause_switcher: 'Tunda Pengalih',
    unpause_switcher: 'Lanjutkan Pengalih',
    enable_switcher: 'Aktifkan Pengalih',
    enabled_on_this_domain: 'Aktifkan pada domain ini',
    sync_useragent_with_host_os: 'Sinkronkan sistem operasi saat ini dengan agen pengguna yang dihasilkan',
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
      'Mode daftar hitam - pengalihan diaktifkan di mana saja, kecuali domain & aturan yang ditentukan. ' +
      'Daftar putih - sebaliknya, dinonaktifkan di mana saja kecuali domain & aturan yang ditentukan',
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
      'untuk menyuntikkan skrip yang diperlukan ke halaman untuk mencegah identitas pengguna asli dan ' +
      'kebocoran data lainnya',
    grant_permission_button: 'Berikan izin',
  },

  /**
   * @lang Japanese
   *
   * User-Agentは、あなたが訪れるすべてのウェブサイトと共有される秘密のコードのようなものです。ブラウザの詳細、オペレーティングシステム、
   * インストールされているプラグインについて明らかにします。基本的に、それはあなたのブラウザの指紋です！
   *
   * しかし、ここがポイントです - 時々、そんなに明確な軌跡を残したくないことがあります。そこで、この拡張機能が登場します！
   *
   * 🚀 この拡張機能は、オンラインプライバシーを保護し、異なるデバイスからブラウジングしているかのように見せるのが超簡単になるように作成しました。
   *
   * この拡張機能では、定期的な間隔でUser-Agent文字列が自動的にランダムなものと交換されます。お好みで、手動でUser-Agentを設定することもできます。
   * そして、何と？それはあなたのシステムリソースにほとんど影響を与えないので、それがそこにあることさえ気付かないでしょう。
   *
   * さらに、あなたがコントロールしています！エミュレートしたいブラウザやオペレーティングシステムをカスタマイズできます。
   * 特別な場合のために例外リストも用意されています。
   *
   * そして、最高の部分？それは、あなたのアイデンティティを明らかにするために設計された、ずる賢いJavaScriptトリックからあなたを守ります。
   * なんといっても、それは完全に無料で広告もありません。今日、オンラインプライバシーを強化しましょう！
   *
   * ❤️で作成されました。ソースコードをチェックしてください：https://github.com/tarampampam/random-user-agent
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
    sync_useragent_with_host_os: '現在のOSを生成されたユーザーエージェントと同期させる',
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
      'ブラックリストモード - 定義されたドメインとルールを除くすべての場所で切り替えが有効です。ホワイトリスト - 逆に、' +
      '指定されたドメインとルール以外のすべての場所で無効化されます。',
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
   * User-Agent to jak tajny kod, który Twój przeglądarka udostępnia każdej odwiedzanej przez Ciebie witrynie.
   * Ujawnia szczegóły dotyczące Twojej przeglądarki, systemu operacyjnego, a nawet niektórych zainstalowanych
   * wtyczek. W zasadzie, jest to odcisk Twojej przeglądarki!
   *
   * Ale oto sprawa - czasami nie chcesz zostawiać tak wyraźnego śladu. Właśnie wtedy pojawia się ta rozszerzenie!
   *
   * 🚀 Stworzyliśmy to rozszerzenie, aby chronić Twoją prywatność online i sprawić, że będzie bardzo łatwo wydawać
   * się, jakbyś przeglądał z różnych urządzeń.
   *
   * Dzięki temu rozszerzeniu, Twój ciąg User-Agent automatycznie zostaje zastąpiony losowym co jakiś czas. Możesz
   * także ręcznie ustawić swój User-Agent, jeśli wolisz. I zgadnij co? Jest bardzo lekki dla zasobów Twojego systemu,
   * więc nawet nie zauważysz, że jest zainstalowany.
   *
   * Dodatkowo, masz kontrolę! Możesz dostosować, jakie przeglądarki i systemy operacyjne chcesz emulować. Mamy nawet
   * listę wyjątków dla tych specjalnych przypadków.
   *
   * A najlepsze? Chroni Cię przed podstępnymi trikami JavaScript zaprojektowanymi, aby ujawnić Twoją tożsamość. Co
   * najlepsze, jest całkowicie darmowy i bez reklam. Wzmocnij dziś swoją prywatność online!
   *
   * Stworzone z ❤️. Sprawdź kod źródłowy: https://github.com/tarampampam/random-user-agent
   */
  pl: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Automatycznie zmienia User-Agenta po określonym czasie na losowo wybranego, ukrywając w ten sposób ' +
      'prawdziwego User-Agenta',
    manifest_action_default_title: 'Losuj swojego User-Agenta',
    manifest_command_renew_useragent: 'Zdobądź nowego agenta',
    active_user_agent: 'Aktywny User-Agent',
    pause_switcher: 'Wstrzymaj przełącznik',
    unpause_switcher: 'Wznów przełącznik',
    enable_switcher: 'Włącz przełącznik',
    enabled_on_this_domain: 'Włączone w tej domenie',
    sync_useragent_with_host_os: 'Synchronizuj bieżący system operacyjny z wygenerowanym agentem użytkownika',
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
      'Tryb czarnej listy - przełączanie włączone wszędzie, z wyjątkiem określonych domen i reguł. Biała lista - ' +
      'wręcz przeciwnie, wyłączone wszędzie poza określonymi domenami i regułami',
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
      'aby wstrzykiwać niezbędne skrypty na strony w celu zapobiegania realnemu przeciekom danych, takim jak ' +
      'prawdziwy identyfikator użytkownika (user-agent) i inne',
    grant_permission_button: 'Udziel uprawnień',
  },

  /**
   * @lang Portuguese (Brazil)
   *
   * User-Agent é como um código secreto que o seu navegador compartilha com cada site que você visita. Ele revela
   * detalhes sobre o seu navegador, seu sistema operacional e até alguns plugins que você tem instalados.
   * Basicamente, é a impressão digital do seu navegador!
   *
   * Mas aqui está a questão - às vezes você não quer deixar um rastro tão claro. É aí que entra esta extensão!
   *
   * 🚀 Criamos esta extensão para proteger sua privacidade online e tornar muito fácil parecer que você está
   * navegando de dispositivos diferentes.
   *
   * Com esta extensão, o seu string User-Agent é automaticamente trocado por um aleatório em intervalos regulares.
   * Você também pode configurar manualmente o seu User-Agent, se preferir. E adivinha? É super leve em seus
   * recursos de sistema, então você nem vai perceber que está lá.
   *
   * Além disso, você está no controle! Você pode personalizar quais navegadores e sistemas operacionais deseja
   * emular. Temos até uma lista de exceções para esses casos especiais.
   *
   * E a melhor parte? Ele o protege contra truques JavaScript astutos projetados para descobrir sua identidade.
   * Melhor de tudo, é completamente gratuito e sem anúncios. Reforce sua privacidade online hoje!
   *
   * Feito com ❤️. Confira o código fonte: https://github.com/tarampampam/random-user-agent
   */
  pt_BR: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Altera automaticamente seu Agente de usuário após um tempo escolhido, para um outro e portanto oculta a ' +
      'sua verdadeira identidade',
    manifest_action_default_title: 'Randomize seu Agente de usuário',
    manifest_command_renew_useragent: 'Alterar para outro Agente',
    active_user_agent: 'Agente de usuário ativo',
    pause_switcher: 'Pausar alteração',
    unpause_switcher: 'Retomar alteração',
    enable_switcher: 'Ativar alteração',
    enabled_on_this_domain: 'Activado neste dominio',
    sync_useragent_with_host_os: 'Sincronize o sistema operacional atual com o agente de usuário gerado',
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
      'Modo de lista negra - alteração ativada em todos os lugares, menos em domínios e regras especificadas. ' +
      'Lista branca - ao contrário, desativada em todos os lugares, menos em domínios e regras especificadas',
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
   * User-Agent - это своего рода секретный код, который ваш браузер отправляет каждому сайту, который вы посещаете.
   * Он содержит детали о вашем браузере, операционной системе, а также некоторых установленных плагинах. Фактически,
   * это уникальный отпечаток вашего браузера!
   *
   * Но вот в чем дело - иногда вы не хотите оставлять такой след, позволяющий идентифицировать ваши перемещения в
   * сети. И вот тут-то и вступает в игру это расширение!
   *
   * 🚀 Мы создали его, чтобы защитить вашу онлайн-приватность путая следы так, как будто вы серфите сеть с разных
   * устройств.
   *
   * С этим расширением ваш User-Agent будет автоматически заменяться на случайный через регулярные промежутки
   * времени или при нажатии определенной кнопки. Вы также можете вручную задать свой User-Agent, если предпочитаете.
   * Кроме того, оно почти не потребляет ресурсы вашего браузера, так что вы даже не заметите, что оно вообще есть.
   *
   * Плюс ко всему, вы можете настроить, какие браузеры и операционные системы вы хотите эмулировать. У нас даже есть
   * список исключений для особых, если для каких-то сайтов не нужно выполнять подмену.
   *
   * И лучшая часть - оно защищает вас от "коварных" JavaScript скриптов, созданных для раскрытия реального
   * User-Agent'а. И, самое главное, оно абсолютно бесплатное и без рекламы. Бустаните свою онлайн-приватность
   * прямо сейчас!
   *
   * Сделано с ❤️ Исходный код: https://github.com/tarampampam/random-user-agent
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
    sync_useragent_with_host_os: 'Синхронизировать текущую ОС с генерируемым user-agent',
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
      'При включении режима черного списка подмена включена везде, кроме перечисленных ниже доменов и правил; ' +
      'белый же список наоборот - подмена выключена везде, кроме указанных доменов и правил',
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
   * User-Agent, ziyaret ettiğiniz her web sitesine tarayıcınızın paylaştığı gizli bir kod gibidir. Tarayıcınızın,
   * işletim sisteminizin ve hatta yüklediğiniz bazı eklentilerin ayrıntılarını ortaya çıkarır. Temelde, bu sizin
   * tarayıcınızın parmak izidir!
   *
   * Ama işte şöyle bir durum var - bazen böyle belirgin bir iz bırakmak istemezsiniz. İşte burada bu uzantı devreye
   * girer!
   *
   * 🚀 Bu uzantıyı, çevrimiçi gizliliğinizi korumak ve farklı cihazlardan geziniyormuş gibi görünmeyi son derece
   * kolay hale getirmek için oluşturduk!
   *
   * Bu uzantı ile User-Agent dizginiz belirli aralıklarla otomatik olarak rastgele biriyle değiştirilir. Tercih
   * ederseniz User-Agent'ınızı da manuel olarak ayarlayabilirsiniz. Ve biliyor musunuz? Sistem kaynaklarınızı çok az
   * kullandığı için bileğinizde var olduğunu fark etmeyeceksiniz.
   *
   * Artı, siz kontrol ediyorsunuz! Hangi tarayıcıları ve işletim sistemlerini taklit etmek istediğinizi
   * özelleştirebilirsiniz. Özel durumlar için hatta istisnalar listemiz var.
   *
   * Ve en güzel yanı? Kimliğinizi ortaya çıkarmak için tasarlanmış kurnaz JavaScript hilelerinden sizi koruyor.
   * Ve en iyisi, tamamen ücretsiz ve reklamsız. Çevrimiçi gizliliğinizi bugün güçlendirin!
   *
   * ❤️ ile yapıldı. Kaynak kodunu kontrol edin: https://github.com/tarampampam/random-user-agent
   */
  tr: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Belirli bir süre sonra kullanıcı aracısını otomatik olarak rastgele seçilen bir kullanıcı aracısına ' +
      'değiştirir, böylece gerçek kullanıcı aracınızı gizler',
    manifest_action_default_title: 'Kullanıcı Aracınızı Rastgele Ayarlayın',
    manifest_command_renew_useragent: 'Yeni temsilci alın',
    active_user_agent: 'Aktif Kullanıcı-Agent',
    pause_switcher: 'Duraklatma Değiştirici',
    unpause_switcher: 'Devam Değiştirici',
    enable_switcher: 'Değiştiriciyi Etkinleştir',
    enabled_on_this_domain: 'Bu etki alanında etkinleştirildi',
    sync_useragent_with_host_os: 'Mevcut işletim sistemini oluşturulan kullanıcı ajanıyla senkronize edin',
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
      'Kara liste modu - tanımlanan etki alanları ve kurallar dışında her yerde etkin anahtarlama. Beyaz liste - ' +
      'tam tersine, belirtilen etki alanları ve kurallar dışında her yerde devre dışı bırakılır',
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
   * User-Agent - це свого роду секретний код, який ваш браузер надсилає кожному сайту, який ви відвідуєте.
   * Він містить деталі про ваш браузер, операційну систему, а також деякі встановлені плагіни. Фактично, це
   * унікальний відбиток вашого браузера!
   *
   * Але ось у чому річ - іноді ви не хочете залишати такий слід, що дає змогу ідентифікувати ваші переміщення в
   * мережі. І ось тут-то і вступає в гру це розширення!
   *
   * 🚀 Ми створили його, щоб захистити вашу онлайн-приватність, плутаючи сліди так, ніби ви серфите мережу з
   * різних пристроїв.
   *
   * З цим розширенням ваш User-Agent буде автоматично замінюватися на випадковий через регулярні проміжки часу
   * або при натисканні певної кнопки. Ви також можете вручну задати свій User-Agent, якщо віддаєте перевагу.
   * Крім того, воно майже не споживає ресурси вашого браузера, так що ви навіть не помітите, що воно взагалі є.
   *
   * Плюс до всього, ви можете налаштувати, які браузери та операційні системи ви хочете емулювати. У нас навіть є
   * список винятків для особливих, якщо для якихось сайтів не потрібно виконувати підміну.
   *
   * І найкраща частина - воно захищає вас від «підступних» JavaScript скриптів, створених для розкриття реального
   * User-Agent'а. І, найголовніше, воно абсолютно безкоштовне і без реклами. Підвищіть свою онлайн-приватність
   * просто зараз!
   *
   * Зроблено з ❤️ Вихідний код: https://github.com/tarampampam/random-user-agent
   */
  uk: {
    manifest_name: 'Random User-Agent (Switcher)',
    manifest_description:
      'Автоматична зміна агента користувача через заданий проміжок часу на випадково обраного, таким чином ' +
      'приховуючи вашого реального агента користувача',
    manifest_action_default_title: 'Рандомізуйте свого User-Agent',
    manifest_command_renew_useragent: 'Отримати новий ідентифікатор',
    active_user_agent: 'Поточний User-Agent',
    pause_switcher: 'Призупинити розширення',
    unpause_switcher: 'Запустити розширення',
    enable_switcher: 'Активувати розширення',
    enabled_on_this_domain: 'Включено на цьому домені',
    sync_useragent_with_host_os: 'Синхронізуйте поточну ОС зі згенерованим агентом користувача',
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
      'Режим чорного списку - перемикання включено скрізь, крім заданих доменів і правил. Білий список - навпаки, ' +
      'відключений всюди, крім зазначених доменів і правил',
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
      'для впровадження необхідних скриптів на сторінках для запобігання реального використання користувача та ' +
      'інших витоків даних',
    grant_permission_button: 'Надати дозволи',
  },

  /**
   * @lang Vietnamese
   *
   * User-Agent giống như một mã bí mật mà trình duyệt của bạn chia sẻ với mọi trang web bạn truy cập. Nó tiết lộ
   * thông tin về trình duyệt của bạn, hệ điều hành của bạn, và thậm chí là một số plugin bạn đã cài đặt. Theo cách
   * đơn giản, đó là dấu vân tay của trình duyệt của bạn!
   *
   * Nhưng vấn đề là - đôi khi bạn không muốn để lại dấu vết rõ ràng như vậy. Đó là lý do tại sao có phần mở rộng này!
   *
   * 🚀 Chúng tôi tạo ra phần mở rộng này để bảo vệ sự riêng tư trực tuyến của bạn và làm cho việc xuất hiện như bạn
   * đang duyệt từ các thiết bị khác nhau trở nên cực kỳ dễ dàng!
   *
   * Với phần mở rộng này, chuỗi User-Agent của bạn sẽ tự động được thay thế bằng một chuỗi ngẫu nhiên sau một khoảng
   * thời gian nhất định. Bạn cũng có thể thiết lập User-Agent của mình bằng cách thủ công. Và biết điều gì không?
   * Nó rất nhẹ nhàng với tài nguyên hệ thống của bạn, vì vậy bạn thậm chí không cần phải để ý đến nó.
   *
   * Ngoài ra, bạn có quyền kiểm soát! Bạn có thể tùy chỉnh những trình duyệt và hệ điều hành mà bạn muốn mô phỏng.
   * Chúng tôi còn có một danh sách ngoại lệ cho những trường hợp đặc biệt.
   *
   * Và điều tốt nhất? Nó giữ bạn an toàn trước các chiêu trò JavaScript mở lỗ hổng để tiết lộ danh tính của bạn.
   * Quan trọng nhất, nó hoàn toàn miễn phí và không có quảng cáo. Hãy nâng cao sự riêng tư trực tuyến của bạn
   * ngay hôm nay!
   *
   * Được làm với ❤️ Kiểm tra mã nguồn: https://github.com/tarampampam/random-user-agent
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
    sync_useragent_with_host_os: 'Đồng bộ hóa hệ điều hành hiện tại với trình diễn người dùng được tạo ra',
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
      'Chế độ danh sách đen - cho phép ở tất cả các trang trừ những trang cho trước. Chế độ danh sách trắng - ' +
      'ngược lại, không cho phép ở mọi trang miền trừ những trang cho trước',
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
   * 用户代理就像是您的浏览器与您访问的每个网站分享的秘密代码。它揭示了关于您的浏览器、操作系统甚至一些已安装的插件的细节。本质上，
   * 它就是您的浏览器的指纹！
   *
   * 但是这里有个问题 - 有时您可能不想留下如此清晰的踪迹。这就是这个扩展程序的用处所在！
   *
   * 🚀 我们创建了这个扩展程序，以保护您的在线隐私，并使您轻松地伪装成从不同设备上浏览的样子。
   *
   * 通过这个扩展程序，您的用户代理字符串将定期自动更换为随机的字符串。您还可以手动设置用户代理，如果您喜欢的话。
   * 而且猜怎么着？它对您的系统资源消耗非常小，所以您甚至不会注意到它的存在。
   *
   * 此外，您拥有控制权！您可以自定义要模拟的浏览器和操作系统。我们甚至为特殊情况准备了一个例外列表。
   *
   * 最棒的部分呢？它可以保护您免受那些旨在揭示您身份的狡猾的 JavaScript 技巧的侵害。最重要的是，它完全免费，没有广告。立即提升您的在线隐私！
   *
   * 用 ❤️ 制作。查看源代码：https://github.com/tarampampam/random-user-agent
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
    sync_useragent_with_host_os: '将当前操作系统与生成的用户代理同步',
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
      '黑名单模式 - 默认启用，全面启用用户代理切换，除非符合已定义的域名和规则。白名单模式相反，' +
      '仅针对符合已定义的域名和规则的访问启用用户代理切换。',
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
