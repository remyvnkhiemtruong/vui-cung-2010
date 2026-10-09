/**
 * Quiet, bottom-of-screen attribution. Keeps the names visible without
 * competing with the question, answer options or projector leaderboard.
 */
export default function AuthorCredits() {
  return (
    <section className="credit-ribbon" aria-label="Question content and system credits">
      <p className="credit-ribbon-item credit-ribbon-item--questions"
         title="English Teacher, Vo Van Kiet High School">
        <span className="credit-ribbon-label">QUESTION CONTENT</span>
        <strong className="credit-ribbon-name">Ms. Phan Thanh Thuy</strong>
        <span className="credit-ribbon-role">English Teacher, Vo Van Kiet High School</span>
      </p>
      <p className="credit-ribbon-item credit-ribbon-item--system"
         title="Student in Informatics Teacher Education and Information Technology, Faculty of Information Technology, Ho Chi Minh City University of Education">
        <span className="credit-ribbon-label">SYSTEM DEVELOPMENT</span>
        <strong className="credit-ribbon-name">Truong Minh Khiem</strong>
        <span className="credit-ribbon-role">Student in Informatics Teacher Education and Information Technology, Faculty of Information Technology, Ho Chi Minh City University of Education</span>
      </p>
    </section>
  );
}
