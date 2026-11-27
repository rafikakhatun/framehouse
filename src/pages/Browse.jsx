import Trending from '../components/Trending'

export default function Browse() {
  return (
    <main id="main" className="page-enter">
      <section className="section shell">
        <h1 className="text-heading font-bold">Browse movies</h1>
        <p className="mt-2 text-muted">Explore the Framehouse collection and open a title to read its story.</p>
      </section>
      <Trending browse />
    </main>
  )
}
