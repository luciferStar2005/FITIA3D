import React from 'react';

interface SelectorCardProps {
  id: string;
  title: string;
  description: string; 
  color?: string
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const SelectorCard: React.FC<SelectorCardProps> = ({ 
  id, title, description, color = '#f87171', isSelected, onSelect 
}) => {
  return (
    <div 
      className={`relative cursor-pointer transition-all duration-300 rounded-2xl p-5 border flex flex-col gap-2 ${
        isSelected 
          ? 'bg-white/[0.08] backdrop-blur-xl -translate-y-1' 
          : 'bg-white/[0.02] backdrop-blur-xl border-white/[0.08] hover:bg-white/[0.05]'
      }`} 
      onClick={() => onSelect(id)}
      style={{ 
        borderColor: isSelected ? color : 'rgba(255,255,255,0.08)',
        boxShadow: isSelected ? `0 8px 32px ${color}33` : '0 4px 20px rgba(0,0,0,0.2)' 
      }}
    >
      <div className="flex-1">
        <h3 className="font-['Bebas_Neue'] text-2xl tracking-wider text-white leading-none mb-1">{title}</h3>
        {description && <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{description}</p>}
      </div>
      
      {isSelected && (
        <div 
          className="absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center shadow-lg" 
          style={{ backgroundColor: color }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-black">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SelectorCard;