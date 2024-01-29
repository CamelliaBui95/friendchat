const { Category, Interest } = require("./models/interest");

const categories = [
  { label: "Sport/Physical" },
  { label: "Craft/Creative" },
  { label: "Mental" },
  { label: "Musical" },
  { label: "Collecting" },
  { label: "Food/Drink" },
  { label: "Games/Puzzles" },
  {
    label: "Model/Woodworking",
  },
  { label: "Animals" },
];

const interests = [
  { name: "Soccer", category: categories[0].label },
  { name: "Basketball", category: categories[0].label },
  { name: "Yoga", category: categories[0].label },
  { name: "Pilates", category: categories[0].label },
  { name: "Swimming", category: categories[0].label },
  { name: "Jogging", category: categories[0].label },
  { name: "Gardening", category: categories[0].label },
  { name: "Traveling", category: categories[0].label },
  { name: "Candle making", category: categories[1].label },
  { name: "Photography", category: categories[1].label },
  { name: "Embroidery", category: categories[1].label },
  { name: "Acting", category: categories[1].label },
  { name: "Scrapbooking", category: categories[1].label },
  { name: "Writing", category: categories[1].label },
  { name: "Reading", category: categories[2].label },
  { name: "Journaling", category: categories[2].label },
  { name: "Blogging", category: categories[1].label },
  { name: "Languages", category: categories[2].label },
  { name: "Singing", category: categories[3].label },
  { name: "Piano", category: categories[3].label },
  { name: "Violin", category: categories[3].label },
  { name: "Guitar", category: categories[3].label },
  { name: "Cello", category: categories[3].label },
  { name: "Figurines", category: categories[4].label },
  { name: "Stamps", category: categories[4].label },
  { name: "Dolls", category: categories[4].label },
  { name: "Stuffed Animals", category: categories[4].label },
  { name: "Mugs/Cups", category: categories[4].label },
  { name: "Vases/Ceramics", category: categories[4].label },
  { name: "Books", category: categories[4].label },
  { name: "Cooking", category: categories[5].label },
  { name: "Baking", category: categories[5].label },
  { name: "Vegan Cooking/Baking", category: categories[5].label },
  { name: "Vegetarian Cooking/Baking", category: categories[5].label },
  { name: "Cocktails", category: categories[5].label },
  { name: "Wine/Beer", category: categories[5].label },
  { name: "Coffee", category: categories[5].label },
  { name: "Tea", category: categories[5].label },
  { name: "Fastfood", category: categories[5].label },
  { name: "Italian Cuisine", category: categories[5].label },
  { name: "French Cuisine", category: categories[5].label },
  { name: "Asian Cuisine", category: categories[5].label },
  { name: "Indian Food", category: categories[5].label },
  { name: "Desserts/Pastries", category: categories[5].label },
  { name: "Online Games", category: categories[6].label },
  { name: "Sudoku", category: categories[6].label },
  { name: "Puzzles", category: categories[6].label },
  { name: "Chess", category: categories[6].label },
  { name: "Video Games", category: categories[6].label },
  { name: "Board Games", category: categories[6].label },
  { name: "Lego", category: categories[7].label },
  { name: "Wood Carving", category: categories[7].label },
  { name: "Trains", category: categories[7].label },
  { name: "Cars", category: categories[7].label },
  { name: "Dogs", category: categories[8].label },
  { name: "Cats", category: categories[8].label },
  { name: "Birds", category: categories[8].label },
  { name: "Horses", category: categories[8].label },
  { name: "Reptiles", category: categories[8].label },
  { name: "Fish", category: categories[8].label },
  { name: "Insects", category: categories[8].label },
];

const init = async () => {
  const categoryCollection = await Category.find({});
  if (categoryCollection.length === 0) {
    await initCategory().then(async (result) => {
      await initInterest();
    });
  }
  
};

const initCategory = async () => {
  return await Category.deleteMany({}).then(async (result) => {
    return await Category.insertMany(categories);
  });
};

const initInterest = async () => {
  const categoryMap = await getCategoryMap();

  await Interest.deleteMany({});

  for (let interest of interests) {
    await Interest.create({
      name: interest.name,
      category: categoryMap[interest.category],
    });
  }
};

const getCategoryMap = async () => {
  const categories = await Category.find().then((result) => {
    const map = {};
    for (let category of result) map[category.label] = category._id;

    return map;
  });

  return categories;
};

module.exports = { init };
