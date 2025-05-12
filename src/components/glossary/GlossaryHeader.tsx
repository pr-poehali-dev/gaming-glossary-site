
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export const GlossaryHeader = () => {
  return (
    <header className="bg-[#1A1F2C] text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="GameController" size={24} className="text-[#8B5CF6]" />
            <span className="text-xl font-bold font-montserrat">Игровой глоссарий</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-white hover:text-[#8B5CF6]">
              <Icon name="Home" className="mr-2" size={18} />
              <span className="hidden md:inline font-rubik">Главная</span>
            </Button>
            <Button variant="ghost" className="text-white hover:text-[#8B5CF6]">
              <Icon name="Info" className="mr-2" size={18} />
              <span className="hidden md:inline font-rubik">О проекте</span>
            </Button>
            <Button variant="outline" className="bg-[#8B5CF6] text-white border-[#8B5CF6] hover:bg-[#7E69AB] hover:border-[#7E69AB]">
              <Icon name="Plus" className="mr-2" size={18} />
              <span className="font-rubik">Предложить термин</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
