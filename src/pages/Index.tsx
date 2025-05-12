
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GlossaryHeader } from "@/components/glossary/GlossaryHeader";
import { TermCard } from "@/components/glossary/TermCard";
import { AlphabetIndex } from "@/components/glossary/AlphabetIndex";
import { gameTermsData } from "@/data/gameTerms";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Фильтрация терминов
  const filteredTerms = gameTermsData.filter((term) => {
    // Фильтрация по поиску
    const matchesSearch = searchTerm === "" || 
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
      term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Фильтрация по выбранной букве
    const matchesLetter = !selectedLetter || term.term.charAt(0).toLowerCase() === selectedLetter.toLowerCase();
    
    // Фильтрация по категории
    const matchesCategory = !selectedCategory || term.categories.includes(selectedCategory);
    
    return matchesSearch && matchesLetter && matchesCategory;
  });

  // Определение категорий
  const categories = [...new Set(gameTermsData.flatMap(term => term.categories))];

  return (
    <div className="min-h-screen bg-[#F1F0FB]">
      <GlossaryHeader />
      
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 font-montserrat text-[#1A1F2C]">Словарь видеоигровых терминов</h1>
          <p className="text-lg text-gray-600 mb-6 font-rubik">
            Универсальный справочник терминологии из мира видеоигр для новичков и опытных геймеров
          </p>
          
          <div className="relative mb-8">
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

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-4 bg-white">
            <TabsTrigger value="all" onClick={() => setSelectedCategory(null)}>
              Все термины
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
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
                  <div className="text-center py-8">
                    <Icon name="Search" className="mx-auto mb-4 text-gray-400" size={48} />
                    <h3 className="text-xl font-medium mb-2 font-montserrat">Ничего не найдено</h3>
                    <p className="text-gray-500 font-rubik">
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
      
      <footer className="bg-[#1A1F2C] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-bold mb-2 font-montserrat">Игровой глоссарий</h3>
              <p className="text-gray-300 font-rubik">Словарь видеоигровых терминов и фраз</p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-300 font-rubik">© 2025 Игровой глоссарий</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
