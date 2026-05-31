export type Locale = "en" | "fr";

export const locales: Locale[] = ["en", "fr"];

export const defaultLocale: Locale = "en";

type Dictionary = {
  nav: {
    search: string;
    discover: string;
    explore: string;
    collections: string;
    glossary: string;
    paths: string;
    guide: string;
    regions: string;
    home: string;
  };
  footer: {
    exploreGroup: string;
    placesGroup: string;
    learnGroup: string;
    allCollections: string;
    france: string;
  };
  language: {
    label: string;
  };
  home: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
    searchPlaceholder: string;
    featured: string;
    collection: string;
    rareFind: string;
    swissCheese: string;
    tropicalCanopies: string;
    tropicalCanopiesDesc: string;
    pitcherPlant: string;
    popularLabel: string;
    potdEyebrow: string;
    potdTitle: string;
    potdCta: string;
    randomTitle: string;
    randomDesc: string;
    randomCta: string;
    randomLoading: string;
    recentTitle: string;
    recentSubtitle: string;
    browseCollections: string;
  };
  searchBar: {
    label: string;
    button: string;
    placeholder: string;
  };
  search: {
    eyebrow: string;
    title: string;
    subtitle: string;
    loading: string;
    errorTitle: string;
    errorDesc: string;
    emptyTitle: string;
    emptyDesc: string;
  };
  explore: {
    eyebrow: string;
    title: string;
    subtitle: string;
    loading: string;
    errorTitle: string;
    errorDesc: string;
    categories: string;
  };
  collections: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
    open: string;
    backToAll: string;
    keepExploring: string;
  };
  glossary: {
    eyebrow: string;
    title: string;
    subtitle: string;
    examplesLabel: string;
    conceptsLabel: string;
    collectionLabel: string;
    terms: {
      term: string;
      definition: string;
      examples?: string[];
      concepts?: string[];
      collectionSlug?: string;
    }[];
  };
  card: {
    unknown: string;
    unnamed: string;
    family: string;
    genus: string;
    viewDetails: string;
    fallbackAlt: string;
  };
  detail: {
    profile: string;
    family: string;
    genus: string;
    author: string;
    year: string;
    distribution: string;
    unknown: string;
    unnamed: string;
    back: string;
    relatedTitle: string;
    relatedSubtitle: string;
    whyTitle: string;
    contextTitle: string;
    contextSubtitle: string;
    traitsTitle: string;
    viewFamily: string;
    sameGenus: string;
    sameFamily: string;
    conditionsTitle: string;
    conditionsSubtitle: string;
    seasonTitle: string;
    seasonSubtitle: string;
    noConditions: string;
    light: string;
    humidity: string;
    ph: string;
    temperature: string;
    sun: string;
    water: string;
    soil: string;
    matureSize: string;
    growthForm: string;
    growthHabit: string;
    growthRate: string;
    toxicity: string;
    flowerColor: string;
    foliageColor: string;
    bloomMonths: string;
    growthMonths: string;
    fruitMonths: string;
    taxonomyTitle: string;
    taxonomySubtitle: string;
    subspecies: string;
    varieties: string;
  };
  months: string[];
  traitLabels: Record<string, string>;
  traitsPage: {
    eyebrow: string;
    subtitle: string;
  };
  families: {
    eyebrow: string;
    speciesCount: string;
    representative: string;
    related: string;
    intro: string;
    explore: string;
    loadMore: string;
    loading: string;
    showing: string;
  };
  guide: {
    eyebrow: string;
    title: string;
    subtitle: string;
    navTitle: string;
    lexiconTitle: string;
    steps: { emoji: string; title: string; text: string }[];
    lexicon: { term: string; text: string }[];
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };
  discover: {
    eyebrow: string;
    title: string;
    subtitle: string;
    trendingTitle: string;
    trendingSubtitle: string;
    seasonalTitle: string;
    seasonalSubtitle: string;
    seasonNow: string;
    seasons: { key: string; emoji: string; title: string; desc: string }[];
    featuredTitle: string;
    featuredSubtitle: string;
    traitsTitle: string;
    traitsSubtitle: string;
  };
  stats: {
    species: string;
    genera: string;
    families: string;
  };
  pathsMeta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    plants: string;
    minutes: string;
    start: string;
    step: string;
    backToAll: string;
    relatedTitle: string;
  };
  pathCatalog: Record<string, { title: string; intro: string }>;
  collectionExtra: Record<string, { intro: string; facts: string[] }>;
  regionsMeta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    representative: string;
    climateTitle: string;
    relatedTitle: string;
    subregionsTitle: string;
    exploreRegion: string;
    collectionsTitle: string;
    noticeApprox: string;
    noticeNone: string;
    showing: string;
    loadMore: string;
    loading: string;
    realData: string;
  };
  regionCatalog: Record<
    string,
    { name: string; overview: string; climate: string }
  >;
  rarity: {
    Common: string;
    Uncommon: string;
    Rare: string;
    Exotic: string;
  };
  catalog: Record<string, { title: string; description: string }>;
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      search: "Search",
      discover: "Discover",
      explore: "Explore",
      collections: "Collections",
      glossary: "Glossary",
      paths: "Paths",
      guide: "Guide",
      regions: "Regions",
      home: "Home",
    },
    footer: {
      exploreGroup: "Explore",
      placesGroup: "By region",
      learnGroup: "Learn",
      allCollections: "All collections",
      france: "France",
    },
    language: { label: "Language" },
    home: {
      eyebrow: "FlorAtlas",
      title: "Your botanical atlas",
      subtitle:
        "Map the plant kingdom — explore species, families and regions through open botanical data.",
      cta: "Start exploring",
      searchPlaceholder: "Search for a plant or scientific name",
      featured: "Featured",
      collection: "Collection",
      rareFind: "Rare find",
      swissCheese: "Swiss cheese plant",
      tropicalCanopies: "Tropical canopies",
      tropicalCanopiesDesc: "Deep greens, lush textures",
      pitcherPlant: "Tropical pitcher plant",
      popularLabel: "Popular searches",
      potdEyebrow: "Plant of the day",
      potdTitle: "Today's botanical highlight",
      potdCta: "Discover this plant",
      randomTitle: "Feeling curious?",
      randomDesc: "Let FlorAtlas surprise you with a random species.",
      randomCta: "Surprise me",
      randomLoading: "Finding a plant",
      recentTitle: "Recently viewed",
      recentSubtitle: "Pick up your exploration where you left off.",
      browseCollections: "Browse collections",
    },
    searchBar: {
      label: "Search plants",
      button: "Start exploring",
      placeholder: "Search for a plant or scientific name",
    },
    search: {
      eyebrow: "Search",
      title: "Discover plants by name",
      subtitle: "Explore common or scientific names with live botanical data.",
      loading: "Searching flora",
      errorTitle: "Search unavailable",
      errorDesc: "We could not load plants right now.",
      emptyTitle: "No plants found",
      emptyDesc: "Try another keyword or a scientific name.",
    },
    explore: {
      eyebrow: "Explore",
      title: "Curated botanical collections",
      subtitle: "Discover themed selections with a premium editorial touch.",
      loading: "Building collections",
      errorTitle: "Collections unavailable",
      errorDesc: "We could not load the botanical collections right now.",
      categories: "Categories",
    },
    collections: {
      eyebrow: "Collections",
      title: "Editorial botanical narratives",
      subtitle:
        "Curated journeys through the plant kingdom — each collection is a doorway into a new botanical world.",
      cta: "Open collection",
      open: "Open collection",
      backToAll: "All collections",
      keepExploring: "Keep exploring",
    },
    glossary: {
      eyebrow: "Glossary",
      title: "Botanical glossary",
      subtitle:
        "The essential vocabulary to read plant data like a botanist.",
      examplesLabel: "Examples",
      conceptsLabel: "Related concepts",
      collectionLabel: "Related collection",
      terms: [
        {
          term: "Family",
          definition:
            "A taxonomic rank grouping related genera, often sharing flower or fruit structures.",
          examples: ["Rose", "Orchid", "Bamboo"],
          concepts: ["Genus", "Species"],
        },
        {
          term: "Genus",
          definition:
            "A rank below family grouping closely related species; the first part of a scientific name.",
          examples: ["Aloe", "Ficus"],
          concepts: ["Family", "Scientific name"],
        },
        {
          term: "Species",
          definition:
            "The basic unit of classification, describing organisms that can interbreed.",
          concepts: ["Genus", "Scientific name"],
        },
        {
          term: "Scientific name",
          definition:
            "A two-part Latin name (binomial) made of the genus and the species epithet.",
          concepts: ["Genus", "Species"],
        },
        {
          term: "Annual",
          definition:
            "A plant that completes its life cycle within a single growing season.",
          concepts: ["Perennial"],
        },
        {
          term: "Perennial",
          definition:
            "A plant that lives for more than two years, regrowing each season.",
          examples: ["Lavender", "Fern"],
          concepts: ["Annual"],
        },
        {
          term: "Succulent",
          definition:
            "A plant with thick, fleshy tissues adapted to store water in arid climates.",
          examples: ["Aloe", "Agave", "Cactus"],
          concepts: ["Low Water", "Arid climate"],
          collectionSlug: "desert-plants",
        },
        {
          term: "Native distribution",
          definition:
            "The regions where a species naturally occurs without human introduction.",
          concepts: ["Family", "Genus"],
        },
      ],
    },
    card: {
      unknown: "Unknown plant",
      unnamed: "Unnamed species",
      family: "Family:",
      genus: "Genus:",
      viewDetails: "View details →",
      fallbackAlt: "Botanical illustration",
    },
    detail: {
      profile: "Botanical profile",
      family: "Family",
      genus: "Genus",
      author: "Author",
      year: "Year",
      distribution: "Distribution",
      unknown: "Unknown plant",
      unnamed: "Unnamed species",
      back: "Back to discovery",
      relatedTitle: "Related plants",
      relatedSubtitle: "Other species from the same genus.",
      whyTitle: "Why this plant matters",
      contextTitle: "Botanical context",
      contextSubtitle: "Where this species sits in the tree of life.",
      traitsTitle: "Traits",
      viewFamily: "Explore family",
      sameGenus: "Same genus",
      sameFamily: "Same family",
      conditionsTitle: "Growing conditions",
      conditionsSubtitle: "How and where this plant prefers to grow.",
      seasonTitle: "Seasonality",
      seasonSubtitle: "When this plant grows, blooms and fruits.",
      noConditions: "No detailed growing data is available for this species yet.",
      light: "Light",
      humidity: "Atmospheric humidity",
      ph: "Soil pH",
      temperature: "Temperature",
      sun: "Sun exposure",
      water: "Water needs",
      soil: "Soil",
      matureSize: "Mature size",
      growthForm: "Growth form",
      growthHabit: "Growth habit",
      growthRate: "Growth rate",
      toxicity: "Toxicity",
      flowerColor: "Flower color",
      foliageColor: "Foliage",
      bloomMonths: "Blooming",
      growthMonths: "Growing",
      fruitMonths: "Fruiting",
      taxonomyTitle: "Subspecies & varieties",
      taxonomySubtitle: "Recognized variations within this species.",
      subspecies: "Subspecies",
      varieties: "Varieties",
    },
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    traitLabels: {
      tropical: "Tropical",
      lowWater: "Low Water",
      fullSun: "Full Sun",
      houseplant: "Houseplant",
      toxic: "Toxic",
      coldResistant: "Cold Resistant",
      edible: "Edible",
      flowering: "Flowering",
    },
    traitsPage: {
      eyebrow: "Trait",
      subtitle: "Plants sharing this botanical trait.",
    },
    families: {
      eyebrow: "Botanical family",
      speciesCount: "documented species",
      representative: "Representative plants",
      related: "Other families to explore",
      intro:
        "A botanical family groups related genera that share defining traits. Browse representative species below.",
      explore: "Explore family",
      loadMore: "Load more species",
      loading: "Loading",
      showing: "Showing",
    },
    guide: {
      eyebrow: "Getting started",
      title: "How to explore FlorAtlas",
      subtitle:
        "A simple guide to navigating the app and understanding botanical terms.",
      navTitle: "Navigating the app",
      lexiconTitle: "Understanding the words",
      steps: [
        {
          emoji: "✨",
          title: "Home",
          text: "Tap the FlorAtlas logo anytime to return here. Plant of the day, seasonal highlights, trending species and a random surprise await.",
        },
        {
          emoji: "🧭",
          title: "Paths",
          text: "Follow guided, story-like journeys through a theme — like the flora of France or surviving the desert — one plant at a time.",
        },
        {
          emoji: "🗂️",
          title: "Explore",
          text: "Browse curated themes (desert, tropical, Japan…). Each collection is a mini exhibition with facts and featured plants.",
        },
        {
          emoji: "🗺️",
          title: "Regions",
          text: "Explore flora by geography — France, Europe, Mediterranean and more.",
        },
        {
          emoji: "🔍",
          title: "Search",
          text: "Use the search icon to find a plant by its common or scientific name. Try 'Rose' or 'Monstera'.",
        },
        {
          emoji: "🪴",
          title: "Plant pages",
          text: "Every plant links to its family, genus, traits and similar plants — so you can keep exploring without dead ends.",
        },
      ],
      lexicon: [
        {
          term: "Family",
          text: "A large group of related plants that share key features (e.g. Rosaceae includes roses, apples and cherries).",
        },
        {
          term: "Genus",
          text: "A smaller group inside a family. It is the first word of a scientific name (e.g. Rosa in Rosa gallica).",
        },
        {
          term: "Species",
          text: "A single, specific kind of plant. It is the full two-word scientific name (e.g. Rosa gallica).",
        },
        {
          term: "Subspecies & varieties",
          text: "Smaller variations within a species — slightly different forms found in nature or cultivation.",
        },
        {
          term: "Traits",
          text: "Practical tags like Tropical, Low Water or Toxic. Click any trait to find plants that share it.",
        },
        {
          term: "Rarity",
          text: "A playful indicator (Common to Exotic) to make browsing more fun. It is not an official conservation status.",
        },
      ],
      ctaTitle: "Ready to explore?",
      ctaText: "Jump into the Discover hub and let curiosity lead the way.",
      ctaButton: "Start exploring",
    },
    discover: {
      eyebrow: "Discover",
      title: "Wander through the plant kingdom",
      subtitle:
        "No need to know a name — let curiosity guide your exploration.",
      trendingTitle: "Trending plants",
      trendingSubtitle: "Species capturing attention right now.",
      seasonalTitle: "Seasonal highlights",
      seasonalSubtitle: "A curated selection for the current season.",
      seasonNow: "In season now",
      seasons: [
        {
          key: "spring",
          emoji: "🌸",
          title: "Spring Blooms",
          desc: "Flowers waking up the garden after winter.",
        },
        {
          key: "summer",
          emoji: "🌵",
          title: "Summer Drought Survivors",
          desc: "Plants that thrive through heat and dry spells.",
        },
        {
          key: "winter",
          emoji: "🌲",
          title: "Winter Evergreens",
          desc: "Foliage that stays green through the cold.",
        },
      ],
      featuredTitle: "Featured collections",
      featuredSubtitle: "Editorial journeys through botanical worlds.",
      traitsTitle: "Browse by trait",
      traitsSubtitle: "Filter the living world by what matters to you.",
    },
    stats: {
      species: "Species",
      genera: "Genera",
      families: "Families",
    },
    pathsMeta: {
      eyebrow: "Botanical paths",
      title: "Guided botanical journeys",
      subtitle:
        "Curated narrative experiences through the most fascinating plants.",
      plants: "plants",
      minutes: "min",
      start: "Start the journey",
      step: "Step",
      backToAll: "All paths",
      relatedTitle: "Continue your journey",
    },
    pathCatalog: {
      desert: {
        title: "Surviving the Desert",
        intro:
          "Travel through the world's driest landscapes and meet the plants that thrive where almost nothing else can.",
      },
      japan: {
        title: "Discover Japan Through Plants",
        intro:
          "From cherry blossoms to ancient maples, explore the refined botanical heritage of Japan.",
      },
      tropical: {
        title: "Tropical Giants",
        intro:
          "Step into the humid canopy and discover the bold, oversized foliage of the tropics.",
      },
      carnivorous: {
        title: "Carnivores of the Wild",
        intro:
          "Meet the plants that turned the tables on the animal kingdom with ingenious traps.",
      },
      france: {
        title: "Flora of France",
        intro:
          "From Atlantic coasts to alpine meadows, explore the rich diversity of plants found across France.",
      },
      provence: {
        title: "Gardens of Provence",
        intro:
          "Wander through sun-drenched landscapes of lavender and Mediterranean plants emblematic of southern France.",
      },
      alpine: {
        title: "Alpine Flora",
        intro:
          "Climb into the French Alps and meet the resilient plants that bloom against rock, wind and snow.",
      },
      mediterranean: {
        title: "Mediterranean Coast",
        intro:
          "Follow the French Riviera and its coastline, home to hardy, fragrant plants shaped by sun and salt.",
      },
      vineyard: {
        title: "Vineyards & Terroir",
        intro:
          "Discover the grapevines and companion plants that define the famed wine regions of France.",
      },
    },
    collectionExtra: {
      desert: {
        intro:
          "Deserts are among the harshest habitats on Earth, yet they host some of the most ingenious plants ever evolved. This collection celebrates the masters of survival.",
        facts: [
          "Many desert plants store water in thick, fleshy tissues.",
          "Spines are often modified leaves that reduce water loss.",
          "Some species can survive years without meaningful rainfall.",
        ],
      },
      tropical: {
        intro:
          "Tropical regions concentrate an astonishing share of the planet's plant diversity, with lush canopies layered from the forest floor to the sky.",
        facts: [
          "Tropical rainforests host over half of all plant species.",
          "Large leaves help capture light in shaded understories.",
          "Many houseplants originate from tropical forests.",
        ],
      },
      japan: {
        intro:
          "Japanese flora blends wild mountain species with centuries of refined horticulture, from temple gardens to seasonal blossoms.",
        facts: [
          "Cherry blossom season is celebrated nationwide as hanami.",
          "Japanese maples are prized for their delicate foliage.",
          "Moss gardens are a distinctive feature of Japanese design.",
        ],
      },
      carnivorous: {
        intro:
          "Carnivorous plants evolved astonishing traps to capture insects, compensating for nutrient-poor soils.",
        facts: [
          "Pitcher plants drown prey in digestive fluid.",
          "Venus flytraps snap shut in a fraction of a second.",
          "Most carnivorous plants grow in boggy, acidic soils.",
        ],
      },
      ancient: {
        intro:
          "Some trees have witnessed millennia, standing as living monuments to deep time and resilience.",
        facts: [
          "Certain bristlecone pines are over 4,000 years old.",
          "Tree rings record centuries of climate history.",
          "Ancient trees anchor entire forest ecosystems.",
        ],
      },
      toxic: {
        intro:
          "Beauty and danger often coexist in the plant world, where toxins evolved as a defense against herbivores.",
        facts: [
          "Many ornamental plants are toxic if ingested.",
          "Toxins often concentrate in seeds, leaves or sap.",
          "Some toxic plants are also valued in medicine.",
        ],
      },
      indoor: {
        intro:
          "Indoor plants bring nature into our homes, purifying the air and softening interior spaces with living greenery.",
        facts: [
          "Many popular houseplants originate from tropical forests.",
          "Indoor plants adapt to lower, indirect light.",
          "Foliage plants are often easier to keep than flowering ones.",
        ],
      },
      petFriendly: {
        intro:
          "Sharing a home with animals doesn't mean giving up on plants — many species are non-toxic to cats and dogs.",
        facts: [
          "Calatheas and many ferns are considered pet-safe.",
          "Always verify a species before bringing it home.",
          "Pet-safe plants let you garden indoors with peace of mind.",
        ],
      },
      pollinator: {
        intro:
          "Pollinator-friendly plants sustain bees, butterflies and other vital insects with abundant nectar and pollen.",
        facts: [
          "Pollinators are essential to most flowering plants.",
          "Single, open flowers are easier for insects to access.",
          "A diversity of blooms supports pollinators all season long.",
        ],
      },
      edible: {
        intro:
          "From orchard fruits to fragrant herbs, edible plants have shaped human cultures and cuisines for millennia.",
        facts: [
          "Many edible plants were domesticated thousands of years ago.",
          "Fruits evolved to be eaten so seeds could spread.",
          "Some ornamental plants are surprisingly edible.",
        ],
      },
    },
    regionsMeta: {
      eyebrow: "Regions",
      title: "Explore the flora by region",
      subtitle:
        "Discover which plants grow where — from France to the rest of the world.",
      representative: "Representative species",
      climateTitle: "Climate",
      relatedTitle: "Related regions",
      subregionsTitle: "Explore within",
      exploreRegion: "Explore region",
      collectionsTitle: "Collections to explore",
      noticeApprox:
        "Precise regional data isn't available for this area, so we show a curated, approximate selection. We never invent botanical facts.",
      noticeNone:
        "We don't have reliable plant data for this region yet. Explore related regions and collections below instead.",
      showing: "Showing",
      loadMore: "Load more species",
      loading: "Loading",
      realData: "Native species data from the Trefle botanical database.",
    },
    regionCatalog: {
      france: {
        name: "France",
        overview:
          "France spans Atlantic coasts, alpine peaks and a Mediterranean south, giving it one of Europe's most varied floras.",
        climate: "Oceanic in the west, continental inland, Mediterranean in the south.",
      },
      europe: {
        name: "Europe",
        overview:
          "From boreal forests to Mediterranean scrub, Europe's flora reflects a wide gradient of climates and landscapes.",
        climate: "Ranges from cold continental and oceanic to Mediterranean.",
      },
      mediterranean: {
        name: "Mediterranean",
        overview:
          "The Mediterranean basin is a global biodiversity hotspot, shaped by hot dry summers and mild wet winters.",
        climate: "Hot, dry summers and mild, rainy winters.",
      },
      northAmerica: {
        name: "North America",
        overview:
          "North America hosts vast ecosystems, from deserts and prairies to temperate and boreal forests.",
        climate: "Highly varied, from arid deserts to cold northern forests.",
      },
      asia: {
        name: "Asia",
        overview:
          "Temperate Asia holds immense plant diversity across mountains, steppes and forests.",
        climate: "From temperate and continental to high-mountain climates.",
      },
      occitanie: {
        name: "Occitanie",
        overview:
          "A southern French region between the Pyrenees and the Mediterranean, blending mountain and coastal flora.",
        climate: "Mostly Mediterranean, with mountain influence inland.",
      },
      provence: {
        name: "Provence",
        overview:
          "Provence is famed for its lavender fields, garrigue scrub and sun-loving aromatic plants.",
        climate: "Classic Mediterranean: hot, dry, sunny summers.",
      },
      alps: {
        name: "The Alps",
        overview:
          "The Alps shelter resilient alpine plants adapted to altitude, cold and short growing seasons.",
        climate: "Alpine and mountain climate with long, snowy winters.",
      },
      brittany: {
        name: "Brittany",
        overview:
          "Brittany's mild, wet oceanic climate favors coastal and moisture-loving plants.",
        climate: "Mild, humid oceanic climate year-round.",
      },
      corsica: {
        name: "Corsica",
        overview:
          "The 'Island of Beauty' combines Mediterranean coast and mountain flora, with many endemic species.",
        climate: "Mediterranean on the coast, alpine in the mountains.",
      },
    },
    rarity: {
      Common: "Common",
      Uncommon: "Uncommon",
      Rare: "Rare",
      Exotic: "Exotic",
    },
    catalog: {
      desert: {
        title: "Desert Plants",
        description: "Resilient species shaped by sun, stone, and minimal water.",
      },
      tropical: {
        title: "Tropical Plants",
        description: "Lush foliage and bold textures from humid ecosystems.",
      },
      japan: {
        title: "Japanese Flora",
        description: "Elegant silhouettes inspired by Japanese landscapes.",
      },
      carnivorous: {
        title: "Carnivorous Plants",
        description: "Extraordinary botanicals with surprising survival tactics.",
      },
      ancient: {
        title: "Ancient Trees",
        description: "Time-honored species with remarkable longevity.",
      },
      toxic: {
        title: "Toxic Beauties",
        description: "Beautiful and dangerous plants with a vivid presence.",
      },
      indoor: {
        title: "Indoor Plants",
        description: "Easygoing companions that thrive in living spaces.",
      },
      petFriendly: {
        title: "Pet Friendly Plants",
        description: "Greenery that lives safely alongside cats and dogs.",
      },
      pollinator: {
        title: "Pollinator Friendly Plants",
        description: "Nectar-rich species that welcome bees and butterflies.",
      },
      edible: {
        title: "Edible Plants",
        description: "Fruits, herbs and species you can actually taste.",
      },
    },
  },
  fr: {
    nav: {
      search: "Recherche",
      discover: "Découvrir",
      explore: "Explorer",
      collections: "Collections",
      glossary: "Glossaire",
      paths: "Parcours",
      guide: "Guide",
      regions: "Régions",
      home: "Accueil",
    },
    footer: {
      exploreGroup: "Explorer",
      placesGroup: "Par région",
      learnGroup: "Comprendre",
      allCollections: "Toutes les collections",
      france: "France",
    },
    language: { label: "Langue" },
    home: {
      eyebrow: "FlorAtlas",
      title: "Votre atlas botanique",
      subtitle:
        "Cartographiez le règne végétal — explorez espèces, familles et régions grâce à des données botaniques ouvertes.",
      cta: "Commencer l'exploration",
      searchPlaceholder: "Rechercher une plante ou un nom scientifique",
      featured: "À la une",
      collection: "Collection",
      rareFind: "Trouvaille rare",
      swissCheese: "Faux philodendron",
      tropicalCanopies: "Canopées tropicales",
      tropicalCanopiesDesc: "Verts profonds, textures luxuriantes",
      pitcherPlant: "Plante carnivore tropicale",
      popularLabel: "Recherches populaires",
      potdEyebrow: "Plante du jour",
      potdTitle: "Le coup de cœur botanique du jour",
      potdCta: "Découvrir cette plante",
      randomTitle: "Envie de curiosité ?",
      randomDesc: "Laissez FlorAtlas vous surprendre avec une espèce au hasard.",
      randomCta: "Surprenez-moi",
      randomLoading: "Recherche d'une plante",
      recentTitle: "Vu récemment",
      recentSubtitle: "Reprenez votre exploration là où vous l'aviez laissée.",
      browseCollections: "Parcourir les collections",
    },
    searchBar: {
      label: "Rechercher des plantes",
      button: "Explorer",
      placeholder: "Rechercher une plante ou un nom scientifique",
    },
    search: {
      eyebrow: "Recherche",
      title: "Découvrez les plantes par leur nom",
      subtitle:
        "Explorez les noms communs ou scientifiques avec des données botaniques en direct.",
      loading: "Recherche en cours",
      errorTitle: "Recherche indisponible",
      errorDesc: "Impossible de charger les plantes pour le moment.",
      emptyTitle: "Aucune plante trouvée",
      emptyDesc: "Essayez un autre mot-clé ou un nom scientifique.",
    },
    explore: {
      eyebrow: "Explorer",
      title: "Collections botaniques sélectionnées",
      subtitle:
        "Découvrez des sélections thématiques avec une touche éditoriale premium.",
      loading: "Création des collections",
      errorTitle: "Collections indisponibles",
      errorDesc:
        "Impossible de charger les collections botaniques pour le moment.",
      categories: "Catégories",
    },
    collections: {
      eyebrow: "Collections",
      title: "Récits botaniques éditorialisés",
      subtitle:
        "Des parcours guidés à travers le règne végétal — chaque collection est une porte vers un nouveau monde botanique.",
      cta: "Ouvrir la collection",
      open: "Ouvrir la collection",
      backToAll: "Toutes les collections",
      keepExploring: "Continuer l'exploration",
    },
    glossary: {
      eyebrow: "Glossaire",
      title: "Glossaire botanique",
      subtitle:
        "Le vocabulaire essentiel pour lire les données des plantes comme un botaniste.",
      examplesLabel: "Exemples",
      conceptsLabel: "Concepts liés",
      collectionLabel: "Collection liée",
      terms: [
        {
          term: "Famille",
          definition:
            "Un rang taxonomique regroupant des genres apparentés, partageant souvent des structures de fleurs ou de fruits.",
          examples: ["Rose", "Orchid", "Bamboo"],
          concepts: ["Genre", "Espèce"],
        },
        {
          term: "Genre",
          definition:
            "Un rang sous la famille regroupant des espèces proches ; la première partie d'un nom scientifique.",
          examples: ["Aloe", "Ficus"],
          concepts: ["Famille", "Nom scientifique"],
        },
        {
          term: "Espèce",
          definition:
            "L'unité de base de la classification, désignant des organismes pouvant se reproduire entre eux.",
          concepts: ["Genre", "Nom scientifique"],
        },
        {
          term: "Nom scientifique",
          definition:
            "Un nom latin en deux parties (binôme) composé du genre et de l'épithète d'espèce.",
          concepts: ["Genre", "Espèce"],
        },
        {
          term: "Annuelle",
          definition:
            "Une plante qui accomplit son cycle de vie en une seule saison de croissance.",
          concepts: ["Vivace"],
        },
        {
          term: "Vivace",
          definition:
            "Une plante qui vit plus de deux ans et repousse à chaque saison.",
          examples: ["Lavender", "Fern"],
          concepts: ["Annuelle"],
        },
        {
          term: "Succulente",
          definition:
            "Une plante aux tissus épais et charnus, adaptés à stocker l'eau en climat aride.",
          examples: ["Aloe", "Agave", "Cactus"],
          concepts: ["Peu d'eau", "Climat aride"],
          collectionSlug: "desert-plants",
        },
        {
          term: "Répartition native",
          definition:
            "Les régions où une espèce est présente naturellement, sans introduction humaine.",
          concepts: ["Famille", "Genre"],
        },
      ],
    },
    card: {
      unknown: "Plante inconnue",
      unnamed: "Espèce sans nom",
      family: "Famille :",
      genus: "Genre :",
      viewDetails: "Voir les détails →",
      fallbackAlt: "Illustration botanique",
    },
    detail: {
      profile: "Profil botanique",
      family: "Famille",
      genus: "Genre",
      author: "Auteur",
      year: "Année",
      distribution: "Répartition",
      unknown: "Plante inconnue",
      unnamed: "Espèce sans nom",
      back: "Retour à la découverte",
      relatedTitle: "Plantes similaires",
      relatedSubtitle: "D'autres espèces du même genre.",
      whyTitle: "Pourquoi cette plante compte",
      contextTitle: "Contexte botanique",
      contextSubtitle: "La place de cette espèce dans l'arbre du vivant.",
      traitsTitle: "Caractéristiques",
      viewFamily: "Explorer la famille",
      sameGenus: "Même genre",
      sameFamily: "Même famille",
      conditionsTitle: "Conditions de pousse",
      conditionsSubtitle: "Comment et où cette plante préfère pousser.",
      seasonTitle: "Saisonnalité",
      seasonSubtitle: "Quand cette plante pousse, fleurit et fructifie.",
      noConditions:
        "Aucune donnée de culture détaillée n'est encore disponible pour cette espèce.",
      light: "Lumière",
      humidity: "Humidité atmosphérique",
      ph: "pH du sol",
      temperature: "Température",
      sun: "Exposition au soleil",
      water: "Besoin en eau",
      soil: "Sol",
      matureSize: "Taille adulte",
      growthForm: "Port",
      growthHabit: "Type de croissance",
      growthRate: "Vitesse de croissance",
      toxicity: "Toxicité",
      flowerColor: "Couleur des fleurs",
      foliageColor: "Feuillage",
      bloomMonths: "Floraison",
      growthMonths: "Croissance",
      fruitMonths: "Fructification",
      taxonomyTitle: "Sous-espèces et variétés",
      taxonomySubtitle: "Les variations reconnues au sein de cette espèce.",
      subspecies: "Sous-espèces",
      varieties: "Variétés",
    },
    months: [
      "Janv.",
      "Févr.",
      "Mars",
      "Avr.",
      "Mai",
      "Juin",
      "Juil.",
      "Août",
      "Sept.",
      "Oct.",
      "Nov.",
      "Déc.",
    ],
    traitLabels: {
      tropical: "Tropicale",
      lowWater: "Peu d'eau",
      fullSun: "Plein soleil",
      houseplant: "Plante d'intérieur",
      toxic: "Toxique",
      coldResistant: "Résistante au froid",
      edible: "Comestible",
      flowering: "À fleurs",
    },
    traitsPage: {
      eyebrow: "Caractéristique",
      subtitle: "Les plantes partageant cette caractéristique botanique.",
    },
    families: {
      eyebrow: "Famille botanique",
      speciesCount: "espèces documentées",
      representative: "Plantes représentatives",
      related: "Autres familles à explorer",
      intro:
        "Une famille botanique regroupe des genres apparentés partageant des traits caractéristiques. Parcourez ci-dessous des espèces représentatives.",
      explore: "Explorer la famille",
      loadMore: "Voir plus d'espèces",
      loading: "Chargement",
      showing: "Affichées",
    },
    guide: {
      eyebrow: "Premiers pas",
      title: "Comment explorer FlorAtlas",
      subtitle:
        "Un guide simple pour naviguer dans l'application et comprendre les termes botaniques.",
      navTitle: "Naviguer dans l'application",
      lexiconTitle: "Comprendre les mots",
      steps: [
        {
          emoji: "✨",
          title: "Accueil",
          text: "Cliquez sur le logo FlorAtlas pour revenir ici : plante du jour, sélections de saison, espèces tendance et surprise aléatoire.",
        },
        {
          emoji: "🧭",
          title: "Parcours",
          text: "Suivez des voyages guidés et narratifs autour d'un thème — la flore de France ou survivre au désert — plante par plante.",
        },
        {
          emoji: "🗂️",
          title: "Explorer",
          text: "Parcourez des thèmes choisis (désert, tropical, Japon…). Chaque collection est une mini-exposition avec faits et plantes phares.",
        },
        {
          emoji: "🗺️",
          title: "Régions",
          text: "Explorez la flore par géographie — France, Europe, Méditerranée et plus encore.",
        },
        {
          emoji: "🔍",
          title: "Recherche",
          text: "Utilisez l'icône de recherche pour trouver une plante par son nom commun ou scientifique. Essayez « Rose » ou « Monstera ».",
        },
        {
          emoji: "🪴",
          title: "Fiches plantes",
          text: "Chaque plante renvoie vers sa famille, son genre, ses caractéristiques et des plantes similaires — pour explorer sans cul-de-sac.",
        },
      ],
      lexicon: [
        {
          term: "Famille",
          text: "Un grand groupe de plantes apparentées partageant des traits clés (ex. les Rosaceae incluent rose, pomme et cerise).",
        },
        {
          term: "Genre",
          text: "Un groupe plus petit au sein d'une famille. C'est le premier mot du nom scientifique (ex. Rosa dans Rosa gallica).",
        },
        {
          term: "Espèce",
          text: "Un type de plante précis. C'est le nom scientifique complet en deux mots (ex. Rosa gallica).",
        },
        {
          term: "Sous-espèces et variétés",
          text: "De petites variations au sein d'une espèce — des formes légèrement différentes dans la nature ou en culture.",
        },
        {
          term: "Caractéristiques",
          text: "Des étiquettes pratiques comme Tropicale, Peu d'eau ou Toxique. Cliquez sur l'une d'elles pour trouver les plantes concernées.",
        },
        {
          term: "Rareté",
          text: "Un indicateur ludique (de Commune à Exotique) pour rendre la navigation plus amusante. Ce n'est pas un statut de conservation officiel.",
        },
      ],
      ctaTitle: "Prêt à explorer ?",
      ctaText: "Rejoignez le hub Découvrir et laissez la curiosité vous guider.",
      ctaButton: "Commencer l'exploration",
    },
    discover: {
      eyebrow: "Découvrir",
      title: "Flânez dans le règne végétal",
      subtitle:
        "Pas besoin de connaître un nom — laissez la curiosité guider votre exploration.",
      trendingTitle: "Plantes tendance",
      trendingSubtitle: "Les espèces qui attirent l'attention en ce moment.",
      seasonalTitle: "Sélection de saison",
      seasonalSubtitle: "Une sélection choisie pour la saison actuelle.",
      seasonNow: "De saison",
      seasons: [
        {
          key: "spring",
          emoji: "🌸",
          title: "Floraisons de printemps",
          desc: "Les fleurs qui réveillent le jardin après l'hiver.",
        },
        {
          key: "summer",
          emoji: "🌵",
          title: "Survivantes de la sécheresse",
          desc: "Des plantes qui prospèrent malgré la chaleur et la sécheresse.",
        },
        {
          key: "winter",
          emoji: "🌲",
          title: "Persistants d'hiver",
          desc: "Un feuillage qui reste vert pendant le froid.",
        },
      ],
      featuredTitle: "Collections à la une",
      featuredSubtitle: "Des parcours éditoriaux à travers les mondes botaniques.",
      traitsTitle: "Explorer par caractéristique",
      traitsSubtitle: "Filtrez le monde vivant selon ce qui compte pour vous.",
    },
    stats: {
      species: "Espèces",
      genera: "Genres",
      families: "Familles",
    },
    pathsMeta: {
      eyebrow: "Parcours botaniques",
      title: "Parcours botaniques guidés",
      subtitle:
        "Des expériences narratives sélectionnées à travers les plantes les plus fascinantes.",
      plants: "plantes",
      minutes: "min",
      start: "Commencer le parcours",
      step: "Étape",
      backToAll: "Tous les parcours",
      relatedTitle: "Poursuivez votre parcours",
    },
    pathCatalog: {
      desert: {
        title: "Survivre au désert",
        intro:
          "Traversez les paysages les plus arides du monde et rencontrez les plantes qui prospèrent là où presque rien d'autre ne survit.",
      },
      japan: {
        title: "Découvrir le Japon à travers les plantes",
        intro:
          "Des cerisiers en fleurs aux érables anciens, explorez l'héritage botanique raffiné du Japon.",
      },
      tropical: {
        title: "Géants tropicaux",
        intro:
          "Pénétrez dans la canopée humide et découvrez le feuillage audacieux et démesuré des tropiques.",
      },
      carnivorous: {
        title: "Carnivores sauvages",
        intro:
          "Rencontrez les plantes qui ont inversé les rôles avec le règne animal grâce à des pièges ingénieux.",
      },
      france: {
        title: "Flore de France",
        intro:
          "Des côtes atlantiques aux prairies alpines, explorez la riche diversité des plantes que l'on trouve en France.",
      },
      provence: {
        title: "Jardins de Provence",
        intro:
          "Promenez-vous dans les paysages ensoleillés de lavande et de plantes méditerranéennes emblématiques du sud de la France.",
      },
      alpine: {
        title: "Flore alpine",
        intro:
          "Montez dans les Alpes françaises et découvrez les plantes résistantes qui fleurissent face à la roche, au vent et à la neige.",
      },
      mediterranean: {
        title: "Littoral méditerranéen",
        intro:
          "Longez la Côte d'Azur et son littoral, refuge de plantes robustes et parfumées façonnées par le soleil et le sel.",
      },
      vineyard: {
        title: "Vignobles et terroirs",
        intro:
          "Découvrez les vignes et les plantes compagnes qui définissent les célèbres régions viticoles de France.",
      },
    },
    collectionExtra: {
      desert: {
        intro:
          "Les déserts comptent parmi les habitats les plus rudes de la planète, et pourtant ils abritent certaines des plantes les plus ingénieuses jamais apparues. Cette collection célèbre les maîtres de la survie.",
        facts: [
          "De nombreuses plantes du désert stockent l'eau dans des tissus épais et charnus.",
          "Les épines sont souvent des feuilles modifiées qui limitent la perte d'eau.",
          "Certaines espèces survivent des années sans pluie significative.",
        ],
      },
      tropical: {
        intro:
          "Les régions tropicales concentrent une part stupéfiante de la diversité végétale de la planète, avec des canopées luxuriantes étagées du sol jusqu'au ciel.",
        facts: [
          "Les forêts tropicales abritent plus de la moitié des espèces végétales.",
          "Les grandes feuilles aident à capter la lumière dans les sous-bois ombragés.",
          "Beaucoup de plantes d'intérieur viennent des forêts tropicales.",
        ],
      },
      japan: {
        intro:
          "La flore japonaise mêle des espèces sauvages de montagne et des siècles d'horticulture raffinée, des jardins de temple aux floraisons saisonnières.",
        facts: [
          "La saison des cerisiers est célébrée dans tout le pays lors du hanami.",
          "Les érables du Japon sont prisés pour leur feuillage délicat.",
          "Les jardins de mousse sont une signature du design japonais.",
        ],
      },
      carnivorous: {
        intro:
          "Les plantes carnivores ont développé des pièges étonnants pour capturer les insectes, compensant des sols pauvres en nutriments.",
        facts: [
          "Les plantes à urne noient leurs proies dans un liquide digestif.",
          "La dionée se referme en une fraction de seconde.",
          "La plupart des carnivores poussent dans des sols tourbeux et acides.",
        ],
      },
      ancient: {
        intro:
          "Certains arbres ont traversé les millénaires, véritables monuments vivants du temps long et de la résilience.",
        facts: [
          "Certains pins bristlecone ont plus de 4 000 ans.",
          "Les cernes des arbres enregistrent des siècles d'histoire climatique.",
          "Les arbres anciens structurent des écosystèmes forestiers entiers.",
        ],
      },
      toxic: {
        intro:
          "Beauté et danger coexistent souvent dans le monde végétal, où les toxines sont apparues comme défense contre les herbivores.",
        facts: [
          "De nombreuses plantes ornementales sont toxiques si ingérées.",
          "Les toxines se concentrent souvent dans les graines, feuilles ou la sève.",
          "Certaines plantes toxiques sont aussi précieuses en médecine.",
        ],
      },
      indoor: {
        intro:
          "Les plantes d'intérieur font entrer la nature chez nous, purifient l'air et adoucissent les espaces de vie d'une verdure vivante.",
        facts: [
          "Beaucoup de plantes d'intérieur populaires viennent des forêts tropicales.",
          "Les plantes d'intérieur s'adaptent à une lumière indirecte et faible.",
          "Les plantes à feuillage sont souvent plus faciles que celles à fleurs.",
        ],
      },
      petFriendly: {
        intro:
          "Vivre avec des animaux n'oblige pas à renoncer aux plantes — de nombreuses espèces sont non toxiques pour chats et chiens.",
        facts: [
          "Les calathéas et beaucoup de fougères sont réputés sans danger.",
          "Vérifiez toujours une espèce avant de l'adopter.",
          "Les plantes sûres permettent de jardiner en intérieur l'esprit tranquille.",
        ],
      },
      pollinator: {
        intro:
          "Les plantes mellifères nourrissent abeilles, papillons et autres insectes essentiels grâce à un nectar et un pollen abondants.",
        facts: [
          "Les pollinisateurs sont essentiels à la plupart des plantes à fleurs.",
          "Les fleurs simples et ouvertes sont plus accessibles aux insectes.",
          "Une diversité de floraisons soutient les pollinisateurs toute la saison.",
        ],
      },
      edible: {
        intro:
          "Des fruits du verger aux herbes parfumées, les plantes comestibles façonnent les cultures et les cuisines depuis des millénaires.",
        facts: [
          "Beaucoup de plantes comestibles ont été domestiquées il y a des millénaires.",
          "Les fruits ont évolué pour être mangés afin de disperser les graines.",
          "Certaines plantes ornementales sont étonnamment comestibles.",
        ],
      },
    },
    regionsMeta: {
      eyebrow: "Régions",
      title: "Explorez la flore par région",
      subtitle:
        "Découvrez quelles plantes poussent où — de la France au reste du monde.",
      representative: "Espèces représentatives",
      climateTitle: "Climat",
      relatedTitle: "Régions liées",
      subregionsTitle: "Explorer à l'intérieur",
      exploreRegion: "Explorer la région",
      collectionsTitle: "Collections à explorer",
      noticeApprox:
        "Les données régionales précises ne sont pas disponibles pour cette zone : nous montrons une sélection approximative et choisie. Nous n'inventons jamais de faits botaniques.",
      noticeNone:
        "Nous n'avons pas encore de données fiables pour cette région. Explorez plutôt les régions liées et les collections ci-dessous.",
      showing: "Affichées",
      loadMore: "Voir plus d'espèces",
      loading: "Chargement",
      realData: "Données d'espèces natives issues de la base botanique Trefle.",
    },
    regionCatalog: {
      france: {
        name: "France",
        overview:
          "La France s'étend des côtes atlantiques aux sommets alpins jusqu'au sud méditerranéen, offrant l'une des flores les plus variées d'Europe.",
        climate: "Océanique à l'ouest, continental à l'intérieur, méditerranéen au sud.",
      },
      europe: {
        name: "Europe",
        overview:
          "Des forêts boréales aux maquis méditerranéens, la flore d'Europe reflète un large éventail de climats et de paysages.",
        climate: "Du continental froid et océanique au méditerranéen.",
      },
      mediterranean: {
        name: "Méditerranée",
        overview:
          "Le bassin méditerranéen est un haut lieu mondial de biodiversité, façonné par des étés chauds et secs et des hivers doux et humides.",
        climate: "Étés chauds et secs, hivers doux et pluvieux.",
      },
      northAmerica: {
        name: "Amérique du Nord",
        overview:
          "L'Amérique du Nord abrite de vastes écosystèmes, des déserts et prairies aux forêts tempérées et boréales.",
        climate: "Très variable, des déserts arides aux forêts froides du nord.",
      },
      asia: {
        name: "Asie",
        overview:
          "L'Asie tempérée recèle une immense diversité végétale à travers montagnes, steppes et forêts.",
        climate: "Du tempéré et continental aux climats de haute montagne.",
      },
      occitanie: {
        name: "Occitanie",
        overview:
          "Une région du sud de la France entre Pyrénées et Méditerranée, mêlant flore de montagne et flore littorale.",
        climate: "Majoritairement méditerranéen, avec une influence montagnarde à l'intérieur.",
      },
      provence: {
        name: "Provence",
        overview:
          "La Provence est célèbre pour ses champs de lavande, sa garrigue et ses plantes aromatiques amoureuses du soleil.",
        climate: "Méditerranéen classique : étés chauds, secs et ensoleillés.",
      },
      alps: {
        name: "Les Alpes",
        overview:
          "Les Alpes abritent des plantes alpines résistantes, adaptées à l'altitude, au froid et aux courtes saisons de croissance.",
        climate: "Climat alpin et montagnard, longs hivers enneigés.",
      },
      brittany: {
        name: "Bretagne",
        overview:
          "Le climat océanique doux et humide de la Bretagne favorise les plantes littorales et celles qui aiment l'humidité.",
        climate: "Climat océanique doux et humide toute l'année.",
      },
      corsica: {
        name: "Corse",
        overview:
          "L'« Île de Beauté » associe flore méditerranéenne du littoral et flore de montagne, avec de nombreuses espèces endémiques.",
        climate: "Méditerranéen sur le littoral, alpin en montagne.",
      },
    },
    rarity: {
      Common: "Commune",
      Uncommon: "Peu commune",
      Rare: "Rare",
      Exotic: "Exotique",
    },
    catalog: {
      desert: {
        title: "Plantes du désert",
        description:
          "Des espèces résistantes façonnées par le soleil, la pierre et le manque d'eau.",
      },
      tropical: {
        title: "Plantes tropicales",
        description:
          "Un feuillage luxuriant et des textures audacieuses issues d'écosystèmes humides.",
      },
      japan: {
        title: "Flore japonaise",
        description: "Des silhouettes élégantes inspirées des paysages japonais.",
      },
      carnivorous: {
        title: "Plantes carnivores",
        description:
          "Des végétaux extraordinaires aux tactiques de survie surprenantes.",
      },
      ancient: {
        title: "Arbres anciens",
        description: "Des espèces séculaires d'une remarquable longevité.",
      },
      toxic: {
        title: "Beautés toxiques",
        description:
          "Des plantes magnifiques et dangereuses à la présence éclatante.",
      },
      indoor: {
        title: "Plantes d'intérieur",
        description: "Des compagnes faciles à vivre qui s'épanouissent chez vous.",
      },
      petFriendly: {
        title: "Plantes sans danger pour animaux",
        description: "Une verdure qui cohabite sans risque avec chats et chiens.",
      },
      pollinator: {
        title: "Plantes pour pollinisateurs",
        description: "Des espèces riches en nectar qui attirent abeilles et papillons.",
      },
      edible: {
        title: "Plantes comestibles",
        description: "Des fruits, des herbes et des espèces que l'on peut goûter.",
      },
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
