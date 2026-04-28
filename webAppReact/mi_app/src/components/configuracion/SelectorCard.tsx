import React from 'react';
import './SelectorCard.css'; // Ahora crearemos este estilo

interface SelectorCardProps {
  id: string;
  title: string;
  description: string; 
  color?: string
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const SelectorCard: React.FC<SelectorCardProps> = ({ 
  id, title, description,  color, isSelected, onSelect 
}) => {
  return (
    <div 
      className={`selector-card ${isSelected ? 'active' : ''}`} 
      onClick={() => onSelect(id)}
      style={{ 
        borderColor: isSelected ? color : '#333',
        boxShadow: isSelected ? `0 0 20px ${color}44` : 'none' 
      }}
    >
     
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {isSelected && (
        <div className="selected-badge" style={{ backgroundColor: color }}>
          ✓
        </div>
      )}
    </div>
  );
};

export default SelectorCard;