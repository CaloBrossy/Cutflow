export type NavIconVariant =
  | "dashboard"
  | "calendar"
  | "clients"
  | "chat"
  | "analytics"
  | "portfolio"

type Color = [number, number, number, number]

const colors: Record<NavIconVariant, Color> = {
  dashboard: [0.478, 0.333, 0.984, 1],
  calendar: [0.129, 0.588, 0.953, 1],
  clients: [0.133, 0.773, 0.369, 1],
  chat: [0.973, 0.451, 0.133, 1],
  analytics: [0.925, 0.282, 0.6, 1],
  portfolio: [0.063, 0.725, 0.505, 1],
}

const rotationByVariant: Record<NavIconVariant, number> = {
  dashboard: 0,
  calendar: 12,
  clients: -10,
  chat: 8,
  analytics: 18,
  portfolio: -18,
}

const sizeByVariant: Record<NavIconVariant, number> = {
  dashboard: 22,
  calendar: 20,
  clients: 24,
  chat: 18,
  analytics: 26,
  portfolio: 23,
}

function createRingLayer(color: Color, rotation: number, size: number) {
  return {
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "ring",
    sr: 1,
    ks: {
      o: { a: 1, k: [{ t: 0, s: [0] }, { t: 18, s: [70] }, { t: 60, s: [0] }, { t: 90, s: [0] }] },
      r: { a: 1, k: [{ t: 0, s: [0] }, { t: 90, s: [rotation] }] },
      p: { a: 0, k: [32, 32, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 1, k: [{ t: 0, s: [35, 35, 100] }, { t: 45, s: [120, 120, 100] }, { t: 90, s: [35, 35, 100] }] },
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [size, size] }, nm: "Ellipse Path 1" },
          { ty: "st", c: { a: 0, k: color }, o: { a: 0, k: 100 }, w: { a: 0, k: 3 }, lc: 2, lj: 2, nm: "Stroke 1" },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
        ],
        nm: "Ellipse 1",
      },
    ],
    ip: 0,
    op: 90,
    st: 0,
    bm: 0,
  }
}

function createDotLayer(color: Color, x: number, y: number, scaleBoost: number) {
  return {
    ddd: 0,
    ind: 2,
    ty: 4,
    nm: "dot",
    sr: 1,
    ks: {
      o: { a: 1, k: [{ t: 0, s: [20] }, { t: 18, s: [85] }, { t: 45, s: [40] }, { t: 90, s: [20] }] },
      r: { a: 0, k: 0 },
      p: { a: 1, k: [{ t: 0, s: [32, 32, 0] }, { t: 45, s: [x, y, 0] }, { t: 90, s: [32, 32, 0] }] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 1, k: [{ t: 0, s: [75, 75, 100] }, { t: 30, s: [scaleBoost, scaleBoost, 100] }, { t: 90, s: [75, 75, 100] }] },
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [14, 14] }, nm: "Ellipse Path 1" },
          { ty: "fl", c: { a: 0, k: color }, o: { a: 0, k: 100 }, nm: "Fill 1" },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
        ],
        nm: "Ellipse 1",
      },
    ],
    ip: 0,
    op: 90,
    st: 0,
    bm: 0,
  }
}

const dotPositionByVariant: Record<NavIconVariant, [number, number, number]> = {
  dashboard: [42, 22, 120],
  calendar: [22, 20, 125],
  clients: [42, 42, 118],
  chat: [44, 34, 130],
  analytics: [22, 44, 135],
  portfolio: [18, 32, 128],
}

export function getNavIconAnimation(variant: NavIconVariant) {
  const color = colors[variant]
  const rotation = rotationByVariant[variant]
  const size = sizeByVariant[variant]
  const [dotX, dotY, dotScale] = dotPositionByVariant[variant]

  return {
    v: "5.7.15",
    fr: 60,
    ip: 0,
    op: 90,
    w: 64,
    h: 64,
    nm: `nav-icon-${variant}`,
    ddd: 0,
    assets: [],
    layers: [
      createRingLayer(color, rotation, size),
      createDotLayer(color, dotX, dotY, dotScale),
    ],
  } as const
}
