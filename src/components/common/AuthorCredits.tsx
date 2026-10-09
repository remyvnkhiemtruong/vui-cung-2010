/**
 * Balanced and lightly highlighted credits at the bottom of the screen.
 * Names remain unaccented as requested, with full details available on hover.
 */
export default function AuthorCredits(){
  return <section className="credit-ribbon" aria-label="Question content and system credits">
    <div className="credit-ribbon-item credit-ribbon-item--questions"
      title="Mrs. Phan Thanh Thuy - English Teacher, Vo Van Kiet High School">
      <div className="credit-ribbon-heading">
        <span className="credit-ribbon-label">QUESTION CONTENT</span>
        <strong className="credit-ribbon-name">Mrs. Phan Thanh Thuy</strong>
      </div>
      <span className="credit-ribbon-role">English Teacher, Vo Van Kiet High School</span>
    </div>
    <div className="credit-ribbon-item credit-ribbon-item--system"
      title="Truong Minh Khiem - Student in Informatics Teacher Education and Information Technology, Faculty of Information Technology, Ho Chi Minh City University of Education">
      <div className="credit-ribbon-heading">
        <span className="credit-ribbon-label">SYSTEM DEVELOPMENT</span>
        <strong className="credit-ribbon-name">Truong Minh Khiem</strong>
      </div>
      <span className="credit-ribbon-role">Informatics Teacher Education &amp; IT Student, Faculty of Information Technology, HCMUE</span>
    </div>
  </section>;
}
