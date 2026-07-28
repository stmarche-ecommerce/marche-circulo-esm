export const clientPanelClasses = {
  panelRoot:
    "min-w-0 flex-1 bg-[#f6efe4] text-[#2b1c14] [font-family:var(--font-inter),sans-serif]",
  main: "w-full max-w-[98%] px-6 py-7 md:px-12 md:pt-8 md:pb-16",
  eyebrow:
    "mb-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9d341f]",
  heroTitle:
    "mb-4 max-w-[760px] text-[32px] leading-[1.06] font-normal tracking-[-0.03em] text-[#25160f] [font-family:var(--font-fraunces),serif] md:text-[58px]",
  pageTitle:
    "mb-2.5 text-[30px] leading-[1.1] font-medium [font-family:var(--font-fraunces),serif] md:text-[34px]",
  heroSub: "mb-6 max-w-[760px] text-[15px] leading-[1.55] text-[#684031] md:text-[18px] md:leading-[1.45]",
  pageSub: "mb-5 max-w-[600px] text-[15px] leading-[1.6] text-[#5b4d40]",
  primaryButton:
    "focus-ring inline-flex cursor-pointer items-center gap-2 rounded-[12px] bg-[#a33a24] px-6 py-4 text-[12px] font-semibold tracking-[0.08em] text-white no-underline hover:bg-[#912f1c]",
  heroRow: "mb-8 flex flex-col items-start",
  heroLeft: "w-full",
  statusCol: "hidden",
  miniStats: "hidden",
  miniCard: "",
  miniCardLabel: "",
  miniCardNum: "",
  highlightCard:
    "mb-7 flex min-h-[130px] items-center justify-between gap-6 rounded-[20px] bg-[linear-gradient(90deg,#5a291a_0%,#9d341f_100%)] px-9 py-8 text-white shadow-[0_18px_40px_rgba(90,41,26,0.18)]",
  highlightCopy: "max-w-[720px]",
  highlightEyebrow:
    "mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e0a13f]",
  highlightTitle:
    "mb-1 text-[24px] leading-[1.15] font-medium [font-family:var(--font-fraunces),serif] md:text-[28px]",
  highlightText: "text-[14px] leading-[1.55] text-[#f6ddd3] md:text-[15px]",
  highlightIcon:
    "hidden text-[42px] md:block",
  card:
    "mb-6 rounded-[22px] border border-[#e6d7c1] bg-[#fffdf9] p-5 shadow-[0_10px_24px_rgba(81,46,30,0.05)] md:p-7",
  cardTitle:
    "mb-[18px] mt-0.5 text-[22px] font-medium text-[#23140e] [font-family:var(--font-fraunces),serif] md:text-[24px]",
  benefitsGrid:
    "grid grid-cols-1 gap-5 md:grid-cols-2",
  benefitCard:
    "rounded-[16px] border border-[#e6d7c1] bg-[#fbf6ee] p-5",
  benefitCardTitle:
    "mb-2 text-[18px] font-medium text-[#261610] [font-family:var(--font-fraunces),serif]",
  benefitCardText: "mb-4 text-[14px] leading-[1.55] text-[#684031]",
  benefitUsage: "mb-4 flex items-center gap-3",
  usageTrack:
    "h-[7px] flex-1 overflow-hidden rounded-full bg-[#e6d8c2]",
  usageFill: "h-full rounded-full bg-[#9d341f]",
  usageLabel:
    "whitespace-nowrap text-[12px] text-[#7d2c1d] [font-family:var(--font-jetbrains-mono),monospace]",
  benefitAction:
    "focus-ring inline-flex items-center rounded-[10px] bg-[#a33a24] px-4 py-3 text-[12px] font-semibold tracking-[0.04em] text-white no-underline hover:bg-[#912f1c]",
  footnote:
    "mt-5 border-t border-[#e6d7c1] pt-3.5 text-[12.5px] leading-[1.7] text-[#8a7d6f]",
  inlineAction: "focus-ring cursor-pointer text-[#8d301d] underline",
  benefitBlock:
    "mb-6 rounded-[24px] border border-[#e7ddc9] bg-[#fffdf9] p-5 shadow-[0_24px_60px_rgba(71,42,35,0.05)] md:p-7",
  benefitHead: "mb-6 flex items-start justify-between gap-5",
  benefitTitleRow: "flex items-center gap-4",
  benefitIcon:
    "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#fbf1e2] text-[22px] text-[#6e2418]",
  benefitBlockTitle:
    "text-[24px] font-medium text-[#23140e] [font-family:var(--font-fraunces),serif] md:text-[28px]",
  ruleGrid:
    "mb-5 grid grid-cols-1 gap-4 md:grid-cols-3",
  rule: "rounded-[16px] border border-[#e7ddc9] bg-[#fbf7ee] p-5",
  ruleLabel:
    "mb-2 text-[11px] uppercase tracking-[0.12em] text-[#8a7d6f]",
  ruleValue:
    "text-[18px] font-medium text-[#23140e] [font-family:var(--font-fraunces),serif] md:text-[22px]",
  benefitNote:
    "mt-5 text-[14px] leading-[1.8] text-[#5b4d40]",
  benefitActionRow: "mt-5",
  footnoteBlock:
    "mt-2 rounded-[18px] border border-[#e7ddc9] bg-[#fbf7ee] px-5 py-[18px] text-[13px] leading-[1.6] text-[#5b4d40]",
  historyCard: "mb-8 rounded-[22px] border border-[#e6d7c1] bg-[#fffdf9] p-5 shadow-[0_10px_24px_rgba(81,46,30,0.05)] md:p-7",
  historyTableWrap: "w-full overflow-x-auto",
  historyTable:
    "w-full min-w-[420px] border-collapse text-[13.5px] [&_th]:border-b [&_th]:border-[#e7ddc9] [&_th]:pb-2.5 [&_th]:text-left [&_th]:text-[11px] [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-[0.12em] [&_th]:text-[#8a7d6f] [&_td]:border-b [&_td]:border-[#e7ddc9] [&_td]:py-4 [&_td]:text-[#3d2f24] [&_tbody_tr:last-child_td]:border-b-0 md:min-w-0",
  tag:
    "inline-block rounded-full bg-[#f1e6d6] px-3 py-1 text-[11.5px] font-medium text-[#6e2418]",
  steps: "flex flex-col gap-3",
  step:
    "flex items-start gap-4 rounded-xl border border-[#e7ddc9] bg-[#fbf7ee] px-5 py-4 text-[14px] leading-[1.5] text-[#3d2f24]",
  stepNumber:
    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#e7ddc9] bg-[#fffdf9] text-[12px] font-semibold text-[#8b2e20]",
  bazarCard:
    "rounded-[24px] border border-dashed border-[#edc98d] bg-[#f8ebd9] p-6",
  bazarTitle:
    "mb-3 mt-1.5 text-[22px] font-medium text-[#5c3d18] [font-family:var(--font-fraunces),serif]",
  bazarText: "max-w-[760px] text-[14px] leading-[1.8] text-[#6b4a20] md:text-[15px]",
  filters: "mb-7 flex flex-wrap gap-2.5",
  filter:
    "focus-ring cursor-pointer rounded-full border px-[18px] py-[9px] text-[13px]",
  filterInactive: "border-[#e7ddc9] bg-[#fffdf9] text-[#5b4d40] hover:border-[#d6c7b7]",
  filterActive: "border-[#8b2e20] bg-[#8b2e20] font-medium text-white",
  categoryBlock: "mb-9",
  categoryTitle:
    "mb-1 text-[20px] font-medium [font-family:var(--font-fraunces),serif]",
  categoryDesc: "mb-4 text-[13px] text-[#8a7d6f]",
  promoGrid:
    "grid w-full grid-cols-1 gap-[18px] md:grid-cols-2 xl:grid-cols-3",
  promoCard:
    "relative w-full min-w-0 rounded-[22px] border border-[#e7ddc9] bg-[#fffdf9] p-[18px] shadow-[0_20px_40px_rgba(71,42,35,0.04)]",
  discountBadge:
    "absolute right-3.5 top-3.5 rounded-full bg-[#8b2e20] px-2.5 py-[5px] text-[12px] font-semibold text-white",
  promoImage:
    "mb-3.5 flex h-[110px] w-full items-center justify-center rounded-xl bg-[#f1e6d6] text-[28px] text-[#c9a86a]",
  promoTitle:
    "mb-1 text-[16px] font-medium [font-family:var(--font-fraunces),serif]",
  promoStore: "mb-3 text-[12px] text-[#8a7d6f]",
  priceRow: "mb-1 flex items-baseline gap-2",
  priceOld: "text-[13px] text-[#8a7d6f] line-through",
  priceNew:
    "text-[18px] font-medium text-[#6e2418] [font-family:var(--font-jetbrains-mono),monospace]",
  validity: "text-[11.5px] text-[#8a7d6f]",
  profileGrid:
    "grid grid-cols-1 gap-[18px] md:grid-cols-2",
  profileField:
    "rounded-xl border border-[#e7ddc9] bg-[#fbf7ee] p-4",
  profileLabel:
    "mb-1.5 text-[11px] uppercase tracking-[0.05em] text-[#8a7d6f]",
  profileValue: "text-[15px] text-[#2b1c14]",
  sidebar:
    "flex w-full shrink-0 flex-col justify-between bg-[linear-gradient(180deg,#412d45_0%,#241621_100%)] px-5 py-6 text-[#f2e9e4] [font-family:var(--font-inter),sans-serif] md:sticky md:top-0 md:h-screen md:w-[276px]",
  brand:
    "mb-5 flex items-center gap-3 px-1 py-1",
  brandIcon:
    "flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] bg-[#d89a3a] text-[#fff4dc]",
  brandText: "text-[12px] tracking-[0.14em] text-[#f2dfcf] uppercase",
  brandTextStrong: "inline font-medium text-[#f7efe7]",
  profileCard:
    "mb-6 flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.07] px-4 py-4",
  profileAvatar:
    "flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#d89a3a] text-[#43263d]",
  profileMeta: "min-w-0",
  profileName: "truncate text-[15px] font-medium text-white",
  profileSince: "text-[11.5px] leading-[1.4] text-[#d8cdc6]",
  greeting: "hidden",
  greetingStrong: "",
  sidebarNav: "mt-2 flex flex-col gap-2",
  navItem:
    "focus-ring flex w-full items-center gap-3 rounded-[12px] px-4 py-3 text-left text-[14px] no-underline ",
  navItemActive: "bg-[#fffdf9] font-medium text-[#2b1c14]",
  navIcon: "w-[16px] shrink-0 text-center opacity-90",
  curadoriaBox: "hidden",
  curadoriaEyebrow: "hidden",
  signout:
    "focus-ring mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] border border-white/[0.18] bg-transparent p-[11px] text-[12px] font-semibold tracking-[0.06em] text-[#f2e9e4] hover:bg-white/5",
} as const;
