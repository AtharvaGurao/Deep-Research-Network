import openaiLogo from "@/assets/openai-logo.svg";
import perplexityLogo from "@/assets/perplexity-logo.svg";
import groqLogo from "@/assets/groq-logo.svg";
import geminiLogo from "@/assets/gemini-logo.svg";
import claudeLogo from "@/assets/claude-logo.svg";

type LLMType = "openai" | "perplexity" | "groq" | "gemini" | "claude";

interface LLMLogoProps {
  llm: LLMType;
  className?: string;
  alt?: string;
}

export const llmLogos = {
  openai: openaiLogo,
  perplexity: perplexityLogo,
  groq: groqLogo,
  gemini: geminiLogo,
  claude: claudeLogo
} as const;

export const llmLabels: Record<LLMType, string> = {
  openai: "OpenAI",
  perplexity: "Perplexity",
  groq: "Groq",
  gemini: "Gemini",
  claude: "Claude"
};

export const LLMLogo = ({ llm, className, alt }: LLMLogoProps) => {
  const src = llmLogos[llm];
  const label = alt ?? `${llmLabels[llm]} logo`;
  return (
    <img src={src} alt={label} className={className} />
  );
};

export default LLMLogo;
