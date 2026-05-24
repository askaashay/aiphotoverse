# AI Photoverse 📸✨

Welcome to **AI Photoverse**, an interactive AI-powered photo booth application that transforms your real-time camera captures into beautifully stylized, high-resolution artistic grid collages!

🚀 **Try it live here:** [https://ai-photoverse-553934249511.us-west2.run.app](https://ai-photoverse-553934249511.us-west2.run.app)

Created with 💙 and creativity by **Aashay Vyas** and **Ohm Darera**, both talented **4th-grade students** at **Stratford School in Sunnyvale, California**! The entire project was "vibe coded" using **Google AI Studio** with helpful parent supervision.

---

## 🌟 The Creators & The Vibe

- **Co-Creator:** Aashay Vyas (4th Grade, Stratford School - Sunnyvale, CA)
- **Co-Creator:** Ohm Darera (4th Grade, Stratford School - Sunnyvale, CA)
- **Methodology:** Hand-in-hand "vibe coding" inside Google AI Studio, exploring the boundaries of modern generative models to build a production-ready Web App.

---

## 🎨 Features & Capabilities

* **Real-time Live Camera Capture:** Connects directly to your device camera or an external webcam (with full fallback and permission error handling).
* **High-Definition Artistic Collages:** Generates a stunning response featuring a 2x2 grid of four distinct styled images using the ultra-powerful `gemini-3.1-flash-image-preview` model.
* **Smart Likeness & Photo Logic:**
  * **100% Identity Preservation:** Locks facial bone structure, eyes, nose, lip shape, skin tone, and age while transferring the subject into customized target art dimensions (like Anime, Pixar, etc.).
  * **Photorealism Focus:** Except for explicit illustrations/art (such as Anime, Pixar, and Fine-Art oil paintings), every image is captured as if the subject was actually photographed in that physical realm!
  * **Dynamic Cinematic Variety:** Completely ignores original room backgrounds and introduces cinematic camera angles, distances, and compositions for a professional aesthetic.
* **Private API Key Vault:** Allows the user to supply their own Gemini API key. For security, keys are saved only inside your personal browser (`localStorage`) and automatically expire/clear themselves after 24 hours.

---

## 🎭 Style Presets Included

Get ready to traverse across dimensions! Some of our styles include:
* **Professional & Stylish:** Corporate LinkedIn, High-Fashion Editorial Cover, and Authoritative CEO.
* **Sci-Fi & Futuristic:** Cyberpunk Neon, Sleek Metallic Armor Sci-Fi, Astronaut Space Explorer, and 80s Synthwave Sunset.
* **Fantasy & Magical:** Beautiful Anime Character, mystical Elf Sorcerer, Underwater Mermaid Realm, and Victorian Steampunk.
* **Vintage & Art:** Kodachrome Retro Film, Renaissance Oil Painting, Andy Warhol-style Pop Art, and Black-and-White Classic Hollywood.
* **Celebrations & Festivals:** Diwali Lights with Diyas, Halloween Spooky Party, Lunar New Year red/gold traditional attire, Holi Colors, and Christmas Magic.

---

## 💻 Technical Blueprint

AI Photoverse is built with a highly responsive, modern, production-grade stack:
* **Frontend:** [React 19](https://react.dev/) + [Vite](https://vite.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Animations:** Smooth kinetic and route transitions powered by [Motion](https://motion.dev/) (`motion/react`)
* **Styling:** Highly-optimized utility-first layout design using [Tailwind CSS](https://tailwindcss.com/) (version 4)
* **API Integration:** Modern, server-side-ready `@google/genai` TypeScript SDK
* **Hardware Interfacing:** WebRTC Client-Side `navigator.mediaDevices` camera scanner

---

## ⚙️ Getting Started & Installation

To run this application locally, follow these simple steps:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-photoverse.git
cd ai-photoverse
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser and you're ready to start capturing!

### 4. Setup Your Key
In the initial booth setup panel, paste your **Gemini API Key**. 
- Don't have a key? Get one from [Google AI Studio](https://aistudio.google.com/).
- *Note:* Your key is secure. It never leaves your browser and defaults to a 24-hour automatic login expiration to keep your keys safe.

---

## ❤️ Acknowledgements
Special thanks to our parents for guiding our creative journey, and to the **Google AI Studio** team for providing a magical sandbox that empowers 4th-grade vibe coders to turn imagination into interactive code!

🚀 Let your photoreal journey begin!
