"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  filmes: {
    primaryTitle: string;
    primaryImage: {
      url: string;
      width: number;
      height: number;
    };
    rating: {
      aggregateRating: number;
    };
  }[];
}

export default function Movies({ filmes }: Props) {
  const [draw, setDraw] = useState(false);
  const [finished, setFinished] = useState(false);
  const [select, setSelect] = useState(0);

  const index1 = useMemo(() => {
    return Math.floor(Math.random() * filmes.length);
  }, [draw, filmes.length]);

  const index2 = useMemo(() => {
    let newIndex = Math.floor(Math.random() * filmes.length);

    while(filmes[index1].rating.aggregateRating === filmes[newIndex].rating.aggregateRating){
        newIndex = Math.floor(Math.random() * filmes.length);
    }

    return newIndex;
}, [draw, filmes.length, index1]);

  function handleClick(index: number) {
    setSelect(index);
    setFinished(true);

    setTimeout(() => {
      setFinished(false);
      setDraw((oldState) => !oldState);
    }, 3000);
  }

  return (
    <div className="mt-20 w-full h-full flex gap-6 relative">
      
  
      <button
        className="h-full w-1/2 relative cursor-pointer"
        onClick={() => handleClick(index1)}
        disabled={finished}
      >
        <Image
          src={filmes[index1].primaryImage.url}
          fill
          alt={filmes[index1].primaryTitle}
          className="object-cover"
        />

        {finished && (
          <p className="absolute text-white p-2 bg-black/80 text-3xl bottom-10 left-1/2 transform -translate-x-1/2 z-30 rounded-lg">
            {filmes[index1].rating.aggregateRating}
          </p>
        )}

        {finished && select === index1 && (
          <div
            className={twMerge(
              "w-full h-full absolute inset-0 z-10",
              filmes[index1].rating.aggregateRating >
                filmes[index2].rating.aggregateRating
                ? "bg-green-500/70"
                : "bg-red-500/70"
            )}
          />
        )}
      </button>

      <p className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl bg-white text-black rounded-full p-4 border border-black z-10  ">
        OR
      </p>

   
      <button
        className="h-full w-1/2 relative cursor-pointer"
        onClick={() => handleClick(index2)}
        disabled={finished}
      >
        <Image
          src={filmes[index2].primaryImage.url}
          fill
          alt={filmes[index2].primaryTitle}
          className="object-cover"
        />

        {finished && (
          <p className="absolute text-white p-2 bg-black/80 text-3xl bottom-10 left-1/2 transform -translate-x-1/2 z-30 rounded-lg">
            {filmes[index2].rating.aggregateRating}
          </p>
        )}

        {finished && select === index2 && (
          <div
            className={twMerge(
              "w-full h-full absolute inset-0 z-10",
              filmes[index2].rating.aggregateRating >
                filmes[index1].rating.aggregateRating
                ? "bg-green-500/70"
                : "bg-red-500/70"
            )}
          />
        )}
      </button>
    </div>
  );
}