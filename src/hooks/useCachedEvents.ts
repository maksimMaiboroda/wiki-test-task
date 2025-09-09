import { useEffect, useCallback, useState } from 'react';
import { useLazyGetOnThisDayEventsQuery } from '@/services/wikiApi';
import { getTodayMD } from '@utils/index';
import type { OnThisDayEvent } from '@services/types/wikiApi';

const CACHE_KEY_PREFIX = 'wiki-events-';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000;

export const useCachedEvents = () => {
  const [trigger, { data: events, isFetching, error }] = useLazyGetOnThisDayEventsQuery();
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cachedEvents, setCachedEvents] = useState<OnThisDayEvent[]>([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    if (error) {
      setOpenErrorModal(true);

      if ('status' in error) {
        switch (error.status) {
          case 404:
            setErrorMessage('No events found for today. Please try again later.');
            break;
          case 500:
            setErrorMessage('Wikipedia server is temporarily unavailable. Please try again later.');
            break;
          default:
            setErrorMessage(
              'There was a problem fetching Wikipedia events. Please try again later.'
            );
        }
      } else {
        setErrorMessage('Network error. Please check your internet connection.');
      }

      console.error({ error });
    }
  }, [error]);

  const closeErrorModal = useCallback(() => {
    setOpenErrorModal(false);
  }, []);

  const getCacheKey = useCallback(() => {
    const today = getTodayMD();
    return `${CACHE_KEY_PREFIX}${today.month}-${today.day}`;
  }, []);

  const loadFromCache = useCallback(() => {
    try {
      const cacheKey = getCacheKey();
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const now = Date.now();

        if (now - timestamp < CACHE_EXPIRY_MS) {
          setCachedEvents(data);
          return data;
        } else {
          localStorage.removeItem(cacheKey);
        }
      }
    } catch (error) {
      console.error('Failed to load from cache:', error);
    }
    return null;
  }, [getCacheKey]);

  const saveToCache = useCallback(
    (data: OnThisDayEvent[]) => {
      try {
        const cacheKey = getCacheKey();
        const cacheData = {
          data,
          timestamp: Date.now(),
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      } catch (error) {
        console.error('Failed to save to cache:', error);
      }
    },
    [getCacheKey]
  );

  const loadEvents = useCallback(async () => {
    const cachedData = loadFromCache();
    if (cachedData && cachedData.length > 0) {
      setCachedEvents(cachedData);
    }

    if (!isOffline) {
      try {
        const result = await trigger(getTodayMD());
        if (result.data) {
          setCachedEvents(result.data);
          saveToCache(result.data);
        }
      } catch (error) {
        console.error('Failed to load events:', error);
        if (cachedData && cachedData.length > 0) {
          setCachedEvents(cachedData);
        }
      }
    }
  }, [trigger, isOffline, loadFromCache, saveToCache]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    events: events || cachedEvents,
    loadEvents,
    isFetching,
    error,
    isOffline,
    hasCachedData: cachedEvents.length > 0,
    openErrorModal,
    closeErrorModal,
    errorMessage,
  };
};
