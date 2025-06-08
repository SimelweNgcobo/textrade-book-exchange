import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookFormData } from "@/types/book";
import {
  calculateCommission,
  calculateSellerReceives,
} from "@/services/book/bookUtils";

interface PricingSectionProps {
  formData: BookFormData;
  errors: Record<string, string>;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export const PricingSection = ({
  formData,
  errors,
  onInputChange,
}: PricingSectionProps) => {
  const commission = calculateCommission(formData.price);
  const sellerReceives = calculateSellerReceives(formData.price);

  return (
    <div>
      <Label htmlFor="price" className="text-base font-medium">
        Price (R) <span className="text-red-500">*</span>
      </Label>
      <Input
        id="price"
        name="price"
        type="number"
        value={formData.price}
        onChange={onInputChange}
        placeholder="0"
        min="0"
        step="0.01"
        className={errors.price ? "border-red-500" : ""}
        required
      />
      {errors.price && (
        <p className="text-sm text-red-500 mt-1">{errors.price}</p>
      )}

      {formData.price > 0 && (
        <div className="mt-2 p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">
            Commission (10%): R{commission.toFixed(2)}
          </p>
          <p className="text-sm font-medium text-green-600">
            You receive: R{sellerReceives.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};
