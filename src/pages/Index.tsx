import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { Card, CardContent } from "@/components/ui/card";
import { GlossaryHeader } from "@/components/glossary/GlossaryHeader";
import { TermCard } from "@/components/glossary/TermCard";
import { AlphabetIndex } from "@/components/glossary/AlphabetIndex";
import { GameTermsAPI } from "@/data/gameTerms";
import { TermFilter } from "@/data/types";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Получение всех категорий
  const categories = GameTermsAPI.getAllCategories();

  // Фильтрация терминов с помощью API
  const filter: TermFilter = {
    searchText: searchTerm,
    category: selectedCategory as any,
    letter: selectedLetter,
  };

  const filteredTerms = GameTermsAPI.searchTerms(filter);

  return (
    <div className="min-h-screen bg-[#F1F0FB]">
      <GlossaryHeader />

      <main className="container mx-auto py-4 sm:py-8 px-4">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3 font-montserrat text-[#1A1F2C]">
            Словарь видеоигровых терминов
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 font-rubik">
            Универсальный справочник терминологии из мира видеоигр для новичков
            и опытных геймеров
          </p>

          <div className="relative mb-6 sm:mb-8">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Поиск термина..."
              className="pl-10 bg-white font-rubik"
            />
            <Icon
              name="Search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchTerm("")}
              >
                <Icon name="X" size={18} />
              </Button>
            )}
          </div>

          <AlphabetIndex
            onLetterSelect={setSelectedLetter}
            selectedLetter={selectedLetter}
          />
        </div>

        <Tabs defaultValue="all" className="mb-6 sm:mb-8">
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <TabsList className="mb-4 bg-white min-w-max">
              <TabsTrigger
                value="all"
                onClick={() => setSelectedCategory(null)}
                className="text-xs sm:text-sm"
              >
                Все термины
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs sm:text-sm"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-4">
            {filteredTerms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTerms.map((term) => (
                  <TermCard key={term.id} term={term} />
                ))}
              </div>
            ) : (
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="text-center py-6 sm:py-8">
                    <Icon
                      name="Search"
                      className="mx-auto mb-4 text-gray-400"
                      size={36}
                    />
                    <h3 className="text-lg sm:text-xl font-medium mb-2 font-montserrat">
                      Ничего не найдено
                    </h3>
                    <p className="text-gray-500 font-rubik text-sm sm:text-base">
                      Попробуйте изменить параметры поиска или сбросить фильтры
                    </p>
                    <Button
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedLetter(null);
                        setSelectedCategory(null);
                      }}
                    >
                      Сбросить фильтры
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTerms.map((term) => (
                  <TermCard key={term.id} term={term} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <footer className="bg-[#1A1F2C] text-white py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 font-montserrat text-center md:text-left">
                Игровой глоссарий
              </h3>
              <p className="text-gray-300 font-rubik text-sm sm:text-base text-center md:text-left">
                Словарь видеоигровых терминов и фраз
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-300 font-rubik text-sm sm:text-base text-center md:text-left">
                © 2025 Игровой глоссарий
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
