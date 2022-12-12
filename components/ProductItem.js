import Link from 'next/link';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import StarRatings from 'react-star-ratings';
export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        />
      </Link>

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <div>
          <StarRatings
            numberOfStars={5}
            rating={(product.rating, product.rating)}
            starDimension="15px"
            starSpacing="3px"
            starRatedColor="rgb(250 204 21)"
          />
        </div>
        <p>
          <NumericFormat
            value={product.price}
            allowLeadingZeros
            thousandSeparator=","
            displayType="text"
            prefix="Rp. "
          />
        </p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
