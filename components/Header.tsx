/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CogIcon } from './icons';
import SettingsModal from './SettingsModal';

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624l-.219.874-.219-.874a1.5 1.5 0 00-1.023-1.023l-.874-.219.874-.219a1.5 1.5 0 001.023-1.023l.219-.874.219.874a1.5 1.5 0 001.023 1.023l.874.219-.874.219a1.5 1.5 0 00-1.023 1.023z" />
  </svg>
);

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
        <header className="w-full max-w-[1600px] mx-auto my-4 px-4 md:px-8 py-4 border border-gray-700/50 rounded-xl bg-gray-800/40 backdrop-blur-md sticky top-4 z-40 shadow-lg shadow-black/20">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-default">
                <SparkleIcon className="w-6 h-6 text-blue-400" />
                <h1 className="text-xl font-bold tracking-tight text-gray-100">
                {t('app.title')}
                </h1>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    aria-label="Settings"
                >
                    <CogIcon className="w-5 h-5" />
                </button>

                <button
                    onClick={() => setLanguage(language === 'en' ? 'zh-TW' : 'en')}
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 bg-white/10 px-3 py-1.5 rounded-md border border-white/10 hover:bg-white/20 hover:border-white/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                    {language === 'en' ? '中文' : 'English'}
                </button>
            </div>
        </div>
        </header>
        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default Header;
