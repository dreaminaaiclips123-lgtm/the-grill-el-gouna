import Image, { type StaticImageData } from "next/image";
import { findItem } from "@/lib/menu";
import { Reveal } from "./Reveal";

import filletMignon from "@/public/images/fillet-mignon.jpg";
import lambChops from "@/public/images/lamb-chops.jpg";
import tarb from "@/public/images/tarb.jpg";
import rotisserieChicken from "@/public/images/rotisserie-chicken.jpg";
import tableyaTray from "@/public/images/tableya-tray.jpg";

const DISHES: { name: string; image: StaticImageData }[] = [
  { name: "Fillet Mignon", image: filletMignon },
  { name: "Lamb Chops", image: lambChops },
  { name: "Tarb", image: tarb },
  { name: "Charcoal Rotisserie Chicken", image: rotisserieChicken },
  { name: "Grill's Tableya - Tray", image: tableyaTray },
];

export function SignatureDishes() {
  return (
    <section id="dishes" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="max-w-lg font-display text-3xl tracking-tight text-ink md:text-5xl text-balance">
            Off the charcoal.
          </h2>
        </Reveal>
      </div>

      <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:mt-16 md:gap-6 md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        {DISHES.map(({ name, image }) => {
          const found = findItem(name);
          if (!found) return null;
          const { item } = found;
          return (
            <article
              key={name}
              className="group relative w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl bg-bg-raised shadow-[0_0_0_rgba(0,0,0,0)] transition-shadow duration-500 ease-out hover:shadow-[0_18px_60px_-12px_var(--color-accent-soft)] sm:w-[46vw] md:w-[30vw] lg:w-[24vw]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={image}
                  alt={`${name}, charcoal-grilled and plated`}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 30vw, 24vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg leading-tight tracking-tight text-ink">
                    {name.replace(" - Tray", "")}
                  </h3>
                  <span className="shrink-0 whitespace-nowrap font-display text-base text-accent">
                    {item.price} EGP
                  </span>
                </div>
                {item.description ? (
                  <p className="mt-2 text-sm text-ink-muted line-clamp-2">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
