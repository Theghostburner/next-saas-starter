import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import BasicSection from 'components/BasicSection';
import Link from 'components/Link';
import { EnvVars } from 'env';
import { getAllPosts } from 'utils/postsFetcher';
import Cta from 'views/HomePage/Cta';
import Features from 'views/HomePage/Features';
import FeaturesGallery from 'views/HomePage/FeaturesGallery';
import Hero from 'views/HomePage/Hero';
import Partners from 'views/HomePage/Partners';
import ScrollableBlogPosts from 'views/HomePage/ScrollableBlogPosts';
import Testimonials from 'views/HomePage/Testimonials';

export default function Homepage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content="Tempor nostrud velit fugiat nostrud duis incididunt Lorem deserunt est tempor aute dolor ad elit."
        />
      </Head>
      <HomepageWrapper>
        <WhiteBackgroundContainer>
          <Hero />
          <Partners />
          <BasicSection imageUrl="/demo-illustration-1.svg" title="Hands On" overTitle="Learn anything with small tasks each day!">
            <p>
            Our platform takes learning to the next level by providing a unique hands-on approach. Learn by doing and gain practical skills through our curated tasks and projects. Get real-world experience and apply your knowledge in a practical setting.
            </p>
          </BasicSection>
          <BasicSection imageUrl="/demo-illustration-2.svg" title="Adaptive AI" overTitle="Not able to finish all tasks? We got your back!" reversed>
            <p>
            Skillê leverages advanced AI algorithms to tailor your learning experience based on your unique needs and progress. Learn at your own pace, with content that adapts to your skill level and learning style.
            </p>
            {/* <ul>
              <li>Updates the content every day based on your progress.</li>
              <li></li>
              <li>Professional feature 3</li>
            </ul> */}
          </BasicSection>
          <BasicSection imageUrl="/demo-illustration-1.svg" title="Get Mentorship!" overTitle="Mentors help you achieve your goal better!">
            <p>
            Our mentorship program connects you with professionals from top companies who have achieved remarkable success in their careers. Gain invaluable insights, career advice, and personalized support as you navigate your tech journey. Elevate your learning experience with mentorship that empowers you to thrive in the dynamic world of technology.      
            </p>
          </BasicSection>
        </WhiteBackgroundContainer>
        <DarkerBackgroundContainer>
          <Cta />
          <FeaturesGallery />
          <Features />
          <Testimonials />
          <ScrollableBlogPosts posts={posts} />
        </DarkerBackgroundContainer>
      </HomepageWrapper>
    </>
  );
}

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`;

const DarkerBackgroundContainer = styled.div`
  background: rgb(var(--background));

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

const WhiteBackgroundContainer = styled.div`
  background: rgb(var(--secondBackground));

  & > :last-child {
    padding-bottom: 15rem;
  }

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}
