import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { GameTerm } from "@/data/types";

interface TermCardProps {
  term: GameTerm;
}

export const TermCard = ({ term }: TermCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className={cn(
        "border border-gray-200 transition-all duration-300 hover:shadow-md bg-white",
        expanded ? "transform scale-[1.02]" : "",
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg sm:text-xl font-montserrat text-[#1A1F2C] break-words">
            {term.term}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-[#F1F0FB] shrink-0"
            onClick={() => setExpanded(!expanded)}
          >
            <Icon name={expanded ? "ChevronUp" : "ChevronDown"} size={18} />
          </Button>
        </div>
        {term.altNames && term.altNames.length > 0 && (
          <CardDescription className="text-gray-500 font-rubik text-xs sm:text-sm break-words">
            Также известен как: {term.altNames.join(", ")}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 font-rubik text-sm sm:text-base mb-3">
          {term.definition}
        </p>

        {expanded && term.example && (
          <>
            <Separator className="my-3" />
            <div className="bg-gray-50 p-3 rounded-md my-3 border-l-4 border-[#8B5CF6]">
              <p className="text-xs sm:text-sm font-medium mb-1 text-gray-500 font-montserrat">
                Пример:
              </p>
              <p className="text-gray-700 italic font-rubik text-sm">
                {term.example}
              </p>
            </div>
          </>
        )}

        <div className="flex flex-wrap gap-2 mt-3">
          {term.categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="bg-[#F1F0FB] text-[#8B5CF6] hover:bg-[#E5DEFF] font-rubik text-xs py-0.5"
            >
              {category}
            </Badge>
          ))}
        </div>

        {expanded && (
          <div className="flex justify-end mt-3 gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#8B5CF6] text-xs h-8"
            >
              <Icon name="Share2" size={14} className="mr-1" />
              <span className="font-rubik">Поделиться</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#8B5CF6] text-xs h-8"
            >
              <Icon name="Copy" size={14} className="mr-1" />
              <span className="font-rubik">Копировать</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
