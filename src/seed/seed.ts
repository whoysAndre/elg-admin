interface SeedProduct {
  code: string;
  name: string;
  images: string[];
  stock: number;
  price: number;
  sizes: string[];
  type: ValidTypes;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  brands: 'nike' | 'adidas' | 'puma' | 'reebok';
}


interface SeedData {
  categories: string[];
  products: SeedProduct[];
}
type ValidTypes = 'polos'|'conjuntos'| 'mochilas' | 'zapatillas' | 'medias' |'sandalias' | 'pantalones' |'calzas'|'viviris';

export const initialData: SeedData = {

  categories: [
    'polos', 'conjuntos', 'mochilas', 'zapatillas', 'medias', 'sandalias','pantalones','calzas','viviris'
  ],

  products: [
    {
      images: [
        '1740176-00-A_0_2000.jpg',
        '1740176-00-A_1.jpg',
      ],
      code: 'AO-4560',
      stock: 7,
      price: 75,
      type: 'mochilas',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      name: "Men’s Chill Crew Neck Sweatshirt",
      gender: 'men',
      brands: 'nike'
    },
  ]
}