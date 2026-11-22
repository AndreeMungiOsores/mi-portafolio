"""Genera las vistas propuestas (HTML) del sitio mungi.lat.
Uso: python build-vistas.py   -> escribe 01-inicio.html ... 07-inicio-movil.html
Luego render-vistas.ps1 las convierte a PNG."""
import os
os.chdir(os.path.dirname(os.path.abspath(__file__)))

P = '../../public/projects/'
V = '../../public/videos/'
A = '../marca/assets/'

WAI = ('<svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor"><path d="M16.04 3.2c-7.05 0-12.78 5.66-12.78 12.63 0 2.23.6 4.4 1.74 6.31L3.15 28.8l6.86-1.78a12.9 12.9 0 0 0 6.03 1.51c7.05 0 12.78-5.66 12.78-12.63S23.09 3.2 16.04 3.2Zm5.84 15.23c-.32-.16-1.88-.92-2.17-1.02-.29-.11-.5-.16-.71.16-.21.31-.82 1.02-1 1.23-.19.21-.37.24-.69.08-.32-.16-1.35-.49-2.57-1.56-.95-.84-1.59-1.88-1.78-2.2-.19-.31-.02-.48.14-.64.15-.14.32-.37.48-.55.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.68-.98-2.31-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.06-1.1 2.6s1.13 3.02 1.29 3.23c.16.21 2.23 3.36 5.4 4.71.76.32 1.35.51 1.81.65.76.24 1.45.2 2 .12.61-.09 1.88-.76 2.15-1.49.27-.73.27-1.36.19-1.49-.08-.13-.29-.21-.61-.37Z"/></svg>')
CK = ('<svg width="26" height="26" viewBox="0 0 44 44"><circle cx="22" cy="22" r="22" fill="#1F4FD8"/>'
      '<path d="M12 22.5l7 7 13-14" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>')
SYM = ('<svg width="34" height="34" viewBox="0 0 58 58"><rect width="38" height="38" fill="#0F1B2D"/><rect x="20" y="20" width="38" height="38" fill="#1F4FD8"/>'
       '<rect x="20" y="20" width="18" height="18" fill="#0A1F66"/></svg>')

def ico(path):
    return ('<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1F4FD8" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'
            + path + '</svg>')
IC = {
    'code': ico('<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>'),
    'flow': ico('<circle cx="5" cy="6" r="2.2"/><circle cx="19" cy="6" r="2.2"/><circle cx="12" cy="18" r="2.2"/><path d="M7 6h10M6 8l5 8M18 8l-5 8"/>'),
    'web': ico('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>'),
    'play': ico('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5v5l4.5-2.5z"/>'),
}

def nav(active=''):
    def a(k, t):
        return '<a%s>%s</a>' % (' class="on"' if k == active else '', t)
    return ('<div class="nav"><div class="shell"><div class="logo">' + SYM + '<span>Mungi <i>lat</i></span></div>'
            '<div class="links">' + a('servicios', 'Servicios') + a('casos', 'Casos') + a('video', 'Video con IA') + a('nosotros', 'Nosotros')
            + '<span class="lang">ES · EN</span><a class="btn p">' + WAI + 'Escríbenos</a></div></div></div>')

def cta(k='¿Tienes un proceso que debería funcionar mejor?', h='Construyamos <em>la solución.</em>', pose='saludando'):
    return ('<section class="shell"><div class="cta"><div style="max-width:640px"><div class="k">' + k + '</div><h2>' + h + '</h2>'
            '<div style="margin-top:36px;display:flex;gap:16px;align-items:center"><a class="btn w">' + WAI + 'Hablemos por WhatsApp</a>'
            '<span style="font:600 20px var(--ui);letter-spacing:-.01em;color:#DCE6FF">961 556 197</span></div></div>'
            '<div class="stage"><img src="' + A + 'cubo-' + pose + '-blanco.png"></div></div></section>')

def foot():
    return ('<footer class="foot"><div class="shell"><div><div class="logo">' + SYM + '<span>Mungi <i>lat</i></span></div>'
            '<p style="font:400 16px/1.5 var(--ui);color:var(--sec);margin-top:16px;max-width:300px">Software a medida, automatización, webs y video con IA para negocios que quieren trabajar ordenados.</p></div>'
            '<div><h4>Servicios</h4><ul><li>Software a medida</li><li>Automatización</li><li>Páginas web</li><li>Video con IA</li></ul></div>'
            '<div><h4>Sitio</h4><ul><li>Casos</li><li>Nosotros</li><li>Contacto</li></ul></div>'
            '<div><h4>Contacto</h4><ul><li>WhatsApp 961 556 197</li><li>Instagram @mungi.lat</li><li>Facebook Mungi lat</li></ul></div>'
            '<div class="base"><span>© 2026 Mungi lat · Perú</span><span>mungi.lat</span></div></div></footer>')

def page(name, title, body, css='', width=1440):
    html = ('<!doctype html><html lang="es"><head><meta charset="utf-8"><title>%s</title><link rel="stylesheet" href="vistas.css"><style>%s</style></head><body>%s</body></html>'
            % (title, css, body))
    open(name, 'w', encoding='utf-8').write(html)

def shot(img, extra=''):
    return '<div class="shot" %s><div class="bar"><b></b><b></b><b></b></div><img src="%s%s"></div>' % (extra, P, img)

CASOS = [  # (título, categoría, eyebrow, lead, imagen, tags, liveUrl)
    ('EuroBraces Center', 'Web', 'Clínica dental · Sitio + panel a medida',
     'Un sitio de conversión para una clínica de ortodoncia, con un panel para que el equipo lo administre sin depender de un desarrollador.',
     'eurobraces-home-hero.webp', ['HTML/CSS/JS', 'Supabase', 'SEO técnico'], 'eurobraces.com'),
    ('Clickenla.bio', 'Producto', 'Producto digital · Creator economy',
     'Una alternativa peruana a Linktree con identidad propia, analítica y control total del perfil.',
     'clickenlabio-landing.webp', ['Next.js 16', 'React 19', 'TypeScript'], 'clickenla.bio'),
    ('PlazaDerma', 'Producto', 'SaaS · Geolocalización',
     'Un localizador de tiendas personalizable que cualquier marca puede integrar en minutos.',
     'blissmap-public-map.webp', ['React 19', 'TypeScript', 'Vite'], 'bliss-map.vercel.app'),
    ('RouteTrack', 'Operaciones', 'Field operations · Monitoreo en vivo',
     'Un panel de control para asignar rutas diarias y seguir la operación de vendedores en tiempo real.',
     'medicaltech-live-monitoring.webp', ['Monitoreo en vivo', 'Geolocalización', 'Rutas diarias'], ''),
    ('GeoMed CRM', 'CRM', 'CRM empresarial · Inteligencia de campo',
     'Una base médica geolocalizada con historial comercial y trazabilidad por ejecutivo.',
     'medicaltech-crm-map.webp', ['Supabase', 'Geolocalización', 'Dashboard'], ''),
    ('CRM WhatsApp', 'Automatización', 'Automatización · CRM médico',
     'Tracking de chats de tus vendedores convertidas en información ordenada, consultable y segura.',
     'captura-de-pantalla-2026-09-05-223524-23e139.webp', ['Node.js', 'WhatsApp Web', 'SQLite'], ''),
    ('QR Router', 'Producto', 'Herramienta · Growth operations',
     'QR estáticos y dinámicos cuyo destino puede cambiar sin volver a imprimir.',
     'qr-router.webp', ['Next.js 16', 'TypeScript', 'Prisma'], ''),
    ('Rindegastos', 'Operaciones', 'Fintech interna · Operaciones',
     'Un centro de control para revisar, aprobar, exportar y desembolsar gastos empresariales.',
     'captura-de-pantalla-2026-09-13-161613-a82347.webp', ['Next.js 14', 'React 18', 'Dataverse'], ''),
]

def caso_card(c, big=False):
    t, cat, eb, lead, img, tags, live = c
    return ('<article class="card" style="padding:18px 18px 28px;overflow:hidden">' + shot(img) +
            '<div style="padding:22px 10px 0"><div class="mono b">' + eb + '</div><h3 style="margin:12px 0 10px;font-size:28px">' + t + '</h3>'
            '<p style="font:400 17px/1.5 var(--ui);color:var(--texto);min-height:78px">' + lead + '</p>'
            '<div class="chips" style="margin:18px 0 20px">' + ''.join('<span class="chip">%s</span>' % x for x in tags) + '</div>'
            '<span style="font:700 16px var(--ui);color:var(--cobalto)">Ver caso →</span></div></article>')

# ───────────────────────── 1 · INICIO ─────────────────────────
css = ('.hero{padding:70px 0 40px;position:relative}.hero .shell{display:grid;grid-template-columns:1.08fr .92fr;align-items:center;min-height:640px}'
       '.hero h1{margin:22px 0 26px}.hero .btns{display:flex;gap:14px;margin-top:38px}'
       '.hero .meta{display:flex;gap:38px;margin-top:54px;padding-top:28px;border-top:1px solid var(--borde)}'
       '.hero .meta b{display:block;font:800 36px var(--ui);letter-spacing:-.04em}.hero .meta span{font:400 15px var(--ui);color:var(--sec)}'
       '.float{position:absolute;background:#fff;border:1px solid var(--borde);border-radius:14px;padding:11px 16px;font:500 14px var(--mono);letter-spacing:.06em;color:var(--cobalto);box-shadow:var(--sombra-2)}'
       '.svc{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}.svc .card{padding:30px 28px 32px}'
       '.svc h3{margin:22px 0 12px}.svc p{font:400 16.5px/1.5 var(--ui);color:var(--texto);min-height:100px}.svc a{display:block;margin-top:20px;font:700 16px var(--ui);color:var(--cobalto)}'
       '.caps{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px}.caps .chip{font-size:14px;padding:10px 18px;background:#fff}'
       '.gr3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}'
       '.vid{background:#fff;border:1px solid var(--borde);border-radius:32px;padding:60px 64px;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;box-shadow:var(--sombra);position:relative;overflow:hidden}'
       '.phones{display:flex;gap:16px;justify-content:center;align-items:flex-start}.ph{width:150px;border-radius:22px;overflow:hidden;border:6px solid #0B1630;box-shadow:0 20px 40px rgba(11,22,48,.2);position:relative;background:#0B1630}'
       '.ph img{display:block;width:100%;height:268px;object-fit:cover}.ph:nth-child(2){margin-top:-28px}.ph:nth-child(3){margin-top:22px}'
       '.ph::after{content:"";position:absolute;left:50%;top:50%;width:38px;height:38px;margin:-19px;border-radius:50%;background:rgba(255,255,255,.9)}'
       '.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:10px}.steps .card{padding:26px 24px 30px}'
       '.steps b{display:block;font:500 14px var(--mono);letter-spacing:.14em;color:var(--cobalto);margin-bottom:34px}.steps h3{font-size:24px;margin-bottom:10px}'
       '.steps p{font:400 16px/1.5 var(--ui);color:var(--texto)}')
steps = ''.join('<div class="card"><b>%s</b><h3>%s</h3><p>%s</p></div>' % x for x in [
    ('01', 'Conversamos', 'Media hora para entender el negocio y qué debe lograr el proyecto.'),
    ('02', 'Propuesta', 'Alcance, plazo y precio cerrado. Sin sorpresas a mitad del proyecto.'),
    ('03', 'Diseño y desarrollo', 'Con avances visibles: ves el proyecto crecer, no esperas a ciegas.'),
    ('04', 'Publicación', 'Todo en tus cuentas y una guía corta para que puedas usarlo tú.')])
svc = ''.join('<div class="card">%s<h3>%s</h3><p>%s</p><a>Ver servicio →</a></div>' % x for x in [
    (IC['code'], 'Software a medida', 'CRM, ERP, paneles y aplicaciones web hechas según cómo trabaja tu empresa.'),
    (IC['flow'], 'Automatización', 'Lo repetitivo, conectado y automático: reportes, avisos, datos y chats ordenados.'),
    (IC['web'], 'Páginas web', 'Landings, sitios corporativos y apps web rápidas, medibles y fáciles de actualizar.'),
    (IC['play'], 'Video con IA', 'Reels y anuncios para captar atención en los primeros 3 segundos.')])
caps = ''.join('<span class="chip">%s</span>' % c for c in ['Aplicaciones web full-stack', 'Automatización de procesos', 'Dashboards y analítica',
                                                         'Integraciones y APIs', 'Bases de datos y ETL', 'Prototipos funcionales'])
c0, c3, c6, c7 = CASOS[0], CASOS[3], CASOS[6], CASOS[7]
body = (nav() +
    '<section class="hero"><div class="glow" style="right:-60px;top:20px;width:900px;height:760px"></div><div class="shell">'
    '<div><div class="chips"><span class="chip">SOFTWARE A MEDIDA</span><span class="chip">AUTOMATIZACIÓN</span><span class="chip">WEB</span><span class="chip">VIDEO IA</span></div>'
    '<h1>Software a medida que <em>trabaja por tu negocio.</em></h1>'
    '<p class="lead">Sistemas, automatizaciones y webs hechos a tu medida, para que tu empresa trabaje ordenada y se vea profesional.</p>'
    '<div class="btns"><a class="btn p">' + WAI + 'Hablemos por WhatsApp</a><a class="btn s">Ver casos reales →</a></div>'
    '<div class="meta"><div><b>8</b><span>casos reales entregados</span></div><div><b>4</b><span>servicios en un solo lugar</span></div><div><b>Perú</b><span>clientes locales y remotos</span></div></div></div>'
    '<div style="position:relative;height:640px"><img class="mult" src="' + A + 'cubo-saludando-blanco.png" style="left:-20px;top:-20px;width:700px">'
    '<span class="float" style="left:20px;top:120px">CRM</span><span class="float" style="right:30px;top:90px">AUTOMATIZACIÓN</span>'
    '<span class="float" style="right:0;top:400px">API</span><span class="float" style="left:40px;top:470px">ERP</span></div></div></section>'
    '<section class="sec"><div class="shell"><div class="head"><div><div class="mono b" style="margin-bottom:14px">01 / SERVICIOS</div><h2>Tecnología para cada<br>parte de tu negocio.</h2></div>'
    '<p>Producto, tecnología y operación en una sola conversación.</p></div><div class="svc">' + svc + '</div><div class="caps">' + caps + '</div></div></section>'
    '<section class="sec" style="padding-top:20px"><div class="shell"><div class="head"><div><div class="mono b" style="margin-bottom:14px">02 / CASOS REALES</div>'
    '<h2>Ocho proyectos.<br>Ocho problemas reales resueltos.</h2></div><p>Cada caso combina criterio de producto, interfaz, arquitectura y ejecución.</p></div>'
    '<div class="gr3">' + caso_card(c0) + caso_card(c3) + caso_card(c6) + '</div>'
    '<div style="text-align:center;margin-top:44px"><a class="btn s">Ver los 8 casos →</a></div></div></section>'
    '<section class="sec" style="padding-top:20px"><div class="shell"><div class="vid"><div><div class="mono b" style="margin-bottom:16px">03 / VIDEO CON IA</div>'
    '<h2 style="font-size:44px">¿Quieres vender más con video sin gastar en rodajes? <em>Creamos anuncios con IA.</em></h2>'
    '<div style="margin:28px 0 30px">' + ''.join('<div class="check">%s<span>%s</span></div>' % (CK, x) for x in
    ['-70% de costo vs rodaje tradicional', 'Entrega en 48-72 horas', 'Variantes A/B para Meta y TikTok Ads']) + '</div>'
    '<a class="btn p">Ver galería de piezas →</a></div>'
    '<div class="phones"><div class="ph"><img src="' + V + 'reel-0108.jpg"></div><div class="ph"><img src="' + V + 'reel-0118.jpg"></div><div class="ph"><img src="' + V + 'reel-0204.jpg"></div></div></div></div></section>'
    '<section class="sec" style="padding-top:20px"><div class="shell" style="position:relative"><div class="head"><div><div class="mono b" style="margin-bottom:14px">04 / CÓMO TRABAJAMOS</div>'
    '<h2>De la conversación al<br>proyecto funcionando.</h2></div><div style="width:240px;height:200px;position:relative;margin-right:40px"><img class="mult" src="' + A + 'cubo-pensando-blanco.png" style="left:-20px;top:-70px;width:320px"></div></div>'
    '<div class="steps">' + steps + '</div></div></section>'
    + cta() + foot())
page('01-inicio.html', 'Inicio', body, css)

# ───────────────────────── 2 · SERVICIOS ─────────────────────────
css = ('.ph1{padding:84px 0 50px}.ph1 h1{margin:18px 0 22px;max-width:980px}.blk{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center;padding:56px 0;border-top:1px solid var(--borde)}'
       '.blk.rev .t{order:2}.blk h2{font-size:44px;margin:14px 0 18px}.blk .lead{font-size:19px;margin-bottom:26px}'
       '.pk{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:6px}.pk .card{padding:22px 24px}.pk b{display:block;font:700 20px var(--ui);letter-spacing:-.02em}.pk span{font:500 13px var(--mono);color:var(--cobalto);letter-spacing:.08em}'
       '.pk p{font:400 14.5px/1.45 var(--ui);color:var(--texto);margin-top:8px}.stat{display:grid;grid-template-columns:1fr 1fr;gap:14px}.stat .card{padding:26px}.stat b{font:800 38px var(--ui);letter-spacing:-.04em;color:var(--cobalto)}.stat span{display:block;font:400 15px var(--ui);color:var(--sec);margin-top:4px}')
def li(items):
    return ''.join('<div class="check">%s<span>%s</span></div>' % (CK, i) for i in items)
body = (nav('servicios') +
    '<section class="ph1"><div class="shell"><div class="mono b">SERVICIOS</div><h1>Software, automatización, web y video, <em>en un solo lugar.</em></h1>'
    '<p class="lead">Cada proyecto se diseña según cómo trabaja tu negocio: sin plantillas y de punta a punta.</p></div></section>'
    '<div class="shell">'
    '<div class="blk"><div class="t"><div class="num">01</div><h2>Software a medida</h2><p class="lead">CRM, ERP, paneles y aplicaciones que reemplazan Excel y chats sueltos.</p>'
    '<div>' + li(['Aplicaciones web full-stack', 'Dashboards y analítica', 'Bases de datos y ETL', 'Prototipos funcionales']) + '</div><a class="btn p" style="margin-top:14px">Ver casos →</a></div>'
    '<div>' + shot('medicaltech-crm-map.webp') + '</div></div>'
    '<div class="blk rev"><div class="t"><div class="num">02</div><h2>Automatización</h2><p class="lead">Que tu equipo deje de copiar, pegar y recordar: que lo haga el sistema.</p>'
    '<div>' + li(['Automatización de procesos', 'Integraciones y APIs', 'Reportes y avisos automáticos']) + '</div><a class="btn p" style="margin-top:14px">Ver caso CRM WhatsApp →</a></div>'
    '<div>' + shot('captura-de-pantalla-2026-09-05-223524-23e139.webp') + '</div></div>'
    '<div class="blk"><div class="t"><div class="num">03</div><h2>Páginas web</h2><p class="lead">Landings, sitios corporativos y aplicaciones web: rápidos, medibles y fáciles de actualizar.</p>'
    '<div class="pk">' + ''.join('<div class="card"><b>%s</b><span>%s</span><p>%s</p></div>' % x for x in [
        ('Landing page', '1 a 2 semanas', 'Una página, un solo llamado a la acción.'), ('Sitio corporativo', '2 a 4 semanas', 'Servicios, casos y contacto.'),
        ('Aplicación web', 'Desde 4 semanas', 'Cuentas, datos y reportes.')]) + '</div><a class="btn p" style="margin-top:28px">Ver paquetes →</a></div>'
    '<div>' + shot('eurobraces-home-hero.webp') + '</div></div>'
    '<div class="blk rev"><div class="t"><div class="num">04</div><h2>Video con IA</h2><p class="lead">Reels y anuncios que captan atención en los primeros 3 segundos y se entregan listos para pautar.</p>'
    '<div class="stat"><div class="card"><b>48-72h</b><span>Tiempo de entrega</span></div><div class="card"><b>-70%</b><span>Costo vs rodaje</span></div></div>'
    '<a class="btn p" style="margin-top:28px">Ver galería →</a></div>'
    '<div style="display:flex;gap:16px;justify-content:center"><div class="card" style="padding:12px;border-radius:26px"><img src="' + V + 'reel-0127.jpg" style="display:block;width:190px;height:338px;object-fit:cover;border-radius:16px"></div>'
    '<div class="card" style="padding:12px;border-radius:26px;margin-top:34px"><img src="' + V + 'reel-0731.jpg" style="display:block;width:190px;height:338px;object-fit:cover;border-radius:16px"></div></div></div></div>'
    + cta('¿No sabes qué servicio necesitas?', 'Cuéntanos tu caso <em>y lo cotizamos.</em>', 'pensando') + foot())
page('02-servicios.html', 'Servicios', body, css)

# ───────────────────────── 3 · CASOS (índice) ─────────────────────────
css = ('.ph1{padding:84px 0 40px}.ph1 h1{margin:18px 0 22px}.flt{display:flex;gap:12px;margin:10px 0 44px}'
       '.flt .chip{font:600 15px var(--ui);letter-spacing:0;padding:11px 22px;background:#fff;color:var(--tinta)}.flt .on{background:var(--cobalto);color:#fff;border-color:var(--cobalto)}'
       '.gr{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-bottom:100px}.next9{border:2px dashed var(--cielo);background:rgba(232,240,255,.6);box-shadow:none;padding:40px 34px;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end}')
body = (nav('casos') +
    '<section class="ph1"><div class="shell"><div class="mono b">CASOS</div><h1>Ocho proyectos.<br><em>Ocho problemas reales resueltos.</em></h1>'
    '<p class="lead">Cada caso combina criterio de producto, interfaz, arquitectura y ejecución. Aquí explicamos la decisión y el valor creado.</p></div></section>'
    '<div class="shell"><div class="flt"><span class="chip on">Todos · 8</span><span class="chip">Web · 1</span><span class="chip">Producto · 3</span><span class="chip">CRM · 1</span><span class="chip">Operaciones · 2</span><span class="chip">Automatización · 1</span></div>'
    '<div class="gr">' + ''.join(caso_card(c) for c in CASOS) + '<article class="card next9"><img class="mult" src="' + A + 'cubo-pensando-blanco.png" style="left:-10px;top:-40px;width:420px"><div class="mono b" style="position:relative">TU CASO</div><h3 style="font-size:32px;margin:12px 0 18px;position:relative">¿Cuál es el siguiente problema que resolvemos?</h3><a class="btn p" style="align-self:flex-start;position:relative">' + WAI + 'Cuéntanos</a></article></div></div>'
    + cta('¿Tu caso es el siguiente?', 'Contanos tu <em>proceso.</em>'.replace('Contanos', 'Cuéntanos'), 'check') + foot())
page('03-casos.html', 'Casos', body, css)

# ───────────────────────── 4 · CASO (detalle) ─────────────────────────
css = ('.top{padding:60px 0 30px}.crumb{font:500 14px var(--mono);letter-spacing:.1em;color:var(--sec)}.top h1{font-size:84px;margin:18px 0 20px}'
       '.row{display:flex;justify-content:space-between;align-items:flex-end;gap:60px}.gal{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:14px}'
       '.gal img{width:100%;height:110px;object-fit:cover;border-radius:12px;border:1px solid var(--borde);display:block}.gal .on img{border:3px solid var(--cobalto)}'
       '.tri{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.tri .card{padding:34px 32px 38px}.tri .mono{margin-bottom:18px;display:block}'
       '.tri p{font:400 17px/1.6 var(--ui);color:var(--texto)}.next{display:flex;justify-content:space-between;align-items:center;padding:34px 40px}')
body = (nav('casos') +
    '<section class="top"><div class="shell"><div class="crumb">CASOS / EUROBRACES CENTER</div>'
    '<div class="row"><div><h1>EuroBraces <em>Center</em></h1><p class="lead" style="max-width:680px">Un sitio de conversión para una clínica de ortodoncia, con un panel para que el equipo lo administre sin depender de un desarrollador.</p>'
    '<div class="chips" style="margin-top:24px">' + ''.join('<span class="chip">%s</span>' % x for x in ['HTML/CSS/JS', 'Supabase', 'SEO técnico', 'Structured Data', 'Panel a medida', 'Vercel']) + '</div></div>'
    '<div style="display:flex;flex-direction:column;gap:12px"><a class="btn p">Ver sitio en vivo ↗</a><a class="btn s">' + WAI + 'Quiero algo así</a></div></div></div></section>'
    '<section class="shell">' + shot('eurobraces-home-hero.webp') + '<div class="gal">' +
    ''.join('<div%s><img src="%s%s"></div>' % (' class="on"' if i == 0 else '', P, f) for i, f in enumerate(
        ['eurobraces-home-hero.webp', 'eurobraces-admin-pacientes.webp', 'eurobraces-casos-clinicos.webp', 'eurobraces-opiniones.webp', 'eurobraces-admin-casos.webp'])) +
    '</div></section>'
    '<section class="sec" style="padding-bottom:20px"><div class="shell"><div class="tri">'
    '<div class="card"><span class="mono b">EL RETO</span><p>La clínica necesitaba una web profesional y, sobre todo, una forma de que el propio equipo actualizara casos clínicos, reseñas y contenido sin tocar código, y no aparecía en Google buscando su nombre.</p></div>'
    '<div class="card"><span class="mono b">LA SOLUCIÓN</span><p>Se construyó el sitio completo sin framework (HTML/CSS/JS puro, ~40 KB) y un panel de administración propio conectado a Supabase, con una capa completa de SEO técnico y la ficha de Google del negocio conectada.</p></div>'
    '<div class="card"><span class="mono b">QUÉ PUEDE HACER EL EQUIPO</span><p>Gestionar casos clínicos, opiniones, motivos de consulta con comparador antes/después, fotos de pacientes y el perfil del especialista, todo desde su panel.</p></div></div></div></section>'
    '<section class="shell" style="margin-top:50px"><div class="card next"><div><div class="mono">SIGUIENTE CASO</div><h3 style="font-size:34px;margin-top:10px">Clickenla.bio</h3></div><a class="btn s">Ver caso →</a></div></section>'
    '<div style="height:90px"></div>' + cta('¿Quieres algo así para tu negocio?', 'Hablemos <em>de tu proyecto.</em>', 'senalando') + foot())
page('04-caso-detalle.html', 'Caso', body, css)

# ───────────────────────── 5 · VIDEO CON IA ─────────────────────────
css = ('.ph1{padding:84px 0 30px}.ph1 h1{margin:18px 0 22px;max-width:1000px}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:44px}'
       '.stats .card{padding:26px 28px}.stats b{display:block;font:800 40px var(--ui);letter-spacing:-.04em;color:var(--cobalto)}.stats span{font:400 15.5px var(--ui);color:var(--sec)}'
       '.reels{display:grid;grid-template-columns:repeat(5,1fr);gap:18px}.rl{border-radius:20px;overflow:hidden;position:relative;border:1px solid var(--borde);box-shadow:var(--sombra);background:#0B1630}'
       '.rl img{display:block;width:100%;height:370px;object-fit:cover}.rl::after{content:"";position:absolute;left:50%;top:50%;width:54px;height:54px;margin:-27px;border-radius:50%;background:rgba(255,255,255,.92)}'
       '.rl i{position:absolute;left:12px;top:12px;font:500 12px var(--mono);letter-spacing:.1em;color:var(--cobalto);background:#fff;border-radius:99px;padding:6px 11px;z-index:2;font-style:normal}'
       '.hz{display:grid;grid-template-columns:1.2fr 1fr;gap:20px;align-items:center}.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.steps .card{padding:26px 24px 30px}'
       '.steps b{display:block;font:500 14px var(--mono);letter-spacing:.14em;color:var(--cobalto);margin-bottom:34px}.steps h3{font-size:22px;margin-bottom:10px}.steps p{font:400 15.5px/1.5 var(--ui);color:var(--texto)}')
reels = ''.join('<div class="rl"><i>%s</i><img src="%s%s.jpg"></div>' % (t, V, f) for t, f in [('REEL 01', 'reel-0108'), ('REEL 02', 'reel-0118'), ('REEL 03', 'reel-0127'), ('REEL 04', 'reel-0204'), ('REEL 05', 'reel-0217')])
steps = ''.join('<div class="card"><b>%s</b><h3>%s</h3><p>%s</p></div>' % x for x in [
    ('01', 'Brief y ángulo comercial', 'Definimos tu producto, a quién le vendes y la oferta que provocará el clic o la compra.'),
    ('02', 'Guion y ganchos con IA', 'El gancho de los primeros 3 segundos, los puntos de dolor y el llamado a la acción.'),
    ('03', 'Generación y edición', 'Visuales, avatares y locución neural con IA, con música, ritmo y subtítulos de alta retención.'),
    ('04', 'Entrega lista para pautar', 'Archivos en 9:16, 1:1 o 16:9 listos para tus redes o anuncios pagados.')])
body = (nav('video') +
    '<section class="ph1"><div class="shell"><div class="mono b">SERVICIO · VIDEO CON IA</div><h1>Videos publicitarios con IA que <em>se ven hasta el final.</em></h1>'
    '<p class="lead">Reels y anuncios de alto impacto potenciados con IA: guiones que retienen el scroll, voces y visuales hiperrealistas, y entrega lista para pautar en días, no en semanas.</p>'
    '<div class="stats">' + ''.join('<div class="card"><b>%s</b><span>%s</span></div>' % x for x in [('100% IA', 'Producción ágil'), ('48-72h', 'Tiempo de entrega'), ('-70% costo', 'Frente a rodaje tradicional'), ('9:16 + 1:1', 'Optimizado para anuncios')]) + '</div></div></section>'
    '<section class="sec" style="padding-bottom:40px"><div class="shell"><div class="head"><div><div class="mono b" style="margin-bottom:14px">01 / TRABAJO REAL CON IA</div><h2>Piezas generadas<br>y producidas con IA.</h2></div>'
    '<p>Toca cualquier video para reproducirlo con sonido. Todo fue creado con herramientas de IA y edición profesional.</p></div><div class="reels">' + reels + '</div></div></section>'
    '<section class="sec" style="padding:30px 0"><div class="shell"><div class="hz"><div class="shot" style="border-radius:22px"><img src="' + V + 'publicidad-modificado-ceba.jpg"></div>'
    '<div style="padding-left:40px"><div class="mono b">FORMATO HORIZONTAL</div><h3 style="font-size:34px;margin:14px 0 14px">Spots para YouTube y pantallas.</h3><p class="lead" style="font-size:18px">Spots para YouTube, pantallas en punto de venta y presentaciones.</p></div></div></div></section>'
    '<section class="sec" style="padding-bottom:0"><div class="shell"><div class="head"><div><div class="mono b" style="margin-bottom:14px">02 / CÓMO TRABAJAMOS</div><h2>De una idea a anuncios listos<br>para pautar en 4 pasos.</h2></div></div><div class="steps">' + steps + '</div></div></section>'
    '<div style="height:90px"></div>' + cta('¿Anuncios en video sin gastar miles en producción?', 'Produzcamos tus <em>videos con IA.</em>', 'saludando') + foot())
page('05-video-ia.html', 'Video con IA', body, css)

# ───────────────────────── 6 · NOSOTROS + CONTACTO ─────────────────────────
css = ('.ph1{padding:84px 0 40px}.ph1 .shell{display:grid;grid-template-columns:1.1fr .9fr;align-items:center}.ph1 h1{margin:18px 0 24px}'
       '.vals{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.vals .card{padding:34px 30px 38px}.vals h3{margin:16px 0 12px}.vals p{font:400 17px/1.55 var(--ui);color:var(--texto)}'
       '.two{display:grid;grid-template-columns:1fr 1fr;gap:20px}.wa{padding:48px 48px;position:relative;overflow:hidden}.wa .n{font:800 64px var(--ui);letter-spacing:-.05em;margin:12px 0 26px}'
       '.soc{padding:36px 40px}.soc div{display:flex;justify-content:space-between;padding:18px 0;border-bottom:1px solid var(--borde);font:600 18px var(--ui)}.soc div:last-child{border:0}.soc span{color:var(--sec);font-weight:500}')
body = (nav('nosotros') +
    '<section class="ph1"><div class="shell"><div><div class="mono b">NOSOTROS</div><h1>Tecnología que se adapta a tu negocio, <em>no al revés.</em></h1>'
    '<p class="lead">Somos Mungi lat. Creamos software a medida, automatizaciones, webs y video con IA para negocios que quieren dar el salto digital, con base en Perú y clientes locales y remotos.</p></div>'
    '<div style="position:relative;height:520px"><div class="glow" style="left:0;top:0;width:560px;height:520px"></div><img class="mult" src="' + A + 'cubo-senalando-blanco.png" style="left:-40px;top:-60px;width:640px"></div></div></section>'
    '<section class="sec" style="padding-top:40px"><div class="shell"><div class="head"><div><div class="mono b" style="margin-bottom:14px">01 / CÓMO TRABAJAMOS</div><h2>Tres principios.</h2></div><p>Lo que guía cada proyecto, del primer mensaje a la publicación.</p></div>'
    '<div class="vals">' + ''.join('<div class="card"><span class="num">%s</span><h3>%s</h3><p>%s</p></div>' % x for x in [
        ('01', 'De punta a punta', 'Producto, interfaz, arquitectura, automatización y video en una sola conversación, sin fragmentar el trabajo entre varios proveedores.'),
        ('02', 'Hecho a tu medida', 'Sin plantillas: cada solución nace de cómo trabaja tu negocio, con avances visibles y precio cerrado.'),
        ('03', 'Todo es tuyo', 'Dominio, hosting y cuentas quedan a tu nombre, con una guía para que puedas usarlo y actualizarlo tú.')]) + '</div></div></section>'
    '<section class="sec" style="padding-top:20px"><div class="shell"><div class="head"><div><div class="mono b" style="margin-bottom:14px">02 / CONTACTO</div><h2>Hablemos de tu proyecto.</h2></div><p>El canal principal es WhatsApp. Respondemos por ahí.</p></div>'
    '<div class="two"><div class="card wa"><div class="mono b">ESCRÍBENOS POR WHATSAPP</div><div class="n">961 556 197</div><a class="btn p">' + WAI + 'Abrir WhatsApp</a>'
    '<img class="mult" src="' + A + 'cubo-saludando-blanco.png" style="right:-70px;bottom:-110px;width:340px"></div>'
    '<div class="card soc"><div>Instagram<span>@mungi.lat</span></div><div>Facebook<span>Mungi lat</span></div><div>Sitio web<span>mungi.lat</span></div><div>Ubicación<span>Perú</span></div></div></div></div></section>'
    + foot())
page('06-nosotros-contacto.html', 'Nosotros y contacto', body, css)

# ───────────────────────── 7 · INICIO MÓVIL (390) ─────────────────────────
css = ('body{width:390px}.shell{width:358px}h1{font-size:42px;letter-spacing:-.04em}h2{font-size:32px}.nav{height:64px}.nav .shell{display:flex}.logo{font-size:22px}'
       '.burger{width:44px;height:44px;border:1px solid var(--borde);border-radius:12px;background:#fff;display:flex;flex-direction:column;gap:5px;align-items:center;justify-content:center}.burger i{width:18px;height:2px;background:var(--tinta)}'
       '.hero{padding:34px 0 10px;position:relative}.hero .btns{display:grid;gap:12px;margin-top:28px}.btn{justify-content:center;width:100%}'
       '.sec{padding:56px 0}.card{border-radius:20px}.svc{display:grid;gap:14px}.svc .card{padding:24px}.svc h3{margin:16px 0 8px;font-size:23px}.svc p{font:400 15.5px/1.5 var(--ui);color:var(--texto)}'
       '.scroll{display:flex;gap:14px;overflow:hidden;margin-right:-16px}.scroll .card{flex:none;width:300px;padding:14px 14px 22px}'
       '.cta div[style*="display:flex"]{flex-wrap:wrap}.cta{padding:34px 26px;flex-direction:column;align-items:flex-start;border-radius:26px}.cta h2{font-size:34px}.stage{width:210px;height:210px;align-self:center}.stage img{width:290px;left:-40px;top:-40px}'
       '.foot .shell{grid-template-columns:1fr 1fr;gap:28px}.foot .shell>div:first-child{grid-column:1/-1}.foot .base{flex-direction:column;gap:6px}')
msvc = ''.join('<div class="card">%s<h3>%s</h3><p>%s</p></div>' % x for x in [
    (IC['code'], 'Software a medida', 'CRM, ERP, paneles y apps hechas según cómo trabaja tu empresa.'),
    (IC['flow'], 'Automatización', 'Lo repetitivo, conectado y automático.'),
    (IC['web'], 'Páginas web', 'Landings y sitios rápidos y fáciles de actualizar.'),
    (IC['play'], 'Video con IA', 'Reels y anuncios para captar atención en 3 segundos.')])
mscroll = ''.join('<div class="card">' + shot(c[4]) + '<div style="padding:16px 6px 0"><div class="mono b" style="font-size:11px">' + c[2] + '</div><h3 style="font-size:22px;margin:8px 0 6px">' + c[0] + '</h3></div></div>' for c in CASOS[:4])
body = ('<div class="nav"><div class="shell" style="justify-content:space-between;align-items:center"><div class="logo">' + SYM + '<span>Mungi <i>lat</i></span></div><div class="burger"><i></i><i></i><i></i></div></div></div>'
    '<section class="hero"><div class="shell"><div class="chips"><span class="chip" style="font-size:11px;padding:6px 11px">SOFTWARE A MEDIDA</span><span class="chip" style="font-size:11px;padding:6px 11px">AUTOMATIZACIÓN</span></div>'
    '<h1 style="margin:18px 0 16px">Software a medida que <em>trabaja por tu negocio.</em></h1><p class="lead" style="font-size:17px">Sistemas, automatizaciones y webs hechos a tu medida para que tu empresa trabaje ordenada.</p>'
    '<div class="btns"><a class="btn p">' + WAI + 'Hablemos por WhatsApp</a><a class="btn s">Ver casos reales →</a></div>'
    '<div style="position:relative;height:340px;margin-top:6px"><div class="glow" style="left:20px;top:20px;width:340px;height:300px"></div><img class="mult" src="' + A + 'cubo-saludando-blanco.png" style="left:-30px;top:-40px;width:420px"></div></div></section>'
    '<section class="sec" style="padding-top:30px"><div class="shell"><div class="mono b" style="margin-bottom:12px">01 / SERVICIOS</div><h2 style="margin-bottom:26px">Tecnología para cada parte de tu negocio.</h2><div class="svc">' + msvc + '</div></div></section>'
    '<section class="sec" style="padding-top:10px"><div class="shell"><div class="mono b" style="margin-bottom:12px">02 / CASOS REALES</div><h2 style="margin-bottom:26px">Ocho problemas reales resueltos.</h2></div><div class="shell"><div class="scroll">' + mscroll + '</div></div></section>'
    + cta('¿Tienes un proceso que debería funcionar mejor?', 'Construyamos <em>la solución.</em>') + foot())
page('07-inicio-movil.html', 'Inicio móvil', body, css, 390)
print('ok')
