export interface Style {
  id: string;
  name: string;
  prompt: string;
  thumbnail: string;
  category?: string;
}

export const STYLES: Style[] = [
  // Professional & Stylish
  {
    id: "linkedin-headshot",
    name: "Professional LinkedIn",
    category: "Professional & Stylish",
    prompt: "Transform the person(s) in the reference photo into a clean professional LinkedIn headshot style, perfect corporate studio portrait, soft flattering lighting, subtle business attire, neutral clean background, confident and approachable expression. Keep the exact same face, facial features, age, skin tone, eye color, hair, and identity as in the input photo. No age change. Highly realistic photography, sharp details, professional color grading. --style raw",
    thumbnail: "/linkedin.jpg"
  },
  {
    id: "magazine-cover",
    name: "High-Fashion Cover",
    category: "Professional & Stylish",
    prompt: "Turn the person(s) in the reference photo into a high-fashion magazine cover model, dramatic cinematic lighting, strong side and rim light, elegant designer outfit, high-end editorial pose, Vogue-style fashion photography, luxurious background. Preserve the exact same face, facial features, age, expression, and identity from the input image with zero changes. Ultra-realistic, high detail, fashion photography style",
    thumbnail: "/fashion.jpg"
  },
  {
    id: "ceo-portrait",
    name: "CEO Executive",
    category: "Professional & Stylish",
    prompt: "Convert the person(s) in the reference photo into a powerful CEO executive portrait, dramatic studio lighting with strong key light and shadows, wearing luxury tailored business suit, confident and authoritative pose, elegant dark background. Keep the exact same face, age, facial features, hair, and identity from the original photo — no age alteration. Cinematic corporate photography, sharp details, realistic",
    thumbnail: "/ceo.jpg"
  },

  // Sci-Fi & Futuristic
  {
    id: "cyberpunk",
    name: "Cyberpunk Neon",
    category: "Sci-Fi & Futuristic",
    prompt: "Transform the person(s) in the reference photo into a cyberpunk character, neon-lit rainy street at night, glowing pink and cyan neon signs, holographic elements, wet reflections, futuristic black coat with glowing accents, atmospheric cinematic lighting. Preserve the exact same face, age, facial features, expression, and identity from the input photo with no changes. Highly detailed, photorealistic, moody cyberpunk aesthetic",
    thumbnail: "/Cyberpunk.jpg"
  },
  {
    id: "futuristic-armor",
    name: "Sleek Sci-Fi",
    category: "Sci-Fi & Futuristic",
    prompt: "Turn the person(s) in the reference photo into a futuristic sci-fi character wearing sleek metallic armor with glowing blue energy lines, standing inside a high-tech space station with holographic interfaces and data screens, dramatic volumetric lighting. Keep the exact same face, facial features, age, and identity from the original photo — do not change age or appearance. Ultra-realistic sci-fi, cinematic, sharp details",
    thumbnail: "/Futuristic.jpg"
  },
  {
    id: "astronaut",
    name: "Space Explorer",
    category: "Sci-Fi & Futuristic",
    prompt: "Transform the person(s) in the reference photo into a realistic space explorer / astronaut, wearing a detailed spacesuit (helmet can be on or off), floating in zero gravity or standing on an alien planet with dramatic space lighting and Earth or alien landscape in background. Preserve the exact same face, age, expression, and identity from the input photo with zero changes. Cinematic sci-fi photography, highly detailed, realistic",
    thumbnail: "/SpaceExplorer.jpg"
  },
  {
    id: "synthwave",
    name: "80s Synthwave",
    category: "Sci-Fi & Futuristic",
    prompt: "Convert the person(s) in the reference photo into a retro-futuristic 1980s synthwave style, vaporwave aesthetics, pink and teal neon lighting, grid lines, retro chrome jacket and sunglasses, sunset palm tree background. Keep the exact same face, facial features, age, hair, and identity from the original photo — no age or face alteration. Nostalgic 80s cinematic photography, photorealistic, highly detailed, vibrant neon",
    thumbnail: "/RetroFuturistic.jpg"
  },

  // Fantasy & Magical
  {
    id: "anime-style",
    name: "Anime Character",
    category: "Fantasy & Magical",
    prompt: "Transform the person(s) into a beautiful anime/manga character with big expressive eyes, dynamic flowing hair, anime-style shading and coloring. Keep the exact same face, facial features, age, skin tone, eye color, and identity from the input photo with zero changes. Highly detailed anime art style, vibrant colors, sharp lines, professional anime illustration",
    thumbnail: "/Anime.jpg"
  },
  {
    id: "fantasy-elf",
    name: "Elf Sorcerer",
    category: "Fantasy & Magical",
    prompt: "Turn the person(s) into a fantasy elf or sorcerer with ethereal glowing magic, ornate fantasy robes, standing in an enchanted forest with magical particles. Preserve the exact same face, age, expression, and identity from the reference photo — no age or face alteration. Mystical lighting, photorealistic cinematic photography, highly detailed fantasy style, realistic yet magical",
    thumbnail: "/Fantasy.jpg"
  },
  {
    id: "mermaid",
    name: "Underwater Realm",
    category: "Fantasy & Magical",
    prompt: "Convert the person(s) into a mermaid in an underwater realm with shimmering iridescent scales, flowing hair, bubbles, and soft underwater lighting, elegant underwater palace background. Keep the exact same face, facial features, age, and identity from the input photo with no changes. Magical underwater atmosphere, photorealistic, highly detailed, cinematic fantasy photography",
    thumbnail: "/Mermaid.jpg"
  },
  {
    id: "steampunk",
    name: "Steampunk Inventor",
    category: "Fantasy & Magical",
    prompt: "Transform the person(s) into a steampunk inventor wearing goggles, brass gears, leather and mechanical details with Victorian-futurist style, workshop background with machinery and steam. Preserve the exact same face, age, hair, and identity from the original photo — no alterations to face or age. Highly detailed steampunk aesthetic, warm lighting, realistic textures",
    thumbnail: "/Steampunk.jpg"
  },

  // Vintage & Artistic
  {
    id: "retro-film",
    name: "Retro & Vintage",
    category: "Vintage & Artistic",
    prompt: "Transform the person(s) in the reference photo into a retro & vintage style (1950s-1970s), Kodachrome or Polaroid film aesthetic with warm tones and subtle film grain. Dress them in period-appropriate vintage clothing. Keep the exact same face, facial features, age, skin tone, hair, and identity from the input photo with zero changes. Nostalgic vintage photography, highly detailed, realistic film look",
    thumbnail: "/Retro.jpg"
  },
  {
    id: "oil-painting",
    name: "Fine Art & Historical",
    category: "Vintage & Artistic",
    prompt: "Turn the person(s) into a fine art historical portrait in Renaissance oil painting style (or Baroque/Victorian), rich textures, dramatic lighting, elegant historical clothing. Preserve the exact same face, age, expression, and identity from the reference photo — no age or face alteration. Museum-quality classical painting, intricate details, timeless fine art style",
    thumbnail: "/Renaissance.jpg"
  },
  {
    id: "pop-art",
    name: "Pop Art",
    category: "Vintage & Artistic",
    prompt: "Convert the person(s) into vibrant Pop Art in the style of Andy Warhol, bold colors, high contrast, repeated patterns, comic-book inspired. Keep the exact same face, facial features, age, and identity from the original photo with no changes. Iconic pop art aesthetic, bright color blocks, fun and stylish, highly detailed",
    thumbnail: "/PopArt.jpg"
  },
  {
    id: "classic-hollywood",
    name: "Classic Hollywood",
    category: "Vintage & Artistic",
    prompt: "Transform the person(s) into a Classic Hollywood Golden Age black & white glamour portrait, dramatic cinematic lighting with strong shadows, elegant vintage attire, sophisticated old Hollywood movie star look. Preserve the exact same face, age, hair, and identity from the input photo — no alterations. Timeless black and white photography, high contrast, glamorous",
    thumbnail: "/Hollywood.jpg"
  },

  // Fun & Thematic
  {
    id: "superhero",
    name: "Superhero",
    category: "Fun & Thematic",
    prompt: "Transform the person(s) into a dynamic superhero / comic book hero with flowing cape, vibrant costume with emblem, powerful pose. Keep the exact same face, facial features, age, expression, and identity from the input photo with zero changes. Epic city skyline background, dramatic lighting, photorealistic cinematic superhero photography, highly detailed",
    thumbnail: "/Superhero.jpg"
  },
  {
    id: "pixar-style",
    name: "Pixar Animation",
    category: "Fun & Thematic",
    prompt: "Turn the person(s) into a Pixar or modern Disney 3D animated character style with smooth rendering, expressive eyes, and vibrant colors. Preserve the exact same face, age, skin tone, hair, and identity from the reference photo — no age or face alteration. Warm friendly lighting, high-quality 3D animation look like Toy Story or Encanto, highly detailed",
    thumbnail: "/Animation.jpg"
  },
  {
    id: "rockstar",
    name: "Music Rockstar",
    category: "Fun & Thematic",
    prompt: "Convert the person(s) into a rockstar / music icon on stage, wearing leather jacket, energetic pose with dramatic concert lighting and spotlights. Keep the exact same face, facial features, age, and identity from the original photo with no changes. High-energy concert atmosphere, cinematic music photography, highly detailed",
    thumbnail: "/Rockstar.jpg"
  },
  {
    id: "pirate",
    name: "Pirate Captain",
    category: "Fun & Thematic",
    prompt: "Transform the person(s) into a pirate captain standing on a ship deck during a dramatic ocean storm, wearing pirate coat, hat, and accessories. Preserve the exact same face, age, hair, and identity from the input photo — no alterations. Epic adventurous lighting, highly detailed cinematic pirate style",
    thumbnail: "/Pirate.jpg"
  },
  {
    id: "zombie",
    name: "Fun Zombie",
    category: "Fun & Thematic",
    prompt: "Turn the person(s) into a fun zombie / post-apocalyptic character with light undead makeup and torn stylish clothes (playful, not scary). Keep the exact same face, facial features, age, and identity from the reference photo with zero changes. Gritty but humorous horror style, highly detailed",
    thumbnail: "/Zombie.jpg"
  },

  // Festivals & Celebrations
  {
    id: "diwali-festival",
    name: "Diwali Lights",
    category: "Festivals & Celebrations",
    prompt: "Convert the person(s) into Diwali Festival of Lights style wearing elegant traditional Indian attire with gold jewelry, surrounded by glowing diyas and fireworks. Keep exact same face, age and identity. Warm festive lighting, photorealistic photography, highly detailed",
    thumbnail: "/Diwali.jpg"
  },
  {
    id: "halloween-party",
    name: "Halloween Party",
    category: "Festivals & Celebrations",
    prompt: "Transform the person(s) into a fun Halloween costume party look (elegant witch, vampire, fairy etc.). Preserve exact same face, age and identity. Dramatic spooky lighting with pumpkins and fog, playful expression, photorealistic photography, highly detailed",
    thumbnail: "/Halloween.jpg"
  },
  {
    id: "lunar-new-year",
    name: "Lunar New Year",
    category: "Festivals & Celebrations",
    prompt: "Turn the person(s) into Lunar New Year celebration wearing beautiful red and gold traditional Chinese attire with lanterns and dragons. Keep exact same face, age and identity. Festive warm lighting and fireworks, photorealistic photography, highly detailed",
    thumbnail: "/ChineseNY.jpg"
  },
  {
    id: "holi-festival",
    name: "Holi Colors",
    category: "Festivals & Celebrations",
    prompt: "Convert the person(s) into Holi Festival of Colors, covered in bright pink, blue, yellow and green powder. Preserve exact same face, age and identity. Joyful expression, colorful powder explosion, bright festive atmosphere, photorealistic photography, highly detailed",
    thumbnail: "/Holi.jpg"
  },
  {
    id: "christmas-magic",
    name: "Christmas Magic",
    category: "Festivals & Celebrations",
    prompt: "Transform the person(s) into a magical Christmas scene with Santa, wearing festive holiday outfit, surrounded by Christmas lights, snow and gifts. Keep exact same face, age and identity. Warm cheerful Christmas lighting, photorealistic photography, highly detailed",
    thumbnail: "/Christmas.jpg"
  }
];
