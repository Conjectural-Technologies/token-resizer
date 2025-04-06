export function registerSettings() {
  const sizes = [
    { key: "tiny", name: "Tiny", default: 0.5 },
    { key: "sm", name: "Small", default: 1 },
    { key: "med", name: "Medium", default: 1 },
    { key: "lg", name: "Large", default: 2 },
    { key: "huge", name: "Huge", default: 3 },
    { key: "grg", name: "Gargantuan", default: 4 },
  ];

  sizes.forEach(({ key, name, default: defaultValue }) => {
    game.settings.register("token-resizer", `scale-${key}`, {
      name,
      hint: `Specifies the scale factor for tokens of ${name} size.`,
      scope: "world",
      config: true,
      type: Number,
      default: defaultValue,
      range: { min: 0.5, max: 5, step: 0.5 },
    });
  });

  game.settings.registerMenu("token-resizer", "resetSizes", {
    name: "Reset Token Sizes",
    hint: "Reset all token sizes to their default values.",
    label: "Reset",
    icon: "fas fa-undo",
    type: ResetTokenSizesForm,
    restricted: true
  });
}

class ResetTokenSizesForm extends FormApplication {
  constructor(options = {}) {
    super(options);
  }

  render() {
    this.resetToDefaults();
    return null;
  }

  async resetToDefaults() {
    const sizes = [
      { key: "tiny", default: 0.5 },
      { key: "sm", default: 1 },
      { key: "med", default: 1 },
      { key: "lg", default: 2 },
      { key: "huge", default: 3 },
      { key: "grg", default: 4 },
    ];

    for (const { key, default: defaultValue } of sizes) {
      await game.settings.set("token-resizer", `scale-${key}`, defaultValue);
    }
    
    if (game.settings.sheet) {
      game.settings.sheet.render(true);
    }
  }
}