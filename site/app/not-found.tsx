import NavBar from '@/_components/NavBar'
import Footer from '@/_components/Footer'
import NotFoundView from '@/_components/NotFoundView'

/**
 * Global 404 for URLs that match no route at all.
 *
 * A `not-found.tsx` inside the `(site)` group only covers that group's
 * segments, so this root-level file is what stops unmatched URLs falling back
 * to Next's built-in error page. It re-adds the chrome the root layout no
 * longer provides.
 */
export default function GlobalNotFound() {
  return (
    <>
      <NavBar />
      <main>
        <NotFoundView />
      </main>
      <Footer />
    </>
  )
}
