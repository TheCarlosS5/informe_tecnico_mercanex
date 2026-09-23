import React from 'react';
import { getTermById } from '../data/dictionaryData';
import { sound } from '../lib/soundSynthesizer';

export default function TechTerm({ id, children, onSelectTerm }) {
  const termData = getTermById(id);
  const displayText = children || (termData ? termData.term : id);

  return (
    <span
      className="tech-term-badge inline-flex items-center gap-1 cursor-pointer font-semibold"
      onClick={(e) => {
        e.preventDefault();
        sound.ping();
        if (onSelectTerm && termData) {
          onSelectTerm(termData);
        }
      }}
      title={termData ? termData.summary : "Ver término en diccionario"}
    >
      {displayText}
    </span>
  );
}
