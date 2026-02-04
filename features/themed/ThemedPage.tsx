/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dataURLtoFile } from '../../utils/fileUtils';
import { useLanguage } from '../../contexts/LanguageContext';
import StartTabNav from '../../components/StartTabNav';
import ProgressIndicator from '../../components/ProgressIndicator';
import { useThemed } from './useThemed';
import ThemedForm from './ThemedForm';
import ThemedUploadSection from './ThemedUploadSection';
import ThemedResult from './ThemedResult';

interface ThemedPageProps {
    onImageSelected: (file: File) => void;
}

const ThemedPage: React.FC<ThemedPageProps> = ({ onImageSelected }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const themed = useThemed();

    const handleEditInEditor = () => {
        if (!themed.themedResult) return;
        onImageSelected(dataURLtoFile(themed.themedResult, `themed-${Date.now()}.png`));
    };

    return (
        <div className="w-full max-w-5xl mx-auto text-center p-8 transition-all duration-300 rounded-2xl border-2 border-transparent">
            <div className="flex flex-col items-center gap-6 animate-fade-in">
                <h1 className="text-5xl font-extrabold tracking-tight text-gray-100 sm:text-6xl md:text-7xl">
                    {t('start.title_part1')} <span className="text-purple-400">{t('start.title_part2')}</span>.
                </h1>
                <p className="max-w-2xl text-lg text-gray-400 md:text-xl">
                    {t('start.subtitle')}
                </p>

                <StartTabNav currentTab="themed" navigate={navigate} />

                {themed.themedResult ? (
                    <ThemedResult
                        themedResult={themed.themedResult}
                        themeType={themed.themeType}
                        onDownload={themed.handleThemedDownload}
                        onAgain={themed.clearThemedResult}
                        onEditInEditor={handleEditInEditor}
                    />
                ) : themed.themedLoading ? (
                    <ProgressIndicator
                        progress={themed.progress}
                        statusMessages={['themed.generating']}
                    />
                ) : (
                    <>
                        <ThemedForm
                            themeType={themed.themeType}
                            setThemeType={themed.setThemeType}
                            disabled={themed.themedLoading}
                        />
                        <ThemedUploadSection
                            themedFile={themed.themedFile}
                            themedPreviewUrl={themed.themedPreviewUrl}
                            themedError={themed.themedError}
                            themedLoading={themed.themedLoading}
                            isDraggingOver={themed.isDraggingOver}
                            onFileChange={themed.handleThemedFileChange}
                            onGenerate={themed.handleThemedGenerate}
                            onDragOver={themed.handleDragOver}
                            onDragLeave={themed.handleDragLeave}
                            onDrop={themed.handleDrop}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ThemedPage;
