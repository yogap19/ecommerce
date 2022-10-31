import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Fashion' : 'Shop'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 px-4 items-center justify-between shadow-md bg-emerald-100">
            <div>
              <Link
                href="/"
                className="text-lg font-bold text-emerald-500 font-header"
              >
                Fashion
              </Link>
            </div>
            <div>
              <Link href="/cart" className="p-2">
                Cart
              </Link>
              <Link href="/login" className="p-2">
                Login
              </Link>
            </div>
          </nav>
        </header>

        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center  shadow-inner">
          footer
        </footer>
      </div>
    </>
  );
};

export default Layout;
