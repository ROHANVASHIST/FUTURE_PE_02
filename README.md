# UGC Studio — High-Converting UGC Ad Pack Generator

UGC Studio is a premium, full-stack video ad and copywriting asset framework built specifically for direct-to-consumer (D2C) brands, agencies, and content creators. Powered by Google Gemini and tailored with hard-coded professional copywriting wisdom, the application generates scroll-stopping video hooks, high-converting scripts based on the **P.A.S.C.** (Problem, Agitate, Solution, Call-to-Action) framework, versatile call-to-action variants, and social-first copy.

---

## 🚀 Key Features

*   **Intelligent Copywriter Engine**: Utilizes Gemini's powerful natural language modeling to write natural, conversational, first-person scripts that resonate with human audiences.
*   **Psychology-Triggered Hooks**: Generates 5 distinct psychological hook styles:
    *   *Vulnerable Confessions* (fostering authenticity)
    *   *Contrarian Claims* (shattering common myths)
    *   *Specific Results* (instinctive evidence)
    *   *Direct Address* (targeting persona-specific pain points)
    *   *Curiosity Gaps* (teasing information loops)
*   **Structured P.A.S.C. Video Scripts**: Outlines structured video pacing complete with timed stages (`[0-3s]`, `[3-8s]`, `[8-18s]`, etc.) and helpful stage directions.
*   **Omnichannel Adaptation**: Native layouts optimized for Instagram Reels, Meta Feed Ads, and YouTube Shorts, adjustable via relatable, excited, educational, or dramatic tones.
*   **Premium Export Suites**:
    *   **PDF Report**: Generates a high-contrast elegant report document complete with decorative accents and clean bounding boxes.
    *   **Text Bundle ZIP**: Dynamically packages modular txt files (`01_scroll_hooks.txt`, `02_video_script.txt`, etc.) and the master Markdown document.
    *   **Copy to Clipboard**: Quick-copy individual sections or the entire campaign package in structured Markdown format.

---

## 🎨 Visual System & Core Aesthetics

Our UI/UX utilizes a customized **Slate Slate Theme** designed with extreme negative space, clean borders, high-contrast typography, and beautiful rounded layouts (`rounded-2xl`).

*   **Glassmorphism Surfaces**: Frosted slate surfaces with rich `backdrop-blur-sm` effects feel light, modern, and extremely cohesive.
*   **Sophisticated Typographic Hierarchy**: Large header badges, monospaced tech accents, and clear italic behavioral annotations create a rhythmic layout.
*   **Interactive Design**: Responsive click interaction, smooth motion fade-ins, and clear telemetry metrics make drafting campaigns responsive and professional.

---

## 🛠️ Stack & Infrastructure

*   **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
*   **Backend Server**: Express custom server configured for deployment on port `3000` with native ESM integration and full proxy setups.
*   **AI Integration**: `@google/genai` modern client accessing Google Gemini models server-side.
*   **Document Generation & Packaging**:
    *   `jspdf` (Custom millimeter-grid PDF report formatter)
    *   `jszip` (Dynamic client-side archive builder)
    *   `zod` (Deep schema validation for structural response parsing)

---

## 📦 Local Installation Guide

1.  **Clone resources** and ensure you have Node.js 18+ installed on your computer.
2.  **Environment Setup**:
    Create a `.env` file in the root matching the following:
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    NODE_ENV=development
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Run Development Environment**:
    ```bash
    npm run dev
    ```


<img width="1909" height="867" alt="Screenshot 2026-05-31 061514" src="https://github.com/user-attachments/assets/706ca064-e906-45c4-a9f0-1bb98001e5bc" />
<img width="969" height="776" alt="Screenshot 2026-05-31 061703" src="https://github.com/user-attachments/assets/47c7b690-95fb-42fc-868f-4203bc1091f1" />
<img width="927" height="826" alt="Screenshot 2026-05-31 062050" src="https://github.com/user-attachments/assets/afb47817-d5f3-4fc9-b4fb-06b520cb0a91" />
<img width="925" height="811" alt="Screenshot 2026-05-31 062106" src="https://github.com/user-attachments/assets/5bde9fd7-7caa-4b64-b46b-83791793165a" />
<img width="904" height="774" alt="Screenshot 2026-05-31 062115" src="https://github.com/user-attachments/assets/ee7161a3-189a-4594-99d0-350f00ee670a" />
<img width="905" height="811" alt="Screenshot 2026-05-31 062125" src="https://github.com/user-attachments/assets/e261bf5f-90bb-49dc-943a-ec2350c23c51" />
























    
    Open [http://localhost:3000](http://localhost:3000) to access the UGC Ad Studio.
