// Import the enhanced version
import EnhancedAPSCalculatorV2 from "./EnhancedAPSCalculatorV2";
import { APSCalculation } from "@/types/university";

interface EnhancedAPSCalculatorProps {
  onCalculationComplete: (calculation: APSCalculation) => void;
  selectedUniversityId?: string;
}

const EnhancedAPSCalculator = ({
  onCalculationComplete,
  selectedUniversityId,
}: EnhancedAPSCalculatorProps) => {
  return (
    <EnhancedAPSCalculatorV2
      onCalculationComplete={onCalculationComplete}
      selectedUniversityId={selectedUniversityId}
    />
  );
};

export default EnhancedAPSCalculator;
