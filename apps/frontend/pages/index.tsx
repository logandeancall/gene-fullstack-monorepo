import type { NextPage } from 'next';

import Survey from '../components/Survey';
import { Box } from '@chakra-ui/react';
import spacePyramidImage from 'ui/images/space-pyramid.png';
import centerLinesBg from 'ui/images/center-lines-bg.svg';

const Home: NextPage = () => {
  return (
    <Box
      bgAttachment="fixed"
      bgImage={`url('${spacePyramidImage.src}')`}
      bgRepeat="no-repeat"
      bgSize="200%"
      bgPosition="left 30% top -300px"
    >
      <Box bgColor="rgb(12, 157, 156, 0.15)" position="relative">
        <Box
          position="absolute"
          height="100%"
          width="100%"
          bgAttachment="fixed"
          bgRepeat="no-repeat"
          bgPosition="center"
          bgImage={`url('${centerLinesBg.src}')`}
        />
        <Box padding="5rem">
          <Survey />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
