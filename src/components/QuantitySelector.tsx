
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 4,
  label = "Number of Images"
}: QuantitySelectorProps) {
  const increment = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  const decrement = () => {
    if (quantity > min) onChange(quantity - 1);
  };

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <div className="flex items-center border rounded-md overflow-hidden">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-none"
          onClick={decrement}
          disabled={quantity <= min}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="flex-1 text-center font-medium">
          {quantity}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-none"
          onClick={increment}
          disabled={quantity >= max}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
