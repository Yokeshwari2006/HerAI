import React from 'react';
import { SupportedLanguage } from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import { Home, Mic, FileText, Compass, User, Bookmark } from 'lucide-react';

interface BottomNavProps {
  currentTab: 'home' | 'assistant' | 'schemes' | 'journey' | 'saved' | 'profile';
  onSelectTab: (tab: 'home' | 'assistant' | 'schemes' | 'journey' | 'saved' | 'profile') => void;
  language: SupportedLanguage;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  language,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  interface NavItem {
    id: 'home' | 'assistant' | 'schemes' | 'journey' | 'saved' | 'profile';
    label: string;
    icon: React.ElementType;
    highlight?: boolean;
  }

  const items: NavItem[] = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'assistant', label: t.navAssistant, icon: Mic, highlight: true },
    { id: 'schemes', label: t.navSchemes, icon: FileText },
    { id: 'journey', label: t.navJourney, icon: Compass },
    { id: 'saved', label: t.navSaved, icon: Bookmark },
    { id: 'profile', label: t.navProfile, icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFF9F5]/98 backdrop-blur-md border-t border-[#FCE4EC] px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          if (item.highlight) {
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className="flex flex-col items-center -mt-5 focus:outline-none"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-tr from-[#542A46] to-[#E95D8A] ring-4 ring-[#FCE4EC]'
                      : 'bg-gradient-to-tr from-[#E95D8A] to-[#F47B6C] ring-4 ring-[#FFF9F5]'
                  }`}
                >
                  <Icon className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-[10px] font-extrabold text-[#542A46] mt-0.5">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 rounded-xl transition-all focus:outline-none ${
                isActive ? 'text-[#E95D8A]' : 'text-[#292326]/60 hover:text-[#292326]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span
                className={`text-[10px] transition-all ${
                  isActive ? 'font-black text-[#542A46]' : 'font-semibold'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
