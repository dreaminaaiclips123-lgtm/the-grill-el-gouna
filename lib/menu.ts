export type Badge = "bestseller" | "spicy" | "vegetarian" | "chef";

export type MenuItem = {
  name: string;
  price: string;
  description?: string;
  badges?: Badge[];
  isNew?: boolean;
};

export type MenuCategory = {
  id: string;
  label: string;
  note?: string;
  items: MenuItem[];
};

export const SIDE_NOTE =
  "Served with one side of your choice: sauteed vegetables, fried potatoes, rice, or salad.";

export const menu: MenuCategory[] = [
  {
    id: "soups",
    label: "Signature Soups",
    items: [
      { name: "Lentil", price: "170", badges: ["bestseller", "vegetarian"] },
      { name: "Molokheya", price: "170", badges: ["bestseller", "vegetarian"] },
      { name: "Fresh Creamy Tomato", price: "170" },
      { name: "Chicken Creamy", price: "190" },
      { name: "Mushroom", price: "190" },
    ],
  },
  {
    id: "cold-mezza",
    label: "Cold Mezza",
    items: [
      {
        name: "Hummus",
        price: "120",
        description: "Chickpea paste, lemon, vinegar, and olive oil.",
        badges: ["bestseller", "vegetarian", "chef"],
      },
      {
        name: "Baba Ghanoush",
        price: "120",
        description: "Eggplant, tahini, lemon, vinegar, cumin, garlic, and olive oil.",
        badges: ["vegetarian"],
      },
      {
        name: "Garlic Dip",
        price: "120",
        description: "Garlic, oil, vinegar, and lemon.",
        badges: ["bestseller", "vegetarian", "chef"],
      },
      {
        name: "Tahini",
        price: "120",
        description: "Sesame paste, lemon juice, garlic, and olive oil.",
        badges: ["vegetarian", "chef"],
      },
      {
        name: "Bangar Salad",
        price: "100",
        description: "Beetroot, lemon, and olive oil.",
        badges: ["vegetarian"],
      },
      {
        name: "Pickled Cucumber",
        price: "100",
        description: "Cucumber, vinegar, garlic, and olive oil.",
        badges: ["vegetarian"],
      },
      { name: "Pickled Tomato", price: "100", badges: ["vegetarian"] },
      {
        name: "Pickled Eggplant",
        price: "100",
        description: "Eggplant, vinegar, and olive oil.",
      },
      {
        name: "Yogurt Dip",
        price: "100",
        description: "Yogurt, cucumbers, and mint.",
        badges: ["vegetarian"],
      },
      {
        name: "Feta Cheese Tomato Dip",
        price: "120",
        description: "Feta cheese, tomatoes, cumin, and olive oil.",
        badges: ["vegetarian"],
      },
      {
        name: "Cold Mezza Platter",
        price: "400",
        description:
          "Assortment of 5 cold mezza plates: garlic dip, tahini, pickled cucumber, hummus, mix green salad.",
        badges: ["chef"],
      },
    ],
  },
  {
    id: "hot-mezza",
    label: "Hot Mezza",
    items: [
      {
        name: "Trotter with Stuffed Grapevine (Kaware)",
        price: "350",
        description:
          "Slow-cooked veal trotters served with stuffed grapevine rolls in garlic and coriander broth.",
        isNew: true,
      },
      {
        name: "Mombar (Egyptian Sausage)",
        price: "200",
        description: "Traditional Egyptian sausage stuffed with rice and herbs, fried to golden perfection.",
        isNew: true,
      },
      {
        name: "Stuffed Grapevine Leaves",
        price: "200",
        description: "Rice, minced meat, and parsley, wrapped in grape leaves.",
      },
      {
        name: "Chicken Wings",
        price: "200",
        description: "Fried wings served with mayo sauce.",
      },
      {
        name: "Cheese Sambousak",
        price: "150",
        description: "Fried crunchy pastries filled with feta cheese and mint.",
        badges: ["vegetarian", "chef"],
      },
      {
        name: "Chicken Liver",
        price: "250",
        description: "Chicken liver, lemon, and spices.",
      },
      {
        name: "Lebanese Chicken Liver",
        price: "250",
        description: "Chicken liver cooked in our special pomegranate sauce.",
      },
      {
        name: "Rice with Chicken Liver",
        price: "250",
        description: "Rice, chicken liver, butter, and lemon.",
        badges: ["bestseller", "chef"],
      },
      {
        name: "Hawawshi",
        price: "260",
        description: "Egyptian bread filled with spiced minced meat, grilled on charcoal.",
        badges: ["bestseller", "chef"],
      },
      {
        name: "Lebanese Sausage",
        price: "320",
        description: "Homemade oriental sausage mixed with pomegranate sauce.",
        badges: ["bestseller", "chef"],
      },
      {
        name: "Batata Harra",
        price: "150",
        description: "Spiced fried potatoes.",
        badges: ["spicy", "vegetarian", "chef"],
      },
      { name: "Handcut Fries", price: "120", badges: ["vegetarian"] },
      { name: "Brown or White Rice", price: "70", badges: ["vegetarian"] },
      {
        name: "Hot Mezza Platter",
        price: "600",
        description:
          "Assortment of 5 hot starters: stuffed vine leaves, batata harra, chicken liver, cheese sambousak, Lebanese sausage.",
        badges: ["chef"],
      },
    ],
  },
  {
    id: "salads",
    label: "Seasonal Salads",
    items: [
      {
        name: "Greek",
        price: "250",
        description: "Cucumbers, tomatoes, onions, bell peppers, feta cheese, olives.",
        badges: ["vegetarian"],
      },
      {
        name: "Mix Green",
        price: "200",
        description: "Tomatoes, cucumbers, lettuce, and rocca. Served with a vinaigrette.",
        badges: ["vegetarian", "chef"],
      },
      {
        name: "Fattoush",
        price: "250",
        description:
          "Tomatoes, lettuce, cucumbers, onions, and crispy bread. Served with a pomegranate salad dressing.",
        badges: ["vegetarian"],
      },
      {
        name: "Tabbouleh",
        price: "250",
        description: "Parsley, tomatoes, onions, olive oil, burghul, and lemon.",
        badges: ["vegetarian", "chef"],
      },
    ],
  },
  {
    id: "grill-experience",
    label: "The Grill Experience",
    note: SIDE_NOTE,
    items: [
      {
        name: "Grill's Tableya - Tray",
        price: "2000",
        description:
          "A sharing tray of 1 whole charcoal-roasted chicken, 1/4 kofta, 1/4 shish tawook, hawawshi, fatta rice, mombar, and mahshi. For 3 to 5 persons.",
        isNew: true,
      },
      {
        name: "Lamb Kebab",
        price: "800",
        description: "Prime Barqi lamb cubes marinated with onions and olive oil, grilled to perfection.",
        isNew: true,
      },
      {
        name: "Lamb Chops",
        price: "800",
        description: "Prime lamb chops marinated in onions, olive oil, and our special spice mix.",
        badges: ["chef"],
        isNew: true,
      },
      {
        name: "Tarb",
        price: "550",
        description:
          "Authentic Egyptian delicacy: a brochette of prime minced beef and lamb with special spices, wrapped in a thin caramelized layer of lamb fat (check availability).",
        badges: ["chef"],
        isNew: true,
      },
      {
        name: "Chicken Kofta",
        price: "450",
        description: "Ground chicken spiced and grilled on charcoal.",
        isNew: true,
      },
      {
        name: "Chef's Mix Grill Selection",
        price: "660",
        description: "Choice of 3: kebab, kofta, shish tawook, or quails.",
        badges: ["bestseller", "chef"],
      },
      {
        name: "Beef Kebab",
        price: "600",
        description: "Prime beef cubes marinated in our special sauce.",
      },
      {
        name: "Mix Kebab & Kofta",
        price: "550",
        description: "Prime beef kebab and kofta grilled to perfection.",
        badges: ["bestseller"],
      },
      {
        name: "Chargrilled Kofta",
        price: "450",
        description: "Brochette of prime minced beef and lamb, spiced with our special blend of Egyptian spices.",
        badges: ["bestseller"],
      },
      {
        name: "BBQ Boneless Chicken",
        price: "450",
        description: "Half chicken marinated in thyme, vinegar, and olive oil.",
        badges: ["bestseller", "chef"],
      },
      {
        name: "Charcoal Rotisserie Chicken",
        price: "450",
        description:
          "Half bone-in chicken marinated in thyme, vinegar, and olive oil, slow cooked in our famous charcoal roaster.",
        badges: ["bestseller", "chef"],
      },
      {
        name: "Pair of Jumbo Quails",
        price: "500",
        description: "Two tender jumbo grilled quails (500-600g) marinated in thyme and our secret recipe.",
        badges: ["bestseller", "chef"],
      },
      {
        name: "Charcoal Shish Tawook",
        price: "450",
        description: "Prime chicken breast cubes marinated in yogurt, tomato sauce, onions, and olive oil.",
        badges: ["bestseller"],
      },
    ],
  },
  {
    id: "mains",
    label: "Signature Mains",
    note: SIDE_NOTE,
    items: [
      {
        name: "Stuffed Pigeon with Rice & Chicken Liver",
        price: "350",
        description: "Oven-roasted pigeon stuffed with rice and chicken liver, served with molokheya and rice.",
        isNew: true,
      },
      {
        name: "Chicken Teriyaki",
        price: "450",
        description: "Grilled chicken breast glazed with teriyaki sauce.",
        isNew: true,
      },
      {
        name: "Fillet Mignon",
        price: "840",
        description:
          "Premium beef fillet, served with one side and your favorite choice of sauce: black pepper, blue cheese, or mustard.",
        badges: ["bestseller", "chef"],
      },
      {
        name: "Chicken Pane",
        price: "420",
        description: "Breaded fried chicken breast.",
        badges: ["bestseller"],
      },
      { name: "Escalope Pane", price: "480", description: "Breaded fried beef escalope." },
      {
        name: "Grilled Salmon",
        price: "780",
        description: "Grilled salmon served with cream sauce.",
        badges: ["chef"],
      },
      {
        name: "Chicken Fattah Shami",
        price: "430",
        description: "Rice, chicken cubes, garlic, yogurt, and crunchy bread.",
        badges: ["bestseller"],
      },
      {
        name: "Meat Fattah",
        price: "500",
        description:
          "Traditional Egyptian fattah with rice, meat cubes, and crunchy bread, served with our special garlic tomato sauce.",
        badges: ["chef"],
      },
      {
        name: "Eggplant Vegetarian Fattah",
        price: "300",
        description: "Rice and cubes of eggplant with crunchy bread, served with our special garlic tomato sauce.",
        badges: ["vegetarian"],
      },
      { name: "Spaghetti Bolognese", price: "360", description: "Spaghetti with minced beef and bolognese sauce." },
      {
        name: "Penne Arabiata",
        price: "300",
        description: "Penne with a fresh spicy tomato sauce.",
        badges: ["spicy", "vegetarian"],
      },
      { name: "Chicken Fettucine", price: "360", description: "Fettucine with chicken breast and creamy sauce." },
    ],
  },
  {
    id: "wraps",
    label: "Grilled Wraps",
    note: "All wraps come with a side of fried potatoes.",
    items: [
      {
        name: "Oriental Steak Wrap",
        price: "360",
        description: "Specially marinated beef tenderloin, served in our fresh wrap.",
      },
      {
        name: "Shish Tawook Wrap",
        price: "260",
        description: "Tender chicken cubes with garlic sauce, tomatoes, and pickles.",
      },
      {
        name: "Kofta Wrap",
        price: "260",
        description: "Our famous kofta with tahini and tomatoes.",
        badges: ["bestseller"],
      },
      {
        name: "Chicken Pane Wrap",
        price: "260",
        description: "Breaded fried chicken breast with our special sauce.",
      },
    ],
  },
  {
    id: "kids",
    label: "Kids Menu",
    items: [
      {
        name: "Molokheya, Rice with Chicken",
        price: "200",
        description: "Traditional Egyptian rice with molokheya and chicken pieces.",
      },
      {
        name: "Chicken Strips",
        price: "180",
        description: "Fried breaded chicken strips, served with fried potato and ketchup.",
      },
      {
        name: "Kofta Sandwich",
        price: "180",
        description:
          "Kids portion of our famous kofta, wrapped in fresh bread from our brick oven with tahini and tomatoes, served with fried potatoes.",
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      { name: "Creme Caramel", price: "160" },
      { name: "Rice Pudding", price: "160" },
    ],
  },
  {
    id: "drinks",
    label: "Coffee, Juice & Soft Drinks",
    items: [
      { name: "Espresso", price: "120" },
      { name: "Cappuccino / Caffe Latte", price: "140" },
      { name: "Tea", price: "100", description: "Black or green tea with mint." },
      { name: "Seasonal Fresh Fruit Juice", price: "160" },
      { name: "Lemon with Mint", price: "160" },
      { name: "Coca-Cola / Sprite / Fanta", price: "105" },
      { name: "Tonic / Soda Water", price: "105" },
      { name: "Fairouz (Flavoured Malt)", price: "105" },
      { name: "Birell (Non-Alcoholic Beer)", price: "120" },
      { name: "Schweppes", price: "105" },
      { name: "Red Bull / Red Bull Sugar Free", price: "140" },
      { name: "Mineral Water (Small)", price: "100" },
    ],
  },
  {
    id: "bar",
    label: "Wine, Beer & Spirits",
    items: [
      { name: "Shahrazade (White, Red, Rose)", price: "200 EGP glass / 800 EGP bottle" },
      { name: "Omar Khayyam (White, Red, Rose)", price: "200 EGP glass / 800 EGP bottle" },
      { name: "Beausoleil (White, Red)", price: "220 EGP glass / 1000 EGP bottle" },
      { name: "Jardin Du Nil (White, Red)", price: "1200 EGP bottle" },
      { name: "Cape Bay (White, Red)", price: "1300 EGP bottle" },
      { name: "Chateau De Grand Ville (White, Red)", price: "1300 EGP bottle" },
      { name: "Stella", price: "150" },
      { name: "Sakara", price: "150" },
      { name: "Heineken", price: "165" },
      { name: "Heineken SOL", price: "200" },
      { name: "Desperados", price: "210" },
      { name: "Blue40 Freeze", price: "195" },
      { name: "Butler's", price: "195" },
      { name: "Gin Tonic", price: "200" },
      { name: "Shot Vodka", price: "200" },
      { name: "Shot Whisky", price: "200" },
    ],
  },
];

export const signatureDishSlugs = [
  "Fillet Mignon",
  "Lamb Chops",
  "Tarb",
  "Charcoal Rotisserie Chicken",
  "Grill's Tableya - Tray",
] as const;

export function findItem(name: string): { item: MenuItem; category: MenuCategory } | undefined {
  for (const category of menu) {
    const item = category.items.find((entry) => entry.name === name);
    if (item) return { item, category };
  }
  return undefined;
}
