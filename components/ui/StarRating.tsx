import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  className?: string;
}

export function StarRating({ rating, className }: StarRatingProps) {
  return (
    <div className={cn("flex gap-1", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating
              ? "fill-soft-pink-accent text-soft-pink-accent"
              : "fill-none text-warm-gray-light"
          )}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}
