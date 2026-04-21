import { topics } from '../data/topics';
import { Section } from './Section';
import { TopicCard } from './TopicCard';

export function Topics() {
  return (
    <Section
      id="topics"
      eyebrow="The syllabus"
      title={
        <>
          Four corners of{' '}
          <span className="hand-underline">the exam</span>.
        </>
      }
      subtitle="Tap any card to unfold the study brief. Don't try to eat them all in one sitting — they're meant to be chewed."
    >
      <div className="flex flex-col gap-4">
        {topics.map((t, i) => (
          <TopicCard key={t.id} topic={t} index={i} />
        ))}
      </div>
    </Section>
  );
}
