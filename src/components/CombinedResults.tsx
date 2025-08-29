import { FormattedTypingText } from "./FormattedTypingText";
import { TypingText } from "./TypingText";
import { LLMLogo } from "./LLMLogo";
import { AuthoritativeReport } from "./AuthoritativeReport";
import { DEMO_COMBINED_RESULTS } from "@/data/demoData";

interface CombinedResultsProps {
  onNext: () => void;
  isDemoMode?: boolean;
}

export const CombinedResults = ({ onNext, isDemoMode = false }: CombinedResultsProps) => {
  // Default content for European tyre market
  const defaultContent = `**Combined Results from All LLMs: European Car Tyre Supply Ecosystem**

**1. Market Configuration**
• **Top tier dominance**: Europe's passenger tyre market is shaped by five major groups — Michelin, Continental, Bridgestone, Goodyear, and Pirelli — which together capture around two-thirds of sales revenue.
• **Second tier and imports**: Below this tier sit regional specialists (Nokian, Hankook, Apollo Vredestein, Kumho) and a flood of Chinese imports, now covering close to a fifth of the replacement segment in some countries.
• **OE vs Replacement**:
  • **OE (25-30% of volume)**: Concentrated with top five due to quality and logistics requirements.
  • **Replacement (70-75%)**: Competitive and price-sensitive; brand matters in premium segments, but budget dominated by imports.

**2. Supply Chain Architecture**

Three broad stages:

• **Inputs**:
  • **Natural rubber**: Almost entirely imported from Southeast Asia and West Africa.
  • **Synthetic rubber**: Produced locally by European chemical firms.
  • **Reinforcements & additives**: Steel cords, fabrics, carbon black, silica — sourced from both European and international suppliers.

• **Production**:
  • **Over 75 tyre factories** in Europe.
  • **Legacy hubs**: France, Germany, Italy, Spain.
  • **New clusters**: Poland, Hungary, Czechia, Romania, Turkey for cost advantages and proximity to automakers.

Our advanced synthesis feature combines everything into one authoritative report.`;

  // Default data for European tyre market
  const defaultConfidenceMetrics = [
    {
      category: "Market Analysis",
      score: 92,
      description: "High consensus across all LLMs on market structure and key players"
    },
    {
      category: "Supply Chain Data",
      score: 87,
      description: "Strong agreement on production locations and input sources"
    },
    {
      category: "Import/Export Trends",
      score: 78,
      description: "Good alignment on Chinese import penetration rates"
    },
    {
      category: "Future Projections",
      score: 65,
      description: "Moderate consensus on market evolution predictions"
    }
  ];

  const defaultVisualizations = [
    {
      type: 'pie' as const,
      title: 'European Tyre Market Share by Segment',
      data: [
        { name: 'Top 5 Brands', value: 65 },
        { name: 'Regional Specialists', value: 15 },
        { name: 'Chinese Imports', value: 20 }
      ]
    },
    {
      type: 'bar' as const,
      title: 'Production Distribution by Region',
      data: [
        { name: 'Western Europe', value: 45 },
        { name: 'Eastern Europe', value: 35 },
        { name: 'Turkey', value: 20 }
      ]
    },
    {
      type: 'line' as const,
      title: 'Chinese Import Penetration Trend',
      data: [
        { name: '2019', value: 12 },
        { name: '2020', value: 15 },
        { name: '2021', value: 17 },
        { name: '2022', value: 19 },
        { name: '2023', value: 20 }
      ]
    }
  ];

  const defaultRecommendations = [
    {
      priority: 'high' as const,
      title: 'Monitor Chinese Import Impact',
      description: 'Establish regular tracking of Chinese brand penetration rates across different European markets, particularly in the replacement segment where price sensitivity is highest.',
      timeline: 'Immediate - Next 30 days'
    },
    {
      priority: 'high' as const,
      title: 'Strengthen Eastern European Partnerships',
      description: 'Develop strategic relationships with manufacturers in Poland, Hungary, and Czech Republic to leverage cost advantages and proximity to automotive production.',
      timeline: 'Short-term - 3-6 months'
    },
    {
      priority: 'medium' as const,
      title: 'Diversify Raw Material Sources',
      description: 'Reduce dependency on Southeast Asian natural rubber by exploring alternative sources and increasing synthetic rubber utilization where technically feasible.',
      timeline: 'Medium-term - 6-12 months'
    },
    {
      priority: 'medium' as const,
      title: 'OE Market Penetration Strategy',
      description: 'Focus on building relationships with automotive manufacturers to increase OE market share, which offers better margins and brand positioning.',
      timeline: 'Long-term - 12-24 months'
    },
    {
      priority: 'low' as const,
      title: 'Sustainability Initiative Development',
      description: 'Develop comprehensive sustainability programs to meet increasing regulatory requirements and consumer expectations across European markets.',
      timeline: 'Long-term - 18-36 months'
    }
  ];

  // Use demo data when in demo mode, otherwise use default data
  const content = isDemoMode ? DEMO_COMBINED_RESULTS.content : defaultContent;
  const confidenceMetrics = isDemoMode ? DEMO_COMBINED_RESULTS.confidenceMetrics : defaultConfidenceMetrics;
  const visualizations = isDemoMode ? DEMO_COMBINED_RESULTS.visualizations : defaultVisualizations;
  const recommendations = isDemoMode ? DEMO_COMBINED_RESULTS.recommendations : defaultRecommendations;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 justify-center">
        <LLMLogo llm="openai" className="w-6 h-6" />
        <LLMLogo llm="perplexity" className="w-6 h-6" />
        <LLMLogo llm="groq" className="w-6 h-6" />
        <LLMLogo llm="gemini" className="w-6 h-6" />
        <LLMLogo llm="claude" className="w-6 h-6" />
      </div>
      
      <div className="bg-card border rounded-lg p-6">
        <div className="max-w-none">
          <FormattedTypingText text={content} delay={0} speed={20} />
        </div>
      </div>

      <AuthoritativeReport 
        confidenceMetrics={confidenceMetrics}
        visualizations={visualizations}
        recommendations={recommendations}
      />
      
      <div className="flex justify-center pt-4">
        <button
          onClick={onNext}
          className="text-primary hover:text-primary/80 text-sm font-medium"
        >
          <TypingText text="View suggested expert questions →" delay={0} speed={50} />
        </button>
      </div>
    </div>
  );
};