/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { CogIcon } from './icons';
import SettingsModal from './SettingsModal';

/** BloomRender logo for header (product branding) */
const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <img
    src="/logo/bloomrender_bg.png"
    alt="BloomRender"
    className={className}
    width={36}
    height={36}
  />
);

/** Bloom (繁花) theme icon – flower */
const BloomIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4m0 12v4M2 12h4m12 0h4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.07 4.93l-2.83 2.83M6.34 17.66l-2.83 2.83" />
  </svg>
);

/** Night (深夜) theme icon */
const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

/** New Year (新年) theme icon */
const FirecrackerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 1 3 2.48Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.546 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
  </svg>
);

interface HeaderProps {
  onImageSelected?: (file: File) => void;
}

const Header: React.FC<HeaderProps> = ({ onImageSelected }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
        <header className={`w-full max-w-[1600px] mx-auto my-4 px-4 md:px-8 py-4 border rounded-2xl backdrop-blur-md sticky top-4 z-40 shadow-xl transition-colors duration-300 ${
          theme === 'newyear'
            ? 'border-red-700/50 bg-red-900/40 shadow-red-900/20'
            : theme === 'bloom'
              ? 'border-fuchsia-500/20 bg-gray-800/50 shadow-fuchsia-500/5'
              : 'border-slate-600/40 bg-gray-800/50 shadow-slate-500/5'
        }`}>
        <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity duration-200">
                <span className="flex shrink-0 w-9 h-9 rounded-xl overflow-hidden bg-white/5 ring-1 ring-white/10">
                  <LogoIcon className="w-full h-full object-contain" />
                </span>
                <div className="flex flex-col">
                  <h1 className={`text-xl font-bold tracking-tight ${
                    theme === 'newyear' ? 'text-red-50' : theme === 'bloom' ? 'text-gray-100' : 'text-gray-100'
                  }`}>
                    {t('app.title')}
                  </h1>
                  <span className={`text-xs font-normal ${
                    theme === 'newyear' ? 'text-red-200' : theme === 'bloom' ? 'text-fuchsia-200' : 'text-slate-300'
                  }`}>
                    {t('app.slogan')}
                  </span>
                </div>
            </Link>

            <div className="flex items-center gap-2">
                <span className="flex rounded-lg border border-gray-600/80 bg-gray-900/40 p-0.5" role="group" aria-label="Theme">
                  <button
                    onClick={() => setTheme('bloom')}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                      theme === 'bloom'
                        ? 'bg-fuchsia-500/30 text-fuchsia-200 shadow-inner focus:ring-fuchsia-500'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 focus:ring-fuchsia-500'
                    }`}
                    aria-label={t('theme.bloom')}
                    aria-pressed={theme === 'bloom'}
                  >
                    <BloomIcon className="w-4 h-4" />
                    {t('theme.bloom')}
                  </button>
                  <button
                    onClick={() => setTheme('night')}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                      theme === 'night'
                        ? 'bg-slate-500/30 text-slate-200 shadow-inner focus:ring-blue-500'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 focus:ring-blue-500'
                    }`}
                    aria-label={t('theme.night')}
                    aria-pressed={theme === 'night'}
                  >
                    <MoonIcon className="w-4 h-4" />
                    {t('theme.night')}
                  </button>
                  <button
                    onClick={() => setTheme('newyear')}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                      theme === 'newyear'
                        ? 'bg-red-500/30 text-red-200 shadow-inner focus:ring-red-500'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 focus:ring-red-500'
                    }`}
                    aria-label={t('theme.newyear')}
                    aria-pressed={theme === 'newyear'}
                  >
                    <FirecrackerIcon className="w-4 h-4" />
                    {t('theme.newyear')}
                  </button>
                </span>

                <button
                    onClick={() => setIsSettingsOpen(true)}
                    className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 hover:bg-white/10 ${
                      theme === 'newyear'
                        ? 'text-red-200 hover:text-red-50 focus:ring-red-500'
                        : theme === 'bloom'
                          ? 'text-gray-300 hover:text-white focus:ring-fuchsia-500'
                          : 'text-slate-300 hover:text-white focus:ring-blue-500'
                    }`}
                    aria-label="Settings"
                >
                    <CogIcon className="w-5 h-5" />
                </button>

                <button
                    onClick={() => setLanguage(language === 'en' ? 'zh-TW' : 'en')}
                    className={`text-sm font-medium transition-colors duration-200 bg-white/10 px-3 py-1.5 rounded-md border border-white/10 hover:bg-white/20 hover:border-white/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                      theme === 'newyear'
                        ? 'text-red-200 hover:text-red-50 focus:ring-red-500'
                        : theme === 'bloom'
                          ? 'text-gray-300 hover:text-white focus:ring-fuchsia-500'
                          : 'text-slate-300 hover:text-white focus:ring-blue-500'
                    }`}
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
