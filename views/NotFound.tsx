'use client';

import Link from 'next/link';
import Image from 'next/image';
import Typography, { Button } from '@mui/material';
// import Illustrations from '@components/Illustrations';

import { useImageVariant } from '@core/hooks/UseImageVariant';

const NotFound = ({ mode }) => {
  // Переменные
  const darkImg = '/images/pages/misc-mask-dark.png';
  const lightImg = '/images/pages/misc-mask-light.png';

  // Hooks
  const miscBackground = useImageVariant(mode, lightImg, darkImg);

  return (
    <div className="flex items-center justify-center min-bs-[100dvh] relative p-6 overflow-x-hidden">
      <div className="flex items-center flex-col text-center gap-10">
        <div className="flex flex-col gap-2 is-[90vw] sm:is-[unset]">
          <Typography className="font-medium text-8xl" color="text.primary">
            404
          </Typography>
          <Typography variant="h4">Page Not Found ⚠️</Typography>
          <Typography>
            We couldn&#39;t find the page you are looking for.
          </Typography>
        </div>
        <Image
          src="/images/illustrations/characters/5.png"
          alt="error-illustration"
          className="object-cover bs-[400px] md:bs-[450px] lg:bs-[500px]"
          width={500}
          height={500}
        />
        <Button href="/" component={Link} variant="contained">
          Back to Home
        </Button>
      </div>
      <Illustrations maskImg={{ src: miscBackground }} />
    </div>
  );
};

export default NotFound;