import styled from "styled-components";

import { ScrollDiv } from "./index.styled";

export const TextLink = styled.a`
  color: #309d6d;
  -webkit-text-stroke: 0.5px white;
  text-decoration: none;
`;

const WhyInternetExploring = () => {
  return (
    <ScrollDiv>
      <h1>Dear visitor,</h1>
      <p style={{ textIndent: "25px" }}>
        Do you remember when the Internet was more about finding the right information and not about selfies, cat videos,
        outrage politics and many other things which, at
        the end of the day, you don't really care about that much?
      </p>
      <p style={{ textIndent: "25px" }}>
        It's perfectly understandable how things became the way they are now but
        still, don't you miss it sometimes? That old Internet is still here
        though, perhaps it would be good to remind yourself what it once was. How
        good are you really at looking up information?
      </p>
      <p style={{ textIndent: "25px" }}>
        I grew up on the Internet, made a professional career out of it and
        spectated while public discourse became a mess. So why Internet Exploring? I'm just nostalgic and
        had an idea that (I believe) has value and turned it into reality. It's a <br />single-player game, but great for competing with friends. I
        hope you like it.
      </p>
      <p style={{ marginBottom: 5, textAlign: "right" }}>Thank you for playing,</p>
      <p style={{ margin: 0, textAlign: "right" }}>
        <TextLink href="https://www.reddit.com/user/TheDomac" target="_blank">
          TheDomac
        </TextLink>
      </p>
    </ScrollDiv>
  );
};

export default WhyInternetExploring;
