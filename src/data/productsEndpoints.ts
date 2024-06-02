export const TypeEndpoints = {
  all: '',
  pop: 'filter=productType.id:"96743fc0-b9e5-49b7-8a40-7d6ca919a901"',
  accessories: 'filter=productType.id:"f04d2c67-32ca-4fe3-8ec6-567f489cf89c"',
  marvel: 'filter=categories.id:"8f0fffa0-9968-4c1b-af89-d4bcc62d58ad"',
  starwars: 'filter=categories.id:"546f23ab-9349-43a0-867a-cef1027e6f4e"',
  anime: 'filter=categories.id:"e05a4e72-e27c-43c3-b224-0871adecb928"',
};

export const SortEndpoints = {
  nameAZ: 'sort=name.en-us asc',
  nameZA: 'sort=name.en-us desc',
  PriceLowToHigh: 'sort=price asc',
  PriceHightoLow: 'sort=price desc',
};

export const productTypeID = {
  accessories: 'f04d2c67-32ca-4fe3-8ec6-567f489cf89c',
  pop: '96743fc0-b9e5-49b7-8a40-7d6ca919a901',
};
