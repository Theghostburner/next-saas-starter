import styled from 'styled-components';
import Accordion from 'components/Accordion';
import SectionTitle from 'components/SectionTitle';

export default function FaqSection() {
  return (
    <Wrapper>
      <SectionTitle>Frequently asked question</SectionTitle>
      <Accordion title="What is Skille?">
      Skille is an innovative and personalized learning platform designed for tech students and developers. It offers custom learning plans, hands-on projects, and adaptive intelligence to accelerate skill development and foster practical understanding.
      </Accordion>
      <Accordion title="How does Skille work?">
      Skille allows users to create a personalized learning plan based on their preferences and time constraints. The platform offers curated resources and practical projects to enhance learning outcomes. Its adaptive intelligence provides targeted recommendations and challenges to optimize the learning experience.
      </Accordion>
      <Accordion title="What sets Skille apart from other learning platforms?">
      Skille stands out with its adaptive learning approach, tailored curriculum, and gamified reward system that keeps learners engaged. It offers a comprehensive library of curated content and specialized certified courses, making it a unique and comprehensive learning solution.
      </Accordion>
      <Accordion title="Can Skille be used by beginners and advanced learners alike?">
      Absolutely! Skille caters to learners of all proficiency levels. The platform adapts to each user's learning pace and provides content ranging from foundational to advanced levels, making it suitable for beginners and experienced tech enthusiasts alike.
      </Accordion>
      <Accordion title="Are the courses on Skille self-paced?">
      Yes, courses on Skille are designed to be self-paced. Users can select their preferred timeline and adjust their learning journey based on their availability and pace.
      </Accordion>
      <Accordion title="How does Skille ensure the quality of its content?">
      Skille carefully curates its content from reputable and reliable sources, ensuring that users have access to high-quality and up-to-date learning resources. The platform continuously updates its content to reflect the latest industry trends and advancements. 
      </Accordion>
      <Accordion title="Does Skille offer any certification upon course completion?">
      Yes, Skille provides specialized certified courses from major universities, academies, and companies. Users receive certifications upon successfully completing these courses, adding value to their skillset and credentials. 
      </Accordion>
      <Accordion title="How can I access Skille's mentorship program?">
      Skille's mentorship program connects users with industry-leading tech professionals from IITs. Users can gain personalized guidance, career advice, and insights into the tech industry through this program.  
      </Accordion>
      <Accordion title="What is the cost of using Skille?">
      Skille offers both free and paid plans. Users can access a variety of free learning resources, while premium features and certified courses are available through paid subscriptions. Pricing details can be found on our website.
      </Accordion>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 15rem;
  & > *:not(:first-child) {
    margin-top: 3rem;
  }
`;
