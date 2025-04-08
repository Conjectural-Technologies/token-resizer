# Token Resizer

A Foundry VTT module for applying preconfigured sizes to tokens on the game canvas.

![Version: 1.0.0](https://img.shields.io/badge/version-1.0.0-blue)
![Foundry: v12.331-13](https://img.shields.io/badge/foundry-v12.331--13-green)
![System: dnd5e](https://img.shields.io/badge/system-dnd5e-red)

## Description

Token Resizer provides a streamlined way to adjust token sizes in your Foundry VTT games. With a single click, you can resize selected tokens to match standard D&D 5e creature sizes while simultaneously updating the creature size in the actor data.

## Features

### Quick Size Application
- Resize tokens directly from the token controls menu
- Apply standardized D&D 5e creature sizes with a single click
- Toggle between custom sizes and original sizes

### Included Size Categories
- **Tiny**: 0.5× default size (typically 0.5 grid square)
- **Small**: 1× default size (typically 1 grid square)
- **Medium**: 1× default size (typically 1 grid square)
- **Large**: 2× default size (typically 2×2 grid squares)
- **Huge**: 3× default size (typically 3×3 grid squares)
- **Gargantuan**: 4× default size (typically 4×4 grid squares)

### Token & Actor Integration
- Updates both token dimensions on the canvas
- Automatically updates the actor's size category in its data
- Remembers original token sizes for easy reversion

### Customization
- Configurable scale factors for each size category
- Option to reset size configurations to default values

## Usage

1. Select one or more tokens on the canvas
2. Click the resize icon in the token controls (maximize icon)
3. If tokens have not been resized before:
   - A dialog will appear with available size categories
   - Click on the desired size to apply it to all selected tokens
4. If any selected token has already been resized:
   - Clicking the button will reset all selected tokens to their original sizes

## Configuration

### Size Category Scales
Each size category can be configured from the module settings:
1. Go to Game Settings → Module Settings → Token Resizer
2. Adjust the scale factor for any size category
3. Values represent multipliers of the token's base size (e.g., 2 = twice as large)

### Reset to Defaults
If you need to restore the default scale values:
1. Go to Game Settings → Module Settings → Token Resizer
2. Click the "Reset" button next to "Reset Token Sizes"

## Compatibility

- Requires Foundry VTT v12.331 or later
- Verified compatible with Foundry VTT v13
- Designed for use with the D&D 5e system

## License

This module is licensed under the terms included in the LICENSE file.

## Credits

Developed by [Conjectural Technologies](https://github.com/Conjectural-Technologies)