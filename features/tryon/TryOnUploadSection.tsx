/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Upload section for AI try-on: one person photo + multiple clothing photos.
 */

import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import QuantitySelector from '../../components/QuantitySelector';

interface TryOnUploadSectionProps {
  personPreviewUrl: string | null;
  clothingPreviewUrls: string[];
  error: string | null;
  loading: boolean;
  isDraggingOver: boolean;
  canGenerate: boolean;
  minClothing: number;
  maxClothing: number;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  onPersonFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClothingFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveClothing: (index: number) => void;
  onGenerate: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDropPerson: (e: React.DragEvent) => void;
  onDropClothing: (e: React.DragEvent) => void;
}

const TryOnUploadSection: React.FC<TryOnUploadSectionProps> = ({
  personPreviewUrl,
  clothingPreviewUrls,
  error,
  loading,
  isDraggingOver,
  canGenerate,
  minClothing,
  maxClothing,
  quantity,
  onQuantityChange,
  onPersonFileChange,
  onClothingFileChange,
  onRemoveClothing,
  onGenerate,
  onDragOver,
  onDragLeave,
  onDropPerson,
  onDropClothing,
}) => {
  const { t } = useLanguage();
  const hasPerson = personPreviewUrl !== null;
  const clothingCount = clothingPreviewUrls.length;
  const canAddClothing = clothingCount < maxClothing;

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      {/* Person photo */}
      <div
        className={`rounded-2xl border-2 border-dashed p-6 transition-all duration-300 ${
          isDraggingOver ? 'border-teal-400 bg-teal-500/10' : 'border-gray-700 bg-gray-800/20'
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDropPerson}
      >
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
          {t('tryon.person_photo')}
        </h3>
        {personPreviewUrl ? (
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-40 h-52 rounded-xl overflow-hidden border-2 border-gray-700 bg-gray-900">
              <img
                src={personPreviewUrl}
                alt="Person"
                className="w-full h-full object-cover"
              />
            </div>
            <label className="text-sm text-gray-400 cursor-pointer hover:text-teal-400 underline">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onPersonFileChange}
                aria-label={t('tryon.change_person')}
              />
              {t('tryon.change_person')}
            </label>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-2 py-8 rounded-xl border-2 border-dashed border-gray-600 bg-gray-900/40 cursor-pointer hover:border-teal-500 hover:bg-teal-500/5 transition-all">
            <span className="text-4xl">👤</span>
            <span className="text-sm font-medium text-gray-400">{t('tryon.upload_person_hint')}</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onPersonFileChange}
              aria-label={t('tryon.person_photo')}
            />
          </label>
        )}
      </div>

      {/* Clothing photos */}
      <div
        className={`rounded-2xl border-2 border-dashed p-6 transition-all duration-300 ${
          isDraggingOver ? 'border-amber-400/60 bg-amber-500/10' : 'border-gray-700 bg-gray-800/20'
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDropClothing}
      >
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
          {t('tryon.clothing_photos')} ({clothingCount}/{maxClothing})
        </h3>
        <div className="flex flex-wrap gap-4">
          {clothingPreviewUrls.map((url, idx) => (
            <div
              key={idx}
              className="group relative w-28 h-28 rounded-xl overflow-hidden border-2 border-gray-700 bg-gray-900"
            >
              <img src={url} alt={`Clothing ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onRemoveClothing(idx)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                aria-label={t('tryon.remove_clothing')}
              >
                ✕
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-0.5 text-[10px] text-white text-center">
                #{idx + 1}
              </div>
            </div>
          ))}
          {canAddClothing && (
            <label className="w-28 h-28 rounded-xl border-2 border-dashed border-gray-600 bg-gray-900/40 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-amber-500 hover:bg-amber-500/5 transition-all text-gray-500 hover:text-amber-400">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={onClothingFileChange}
                aria-label={t('tryon.add_clothing')}
              />
              <span className="text-2xl">+</span>
              <span className="text-[10px] font-bold uppercase">{t('tryon.add_clothing')}</span>
            </label>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          {t('tryon.clothing_hint')}
        </p>
      </div>

      <div className="w-full max-w-md mx-auto">
        <QuantitySelector
          quantity={quantity}
          onChange={onQuantityChange}
          disabled={loading}
          min={1}
          max={4}
        />
        <p className="text-xs text-gray-500 mt-1 text-center">
          {t('tryon.quantity_hint')}
        </p>
      </div>

      {error && (
        <p className="text-red-400 text-sm font-medium animate-pulse">⚠️ {error}</p>
      )}

      <button
        type="button"
        onClick={onGenerate}
        disabled={loading || !canGenerate}
        className="w-full py-4 px-6 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold rounded-xl shadow-lg shadow-teal-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="animate-spin">⏳</span>
            {t('tryon.generating')}
          </>
        ) : (
          <>
            <span>👗</span>
            {t('tryon.generate_btn')}
          </>
        )}
      </button>
    </div>
  );
};

export default TryOnUploadSection;
