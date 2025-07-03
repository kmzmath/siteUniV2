import React from "react";

import { faArrowUp, faArrowDown, faEquals, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PositionVariationProps {
  variation: number | null | undefined;
  isNew: boolean;
}

const PositionVariation: React.FC<PositionVariationProps> = ({ variation, isNew }) => {
  if (isNew) {
    return (
      <div className="flex items-center gap-1">
        <FontAwesomeIcon 
          icon={faPlus} 
          className="text-green-500 text-xs"
        />
        <span className="text-xs text-green-500 font-bold">NEW</span>
      </div>
    );
  }

  if (variation === null || variation === undefined || variation === 0) {
    return (
      <div className="flex items-center gap-1">
        <FontAwesomeIcon 
          icon={faEquals} 
          className="text-gray-400 text-xs"
        />
        <span className="text-xs text-gray-400">0</span>
      </div>
    );
  }

  if (variation > 0) {
    return (
      <div className="flex items-center gap-1">
        <FontAwesomeIcon 
          icon={faArrowUp} 
          className="text-green-500 text-xs"
        />
        <span className="text-xs text-green-500 font-bold">+{variation}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <FontAwesomeIcon 
        icon={faArrowDown} 
        className="text-red-500 text-xs"
      />
      <span className="text-xs text-red-500 font-bold">{variation}</span>
    </div>
  );
};

export default PositionVariation;