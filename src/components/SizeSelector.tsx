
import { Button } from "./ui/button";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export interface Size {
  id: string;
  name: string;
  dimensions: string;
}

interface SizeSelectorProps {
  sizes: Size[];
  selectedSizeId: string;
  onSelect: (sizeId: string) => void;
}

export function SizeSelector({ sizes, selectedSizeId, onSelect }: SizeSelectorProps) {
  const [open, setOpen] = useState(false);
  const selectedSize = sizes.find((size) => size.id === selectedSizeId);

  if (!selectedSize) return null;

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-muted-foreground">Image Size</label>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between font-normal"
          >
            {selectedSize.name}
            <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {sizes.map((size) => (
            <DropdownMenuItem
              key={size.id}
              className="flex items-center justify-between"
              onSelect={() => {
                onSelect(size.id);
                setOpen(false);
              }}
            >
              <div>
                <p>{size.name}</p>
                <p className="text-xs text-muted-foreground">{size.dimensions}</p>
              </div>
              {size.id === selectedSizeId && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
