import React from 'react';
import './SelectorCard.css'; // Ahora crearemos este estilo

interface SelectorCardProps {
  id: string;
  title: string;
  description: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const SelectorCard: React.FC<SelectorCardProps> = ({ 
  id, title, description, isSelected, onSelect 
}) => {
  return (
    <div 
      className={`selector-card ${isSelected ? 'active' : ''}`} 
      onClick={() => onSelect(id)}
    >
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {isSelected && <div className="selected-badge">✓</div>}
    </div>
  );
};

export default SelectorCard;