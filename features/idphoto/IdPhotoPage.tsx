/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dataURLtoFile } from '../../utils/fileUtils';
import { useLanguage } from '../../contexts/LanguageContext';
import StartTabNav from '../../components/StartTabNav';
import Spinner from '../../components/Spinner';
import { useIdPhoto } from './useIdPhoto';
import IdPhotoForm from './IdPhotoForm';
import IdPhotoUploadSection from './IdPhotoUploadSection';
import IdPhotoResult from './IdPhotoResult';

interface IdPhotoPageProps {
  onImageSelected: (file: File) => void;
}

const IdPhotoPage: React.FC<IdPhotoPageProps> = ({ onImageSelected }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const id = useIdPhoto();

  const handleEditInEditor = () => {
    if (!id.idPhotoResult) return;
    onImageSelected(dataURLtoFile(id.idPhotoResult, `id-photo-${Date.now()}.png`));
  };

  return (
    <div className="w-full max-w-5xl mx-auto text-center p-8 transition-all duration-300 rounded-2xl border-2 border-transparent">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-100 sm:text-6xl md:text-7xl">
          {t('start.title_part1')} <span className="text-blue-400">{t('start.title_part2')}</span>.
        </h1>
        <p className="max-w-2xl text-lg text-gray-400 md:text-xl">
          {t('start.subtitle')}
        </p>

        <StartTabNav currentTab="idphoto" navigate={navigate} />

        {id.idPhotoResult ? (
          <IdPhotoResult
            idPhotoResult={id.idPhotoResult}
            idPhotoType={id.idPhotoType}
            idPhotoRetouchLevel={id.idPhotoRetouchLevel}
            idPhotoOutputSpec={id.idPhotoOutputSpec}
            idPhotoClothingOption={id.idPhotoClothingOption}
            onDownload={id.handleIdPhotoDownload}
            onAgain={id.clearIdPhotoResult}
            onEditInEditor={handleEditInEditor}
          />
        ) : id.idPhotoLoading ? (
          <div className="flex flex-col items-center gap-4 w-full max-w-md animate-fade-in bg-gray-800/40 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm">
            <Spinner />
            <p className="text-gray-300">{t('start.idphoto_generating')}</p>
          </div>
        ) : (
          <>
            <IdPhotoForm
              idPhotoType={id.idPhotoType}
              setIdPhotoType={id.setIdPhotoType}
              idPhotoRetouchLevel={id.idPhotoRetouchLevel}
              setIdPhotoRetouchLevel={id.setIdPhotoRetouchLevel}
              idPhotoOutputSpec={id.idPhotoOutputSpec}
              setIdPhotoOutputSpec={id.setIdPhotoOutputSpec}
              idPhotoClothingOption={id.idPhotoClothingOption}
              setIdPhotoClothingOption={id.setIdPhotoClothingOption}
              idPhotoClothingCustomText={id.idPhotoClothingCustomText}
              setIdPhotoClothingCustomText={id.setIdPhotoClothingCustomText}
              idPhotoClothingReferenceFile={id.idPhotoClothingReferenceFile}
              setIdPhotoClothingReferenceFile={id.setIdPhotoClothingReferenceFile}
              idPhotoClothingReferenceUrl={id.idPhotoClothingReferenceUrl}
              disabled={id.idPhotoLoading}
            />
            <IdPhotoUploadSection
              idPhotoFile={id.idPhotoFile}
              idPhotoPreviewUrl={id.idPhotoPreviewUrl}
              idPhotoError={id.idPhotoError}
              idPhotoLoading={id.idPhotoLoading}
              isDraggingOver={id.isDraggingOver}
              onFileChange={id.handleIdPhotoFileChange}
              onGenerate={id.handleIdPhotoGenerate}
              onDragOver={id.handleDragOver}
              onDragLeave={id.handleDragLeave}
              onDrop={id.handleDrop}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default IdPhotoPage;
