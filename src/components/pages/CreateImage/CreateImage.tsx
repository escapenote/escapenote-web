import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Cropper from 'react-cropper';
import Pica from 'pica';

import { blobToFile, readUrl } from 'utils/common';
import { useAppDispatch, useAppSelector } from 'store';
import { setExportImageFile } from 'store/imageSlice';
import Layout from 'components/templates/Layout';
import { Spinner, Text } from 'components/atoms';
import iconX from 'assets/icons/x.svg';

const maxScreenWidth = 480;

const CreateImage = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const importedImageFile = useAppSelector(
    state => state.image.importedImageFile,
  );

  const cropperRef = useRef<HTMLImageElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenWidth(
        window.innerWidth > maxScreenWidth ? maxScreenWidth : window.innerWidth,
      );
    }
  }, []);

  useEffect(() => {
    if (importedImageFile) {
      (async () => {
        setImageUrl(await readUrl(importedImageFile));
      })();
    }
  }, [importedImageFile]);

  function handleReady() {
    setIsReady(true);
  }

  async function handleSubmit() {
    setIsSubmitting(true);

    // Crop
    const imageElement: any = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const cropSize = 320;
    const croppedCanvas = cropper.getCroppedCanvas({
      width: cropSize,
      height: cropSize,
    });

    // Optimization
    const pica = Pica();
    try {
      const blob = await pica
        .toBlob(croppedCanvas, 'image/jpeg', 0.9)
        .then((blob: Blob) => blob);

      // Export file
      const generatedFile = blobToFile(blob, 'name');
      dispatch(setExportImageFile(generatedFile));

      setIsSubmitting(false);
      return router.back();
    } catch {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout
      title="이미지 생성"
      leftAction={
        <button onClick={router.back}>
          <img src={iconX} alt="close" width="24px" height="24px" />
        </button>
      }
      rightAction={
        <button disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? (
            <Spinner />
          ) : (
            <Text fontSize="16px" fontWeight="500">
              저장
            </Text>
          )}
        </button>
      }
      noPadding
      noBottom
    >
      <Wrapper>
        {!isReady && <Ready>로딩중...</Ready>}
        <Cropper
          style={{ width: `${screenWidth}px`, height: `${screenWidth}px` }}
          ref={cropperRef}
          src={imageUrl}
          ready={handleReady}
          aspectRatio={1 / 1}
          viewMode={1}
          center={true}
          zoomOnWheel={false}
          cropBoxResizable={false}
          cropBoxMovable={false}
          dragMode="move"
          toggleDragModeOnDblclick={false}
          minCropBoxWidth={screenWidth}
          minCropBoxHeight={screenWidth}
        />
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  .cropper-view-box,
  .cropper-face {
    border-radius: 50%;
  }
`;
const Ready = styled.div`
  padding: 24px;
  font-size: 14px;
  font-weight: 500;
`;

export default CreateImage;
