import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import BasicCard from 'components/BasicCard';
import Page from 'components/Page';
import SectionTitle from 'components/SectionTitle';
import YoutubeVideo from 'components/YoutubeVideo';
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
  // {
  //   imageUrl: '/grid-icons/asset-7.svg',
  //   title: 'Lorem ipsum dolor sit amet.',
  //   description:
  //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error dolorem ipsa dolore facere est consequuntur aut, eos doloribus voluptate?',
  // },
  // {
  //   imageUrl: '/grid-icons/asset-8.svg',
  //   title: 'Lorem ipsum dolor sit amet.',
  //   description:
  //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error dolorem ipsa dolore facere est consequuntur aut, eos doloribus voluptate?',
  // },
  // {
  //   imageUrl: '/grid-icons/asset-9.svg',
  //   title: 'Lorem ipsum dolor sit amet.',
  //   description:
  //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error dolorem ipsa dolore facere est consequuntur aut, eos doloribus voluptate?',
  // },
];

export default function FeaturesPage() {
  return (
    <Page title="Features" description="Learn tech with skille for the best experience!">
      <Wrapper>
        <SectionTitle>Check out how skille works and helps you achieve your dreams!</SectionTitle>
        <YoutubeVideo url="https://www.youtube.com/watch?v=BggrpKfqh1c" />
        <CustomAutofitGrid>
          {FEATURES.map((singleFeature, idx) => (
            <BasicCard key={singleFeature.title} {...singleFeature} />
          ))}
        </CustomAutofitGrid>
      </Wrapper>
    </Page>
  );
}

const Wrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 10rem;
  }
`;

const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 40rem;

  ${media('<=tablet')} {
    --autofit-grid-item-size: 30rem;
  }

  ${media('<=phone')} {
    --autofit-grid-item-size: 100%;
  }
`;
