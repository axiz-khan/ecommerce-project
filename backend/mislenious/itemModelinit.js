const Item=require("../models/itemModels.js");
const allItem=new Item([
    {
      "name": "Japanese Maple Bonsai",
      "actual_price": 150,
      "discount_percentage": 20,
      "rate": 4.8,
      "stock": 10,
      "discription": "A beautiful Japanese Maple Bonsai tree with vibrant red leaves, perfect for indoor and outdoor decoration."
    },
    {
      "name": "Chinese Elm Bonsai",
      "actual_price": 120,
      "discount_percentage": 10,
      "rate": 4.5,
      "stock": 15,
      "discription": "A hardy and adaptable bonsai tree with small green leaves and excellent branching structure."
    },
    {
      "name": "Ficus Bonsai",
      "actual_price": 200,
      "discount_percentage": 30,
      "rate": 4.7,
      "stock": 12,
      "discription": "A classic bonsai tree with aerial roots and glossy green leaves, perfect for beginners."
    },
    {
      "name": "Juniper Bonsai",
      "actual_price": 180,
      "discount_percentage": 15,
      "rate": 4.6,
      "stock": 8,
      "discription": "A popular bonsai species with needle-like foliage and an elegant, windswept design."
    },
    {
      "name": "Pine Bonsai",
      "actual_price": 250,
      "discount_percentage": 25,
      "rate": 4.9,
      "stock": 5,
      "discription": "A timeless bonsai with evergreen needles and a rugged, ancient appearance."
    },
    {
      "name": "Azalea Bonsai",
      "actual_price": 170,
      "discount_percentage": 20,
      "rate": 4.8,
      "stock": 7,
      "discription": "A flowering bonsai that produces stunning pink, red, or white blossoms in spring."
    },
    {
      "name": "Olive Bonsai",
      "actual_price": 190,
      "discount_percentage": 15,
      "rate": 4.6,
      "stock": 9,
      "discription": "A Mediterranean-style bonsai with silvery-green leaves and a unique twisted trunk."
    },
    {
      "name": "Willow Leaf Ficus Bonsai",
      "actual_price": 140,
      "discount_percentage": 10,
      "rate": 4.4,
      "stock": 11,
      "discription": "A fast-growing bonsai with long, narrow leaves and excellent air purification qualities."
    },
    {
      "name": "Cedar Bonsai",
      "actual_price": 220,
      "discount_percentage": 20,
      "rate": 4.7,
      "stock": 6,
      "discription": "A majestic bonsai species with soft needles and a strong, upright trunk."
    },
    {
      "name": "Trident Maple Bonsai",
      "actual_price": 175,
      "discount_percentage": 15,
      "rate": 4.7,
      "stock": 8,
      "discription": "A beautiful deciduous bonsai tree with three-lobed leaves that turn fiery colors in fall."
    },
    {
      "name": "Japanese Black Pine Bonsai",
      "actual_price": 230,
      "discount_percentage": 20,
      "rate": 4.9,
      "stock": 4,
      "discription": "A striking bonsai with dark green needles and an elegant, aged look."
    },
    {
      "name": "Boxwood Bonsai",
      "actual_price": 130,
      "discount_percentage": 10,
      "rate": 4.5,
      "stock": 14,
      "discription": "A dense, evergreen bonsai with small, glossy leaves and a compact growth habit."
    },
    {
      "name": "Ginseng Ficus Bonsai",
      "actual_price": 160,
      "discount_percentage": 25,
      "rate": 4.6,
      "stock": 10,
      "discription": "A unique bonsai with bulbous roots and lush green foliage, easy to maintain."
    },
    {
      "name": "Satsuki Azalea Bonsai",
      "actual_price": 210,
      "discount_percentage": 20,
      "rate": 4.8,
      "stock": 6,
      "discription": "A spectacular bonsai with large, vibrant flowers that bloom in late spring."
    },
    {
      "name": "Bald Cypress Bonsai",
      "actual_price": 180,
      "discount_percentage": 15,
      "rate": 4.7,
      "stock": 7,
      "discription": "A rare bonsai that thrives in wet conditions and produces feathery, soft foliage."
    },
    {
      "name": "Serissa Bonsai",
      "actual_price": 140,
      "discount_percentage": 10,
      "rate": 4.4,
      "stock": 10,
      "discription": "Also known as 'Snow Rose,' this bonsai blooms with tiny white flowers throughout the year."
    },
    {
      "name": "Brazilian Rain Tree Bonsai",
      "actual_price": 200,
      "discount_percentage": 25,
      "rate": 4.8,
      "stock": 5,
      "discription": "A tropical bonsai with delicate, folding leaves and an artistic trunk shape."
    },
    {
      "name": "Desert Rose Bonsai",
      "actual_price": 190,
      "discount_percentage": 20,
      "rate": 4.7,
      "stock": 6,
      "discription": "A bonsai with thick, succulent-like stems and stunning pink or red trumpet-shaped flowers."
    },
    {
      "name": "Hawaiian Umbrella Bonsai",
      "actual_price": 160,
      "discount_percentage": 15,
      "rate": 4.5,
      "stock": 9,
      "discription": "A beginner-friendly bonsai with small, umbrella-like leaves and a tropical look."
    },
    {
      "name": "Japanese White Pine Bonsai",
      "actual_price": 250,
      "discount_percentage": 20,
      "rate": 4.9,
      "stock": 3,
      "discription": "A rare and valuable bonsai with soft needles and a classic aged appearance."
    }
  ]
  )
    await allItem.save();
    console.log("Item model is successfully ")
