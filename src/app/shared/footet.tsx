export default function Footer() {
  return (
    <div className="bg-neutral-800">
      <footer className="text-white max-w-[1800px] mx-auto p-8 md:px-20 md:py-12">
        <h2 className="font-bold text-2xl">Email Simples</h2>

        <div>
          <section className="flex gap-2 mb-4 text-lg">
            <p className="font-thin">Contato:</p>
            <a href="mailto:lmo.gustavo@gmail.com">lmo.gustavo@gmail.com</a>
          </section>

          <section className="underline text-lg flex flex-col gap-4">
            <a href="/terms">Termos e Condições</a>
            <a href="/privacy">Política de Privacidade</a>
          </section>
        </div>
      </footer>
    </div>
  );
}
