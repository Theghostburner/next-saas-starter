import React from 'react';
import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import BasicCard from 'components/BasicCard';
import Container from 'components/Container';
import { media } from 'utils/media';

const FEATURES = [
  {
    imageUrl: '/grid-icons/asset-1.svg',
    title: 'Personalized Learning Plans',
    description:
      "Skille offers customized learning paths tailored to each user's preferences, goals, and available time, providing a personalized learning experience."
      },
  {
    imageUrl: '/grid-icons/asset-2.svg',
    title: 'Hands-On Projects',
    description:
      'The platform includes practical, hands-on projects that allow users to apply their learning in real-world scenarios, fostering skill development and practical understanding.',
  },
  {
    imageUrl: '/grid-icons/asset-3.svg',
    title: 'Adaptive Intelligence',
    description:
      'Skille employs adaptive intelligence to analyze user data and provide targeted recommendations, ensuring an optimized and efficient learning experience.',
  },
  {
    imageUrl: '/grid-icons/asset-4.svg',
    title: 'Curated Content',
    description:
      'Skille offers a curated collection of high-quality, free, and open-source resources, providing learners with comprehensive and up-to-date content.',
  },
  {
    imageUrl: '/grid-icons/asset-5.svg',
    title: 'Gamified Reward System',
    description:
      'The platform includes a gamified reward system that keeps users engaged and motivated throughout their learning journey.',
  },
  {
    imageUrl: '/grid-icons/asset-6.svg',
    title: 'Certification and Credentialing',
    description:
      'Skille provides specialized certified courses sourced from major universities, academies, and companies, offering users recognition for their acquired skills.',
  },
];

export default function Features() {
  return (
    <Container>
      <CustomAutofitGrid>
        {FEATURES.map((singleFeature, idx) => (
          <BasicCard key={singleFeature.title} {...singleFeature} />
        ))}
      </CustomAutofitGrid>
    </Container>
  );
}

const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 40rem;

  ${media('<=tablet')} {
    --autofit-grid-item-size: 30rem;
  }

  ${media('<=phone')} {
    --autofit-grid-item-size: 100%;
  }
`;
