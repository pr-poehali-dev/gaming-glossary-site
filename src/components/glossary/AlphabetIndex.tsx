
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AlphabetIndexProps {
  onLetterSelect: (letter: string | null) => void;
  selectedLetter: string | null;
}

export const AlphabetIndex = ({ onLetterSelect, selectedLetter }: AlphabetIndexProps) => {
  // Русский алфавит
  const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");
  
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex gap-1 min-w-max">
        <Button
          variant="outline"
          className={cn(
            "h-8 w-8 p-0 font-medium rounded-full font-montserrat",
            !selectedLetter
              ? "bg-[#8B5CF6] text-white border-[#8B5CF6]"
              : "bg-white text-gray-700 hover:bg-[#F1F0FB]"
          )}
          onClick={() => onLetterSelect(null)}
        >
          Все
        </Button>
        
        {alphabet.map((letter) => (
          <Button
            key={letter}
            variant="outline"
            className={cn(
              "h-8 w-8 p-0 font-medium rounded-full font-montserrat",
              selectedLetter === letter
                ? "bg-[#8B5CF6] text-white border-[#8B5CF6]"
                : "bg-white text-gray-700 hover:bg-[#F1F0FB]"
            )}
            onClick={() => onLetterSelect(letter)}
          >
            {letter}
          </Button>
        ))}
      </div>
    </div>
  );
};
