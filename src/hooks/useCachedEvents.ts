import { useEffect, useCallback, useState } from 'react';
import { useLazyGetOnThisDayEventsQuery } from '@/services/wikiApi';
import type { OnThisDayEvent } from '@services/types/wikiApi';

export const useCachedEvents = () => {
  const [trigger, { data, isFetching, error }] = useLazyGetOnThisDayEventsQuery();
  const [cachedData, setCachedData] = useState<OnThisDayEvent[]>([]);
  const [openErrorModal, setOpenErrorModal] = useState(false);

  useEffect(() => {
    if (error) {
      setOpenErrorModal(true);
      console.error({ error });
    }
  }, [error]);

  const closeErrorModal = useCallback(() => {
    setOpenErrorModal(false);
  }, []);

  const loadEvents = useCallback(
    async (data: { month: number; day: number }) => {
      const cacheKey = `events-${data.month}-${data.day}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        setCachedData(JSON.parse(cached));
      }

      console.log({ data });
      const result = await trigger(data);
      if (result.data) {
        localStorage.setItem(cacheKey, JSON.stringify(result.data));
        setCachedData(result.data);
      }
    },
    [trigger]
  );

  return {
    events: data || cachedData,
    loadEvents,
    isFetching,
    error,
    openErrorModal,
    closeErrorModal,
  };
};
