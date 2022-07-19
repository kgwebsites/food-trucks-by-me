import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const StyledMeta = styled.div`
  h1 {
    font-size: 0;
    width: 1px;
    height: 1px;
    display: inline-block;
    overflow: hidden;
    position: absolute;
    border: 0;
    padding: 0;
    margin: 0;
    clip: rect(1px, 1px, 1px, 1px);
  }
`;

const Meta = ({
  city,
  includeH1 = true,
}: {
  city?: string;
  includeH1?: boolean;
}) => {
  const title = `Food Trucks by me${city ? ` in ${city}` : ''}`;
  return (
    <StyledMeta>
      <Helmet>
        <title>{title}</title>
        {includeH1 ? <h1>{title}</h1> : null}
        <meta
          name="description"
          itemProp="a"
          content={`Find food trucks currently open near you in ${city}.`}
        />
        <meta name="keywords" content={`Food Trucks, ${city}, near me`} />
      </Helmet>
    </StyledMeta>
  );
};

export default Meta;
