/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import WorldMap from './WorldMap';
import TaiwanMap from './TaiwanMap';

interface TravelMapContainerProps {
    selectedSceneId: string;
    onSceneSelect: (id: string) => void;
}

type MapType = 'world' | 'taiwan';

const TravelMapContainer: React.FC<TravelMapContainerProps> = ({ selectedSceneId, onSceneSelect }) => {
    const { t } = useLanguage();
    const [mapType, setMapType] = useState<MapType>('world');

    return (
        <div className="w-full flex flex-col gap-6 animate-fade-in bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-4 rounded-xl border border-gray-700/50 backdrop-blur-sm shadow-2xl">
            {/* Header with toggle */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-300 tracking-wide">
                        {t('travel.map_mode_label')}
                    </label>
                    <p className="text-xs text-gray-500">
                        {t('travel.map_instruction')}
                    </p>
                </div>

                <div className="flex bg-gray-900/70 p-1 rounded-lg border border-gray-700/70 shadow-inner">
                    <button
                        onClick={() => setMapType('world')}
                        className={`px-4 py-2 text-xs font-bold rounded-md transition-all duration-200 ${mapType === 'world'
                            ? 'bg-gradient-to-br from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/30'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                            }`}
                    >
                        🌍 {t('travel.map_world')}
                    </button>
                    <button
                        onClick={() => setMapType('taiwan')}
                        className={`px-4 py-2 text-xs font-bold rounded-md transition-all duration-200 ${mapType === 'taiwan'
                            ? 'bg-gradient-to-br from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/30'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                            }`}
                    >
                        🏝️ {t('travel.map_taiwan')}
                    </button>
                </div>
            </div>

            {/* Map display - only render the active map */}
            <div className="min-h-[450px] flex items-center justify-center">
                {mapType === 'world' && (
                    <div className="w-full animate-fade-in">
                        <WorldMap selectedSceneId={selectedSceneId} onSceneSelect={onSceneSelect} />
                    </div>
                )}
                {mapType === 'taiwan' && (
                    <div className="w-full animate-fade-in">
                        <TaiwanMap selectedSceneId={selectedSceneId} onSceneSelect={onSceneSelect} />
                    </div>
                )}
            </div>

            {/* Selected location indicator */}
            {selectedSceneId && selectedSceneId !== 'custom' && selectedSceneId !== 'random' && (
                <div className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-sm font-medium text-amber-200">
                        {t('travel.result_scene_label')} <span className="font-bold">{t(`travel.scene.${selectedSceneId}`)}</span>
                    </span>
                </div>
            )}
        </div>
    );
};

export default TravelMapContainer;
