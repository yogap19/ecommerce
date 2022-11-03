import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'yoga',
      email: 'yoga@gmail.com',
      password: bcrypt.hashSync('123321'),
      isAdmin: true,
    },
    {
      name: 'pramana',
      email: 'pramana@gmail.com',
      password: bcrypt.hashSync('123123'),
      isAdmin: true,
    },
  ],
  products: [
    {
      name: 'Beautiful bag',
      slug: 'beautiful-bag',
      category: 'tas',
      image: '/images/bag1.jpg',
      price: '250000',
      brand: 'Gucci',
      rating: 4.7,
      numReviews: 10,
      countInStock: 6,
      description: 'Popular bag for beautiful lady',
    },
    {
      name: 'Black bag',
      slug: 'black-bag',
      category: 'tas',
      image: '/images/bag2.jpg',
      price: '150000',
      brand: 'Celine',
      rating: 4.5,
      numReviews: 12,
      countInStock: 17,
      description: 'Modis and Confortable',
    },
    {
      name: 'Cuty bag',
      slug: 'cuty-bag',
      category: 'tas',
      image: '/images/bag3.jpg',
      price: '75000',
      brand: 'Chloe',
      rating: 4.1,
      numReviews: 23,
      countInStock: 8,
      description: 'Sweety bag',
    },
    {
      name: 'Black Cloud',
      slug: 'black-cloud',
      category: 'rok',
      image: '/images/rok1.jpg',
      price: '80000',
      brand: 'Theorema',
      rating: 4.2,
      numReviews: 22,
      countInStock: 4,
      description: 'Futuristic and Cool',
    },
    {
      name: 'Smoothy shy',
      slug: 'Smoothy-shy',
      category: 'tas',
      image: '/images/bag4.jpg',
      price: '240000',
      brand: 'Lotus',
      rating: 4.4,
      numReviews: 15,
      countInStock: 14,
      description: 'increase your confidence',
    },
    {
      name: 'Grey scale',
      slug: 'Grey-scale',
      category: 'rok',
      image: '/images/rok2.jpg',
      price: '140000',
      brand: 'Lotus',
      rating: 4.1,
      numReviews: 11,
      countInStock: 10,
      description: 'For smart lady',
    },
  ],
};

export default data;
