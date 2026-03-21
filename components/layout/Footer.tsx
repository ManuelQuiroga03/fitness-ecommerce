import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-white/10 pt-16 pb-8 text-zinc-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-zinc-900 dark:text-white">LIFT.APP</h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-xs">
            Ropa deportiva premium diseñada para el rendimiento y con estilo para las calles.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold uppercase tracking-widest text-sm mb-4 text-zinc-900 dark:text-white">Tienda</h4>
          <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
            <li><Link href="/catalog?category=Hombres" className="hover:text-black dark:hover:text-white transition-colors">Hombres</Link></li>
            <li><Link href="/catalog?category=Mujeres" className="hover:text-black dark:hover:text-white transition-colors">Mujeres</Link></li>
            <li><Link href="/catalog?category=Accesorios" className="hover:text-black dark:hover:text-white transition-colors">Accesorios</Link></li>
            <li><Link href="/catalog" className="hover:text-black dark:hover:text-white transition-colors">Nuevos Lanzamientos</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest text-sm mb-4 text-zinc-900 dark:text-white">Soporte</h4>
          <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
            <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Envíos y Devoluciones</Link></li>
            <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Rastrear Orden</Link></li>
            <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Contáctanos</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest text-sm mb-4 text-zinc-900 dark:text-white">Boletín</h4>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">Regístrate para noticias y ofertas exclusivas.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Tu correo" 
              className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm px-4 py-2 w-full focus:outline-none focus:border-zinc-500 transition-colors"
            />
            <button className="bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-sm px-4 py-2 uppercase tracking-wide hover:bg-zinc-800 dark:hover:bg-gray-200 transition-colors whitespace-nowrap">
              Unirse
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 border-t border-zinc-200 dark:border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} LIFT.APP. Todos los derechos reservados.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Política de Privacidad</Link>
          <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Términos de Servicio</Link>
        </div>
      </div>
    </footer>
  );
}
