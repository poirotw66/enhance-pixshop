/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Try-on background and style options for catalog-style, fashionable output.
 */

export type TryOnBackgroundId =
  | 'studio'
  | 'rural_equestrian'
  | 'winter_mountain'
  | 'luxury_travel'
  | 'urban_sporty'
  | 'minimal_editorial';

export type TryOnStyleId =
  | 'equestrian_chic'
  | 'winter_wonderland'
  | 'luxury_travel'
  | 'sporty_chic'
  | 'editorial_high'
  | 'athleisure';

export interface TryOnBackgroundOption {
  id: TryOnBackgroundId;
  nameKey: string;
  promptHint: string;
}

export interface TryOnStyleOption {
  id: TryOnStyleId;
  nameKey: string;
  promptHint: string;
}

export const TRYON_BACKGROUNDS: TryOnBackgroundOption[] = [
  {
    id: 'studio',
    nameKey: 'tryon.background.studio',
    promptHint:
      'Clean, professional studio setting. Neutral seamless backdrop or soft gradient. Even, flattering lighting. High-end catalog look.',
  },
  {
    id: 'rural_equestrian',
    nameKey: 'tryon.background.rural_equestrian',
    promptHint:
      'Rustic rural or equestrian setting. Classic Land Rover Defender, wooden barn or stable, dirt or gravel. Sophisticated outdoor, aspirational lifestyle.',
  },
  {
    id: 'winter_mountain',
    nameKey: 'tryon.background.winter_mountain',
    promptHint:
      'Picturesque winter scene. Snow-covered ground, mountains in the distance, evergreen trees. Clear sky. Winter wonderland, cozy yet chic.',
  },
  {
    id: 'luxury_travel',
    nameKey: 'tryon.background.luxury_travel',
    promptHint:
      'Luxury travel setting. Premium SUV (e.g. black G-Wagen) with door open, lush foliage, autumn tones. Travel-ready, aspirational and desirable.',
  },
  {
    id: 'urban_sporty',
    nameKey: 'tryon.background.urban_sporty',
    promptHint:
      'Urban, sporty backdrop. Luxury car or modern architecture. Upscale outdoor feel. Active lifestyle, dynamic and fashionable.',
  },
  {
    id: 'minimal_editorial',
    nameKey: 'tryon.background.minimal_editorial',
    promptHint:
      'Minimal, high-end editorial. Soft shadows, clean lines, premium magazine style. Focus on the outfit, covetable and luxurious.',
  },
];

export const TRYON_STYLES: TryOnStyleOption[] = [
  {
    id: 'equestrian_chic',
    nameKey: 'tryon.style.equestrian_chic',
    promptHint:
      'Equestrian chic. Form-fitting activewear, confident stance. Sophisticated, active yet refined. Makes people want to buy.',
  },
  {
    id: 'winter_wonderland',
    nameKey: 'tryon.style.winter_wonderland',
    promptHint:
      'Winter wonderland fashion. Layered pieces, cozy yet chic. Fluffy accessories, warm boots. Aspirational winter style.',
  },
  {
    id: 'luxury_travel',
    nameKey: 'tryon.style.luxury_travel',
    promptHint:
      'Luxury travel athleisure. Coordinated outfit, travel-ready, premium feel. Sophisticated and desirable.',
  },
  {
    id: 'sporty_chic',
    nameKey: 'tryon.style.sporty_chic',
    promptHint:
      'Sporty chic. Tennis or active lifestyle vibe. Coordinated set, white sneakers, dynamic pose. Energetic and fashionable.',
  },
  {
    id: 'editorial_high',
    nameKey: 'tryon.style.editorial_high',
    promptHint:
      'High fashion editorial. Magazine-cover quality. Striking pose, covetable look. Very fashionable, makes people want to buy.',
  },
  {
    id: 'athleisure',
    nameKey: 'tryon.style.athleisure',
    promptHint:
      'Modern athleisure. Comfortable yet stylish. Lifestyle shot that feels aspirational and on-trend.',
  },
];

export const DEFAULT_TRYON_BACKGROUND: TryOnBackgroundId = 'studio';
export const DEFAULT_TRYON_STYLE: TryOnStyleId = 'editorial_high';
