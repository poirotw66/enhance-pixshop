/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { ThemeType } from '../contexts/ThemeContext';

export const getThemeClasses = (theme: ThemeType) => {
  if (theme === 'newyear') {
    return {
      primary: 'red',
      primaryHover: 'red-500',
      primaryLight: 'red-400',
      primaryDark: 'red-600',
      primaryGradient: 'from-red-600 to-red-500',
      primaryGradientHover: 'from-red-500 to-red-400',
      bgCard: 'bg-red-900/30',
      bgCardHover: 'bg-red-500/20',
      bgOverlay: 'bg-red-900/40',
      bgHeader: 'bg-red-900/40',
      textPrimary: 'text-red-50',
      textSecondary: 'text-red-200',
      textMuted: 'text-red-300',
      border: 'border-red-700/50',
      borderHover: 'border-red-600',
      accent: 'yellow-400',
      accentHover: 'yellow-500',
      accentGradient: 'from-yellow-500 to-yellow-400',
      success: 'green',
      successHover: 'green-500',
      successGradient: 'from-green-600 to-green-500',
      shadowPrimary: 'shadow-red-500/20',
      shadowPrimaryHover: 'shadow-red-500/40',
      shadowAccent: 'shadow-yellow-500/20',
      shadowAccentHover: 'shadow-yellow-500/40',
      focusRing: 'focus:ring-red-500',
      focusRingAccent: 'focus:ring-yellow-500',
    };
  }

  if (theme === 'bloom') {
    return {
      primary: 'fuchsia',
      primaryHover: 'fuchsia-500',
      primaryLight: 'fuchsia-400',
      primaryDark: 'fuchsia-600',
      primaryGradient: 'from-fuchsia-600 to-pink-500',
      primaryGradientHover: 'from-fuchsia-500 to-pink-400',
      bgCard: 'bg-gray-800',
      bgCardHover: 'bg-white/10',
      bgOverlay: 'bg-black/20',
      bgHeader: 'bg-gray-800/40',
      textPrimary: 'text-gray-100',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400',
      border: 'border-gray-700',
      borderHover: 'border-gray-600',
      accent: 'pink-400',
      accentHover: 'pink-500',
      accentGradient: 'from-pink-500 to-fuchsia-400',
      success: 'green',
      successHover: 'green-500',
      successGradient: 'from-green-600 to-green-500',
      shadowPrimary: 'shadow-fuchsia-500/20',
      shadowPrimaryHover: 'shadow-fuchsia-500/40',
      shadowAccent: 'shadow-pink-500/20',
      shadowAccentHover: 'shadow-pink-500/40',
      focusRing: 'focus:ring-fuchsia-500',
      focusRingAccent: 'focus:ring-pink-500',
    };
  }

  // Night (深夜)
  return {
    primary: 'blue',
    primaryHover: 'blue-500',
    primaryLight: 'blue-400',
    primaryDark: 'blue-600',
    primaryGradient: 'from-blue-600 to-blue-500',
    primaryGradientHover: 'from-blue-500 to-blue-400',
    bgCard: 'bg-gray-800',
    bgCardHover: 'bg-white/10',
    bgOverlay: 'bg-black/20',
    bgHeader: 'bg-gray-800/40',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    border: 'border-gray-700',
    borderHover: 'border-gray-600',
    accent: 'cyan-400',
    accentHover: 'cyan-500',
    accentGradient: 'from-cyan-500 to-cyan-400',
    success: 'green',
    successHover: 'green-500',
    successGradient: 'from-green-600 to-green-500',
    shadowPrimary: 'shadow-blue-500/20',
    shadowPrimaryHover: 'shadow-blue-500/40',
    shadowAccent: 'shadow-cyan-500/20',
    shadowAccentHover: 'shadow-cyan-500/40',
    focusRing: 'focus:ring-blue-500',
    focusRingAccent: 'focus:ring-cyan-500',
  };
};
