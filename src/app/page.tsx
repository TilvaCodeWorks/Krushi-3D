// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert h-5 w-[100px]"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the{" "}
//             <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
//               page.tsx
//             </code>{" "}
//             file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert h-[14px] w-4"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={14}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect } from 'react';
import Hero3D from '@/components/Hero3D';
import ProductCard from '@/components/ProductCard';
import ScrollSection from '@/components/ScrollSection';
import Tractor from '@/components/Tractor';
import Plow from '@/components/Plow';
import Harvester from '@/components/Harvester';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="w-full overflow-x-hidden bg-black text-white">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center">
        <Hero3D scrollY={scrollY} />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <h1 className="text-6xl md:text-7xl font-bold text-center mb-4">
            Agricultural Excellence
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 text-center max-w-2xl">
            Premium farming implements for modern agriculture
          </p>
        </div>
      </section>

      {/* Tractor Section */}
      <ScrollSection delay={0}>
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-12 py-20">
          <div className="w-full md:w-1/2 h-96 md:h-screen">
            <Tractor scrollY={scrollY} />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold">
              Power Tractors
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Engineered for maximum efficiency and durability. Our tractors are built to handle the toughest farming conditions with precision and power.
            </p>
            <ul className="space-y-3">
              {['50-200 HP Range', 'Fuel Efficient', 'All-Terrain Capability', 'Smart Technology'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="mt-8 px-8 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors">
              Explore Tractors
            </button>
          </div>
        </div>
      </ScrollSection>

      {/* Plow Section */}
      <ScrollSection delay={0.2}>
        <div className="min-h-screen flex flex-col md:flex-row-reverse items-center justify-between gap-8 px-6 md:px-12 py-20">
          <div className="w-full md:w-1/2 h-96 md:h-screen">
            <Plow scrollY={scrollY} />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold">
              Advanced Plows
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Precision soil preparation with our cutting-edge plow technology. Maximize yield with optimal soil conditioning.
            </p>
            <ul className="space-y-3">
              {['Variable Depth Control', 'Reduced Fuel Consumption', 'Easy Maintenance', 'Weather Resistant'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
              View Plows
            </button>
          </div>
        </div>
      </ScrollSection>

      {/* Harvester Section */}
      <ScrollSection delay={0.4}>
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-12 py-20">
          <div className="w-full md:w-1/2 h-96 md:h-screen">
            <Harvester scrollY={scrollY} />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold">
              Smart Harvesters
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Automated harvesting solutions with AI-powered precision. Reduce waste and maximize productivity.
            </p>
            <ul className="space-y-3">
              {['AI Navigation', 'Real-time Monitoring', 'Automatic Adjustments', 'Low Vibration'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="mt-8 px-8 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </ScrollSection>

      {/* Product Showcase Section */}
      <section className="min-h-screen px-6 md:px-12 py-20 bg-gradient-to-b from-black to-gray-900">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          Complete Product Range
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: 'Pro Tractor 180', price: '$45,000', color: 'from-green-500' },
            { name: 'Heavy Duty Plow', price: '$8,500', color: 'from-blue-500' },
            { name: 'Max Harvester', price: '$120,000', color: 'from-orange-500' }
          ].map((product, i) => (
            <ProductCard key={i} {...product} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-4">AgriTech</h3>
            <p className="text-gray-400 text-sm">Leading agricultural innovation.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 text-gray-300">Products</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Tractors</a></li>
              <li><a href="#" className="hover:text-white">Plows</a></li>
              <li><a href="#" className="hover:text-white">Harvesters</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 text-gray-300">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 text-gray-300">Follow</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2024 AgriTech. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}