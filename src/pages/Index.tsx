import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface FamilyMember {
  id: string;
  name: string;
  birthYear?: string;
  deathYear?: string;
  relationship: string;
  photo?: string;
  children?: FamilyMember[];
}

const initialFamilyData: FamilyMember = {
  id: '1',
  name: 'Иван Петрович',
  birthYear: '1920',
  deathYear: '1995',
  relationship: 'Прадедушка',
  children: [
    {
      id: '2',
      name: 'Мария Ивановна',
      birthYear: '1945',
      relationship: 'Бабушка',
      children: [
        {
          id: '4',
          name: 'Александр Михайлович',
          birthYear: '1970',
          relationship: 'Отец',
          children: [
            {
              id: '6',
              name: 'Дмитрий Александрович',
              birthYear: '1995',
              relationship: 'Я',
            },
            {
              id: '7',
              name: 'Елена Александровна',
              birthYear: '1998',
              relationship: 'Сестра',
            }
          ]
        },
        {
          id: '5',
          name: 'Ольга Михайловна',
          birthYear: '1973',
          relationship: 'Тётя',
        }
      ]
    },
    {
      id: '3',
      name: 'Пётр Иванович',
      birthYear: '1948',
      deathYear: '2010',
      relationship: 'Дедушка',
    }
  ]
};

const Index = () => {
  const [familyData] = useState<FamilyMember>(initialFamilyData);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  const renderFamilyTree = (member: FamilyMember, level: number = 0) => {
    const hasChildren = member.children && member.children.length > 0;

    return (
      <div key={member.id} className={`flex flex-col items-center ${level > 0 ? 'mt-12' : ''}`}>
        <div className="relative">
          {level > 0 && (
            <div className="absolute bottom-full left-1/2 w-0.5 h-12 bg-accent/30 -translate-x-1/2" />
          )}
          
          <Card 
            className="w-64 p-6 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 animate-fade-in bg-card/80 backdrop-blur-sm border-accent/20"
            onClick={() => {
              setSelectedMember(member);
            }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center border-2 border-accent/40">
                <Icon name="User" size={32} className="text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-cormorant text-xl font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground italic">{member.relationship}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {member.birthYear}{member.deathYear ? ` - ${member.deathYear}` : ''}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {hasChildren && (
          <div className="relative mt-12">
            <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-accent/30 -translate-x-1/2 -translate-y-full" />
            
            {member.children!.length > 1 && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent/30" 
                   style={{ 
                     width: `calc(100% - ${200}px)`,
                     left: '50%',
                     transform: 'translateX(-50%)'
                   }} 
              />
            )}
            
            <div className="flex justify-center gap-16">
              {member.children!.map((child) => renderFamilyTree(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-0.5 bg-accent/50" />
            <Icon name="TreeDeciduous" size={48} className="text-accent" />
            <div className="w-16 h-0.5 bg-accent/50" />
          </div>
          <h1 className="font-cormorant text-6xl font-bold text-foreground mb-4">
            Семейное Древо
          </h1>
          <p className="text-muted-foreground text-lg">История нашей семьи</p>
        </header>

        <div className="overflow-x-auto pb-8">
          <div className="inline-block min-w-full">
            {renderFamilyTree(familyData)}
          </div>
        </div>

        <Dialog open={selectedMember !== null} onOpenChange={(open) => !open && setSelectedMember(null)}>
          <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-sm border-accent/20">
            <DialogHeader>
              <DialogTitle className="font-cormorant text-3xl">
                {selectedMember?.name}
              </DialogTitle>
            </DialogHeader>
            
            {selectedMember && (
              <div className="space-y-4 animate-scale-in">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center border-2 border-accent/40">
                    <Icon name="User" size={48} className="text-accent" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label className="text-muted-foreground text-sm">Родство</Label>
                    <p className="text-foreground font-medium">{selectedMember.relationship}</p>
                  </div>
                  
                  {selectedMember.birthYear && (
                    <div>
                      <Label className="text-muted-foreground text-sm">Год рождения</Label>
                      <p className="text-foreground font-medium">{selectedMember.birthYear}</p>
                    </div>
                  )}
                  
                  {selectedMember.deathYear && (
                    <div>
                      <Label className="text-muted-foreground text-sm">Год смерти</Label>
                      <p className="text-foreground font-medium">{selectedMember.deathYear}</p>
                    </div>
                  )}
                  
                  {selectedMember.children && selectedMember.children.length > 0 && (
                    <div>
                      <Label className="text-muted-foreground text-sm">Дети</Label>
                      <p className="text-foreground font-medium">
                        {selectedMember.children.map(c => c.name).join(', ')}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => setSelectedMember(null)}
                  >
                    Закрыть
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
