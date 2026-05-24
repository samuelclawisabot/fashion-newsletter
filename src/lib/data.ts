export interface IssueData {
  no: string;
  date: string;
  dateLong: string;
  vol: string;
  tagline: string;
  editorNote: string;
}

export interface FeaturedItem {
  kicker: string;
  name: string;
  category: string;
  blurb: string;
  why: string;
  price: string;
  where: string;
  url: string;
  image?: string;
}

export interface PieceItem {
  kicker: string;
  name: string;
  category: string;
  blurb: string;
  price: string;
  where: string;
  url: string;
  image?: string;
}

export interface OutfitItem {
  name: string;
  where: string;
  price: string;
  role: string;
  url?: string;
  image?: string;
}

export interface OutfitData {
  name: string;
  subtitle: string;
  why: string;
  items: OutfitItem[];
  image?: string;
}

export interface NewsletterData {
  issue: IssueData;
  featured: FeaturedItem;
  pieces: PieceItem[];
  outfit: OutfitData;
}

export const SAMPLE_DATA: NewsletterData = {
  issue: {
    no: "№ 142",
    date: "TUE · MAY 26 · 2026",
    dateLong: "Tuesday, May 26th, 2026",
    vol: "VOL. III",
    tagline: "the daily drop",
    editorNote: "Today: the cardigan that started a group chat war.",
  },
  featured: {
    kicker: "TODAY'S OBSESSION",
    name: "The 'Whatever' Cardigan",
    category: "Oversized cotton cardigan",
    blurb:
      "Slouchy, ribbed, possibly stolen from your dad. We're calling it the cardigan of the summer-into-fall transition, that mythical six-week window when nobody knows how to dress.",
    why: "Wear it open over literally anything. Wear it closed and pretend you have a personality. Either works.",
    price: "$148",
    where: "COS",
    url: "#featured-buy",
  },
  pieces: [
    {
      kicker: "01 · ALSO IN",
      name: "Wide-Leg Carpenter Jean",
      category: "Mid-rise denim",
      blurb:
        "The pant your Pinterest board has been begging for. Cuts the line at the ankle so you don't look like you borrowed them.",
      price: "$98",
      where: "Madewell",
      url: "#piece-1",
    },
    {
      kicker: "02 · ALSO IN",
      name: "Pointy Mesh Flat",
      category: "Knit ballet flat",
      blurb:
        "Yes, ballet flats are still happening. No, you don't have to like it. These ones breathe, which is a plus in May.",
      price: "$62",
      where: "Mango",
      url: "#piece-2",
    },
    {
      kicker: "03 · ALSO IN",
      name: "Tiny Frame Sunglasses",
      category: "Wire micro-shades",
      blurb:
        "Functionally useless against the sun, emotionally devastating in a selfie. We're not making the rules.",
      price: "$34",
      where: "Urban Outfitters",
      url: "#piece-3",
    },
    {
      kicker: "04 · ALSO IN",
      name: "Crochet Bucket Bag",
      category: "Handheld bag",
      blurb:
        "Holds keys, phone, lipgloss, three vibes. Anything else is asking too much of it.",
      price: "$76",
      where: "Aritzia",
      url: "#piece-4",
    },
    {
      kicker: "05 · ALSO IN",
      name: "Ribbed Tube Top",
      category: "Stretch knit top",
      blurb:
        "Pretend it's a top. Pretend it's a base layer. Pretend you didn't spend $24 on something that's mostly air.",
      price: "$24",
      where: "Brandy Melville",
      url: "#piece-5",
    },
  ],
  outfit: {
    name: "Look № 04",
    subtitle: "A long lunch, possibly into a long evening",
    why: "The cardigan does the heavy lifting; the jeans give it somewhere to sit. The flats keep it from getting too 'I'm running errands,' and the bag is doing all the actual work. It's the kind of outfit that photographs better than it deserves to.",
    items: [
      { name: "The 'Whatever' Cardigan", where: "COS", price: "$148", role: "the hero" },
      { name: "Wide-Leg Carpenter Jean", where: "Madewell", price: "$98", role: "the base" },
      { name: "Pointy Mesh Flat", where: "Mango", price: "$62", role: "the feet" },
      { name: "Crochet Bucket Bag", where: "Aritzia", price: "$76", role: "the move" },
      { name: "Tiny Frame Sunglasses", where: "UO", price: "$34", role: "the wink" },
      { name: "Ribbed Tube Top", where: "Brandy", price: "$24", role: "the layer" },
    ],
  },
};
