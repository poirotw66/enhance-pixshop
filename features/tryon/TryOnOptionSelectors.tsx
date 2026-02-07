/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Background and style selectors for AI try-on (catalog-style output).
 */

import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { TRYON_BACKGROUNDS, TRYON_STYLES } from '../../constants/tryOn';
import type { TryOnBackgroundId, TryOnStyleId } from '../../constants/tryOn';

interface TryOnOptionSelectorsProps {
  background: TryOnBackgroundId;
  style: TryOnStyleId;
  onBackgroundChange: (id: TryOnBackgroundId) => void;
  onStyleChange: (id: TryOnStyleId) => void;
  disabled?: boolean;
}

const TryOnOptionSelectors: React.FC<TryOnOptionSelectorsProps> = ({
  background,
  style,
  onBackgroundChange,
  onStyleChange,
  disabled = false,
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div className="flex flex-col gap-3">
        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
          {t('tryon.label.background')}
        </label>
        <div className="flex flex-wrap justify-center gap-2">
          {TRYON_BACKGROUNDS.map((opt) => {
            const isActive = background === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => !disabled && onBackgroundChange(opt.id)}
                disabled={disabled}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/20'
                    : 'bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700 hover:border-teal-500/50'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {t(opt.nameKey)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
          {t('tryon.label.style')}
        </label>
        <div className="flex flex-wrap justify-center gap-2">
          {TRYON_STYLES.map((opt) => {
            const isActive = style === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => !disabled && onStyleChange(opt.id)}
                disabled={disabled}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/20'
                    : 'bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700 hover:border-amber-500/50'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {t(opt.nameKey)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TryOnOptionSelectors;
