// Fonts
// import { Inter } from '@next/font/google';
// const inter = Inter({ subsets: ['latin'] });

// Components
import Navbar from '../shared/navbar';

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '90px', paddingBottom: '120px' }}>
        {children}
      </main>
    </>
  );
}
