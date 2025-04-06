import { registerSettings } from "./token-resizer-config.js";

const originalTokenSizes = new Map();

const SIZE_LABELS = {
  tiny: "Tiny", sm: "Small", med: "Medium", 
  lg: "Large", huge: "Huge", grg: "Gargantuan"
};

Hooks.once("init", () => registerSettings());

class TokenResizerDialog extends Dialog {
  constructor(tokens) {
    const sizeScaleMap = Object.fromEntries(
      Object.entries(SIZE_LABELS).map(([key, name]) => [
        key,
        { key, name, scale: game.settings.get("token-resizer", `scale-${key}`) }
      ])
    );

    const buttons = [
      ...Object.entries(sizeScaleMap).map(([id, config]) => ({
        action: id,
        label: config.name
      })),
      { action: "cancel", label: "Cancel", className: "cancel-button" }
    ];

    let dialogContent = `
      <form>
        <div class="size-buttons-grid">
          ${buttons.map(btn => 
            `<button type="button" data-action="${btn.action}" class="size-button ${btn.className || ''}">
              ${btn.label}
            </button>`
          ).join('')}
        </div>
      </form>`;

    super({
      title: "Token Resizer",
      content: dialogContent,
      buttons: {},
      default: "cancel"
    });

    this.tokens = tokens;
    this.sizeScaleMap = sizeScaleMap;
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find('.size-button').click(this._onButtonClick.bind(this));
  }

  async _onButtonClick(event) {
    event.preventDefault();
    const action = event.currentTarget.dataset.action;
    
    if (action === "cancel") {
      this.close();
      return;
    }

    const selectedSizeKey = action;
    const newDimension = this.sizeScaleMap[selectedSizeKey]?.scale || 1;

    try {
      await this._resizeTokens(selectedSizeKey, newDimension);
    } catch (error) {
      console.error("Token resize operation failed:", error);
    }

    this.close();
  }
  
  async _resizeTokens(selectedSizeKey, newDimension) {
    await Promise.all(this.tokens.map(async (token) => {
      try {
        if (!originalTokenSizes.has(token.id)) {
          originalTokenSizes.set(token.id, { 
            width: token.document.width, 
            height: token.document.height, 
            size: token.actor?.system.traits.size 
          });
        }
        
        if (token.actor) {
          await token.actor.update({ "system.traits.size": selectedSizeKey })
            .catch(error => console.error(`Failed to update actor size for ${token.name}:`, error));
        }
        
        await token.document.update({ width: newDimension, height: newDimension });
      } catch (tokenError) {
        console.error(`Failed to resize token ${token.name}:`, tokenError);
      }
    }));
  }
}

function showTokenResizerDialog() {
  const tokens = canvas.tokens.controlled;
  if (!tokens?.length) return;
  
  new TokenResizerDialog(tokens).render(true);
}

async function resetTokenSizes() {
  const tokens = canvas.tokens.controlled;
  if (!tokens?.length) return;

  const tokensToReset = tokens.filter(token => originalTokenSizes.has(token.id));
  if (!tokensToReset.length) return;

  for (const token of tokensToReset) {
    const originalSize = originalTokenSizes.get(token.id);
    if (!originalSize) continue;

    try {
      await token.document.update({ 
        width: originalSize.width, 
        height: originalSize.height 
      });
      
      if (token.actor && originalSize.size) {
        await token.actor.update({ "system.traits.size": originalSize.size })
          .catch(error => console.error(`Failed to update actor size for ${token.name}:`, error));
      }
      
      originalTokenSizes.delete(token.id);
    } catch (error) {
      console.error(`Failed to reset token size for ${token.name}:`, error);
    }
  }
}

Hooks.on("getSceneControlButtons", (controls) => {
  const tokenControls = controls.find(control => control.name === "token");
  if (!tokenControls) return;
  
  tokenControls.tools.push({
    name: "tokenResizer",
    title: "Token Resizer",
    icon: "fas fa-maximize",
    onClick: () => {
      const tokens = canvas.tokens.controlled;
      tokens.some(token => originalTokenSizes.has(token.id)) 
        ? resetTokenSizes() 
        : showTokenResizerDialog();
    },
    button: true,
  });
});