import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Cropper from 'react-cropper';
import Pica from 'pica';

import { blobToFile, readUrl } from 'utils/common';
import { useAppDispatch, useAppSelector } from 'store';
import { setExportImageFile } from 'store/imageSlice';
import Layout from 'components/templates/Layout';
import { Spinner, Text } from 'components/atoms';
import iconX from 'assets/icons/x.svg';
import iconSwap from 'assets/icons/swap.svg';
import iconRotate from 'assets/icons/rotate.svg';

const maxScreenWidth = 480;

const CreateImage = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const importedImageFile = useAppSelector(
    state => state.image.importedImageFile,
  );

  const cropperRef = useRef<any>(null);
  const [_isScaleX, setIsScaleX] = useState(true);
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

  function handleSwap() {
    if (!cropperRef.current) return;
    setIsScaleX(prev => {
      cropperRef.current.cropper.scaleX(prev ? -1 : 1);
      return !prev;
    });
  }

  function handleRotate() {
    if (!cropperRef.current) return;
    cropperRef.current.cropper.rotate(45);
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
        <Swap onClick={handleSwap}>
          <img src={iconSwap} alt="swap" width="20px" height="20px" />
        </Swap>
        <Rotate onClick={handleRotate}>
          <img src={iconRotate} alt="rotate" width="16px" height="16px" />
        </Rotate>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  position: relative;
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
const buttonStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  width: 32px;
  height: 32px;
  background-color: rgb(0, 0, 0, 0.7);
`;
const Swap = styled.button`
  ${buttonStyles}
  position: absolute;
  bottom: 12px;
  right: 52px;
`;
const Rotate = styled.button`
  ${buttonStyles}
  position: absolute;
  bottom: 12px;
  right: 12px;
`;

export default CreateImage;
