"""Convierte las vistas HTML a PNG (Edge headless) y recorta el espacio sobrante bajo el pie.
Uso: python render-vistas.py [archivo.html ...]   -> png/NN-nombre.png"""
import os, subprocess, sys, glob, tempfile, winreg
from PIL import Image

here = os.path.dirname(os.path.abspath(__file__))
os.chdir(here)
os.makedirs('png', exist_ok=True)
with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, r'SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\msedge.exe') as k:
    EDGE = winreg.QueryValue(k, None)

files = sys.argv[1:] or sorted(glob.glob('0*.html'))
tmp = tempfile.mkdtemp()
for f in files:
    width = 390 if 'movil' in f else 1440
    raw = os.path.join(tmp, f.replace('.html', '.png'))
    url = 'file:///' + os.path.abspath(f).replace('\\', '/').replace(' ', '%20')
    subprocess.run([EDGE, '--headless=new', '--user-data-dir=' + os.path.join(tmp, 'prof'), '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
                    '--virtual-time-budget=15000', '--window-size=%d,7000' % width, '--screenshot=' + raw, url],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=False, timeout=180)
    im = Image.open(raw).convert('RGB')
    h = im.height
    last = h - 1
    while last > 0 and im.getpixel((2, last)) != (255, 255, 255):
        last -= 1
    im.crop((0, 0, width, min(h, last + 1) if last > 200 else h)).save('png/' + f.replace('.html', '.png'))
    print(f, im.size, '->', last + 1)
