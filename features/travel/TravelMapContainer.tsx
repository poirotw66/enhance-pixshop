/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { TravelSceneCategory } from '../../constants/travel';
import WorldMap from './WorldMap';
import TaiwanMap from './TaiwanMap';

interface TravelMapContainerProps {
    selectedSceneId: string;
    onSceneSelect: (id: string) => void;
}

type MapType = 'world' | 'taiwan';
type CategoryFilter = TravelSceneCategory | 'all';

const TravelMapContainer: React.FC<TravelMapContainerProps> = ({ selectedSceneId, onSceneSelect }) => {
    const { t } = useLanguage();
    const [mapType, setMapType] = useState<MapType>('world');
    const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('scenery');

    return (
        <div className="w-full flex flex-col gap-6 animate-fade-in bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-4 rounded-xl border border-gray-700/50 backdrop-blur-sm shadow-2xl">
            {/* Header with toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-300 tracking-wide uppercase">
                        {t('travel.map_mode_label')}
                    </label>
                    <p className="text-xs text-gray-500">
                        {t('travel.map_instruction')}
                    </p>
                </div>

                <div className="flex bg-gray-950/50 p-1 rounded-xl border border-gray-700/50 shadow-inner overflow-hidden">
                    <button
                        onClick={() => setMapType('world')}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-300 flex items-center gap-2 ${mapType === 'world'
                            ? 'bg-gradient-to-br from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/30'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                            }`}
                    >
                        🌍 {t('travel.map_world')}
                    </button>
                    <button
                        onClick={() => setMapType('taiwan')}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-300 flex items-center gap-2 ${mapType === 'taiwan'
                            ? 'bg-gradient-to-br from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/30'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                            }`}
                    >
                        🏝️ {t('travel.map_taiwan')}
                    </button>
                </div>
            </div>

            {/* Category Filter - Only for Taiwan Map */}
            {mapType === 'taiwan' && (
                <div className="flex items-center justify-center -mt-2">
                    <div className="flex bg-gray-900/40 p-1 rounded-lg border border-gray-700/30">
                        {(['scenery', 'food', 'all'] as const).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`px-4 py-1.5 text-[10px] font-bold rounded-md transition-all duration-200 ${categoryFilter === cat
                                    ? cat === 'food'
                                        ? 'bg-orange-600/80 text-white shadow-sm'
                                        : 'bg-indigo-600/80 text-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                    }`}
                            >
                                {cat === 'scenery' && '🏞️ '}
                                {cat === 'food' && '🍜 '}
                                {cat === 'all' && '✨ '}
                                {t(`travel.category.${cat}`)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Map display - only render the active map */}
            <div className="min-h-[450px] flex items-center justify-center rounded-xl overflow-hidden bg-gray-950/20">
                {mapType === 'world' && (
                    <div className="w-full animate-fade-in">
                        <WorldMap selectedSceneId={selectedSceneId} onSceneSelect={onSceneSelect} />
                    </div>
                )}
                {mapType === 'taiwan' && (
                    <div className="w-full animate-fade-in">
                        <TaiwanMap
                            selectedSceneId={selectedSceneId}
                            onSceneSelect={onSceneSelect}
                            categoryFilter={categoryFilter}
                        />
                    </div>
                )}
            </div>

            {/* Selected location indicator */}
            {selectedSceneId && selectedSceneId !== 'custom' && selectedSceneId !== 'random' && (
                <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                    <span className="text-sm font-medium text-amber-100/90">
                        {t('travel.result_scene_label')} <span className="font-bold text-amber-400">
                            {t(`travel.scene.${selectedSceneId}`) === `travel.scene.${selectedSceneId}`
                                ? t(`travel.food.${selectedSceneId.replace('food_', '')}`)
                                : t(`travel.scene.${selectedSceneId}`)}
                        </span>
                    </span>
                </div>
            )}
        </div>
    );
};

export default TravelMapContainer;
