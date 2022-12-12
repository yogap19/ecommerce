import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';

import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';

import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Home({ products, featuredProducts }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success(product.name + ' added to the cart');
  };
  return (
    <Layout title="Home Page">
      <div className="font-mono font-semibold text-emerald-500 text-center">
        <h1 className="text-[50px]">
          Welcome <br /> Fashion Shop
        </h1>
      </div>
      <Carousel showThumbs={false} autoPlay infiniteLoop={true}>
        {featuredProducts.map((product) => (
          <div key={product._id}>
            <Link href={`/product/${product.slug}`} passHref>
              <img
                src={product.image}
                alt={product.name}
                sizes={200}
                // className="h-[500px] w-[500px]"
              />
            </Link>
          </div>
        ))}
      </Carousel>
      <h2 className="h2 my-4">Latest Prodcts</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  };
}
