/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { generateThemedPhoto } from '../../services/geminiService';
import { useSettings } from '../../contexts/SettingsContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { normalizeApiError } from '../../services/gemini/shared';
import { useHistory } from '../../hooks/useHistory';
import { DEFAULT_THEMED_TYPE } from '../../constants/themed';
import type { ThemedType } from '../../types';

export function useThemed() {
    const { t } = useLanguage();
    const settings = useSettings();
    const [searchParams] = useSearchParams();
    const { addToHistory } = useHistory();

    const [themedFile, setThemedFile] = useState<File | null>(null);
    const [themedResult, setThemedResult] = useState<string | null>(null);
    const [themedLoading, setThemedLoading] = useState(false);
    const [themedError, setThemedError] = useState<string | null>(null);
    const [themedPreviewUrl, setThemedPreviewUrl] = useState<string | null>(null);
    const [themeType, setThemeType] = useState<ThemedType>(DEFAULT_THEMED_TYPE);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const typeParam = searchParams.get('type');
        if (typeParam) {
            setThemeType(typeParam as ThemedType);
        }
    }, [searchParams]);

    useEffect(() => {
        if (themedFile) {
            const u = URL.createObjectURL(themedFile);
            setThemedPreviewUrl(u);
            return () => URL.revokeObjectURL(u);
        } else {
            setThemedPreviewUrl(null);
        }
    }, [themedFile]);

    const handleThemedFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) {
            setThemedFile(f);
            setThemedResult(null);
            setThemedError(null);
        }
        e.target.value = '';
    }, []);

    const handleThemedGenerate = useCallback(async () => {
        if (!themedFile) {
            setThemedError(t('themed.error_no_image'));
            return;
        }
        setThemedError(null);
        setThemedLoading(true);
        setProgress(0);

        try {
            // Simulate progress
            const progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 90) return prev;
                    return prev + Math.random() * 10;
                });
            }, 500);

            const url = await generateThemedPhoto(themedFile, {
                themeType,
                settings: { apiKey: settings.apiKey, model: settings.model },
            });

            clearInterval(progressInterval);
            setProgress(100);
            setThemedResult(url);

            // Add to history
            addToHistory('themed', url, { themeType });
        } catch (err) {
            const normalizedError = normalizeApiError(err, 'themed');
            const errorKey = normalizedError.message || 'error.unknown';
            setThemedError(t(errorKey));
            console.error('Themed generation error:', normalizedError.originalError || err);
        } finally {
            setThemedLoading(false);
            setProgress(0);
        }
    }, [themedFile, themeType, settings.apiKey, settings.model, t, addToHistory]);

    const handleThemedDownload = useCallback(() => {
        if (!themedResult) return;
        const a = document.createElement('a');
        a.href = themedResult;
        a.download = `themed-${Date.now()}.png`;
        a.click();
    }, [themedResult]);

    const clearThemedResult = useCallback(() => {
        setThemedResult(null);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDraggingOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setThemedFile(file);
            setThemedResult(null);
            setThemedError(null);
        }
    }, []);

    return {
        themedFile,
        themedResult,
        themedLoading,
        themedError,
        themedPreviewUrl,
        themeType,
        setThemeType,
        progress,
        handleThemedFileChange,
        handleThemedGenerate,
        handleThemedDownload,
        clearThemedResult,
        isDraggingOver,
        handleDragOver,
        handleDragLeave,
        handleDrop,
    };
}
