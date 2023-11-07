import { Helmet } from 'react-helmet-async';

export const Head = ({ title = '', description = '' }) => {
  return (
    <Helmet title={title ? `${title} | Destimate` : undefined} defaultTitle="Destimate">
      <meta
        name="description"
        content={
          description
            ? `${description}`
            : 'Sustainable_tourism, Environmental Awareness Holiday, Eco-tourism'
        }
      />
    </Helmet>
  );
};
