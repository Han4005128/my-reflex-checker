"use client";

import React, { useState } from "react";

export default function ReflexChecker() {
  const [gameState, setGameState] = useState("ready");
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleStart = () => {
    setGameState("waiting");
    const delay = Math.floor(Math.random() * 3000) + 2000;
    const id = setTimeout(() => {
      setStartTime(Date.now());
      setGameState("now");
    }, delay);
    setTimeoutId(id);
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      clearTimeout(timeoutId);
      setGameState("tooSoon");
    } else if (gameState === "now") {
      const endTime = Date.now();
      setReactionTime(endTime - startTime);
      setGameState("result");
    } else if (gameState === "tooSoon" || gameState === "result") {
      setGameState("ready");
      setReactionTime(null);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-gray-900 to-black text-white px-4"
      onClick={gameState !== "ready" ? handleClick : undefined}
    >
      <div className="p-10 rounded-2xl shadow-xl w-full max-w-md bg-gray-800 border border-gray-700">
        {gameState === "ready" && (
          <>
            <h1 className="text-3xl font-bold mb-4">디지털 반응 속도 측정기</h1>
            <p className="text-sm text-gray-300 mb-6">
              이 테스트는 과몰입이 얼마나 빠르게 반응을 유도하는지 확인하는 데 사용됩니다. 너무 자주 반복하거나 결과에 집착하지 마세요.
            </p>
            <button
              onClick={handleStart}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
            >
              시작하기
            </button>
          </>
        )}
        {gameState === "waiting" && <p className="text-lg text-yellow-400">초록 화면이 될 때까지 기다리세요...</p>}
        {gameState === "now" && (
          <div className="bg-green-500 p-8 rounded-xl">
            <p className="text-xl font-bold text-black">지금 클릭하세요!</p>
          </div>
        )}
        {gameState === "tooSoon" && (
          <div>
            <p className="text-red-400 text-lg font-bold mb-2">너무 빨랐어요!</p>
            <p className="text-sm text-gray-300">화면 클릭해서 다시 시도</p>
          </div>
        )}
        {gameState === "result" && (
          <div>
            <p className="text-xl font-bold text-green-400 mb-2">반응속도: {reactionTime} ms</p>
            <p className="text-sm text-gray-300">화면 클릭해서 다시 시도</p>
            <p className="mt-4 text-xs text-gray-500">
              빠른 반응에 집착하기보다, 스스로의 집중력과 피로도를 점검하는 데에 이 테스트를 활용해보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
