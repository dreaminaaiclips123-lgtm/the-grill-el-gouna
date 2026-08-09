"use client";

import { useState } from "react";
import {
  IconStarFilled,
  IconFlame,
  IconLeaf,
  IconChefHat,
} from "@tabler/icons-react";
import { menu, type Badge } from "@/lib/menu";
import { Reveal } from "./Reveal";

const BADGE_META: Record<Badge, { icon: typeof IconFlame; label: string }> = {
  bestseller: { icon: IconStarFilled, label: "Best seller" },
  spicy: { icon: IconFlame, label: "Spicy" },
  vegetarian: { icon: IconLeaf, label: "Vegetarian" },
  chef: { icon: IconChefHat, label: "Chef special" },
};

export function Menu() {
  const [activeId, setActiveId] = useState(menu[0].id);
  const active = menu.find((category) => category.id === activeId) ?? menu[0];

  return (
    <section id="menu" className="relative bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="max-w-lg font-display text-3xl tracking-tight text-ink md:text-5xl text-balance">
            The full menu.
          </h2>
          <p className="mt-4 max-w-md text-sm text-ink-muted">
            Every dish, every price, straight from the kitchen. All prices in
            EGP, subject to 14% tax.
          </p>
        </Reveal>

        <div className="texture-grate relative mt-10 -mx-6 overflow-x-auto rounded-xl px-6 py-3 md:mx-0 md:overflow-visible md:rounded-2xl">
          <div
            className="flex snap-x gap-2 md:flex-wrap"
            role="tablist"
            aria-label="Menu categories"
          >
            {menu.map((category) => {
              const isActive = category.id === activeId;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(category.id)}
                  className={`shrink-0 snap-start rounded-full border px-4 py-2 text-sm transition-all duration-200 ${
                    isActive
                      ? "border-accent bg-accent text-bg shadow-[var(--shadow-ember)]"
                      : "border-line bg-bg-raised text-ink-muted hover:border-ink-faint hover:text-ink"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {active.note ? (
          <p className="mt-6 text-xs text-ink-faint">{active.note}</p>
        ) : null}

        <ul
          key={active.id}
          className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {active.items.map((item, i) => (
            <Reveal key={item.name} delay={Math.min(i, 6) * 0.04} y={14}>
              <li className="group relative flex h-full flex-col gap-2 overflow-hidden rounded-xl border border-line/70 bg-bg-raised px-5 py-4 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent-soft hover:bg-bg-raised-2">
                <div
                  className="texture-grain pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
                  aria-hidden="true"
                />
                <div className="relative flex items-baseline justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-ink">{item.name}</span>
                    {item.isNew ? (
                      <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium tracking-wide text-accent">
                        New
                      </span>
                    ) : null}
                  </div>
                  <span className="shrink-0 whitespace-nowrap font-display text-lg tabular-nums text-accent">
                    {item.price}
                    {/^\d+$/.test(item.price) ? " EGP" : ""}
                  </span>
                </div>
                {item.description ? (
                  <p className="text-sm text-ink-muted">{item.description}</p>
                ) : null}
                {item.badges?.length ? (
                  <div className="mt-1 flex flex-wrap gap-3">
                    {item.badges.map((badge) => {
                      const meta = BADGE_META[badge];
                      const Icon = meta.icon;
                      return (
                        <span
                          key={badge}
                          className="inline-flex items-center gap-1 text-xs text-ink-faint"
                        >
                          <Icon className="h-3 w-3" aria-hidden="true" />
                          {meta.label}
                        </span>
                      );
                    })}
                  </div>
                ) : null}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
