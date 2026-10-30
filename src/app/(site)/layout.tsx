import { CustomCursor } from '@/components/atoms/CustomCursor';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';

/**
 * Chrome for every public portfolio page. Admin routes live outside this
 * group so they render without the site navbar, footer, and cursor effects.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
