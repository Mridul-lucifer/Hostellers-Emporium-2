import React, { useState, useEffect } from 'react';

export default function CompanyName (){
  const [displayedText, setDisplayedText] = useState('');
  const txt = "Hostellers' Emporium";
  const speed = 150;

  useEffect(() => {
    let i = 0;
    let timeoutId;

    const type = () => {
      if (i < txt.length) {
        setDisplayedText((prev) => prev + txt.charAt(i));
        i++;
        timeoutId = setTimeout(type, speed);
      }
    };

    type();

    return () => {
      clearTimeout(timeoutId); // Clear timeout on cleanup
    };
  }, []);

  return <div>{displayedText}</div>;
};


