export enum HarmonyKey {
  analogous = "analogous",
  monochromatic = "monochromatic",
  triad = "triad",
  complementary = "complementary",
  splitComplementary = "splitComplementary",
  doubleSplitComplementary = "doubleSplitComplementary",
  square = "square"
}

export const HARMONIES: {
  [key in HarmonyKey]: (
    h: number,
    s: number,
    l: number
  ) => {
    h: number;
    s: number;
    l: number;
  }[];
} = {
  analogous: (h: number, s: number, l: number) => {
    return [
      { h: (h - 30) % 360, s, l },
      { h: (h - 15) % 360, s, l },
      { h, s, l },
      { h: (h + 15) % 360, s, l },
      { h: (h + 30) % 360, s, l }
    ];
  },
  monochromatic: (h: number, s: number, l: number) => {
    return [
      { h, s: s * 0.7, l },
      { h, s: s * 0.7, l: l * 0.5 },
      { h, s, l },
      { h, s, l: l * 0.8 },
      { h, s, l: l * 0.5 }
    ];
  },
  triad: (h: number, s: number, l: number) => {
    return [
      { h: (h - 120) % 360, s, l },
      { h: (h - 120) % 360, s: s * 0.6, l },
      { h, s, l },
      { h: (h + 120) % 360, s: s * 0.6, l },
      { h: (h + 120) % 360, s, l }
    ];
  },
  complementary: (h: number, s: number, l: number) => {
    return [
      { h: (h - 180) % 360, s, l },
      { h: (h - 180) % 360, s: s * 0.8, l },
      { h, s, l },
      { h, s: s * 0.8, l },
      { h, s: s * 0.8, l: l * 0.8 }
    ];
  },
  splitComplementary: (h: number, s: number, l: number) => {
    return [
      { h: (h - 150) % 360, s, l },
      { h: (h - 150) % 360, s: s * 0.8, l: l * 0.8 },
      { h, s, l },
      { h: (h + 150) % 360, s, l },
      { h: (h + 150) % 360, s: s * 0.8, l: l * 0.8 }
    ];
  },
  doubleSplitComplementary: (h: number, s: number, l: number) => {
    return [
      { h: (h - 150) % 360, s, l: l * 0.8 },
      { h: (h - 30) % 360, s, l },
      { h, s, l },
      { h: (h + 30) % 360, s, l },
      { h: (h + 150) % 360, s, l: l * 0.8 }
    ];
  },
  square: (h: number, s: number, l: number) => {
    return [
      { h: (h - 180) % 360, s, l },
      { h: (h - 90) % 360, s, l },
      { h, s, l },
      { h, s: s * 0.8, l },
      { h: (h + 90) % 360, s, l }
    ];
  }
};
