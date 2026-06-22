// DesignForge: page shell. The skill replaces this with the assembled
// sections (Header, Hero, ...) wired in topology order.
export default function Page() {
  return (
    <main>
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight">DesignForge starter</h1>
          <p className="mt-3 opacity-70">Sections build here, one at a time, against the reference screenshot.</p>
        </div>
      </section>
    </main>
  );
}
