import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { IconScroll } from '../icons';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;
  padding-top: 10vh;

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
    margin: 10px 0 0;
    max-width: 540px;
  }

  .scroll {
    margin-top: 2vh;
    height: 10vh;
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
  const two = <h2 className="big-heading">Maruti Muthu</h2>;
  const three = (
    <a className="scroll">
      {' '}
      <IconScroll />
    </a>
  );
  // <a href="/" aria-label="home"> <IconScroll /> </a>;
  const four = (
    <>
      <p>
        I'm a <a> Developer & Engineer </a> developing scalable industrial solutions to synergise
        humans and machines, fueling the fourth industrial revolution.
      </p>
      <p>
        Here, you will find few of my work and experiences in{' '}
        <a>
          {' '}
          Mechanical Engineering, Embedded Hardware & Firmware Engineering and Web Development.
        </a>
      </p>
      <p>
        Specialist - Industrial IoT at{' '}
        <a href="https://www.ltimindtree.com" target="_blank" rel="noreferrer">
          LTIMindtree
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
