import { BookOpenText, Code2 } from 'lucide-react';

interface AuthorCreditsProps {
  /** Feature cards on the welcome screen; compact cards throughout gameplay. */
  variant?: 'feature' | 'compact';
}

export default function AuthorCredits({ variant = 'compact' }: AuthorCreditsProps) {
  return (
    <section className={`author-credits author-credits--${variant}`} aria-label="Question author and system developer">
      <article className="author-credit author-credit--questions">
        <div className="author-credit-heading">
          <span className="author-credit-symbol" aria-hidden="true"><BookOpenText size={15} strokeWidth={2.4} /></span>
          <span className="author-credit-label">QUESTION CONTENT</span>
        </div>
        <strong className="author-credit-name">Ms. Phan Thanh Thùy</strong>
        <span className="author-credit-role">English Teacher · Vo Van Kiet High School</span>
      </article>
      <article className="author-credit author-credit--system">
        <div className="author-credit-heading">
          <span className="author-credit-symbol" aria-hidden="true"><Code2 size={15} strokeWidth={2.4} /></span>
          <span className="author-credit-label">SYSTEM DEVELOPMENT</span>
        </div>
        <strong className="author-credit-name">Trương Minh Khiêm</strong>
        <span className="author-credit-role">Cohort 52 Student · Ho Chi Minh City University of Education</span>
      </article>
    </section>
  );
}
