"use client";

import { useState } from "react";
import {
  IconStarFilled,
  IconFlame,
  IconLeaf,
  IconChefHat,
} from "@tabler/icons-react";
import { menu, type Badge } from "@/lib/menu";

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
    <section id="menu" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="max-w-lg font-display text-3xl tracking-tight text-ink md:text-5xl text-balance">
          The full menu.
        </h2>
        <p className="mt-4 max-w-md text-sm text-ink-muted">
          Every dish, every price, straight from the kitchen. All prices in
          EGP, subject to 14% tax.
        </p>

        <div
          className="mt-10 flex snap-x gap-2 overflow-x-auto pb-3 md:flex-wrap"
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
                className={`shrink-0 snap-start rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                  isActive
                    ? "bg-accent text-bg"
                    : "bg-bg-raised text-ink-muted hover:text-ink"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {active.note ? (
          <p className="mt-6 text-xs text-ink-faint">{active.note}</p>
        ) : null}

        <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2">
          {active.items.map((item) => (
            <li key={item.name} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-ink">{item.name}</span>
                  {item.isNew ? (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium tracking-wide text-accent">
                      New
                    </span>
                  ) : null}
                </div>
                <span className="shrink-0 whitespace-nowrap font-display text-ink">
                  {item.price}
                  {/^\d+$/.test(item.price) ? " EGP" : ""}
                </span>
              </div>
              {item.description ? (
                <p className="text-sm text-ink-muted">{item.description}</p>
              ) : null}
              {item.badges?.length ? (
                <div className="mt-0.5 flex flex-wrap gap-3">
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
          ))}
        </ul>
      </div>
    </section>
  );
}
