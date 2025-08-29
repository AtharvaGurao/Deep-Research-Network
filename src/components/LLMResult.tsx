import { FormattedTypingText } from "./FormattedTypingText";
import { DEMO_LLM_RESULTS } from "@/data/demoData";

interface LLMResultProps {
  llm: string;
  delay?: number;
  isDemoMode?: boolean;
}

import { LLMLogo, llmLabels } from "./LLMLogo";

// logos centralized in LLMLogo

const resultContent = {
  openai: {
    title: "Supplier Dynamics in the European Car Tyre Sector",
    content: `**Major Tyre Suppliers in Europe and Market Shares**

Europe's car tyre market is dominated by a handful of large manufacturers, led by Michelin (France) and Continental (Germany), with substantial contributions from Bridgestone (Japan), Goodyear (USA), and Pirelli (Italy). These five companies collectively account for a significant share of European tyre sales (futuremarketsights.com). Table 1 provides estimated market share ranges for the top suppliers (by passenger car & light truck tyre segment):

| Manufacturer | Est. European Market Share (%) | Notes (Market Position) |
|---|---|---|
| Michelin (FR) | ~20-25% | Europe's largest tyre maker; strong in OEM & replacement. |
| Continental (DE) | ~15-20% | Second-largest in Europe (carkeys.org); major OEM supplier, especially German carmakers. |
| Bridgestone (JP) | ~12-16% | Significant European production (plants in Poland, Spain, etc.) and OEM presence. |
| Goodyear (US) | ~10-14% | Established European operations including Dunlop brand; active in both OEM and aftermarket. |
| Pirelli (IT) | ~6-10% | Focus on high-performance "High Value" tyres; strong ties to premium OEMs and motorsport. |
| Others (combined) | ~30-40% (total) | Includes Hankook (KR), Yokohama (JP), Nokian (FI), Apollo Vredestein (IN/NL), Sumitomo/Dunlop (JP), Kumho (KR), and many budget brands (esp. Chinese). Individually these hold small percentages, but collectively they are significant. |

**OEM vs. Aftermarket Segments**: The European tyre market is heavily skewed toward replacement (aftermarket) sales, which form the majority of demand (emargroup.com). OEM tyres (factory-fitted on new cars) typically constitute a smaller portion (roughly one-quarter to one-third of volume), whereas about 70-75% of tyres sold are replacement tyres (emargroup.com). Major suppliers like Michelin and Continental are active in both.`
  },
  claude: {
    title: "European Tyre Market - Strategic Analysis & Competitive Landscape",
    content: `**Comprehensive Overview of the European Tyre Industry**

**Market Structure & Competitive Dynamics**

The European tyre market is characterized by a mix of established global players and emerging challengers, with distinct competitive positions across different segments:

**Tier 1 - Premium Leaders**
• **Michelin (France)**: Market leader with ~22-24% share
  - Strengths: Strong brand equity, R&D leadership, broad product portfolio
  - Key markets: Original Equipment (OE) and premium replacement
  - Innovation focus: High-performance, eco-friendly, and connected tyres

• **Continental (Germany)**: Close second with ~16-18% share
  - Strengths: Strong OE relationships, German engineering reputation
  - Key markets: Luxury and performance vehicles
  - Innovation focus: Smart tyres, integrated mobility solutions

**Tier 2 - Strong Challengers**
• **Bridgestone (Japan)**: ~13-15% market share
  - Strengths: Global scale, strong in commercial vehicles
  - Key markets: OE and fleet operations
  - Innovation focus: Sustainable materials, premium touring tyres

• **Goodyear (US)**: ~11-13% market share
  - Strengths: Strong retail presence, Dunlop brand
  - Key markets: Replacement market, performance segment
  - Innovation focus: Electric vehicle tyres, airless tyre technology

**Tier 3 - Specialists & Value Players**
• **Pirelli (Italy)**: ~7-9% market share
  - Strengths: Ultra-high performance segment
  - Key markets: Luxury and sports car OE fitments
  - Innovation focus: Customization, high-speed performance

• **Asian Manufacturers**: ~15-20% combined share
  - Includes: Hankook, Yokohama, Kumho, and Chinese brands
  - Strengths: Competitive pricing, improving quality
  - Key markets: Budget and mid-range replacement segments

**Market Trends & Future Outlook**
• **Electrification Impact**: Growing demand for EV-specific tyres with low rolling resistance
• **Sustainability Focus**: Increased R&D in sustainable materials and circular economy models
• **Digital Transformation**: Smart tyres with embedded sensors gaining traction
• **Supply Chain Localization**: Regional production becoming more important due to geopolitical factors
• **Regulatory Pressures**: Stricter EU regulations on tyre performance and environmental impact

**Strategic Recommendations**
1. **For Premium Brands**: Focus on R&D for EV and connected tyre technologies
2. **For Challengers**: Differentiate through specialized products and services
3. **For New Entrants**: Target specific niches with innovative solutions
4. **For All Players**: Invest in sustainable manufacturing and circular economy initiatives`
  },
  perplexity: {
    title: "European Car Tyre Industry – Supplier Landscape & Supply Chain Dynamics",
    content: `**Market Structure and Key Competitors**

Europe's passenger car tyre sector is shaped by a mix of global giants and fast-growing challengers. Five manufacturers dominate the high end of the market:

• **Michelin (France)**: Long established as the largest player in Europe. Known for its broad portfolio, from budget to ultra-premium, and a particularly strong winter tyre offering.

• **Continental (Germany)**: A close rival to Michelin, especially influential in Germany, Central Europe, and in original equipment (OE) supply to Volkswagen, BMW, Mercedes-Benz and others.

• **Bridgestone (Japan)**: A major force with extensive European plants and a strong OE footprint. Bridgestone has been pushing hard into EV-specific tyres and fleet solutions.

• **Goodyear (US)**: Strong aftermarket presence, leveraging both the Goodyear and Dunlop brands, as well as its reputation in motorsport.

• **Pirelli (Italy)**: Highly specialised at the premium end. Pirelli's brand is closely tied to performance and prestige vehicles (Ferrari, Lamborghini, Porsche).

Together, these companies typically represent around two-thirds of European tyre sales by value. The remainder is spread across a fragmented set of suppliers, including Hankook (Korea), Nokian (Finland), Yokohama (Japan), Apollo Vredestein (India/Netherlands), Kumho (Korea), and a growing wave of Chinese imports.

**OEM vs. Replacement**
• **OE fitments**: Account for roughly 25-30% of demand and are dominated by the big five, since carmakers demand proven quality and reliability.
• **Replacement market**: Makes up the other 70-75%, where consumer choice, brand loyalty, and price matter most. Here, Asian imports have expanded quickly. Chinese tyres alone represent close to a fifth of replacement purchases in some European countries, especially in budget segments.`
  },
  groq: {
    title: "Strategic Brief: European Car Tyre Supply Ecosystem",
    content: `**1. Market Configuration**
• **Oligopolistic at the top**: A small cluster of global firms – Michelin, Continental, Bridgestone, Goodyear, and Pirelli – anchor the sector. They collectively capture around two-thirds of sales revenue, especially in original equipment (OE) supply to automakers.
• **Fragmented at the bottom**: Below the majors, dozens of challengers (Hankook, Apollo, Nokian, Yokohama, Kumho) compete alongside a tidal wave of low-cost imports. Chinese tyres alone represent close to a fifth of the replacement segment in some EU countries.
• **Segment imbalance**: Roughly three-quarters of demand comes from replacement tyres, which are more profitable and consumer-driven. OE volumes depend directly on Europe's car production cycles and tend to be volatile.

**2. Supply Chain Architecture**

Think of the tyre supply chain in Europe as a three-layer system:

**Layer 1 – Inputs:**

• **Natural rubber**: ~90% imported from Southeast Asia and West Africa.
• **Synthetic rubber & polymers**: Produced by European petrochemical groups, but cost-sensitive to oil markets.
• **Reinforcement materials**: Steel cords and high-strength fabrics, often sourced from specialist European suppliers.
• **Fillers and chemicals**: Carbon black, silica, sulfur, and oils — some made locally, some imported.

**Layer 2 – Production Footprint:**
• **More than 75 operational plants** across the EU and nearby countries.
• **Historic bases**: France, Germany, Italy, Spain.`
  },
  gemini: {
    title: "Supplier Dynamics – European Passenger Car Tyre Sector",
    content: `**1. Leading Suppliers & Market Split**

The European tyre market is still highly concentrated. A handful of multinational groups supply the bulk of both original equipment (OE) tyres to automakers and replacement tyres to consumers.

**Estimated market split (2024, passenger car tyres):**

| Company | Share Range (%) | Highlights |
|---|---|---|
| Michelin (France) | ~22-24 | Longtime European leader; balanced strength in OE and aftermarket. |
| Continental (Germany) | ~16-18 | Particularly strong in Germany and premium OE contracts. |
| Bridgestone (Japan) | ~13-15 | Extensive European plants (Spain, Poland, France); broad OEM base. |
| Goodyear (US) | ~11-13 | Operates also under Dunlop brand; diversified across segments. |
| Pirelli (Italy) | ~7-9 | Specialist in high-performance and prestige car fitments. |
| Others (combined) | ~28-31 | Includes Hankook, Yokohama, Nokian, Apollo Vredestein, Kumho, plus many budget and Chinese entrants. |

**OE segment**: Roughly 30% of volume. Dominated by the top five due to quality and logistics requirements.

**Aftermarket**: Around 70% of demand. While premium brands are strong in winter and performance tyres, lower-priced imports — particularly from China — now make up close to 20% of replacement sales.`
  }
};

export const LLMResult = ({ llm, delay = 0, isDemoMode = false }: LLMResultProps) => {
  // Use demo data when in demo mode, otherwise use default content
  const content = isDemoMode 
    ? DEMO_LLM_RESULTS[llm as keyof typeof DEMO_LLM_RESULTS]?.content || ''
    : resultContent[llm as keyof typeof resultContent]?.content || '';
  
  const title = isDemoMode 
    ? DEMO_LLM_RESULTS[llm as keyof typeof DEMO_LLM_RESULTS]?.title 
    : resultContent[llm as keyof typeof resultContent]?.title;

  return (
    <div className="h-full">
      <FormattedTypingText 
        text={content} 
        delay={delay} 
        speed={20} 
        className="prose prose-sm max-w-none text-gray-700"
      />
    </div>
  );
};