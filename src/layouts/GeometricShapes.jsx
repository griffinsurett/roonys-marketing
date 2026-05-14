// src/components/shapes/ShapesBackground.jsx
import React from 'react';
import Circle from '../components/shapes/Circle';
import Triangle from '../components/shapes/Triangle';
import Rectangle from '../components/shapes/Rectangle';

/**
 * ShapesBackground renders a set of geometric shapes as a reusable background.
 * Shapes are 2/3 size on mobile, 3/4 on tablet (sm), and full size on desktop (lg).
 */
const GeometricShapes = ({ className = 'absolute inset-0 overflow-hidden', ...props }) => (
  <div className={className} {...props}>
    {/* Original: w-80 h-80 */}
    <Circle className="absolute -top-20 -right-20 
      w-52 h-52       /* 2/3 of 80 */
      sm:w-60 sm:h-60 /* 3/4 of 80 */
      lg:w-80 lg:h-80 /* full */ 
      bg-cyan-400 opacity-70 animate-float" />

    {/* Original: w-32 h-32 */}
    <div className="absolute top-10 left-10">
      <Circle className="
        w-20 h-20       /* 2/3 of 32 */
        sm:w-24 sm:h-24 /* 3/4 of 32 */
        lg:w-32 lg:h-32 /* full */
        bg-yellow-400 opacity-80 animate-orbit" />
    </div>

    {/* Triangle with border‑b-[120px] */}
    <Triangle
      direction="up"
      className="
        absolute top-1/4 right-1/4
        border-b-[80px] border-l-[53px] border-r-[53px]        /* 2/3 of 120 / 80 */
        sm:border-b-[90px] sm:border-l-[60px] sm:border-r-[60px]/* 3/4 of 120 / 80 */
        lg:border-b-[120px] lg:border-l-[80px] lg:border-r-[80px]/* full */
        border-b-purple-400 opacity-60 animate-drift" />

    {/* Original: w-96 h-96 */}
    <Circle className="
      absolute -bottom-32 left-1/3
      w-64 h-64       /* 2/3 of 96 */
      sm:w-72 sm:h-72 /* 3/4 of 96 */
      lg:w-96 lg:h-96 /* full */
      bg-purple-400 opacity-30 animate-wiggle" />

    {/* Original: w-16 h-16 */}
    <Rectangle
      className="
        absolute bottom-20 right-20
        w-10 h-10       /* 2/3 of 16 */
        sm:w-12 sm:h-12 /* 3/4 of 16 */
        lg:w-16 lg:h-16 /* full */
        bg-pink-300 opacity-70 rotate-45 animate-bounce-custom" />

    {/* Original: w-12 h-12 */}
    <Rectangle
      className="
        absolute top-1/3 left-1/4
        w-8 h-8         /* 2/3 of 12 */
        sm:w-9 sm:h-9   /* 3/4 of 12 (≈9) */
        lg:w-12 lg:h-12 /* full */
        bg-pink-400 opacity-60 rotate-12 animate-slide" />

    {/* Original: w-24 h-40 */}
    <Rectangle
      className="
        absolute bottom-1/3 right-10
        w-16 h-26       /* 2/3 of w-24/h-40 */
        sm:w-18 sm:h-30 /* 3/4 of w-24/h-40 */
        lg:w-24 lg:h-40 /* full */
        bg-orange-400 opacity-60 rotate-12 rounded-lg animate-float"
      style={{ animationDelay: '2s' }} />

    {/* Original: w-40 h-40 */}
    <Circle className="
      absolute top-1/2 -left-10
      w-26 h-26       /* 2/3 of 40 */
      sm:w-30 sm:h-30 /* 3/4 of 40 */
      lg:w-40 lg:h-40 /* full */
      bg-blue-400 opacity-60 animate-pulse-move" />

    {/* Original: w-20 h-20 */}
    <Circle
      className="
        absolute top-20 right-1/3
        w-13 h-13       /* 2/3 of 20 */
        sm:w-15 sm:h-15 /* 3/4 of 20 */
        lg:w-20 lg:h-20 /* full */
        bg-green-400 opacity-50 animate-drift"
      style={{ animationDelay: '3s' }} />

    {/* Original: w-14 h-14 */}
    <div className="absolute bottom-40 left-20">
      <Rectangle
        className="
          w-9 h-9          /* 2/3 of 14 */
          sm:w-10 sm:h-10  /* 3/4 of 14 */
          lg:w-14 lg:h-14  /* full */
          bg-yellow-300 opacity-70 rotate-45 animate-orbit" />
    </div>
  </div>
);

export default GeometricShapes;
