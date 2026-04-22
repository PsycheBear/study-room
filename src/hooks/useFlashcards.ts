import { useCallback, useMemo, useState } from 'react';
import { flashcards as source, type Flashcard } from '../data/flashcards';
import type { TopicKey } from '../data/topics';
import { shuffle } from '../lib/utils';
import { useLocalStorage } from './useLocalStorage';
import { KEYS } from '../lib/storageKeys';
import { play } from '../lib/sound';

export type FlashFilter = 'all' | 'unknown' | 'known';

export function useFlashcards() {
  const [known, setKnown] = useLocalStorage<string[]>(
    KEYS.flashcardsKnown,
    [],
  );
  const [filter, setFilter] = useState<FlashFilter>('all');
  const [topicFilter, setTopicFilter] = useState<TopicKey | null>(null);
  const [order, setOrder] = useState<Flashcard[]>(source);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const knownSet = useMemo(() => new Set(known), [known]);

  const visible = useMemo(() => {
    let list = order;
    if (topicFilter) list = list.filter((c) => c.topic === topicFilter);
    if (filter === 'known') return list.filter((c) => knownSet.has(c.id));
    if (filter === 'unknown') return list.filter((c) => !knownSet.has(c.id));
    return list;
  }, [filter, topicFilter, knownSet, order]);

  const safeIndex = Math.min(index, Math.max(visible.length - 1, 0));
  const current = visible[safeIndex];

  const go = useCallback(
    (delta: number) => {
      setFlipped(false);
      setIndex((i) => {
        if (!visible.length) return 0;
        const next = (i + delta + visible.length) % visible.length;
        return next;
      });
      play('swipe');
    },
    [visible.length],
  );

  const next = useCallback(() => go(1), [go]);
  const prev = useCallback(() => go(-1), [go]);

  const flip = useCallback(() => {
    setFlipped((f) => !f);
    play('flip');
  }, []);

  const toggleKnown = useCallback(
    (id: string) => {
      let becameKnown = false;
      setKnown((prev) => {
        if (prev.includes(id)) {
          return prev.filter((k) => k !== id);
        }
        becameKnown = true;
        return [...prev, id];
      });
      if (becameKnown) play('known');
      else play('tap');
    },
    [setKnown],
  );

  const shuffleDeck = useCallback(() => {
    setOrder((prev) => shuffle(prev));
    setIndex(0);
    setFlipped(false);
    play('swipe');
  }, []);

  const changeFilter = useCallback((f: FlashFilter) => {
    setFilter(f);
    setIndex(0);
    setFlipped(false);
  }, []);

  const changeTopicFilter = useCallback((t: TopicKey | null) => {
    setTopicFilter(t);
    setIndex(0);
    setFlipped(false);
  }, []);

  const totalKnown = knownSet.size;
  const totalAll = source.length;

  return {
    current,
    visible,
    index: safeIndex,
    flipped,
    filter,
    topicFilter,
    knownSet,
    totalKnown,
    totalAll,
    next,
    prev,
    flip,
    toggleKnown,
    shuffleDeck,
    changeFilter,
    changeTopicFilter,
  };
}
