import React from 'react';
import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import PricingCard from 'components/PricingCard';
import SectionTitle from 'components/SectionTitle';

export default function PricingTablesSection() {
  return (
    <Wrapper>
      <SectionTitle>Flexible pricing options</SectionTitle>
      <AutofitGrid>
        <PricingCard
          title="free"
          description="Give us a try for free"
          benefits={['Learn anything', 'Daywise Todos', 'Days Limit - 10']}
        >
          $0<span>/month</span>
        </PricingCard>
        <PricingCard
          title="Skille Plus"
          description="Best for students"
          benefits={['Learn anything', 'Daywise Todos', 'Days Limit - 30/month','Dedicated Mentor','Access to skille community','Job referrals']}
          isOutlined
        >
          $10<span>/month</span>
        </PricingCard>
        <PricingCard
          title="Skille Gold"
          description="Best for developers"
          benefits={['Learn anything', 'Daywise Todos', 'Days Limit - 30/month','Dedicated Mentor', 'Access to skille community','Job referrals','Adaptive AI support','on demand scalable projects']}
        >
          $20<span>/month</span>
        </PricingCard>
      </AutofitGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 8rem;
  }
`;
