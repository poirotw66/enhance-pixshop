/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { generateThemedPhoto } from '../../services/geminiService';
import { useSettings } from '../../contexts/SettingsContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { DEFAULT_THEMED_TYPE } from '../../constants/themed';
import type { ThemedType } from '../../types';

export function useThemed() {
    const { t } = useLanguage();
    const settings = useSettings();
    const [searchParams] = useSearchParams();

    const [themedFile, setThemedFile] = useState<File | null>(null);
    const [themedResult, setThemedResult] = useState<string | null>(null);
    const [themedLoading, setThemedLoading] = useState(false);
    const [themedError, setThemedError] = useState<string | null>(null);
    const [themedPreviewUrl, setThemedPreviewUrl] = useState<string | null>(null);
    const [themeType, setThemeType] = useState<ThemedType>(DEFAULT_THEMED_TYPE);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

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
        try {
            const url = await generateThemedPhoto(themedFile, {
                themeType,
                settings: { apiKey: settings.apiKey, model: settings.model },
            });
            setThemedResult(url);
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'An unknown error occurred.';
            setThemedError(`Failed: ${msg}`);
        } finally {
            setThemedLoading(false);
        }
    }, [themedFile, themeType, settings.apiKey, settings.model, t]);

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
