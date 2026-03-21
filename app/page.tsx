export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="text-center max-w-4xl space-y-6">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-zinc-950">
          Redefine Your <br /> Limits
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto">
          Premium oversize tees, durable straps, and professional knee sleeves. Engineered for performance and aesthetics.
        </p>
        
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-zinc-950 text-white font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors">
            Shop New Arrivals
          </button>
          <button className="px-8 py-4 border-2 border-zinc-950 text-zinc-950 font-bold uppercase tracking-widest text-sm hover:bg-zinc-50 transition-colors">
            View Accessories
          </button>
        </div>
      </div>

      {/* TODO: Add Featured Products component here mapped from ecommerce product logic */}
      {/* <FeaturedProducts /> */}
      
      {/* TODO: Implement Newsletter signup component */}
    </div>
  );
}
