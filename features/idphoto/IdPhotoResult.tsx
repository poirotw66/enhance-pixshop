/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSettings } from '../../contexts/SettingsContext';
import {
  ID_PHOTO_TYPES,
  RETOUCH_LEVELS,
  OUTPUT_SPECS,
  CLOTHING_OPTIONS,
} from '../../constants/idPhoto';
import type { IdPhotoType, RetouchLevel, OutputSpec, ClothingOption } from '../../constants/idPhoto';

interface IdPhotoResultProps {
  idPhotoResult: string;
  idPhotoType: IdPhotoType;
  idPhotoRetouchLevel: RetouchLevel;
  idPhotoOutputSpec: OutputSpec;
  idPhotoClothingOption: ClothingOption;
  onDownload: () => void;
  onAgain: () => void;
  onEditInEditor: () => void;
}

const IdPhotoResult: React.FC<IdPhotoResultProps> = ({
  idPhotoResult,
  idPhotoType,
  idPhotoRetouchLevel,
  idPhotoOutputSpec,
  idPhotoClothingOption,
  onDownload,
  onAgain,
  onEditInEditor,
}) => {
  const { t } = useLanguage();
  const settings = useSettings();

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl animate-fade-in bg-gray-800/40 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white">{t('start.idphoto_title')}</h3>
      <div className="w-full aspect-[3/4] max-h-[400px] rounded-lg overflow-hidden border border-gray-600 bg-white flex items-center justify-center">
        <img src={idPhotoResult} alt="ID photo" className="max-w-full max-h-full w-auto h-auto object-contain" />
      </div>
      <div className="w-full text-left">
        <h4 className="text-sm font-medium text-gray-400 mb-2">{t('idphoto.result.params_title')}</h4>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-300">
          <span><span className="text-gray-500">{t('idphoto.label.type')}:</span> {t(ID_PHOTO_TYPES.find(x => x.id === idPhotoType)?.nameKey ?? '')}</span>
          <span><span className="text-gray-500">{t('idphoto.label.level')}:</span> {t(RETOUCH_LEVELS.find(x => x.id === idPhotoRetouchLevel)?.nameKey ?? '')}</span>
          <span><span className="text-gray-500">{t('idphoto.label.spec')}:</span> {t(OUTPUT_SPECS.find(x => x.id === idPhotoOutputSpec)?.nameKey ?? '')}</span>
          <span><span className="text-gray-500">{t('idphoto.label.clothing')}:</span> {t(CLOTHING_OPTIONS.find(x => x.id === idPhotoClothingOption)?.nameKey ?? '')}</span>
          <span><span className="text-gray-500">{t('settings.model')}:</span> {settings.model === 'gemini-3-pro-image-preview' ? t('settings.model.pro') : t('settings.model.flash')}</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onDownload}
          className="bg-gradient-to-br from-green-600 to-green-500 text-white font-bold py-3 px-5 rounded-lg transition-all duration-200 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          {t('start.idphoto_download')}
        </button>
        <button
          onClick={onAgain}
          className="bg-white/10 border border-white/20 text-gray-200 font-semibold py-3 px-5 rounded-lg transition-colors duration-200 hover:bg-white/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          {t('start.idphoto_again')}
        </button>
        <button
          onClick={onEditInEditor}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-5 rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          {t('start.idphoto_edit')}
        </button>
      </div>
    </div>
  );
};

export default IdPhotoResult;
