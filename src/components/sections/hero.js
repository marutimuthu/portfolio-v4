import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 0vh;
  }

  h1 {
    margin: 0 0 10px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 20px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    // ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hey there! My name is</h1>;
  const two = <h2 className="big-heading">Maruti Muthu.</h2>;
  const three = <h3 className="big-heading">Engineering Industry 4.0</h3>;
  const four = (
    <>
      <p>
        I'm an Industrial Electronics Engineer and a technology enabler, solving real world problems
        using disruptive technologies.
      </p>
      <p>
        I occasionally publish technical articles at{' '}
        <a href="https://levelup.gitconnected.com" target="_blank" rel="noreferrer">
          Level Up Coding
        </a>
        . Currently, focused on digitalizing manufacturing, warehousing and supply chain at{' '}
        <a
          href="https://www.alitersolutions.com/evolve-automation-platform.html"
          target="_blank"
          rel="noreferrer">
          Aliter Solutions
        </a>
        .
      </p>
    </>
  );
  // const five = (
  //   <a
  //     className="email-link"
  //     href="https://medium.com/@marutimuthu"
  //     target="_blank"
  //     rel="noreferrer">
  //     {/* <IconMedium /> */}
  //     Medium
  //   </a>
  // );

  // const items = [one, two, four, three, five];
  const items = [one, two, four, three];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
