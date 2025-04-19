import React, { Suspense } from 'react';
import ThreeLayout from '@/layouts/three-layout';
import LoadingComponent from '@/components/common/loading/loading';
import { sections } from '@/routers/three/sections';

const ThreeTop = React.lazy(sections.threeTop);
const ThreeBottom = React.lazy(sections.threeBottom);
const ThreeLeft = React.lazy(sections.threeLeft);
const ThreeRight = React.lazy(sections.threeRight);
const ThreeCenter = React.lazy(sections.threeCenter);

const ThreeHome = () => {
  return (
    <ThreeLayout
      top={
        <Suspense fallback={<LoadingComponent />}>
          <ThreeTop />
        </Suspense>
      }
      bottom={
        <Suspense fallback={<LoadingComponent />}>
          <ThreeBottom />
        </Suspense>
      }
      left={
        <Suspense fallback={<LoadingComponent />}>
          <ThreeLeft />
        </Suspense>
      }
      right={
        <Suspense fallback={<LoadingComponent />}>
          <ThreeRight />
        </Suspense>
      }
      center={
        <Suspense fallback={<LoadingComponent />}>
          <ThreeCenter />
        </Suspense>
      }
    />
  );
};

export default ThreeHome;