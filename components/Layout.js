import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';

import { useRouter } from 'next/router';
import { BsSearch, BsFillCartCheckFill } from 'react-icons/bs';
export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  const [query, setQuery] = useState('');

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <>
      <Head>
        <title>{title ? title + ' - Fashion' : 'Fashion'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="top-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/" className="text-lg font-bold text-emerald-600">
              Fashion
            </Link>
            <div>
              <form
                onSubmit={submitHandler}
                className="mx-auto  hidden w-full justify-center md:flex"
              >
                <input
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  className="rounded-tr-none rounded-br-none p-1 text-sm   focus:ring-0"
                  placeholder="Search products"
                />
                <button
                  className="rounded rounded-tl-none rounded-bl-none bg-emerald-300 text-white p-1 text-sm dark:text-black"
                  type="submit"
                  id="button-addon2"
                >
                  <BsSearch className="h-5 w-5"></BsSearch>
                </button>
              </form>
            </div>
            <div className="flex">
              <div>
                <Link href="/cart" className="p-2 hover:font-semibold relative">
                  <BsFillCartCheckFill className="mr-4" size={30} />
                  {cartItemsCount > 0 && (
                    <sup className="absolute ml-1 rounded-full bg-red-600 px-2 py-1 text-xs text-white top-[22px] right-[-30px]">
                      {cartItemsCount}
                    </sup>
                  )}
                </Link>
              </div>

              <div className="pt-7">
                {status === 'loading' ? (
                  'Loading'
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block">
                    <Menu.Button className="text-emerald-600 font-semibold hover:font-bold uppercase">
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg ">
                      <Menu.Item>
                        <Link className="dropdown-link" href="/profile">
                          Profile
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link className="dropdown-link" href="/order-history">
                          Order History
                        </Link>
                      </Menu.Item>
                      {session.user.isAdmin === 'true' ? (
                        <Menu.Item>
                          {session.user.isAdmin && (
                            <Menu.Item>
                              <Link
                                className="dropdown-link"
                                href="/admin/dashboard"
                              >
                                Admin Dashboard
                              </Link>
                            </Menu.Item>
                          )}
                        </Menu.Item>
                      ) : (
                        <></>
                      )}

                      <Menu.Item>
                        <a
                          className="dropdown-link"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link href="/login" className="p-2">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>For Skripsi</p>
        </footer>
      </div>
    </>
  );
}
