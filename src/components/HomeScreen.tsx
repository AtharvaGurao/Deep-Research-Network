import { GlobalQueryBar } from "./GlobalQueryBar";

interface HomeScreenProps {
  onSubmitQuery: (query: string, selectedLLMs: string[]) => void;
}

export const HomeScreen = ({ onSubmitQuery }: HomeScreenProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen p-8 pt-16">
      <div className="w-full max-w-3xl -mt-8">
        <div className="text-center mb-12">
          <p className="text-xl text-gray-600 mb-8">
            What would you like to research today?
          </p>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-xl p-8">
          <GlobalQueryBar 
            onSubmitQuery={onSubmitQuery}
          />
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Select your preferred AI models and ask your research question
          </p>
        </div>
      </div>
    </div>
  );
};