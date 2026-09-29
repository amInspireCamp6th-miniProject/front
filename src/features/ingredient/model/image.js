// 식재료 폼의 기존 직접 업로드와 전처리 결과 검증에서 공통으로 쓰는 백엔드 제한이다.
// 서버가 받는 최종 파일은 JPEG/PNG이고 5MB 이하여야 한다.
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png']
export const IMAGE_RULE_MESSAGE = 'JPG 또는 PNG, 5MB 이하 사진만 올릴 수 있어요.'

// 원본은 전처리로 줄어들 수 있으므로 20MB까지 받되, 백엔드에 보낼 결과는 위 5MB 제한을 따로 적용한다.
export const MAX_SOURCE_IMAGE_SIZE = 20 * 1024 * 1024
// 긴 변만 1600px로 제한해 모바일 메모리와 전송량을 줄이고, 1600px보다 작은 사진은 화질 저하를 피하려고 확대하지 않는다.
export const MAX_IMAGE_DIMENSION = 1600
// 첫 JPEG 인코딩은 화질과 용량의 균형을 위해 0.82로 시작한다.
export const JPEG_QUALITY = 0.82
// multipart 부가 정보와 브라우저별 인코딩 차이를 감안해 5MB보다 낮은 약 4.5MB를 전처리 목표로 삼는다.
export const TARGET_IMAGE_SIZE = Math.floor(4.5 * 1024 * 1024)
// 모바일 원본 단계에서만 HEIC/HEIF를 추가로 허용하고, 서버로는 항상 JPEG를 전송한다.
export const ALLOWED_SOURCE_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/heic',
  'image/heif',
]
export const SOURCE_IMAGE_TYPE_MESSAGE = 'JPG, PNG, HEIC/HEIF 사진을 사용할 수 있어요.'
export const SOURCE_IMAGE_SIZE_MESSAGE = '20MB 이하 사진을 선택해주세요.'
export const IMAGE_PROCESSING_MESSAGE = '사진을 처리하지 못했어요. 다른 사진으로 다시 시도해주세요.'

// MIME이 빈 원본을 판별할 때 사용할 전체 허용 확장자와, HEIC fallback 판별용 확장자를 분리한다.
const SOURCE_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'heic', 'heif']
const HEIC_IMAGE_EXTENSIONS = ['heic', 'heif']
// 단계적 압축이 지나친 저해상도·저화질로 계속되지 않도록 마지막 한계를 둔다.
const MIN_RESIZE_DIMENSION = 640
const MIN_JPEG_QUALITY = 0.34

// 기존 식재료 폼은 전처리를 거치지 않으므로 종래의 JPEG/PNG 5MB 검증을 그대로 유지한다.
export function isValidImageFile(file) {
  return ALLOWED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_IMAGE_SIZE
}

// iOS가 MIME을 비워 넘기는 경우에 보조 판별에 쓸 소문자 확장자를 반환한다.
function getExtension(fileName = '') {
  const match = fileName.toLowerCase().match(/\.([^.]+)$/)
  return match?.[1] ?? ''
}

function isHeicImageFile(file) {
  // HEIC/HEIF는 정상 MIME 또는 .heic/.heif 확장자 중 하나로 확인해 fallback 대상을 판별한다.
  const type = file.type.toLowerCase()
  return (
    ['image/heic', 'image/heif'].includes(type) ||
    HEIC_IMAGE_EXTENSIONS.includes(getExtension(file.name))
  )
}

/**
 * OCR 전처리에 넣을 수 있는 모바일 원본인지 확인한다.
 * MIME을 우선하되, iOS에서 MIME이 비거나 HEIC 확장자만 제공되는 경우를 위해 확장자를 보조로 확인한다.
 * @param {File} file 사용자가 카메라나 앨범에서 선택한 원본 파일
 * @returns {boolean} JPEG, PNG, HEIC, HEIF 원본으로 판별되면 true
 */
export function isSupportedSourceImageFile(file) {
  const type = file.type.toLowerCase()
  const extension = getExtension(file.name)

  if (ALLOWED_SOURCE_IMAGE_TYPES.includes(type)) return true
  if (HEIC_IMAGE_EXTENSIONS.includes(extension)) return true

  return type === '' && SOURCE_IMAGE_EXTENSIONS.includes(extension)
}

// <img>가 Blob을 읽도록 임시 Object URL을 만들고, 디코딩 실패 또는 후속 처리 종료 시 해제할 dispose를 함께 반환한다.
function loadHtmlImage(blob) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(blob)
    const image = new Image()

    image.onload = () => {
      resolve({
        source: image,
        width: image.naturalWidth,
        height: image.naturalHeight,
        dispose: () => {
          // 이미지 참조를 끊고 Object URL을 회수해 여러 장 처리 시 메모리가 누적되지 않게 한다.
          image.src = ''
          URL.revokeObjectURL(objectUrl)
        },
      })
    }
    image.onerror = () => {
      // 디코딩이 실패해도 성공 경로와 동일하게 임시 URL을 반납한다.
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Image decode failed'))
    }
    image.src = objectUrl
  })
}

/**
 * 브라우저 기본 디코더로 Blob을 Canvas에 그릴 수 있는 소스로 만든다.
 * ImageBitmap을 우선 사용하고, 지원하지 않거나 디코딩이 실패하면 HTMLImageElement로 다시 시도한다.
 * 반환값의 dispose는 ImageBitmap 또는 Object URL 자원을 정리한다.
 */
async function decodeImage(blob) {
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(blob, { imageOrientation: 'from-image' })
      return {
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        dispose: () => bitmap.close(),
      }
    } catch {
      // Safari 등에서 createImageBitmap 디코딩이 안 되면 <img>로 한 번 더 시도한다.
    }
  }

  return loadHtmlImage(blob)
}

/**
 * 원본을 먼저 브라우저 기본 디코더로 열고, 열지 못한 HEIC/HEIF만 heic2any로 JPEG 변환한다.
 * JPEG/PNG와 HEIC를 직접 읽는 브라우저에는 추가 라이브러리 코드가 로드되지 않는다.
 */
async function decodeSourceImage(file) {
  try {
    return await decodeImage(file)
  } catch (nativeError) {
    if (!isHeicImageFile(file)) throw nativeError

    // heic2any는 브라우저가 HEIC를 열지 못한 경우에만 지연 로드해 초기 번들 부담을 피한다.
    // 라이브러리 변환도 실패할 수 있으며, 그런 경우 예외를 상위로 전파해 사용자에게 재시도 안내를 보여준다.
    const { default: heic2any } = await import('heic2any')
    const converted = await heic2any({ blob: file, toType: 'image/jpeg', quality: JPEG_QUALITY })
    const jpegBlob = Array.isArray(converted) ? converted[0] : converted

    if (!(jpegBlob instanceof Blob)) {
      throw new Error('HEIC conversion failed', { cause: nativeError })
    }
    return decodeImage(jpegBlob)
  }
}

// 긴 변을 maxDimension에 맞추고 같은 비율을 짧은 변에도 적용한다.
// Math.min(1, ...)로 배율을 1 이하로 제한해 작은 이미지는 확대하지 않는다.
function scaledDimensions(width, height, maxDimension = MAX_IMAGE_DIMENSION) {
  const scale = Math.min(1, maxDimension / Math.max(width, height))

  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  }
}

// 디코딩한 이미지를 계산한 크기의 Canvas에 그려 해상도를 실제로 축소한다.
function drawToCanvas(source, width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d', { alpha: false })
  if (!context) throw new Error('Canvas is unavailable')

  // 투명 영역이 있는 PNG를 JPEG로 바꿀 때 검은색이 되지 않도록 한다.
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, width, height)
  context.drawImage(source, 0, 0, width, height)

  return canvas
}

// Canvas를 주어진 품질의 JPEG Blob으로 비동기 인코딩하며, 실패하면 예외로 알린다.
function canvasToJpeg(canvas, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('JPEG encoding failed'))),
      'image/jpeg',
      quality,
    )
  })
}

/**
 * 0.82 품질로 인코딩한 후 4.5MB를 넘으면 품질을 낮추고, 그래도 크면 해상도를 단계적으로 줄인다.
 * 화질만 과도하게 낮추는 것을 피하면서 백엔드 5MB 제한 안에 여유 있게 들어가는 JPEG Blob을 반환한다.
 * 중간 Canvas는 성공·실패와 무관하게 크기를 0으로 되돌려 메모리 회수를 돕는다.
 */
async function encodeWithinTarget(sourceImage) {
  let dimensions = scaledDimensions(sourceImage.width, sourceImage.height)
  let quality = JPEG_QUALITY
  let canvas = drawToCanvas(sourceImage.source, dimensions.width, dimensions.height)

  try {
    while (true) {
      const blob = await canvasToJpeg(canvas, quality)
      if (blob.size <= TARGET_IMAGE_SIZE) return blob

      if (quality > 0.58) {
        // 먼저 해상도를 유지한 채 JPEG 품질만 단계적으로 낮춘다.
        quality = Math.max(0.58, quality - 0.08)
        continue
      }

      if (Math.max(dimensions.width, dimensions.height) > MIN_RESIZE_DIMENSION) {
        // 품질 조정만으로 부족하면 비율을 유지한 채 긴 변을 85%로 줄여 다시 인코딩한다.
        const nextMaxDimension = Math.round(
          Math.max(dimensions.width, dimensions.height) * 0.85,
        )
        dimensions = scaledDimensions(dimensions.width, dimensions.height, nextMaxDimension)
        canvas.width = 0
        canvas.height = 0
        canvas = drawToCanvas(sourceImage.source, dimensions.width, dimensions.height)
        quality = 0.74
        continue
      }

      if (quality > MIN_JPEG_QUALITY) {
        // 최소 해상도에 도달한 후에도 크면 마지막으로 품질을 더 낮춘다.
        quality = Math.max(MIN_JPEG_QUALITY, quality - 0.08)
        continue
      }

      throw new Error('Compressed image is too large')
    }
  } finally {
    canvas.width = 0
    canvas.height = 0
  }
}

// 실제 내용과 파일명이 어긋나지 않도록 원본 확장자를 제거하고 .jpg를 붙인다.
function jpegFileName(fileName = 'image') {
  const baseName = fileName.replace(/\.[^.]+$/, '') || 'image'
  return `${baseName}.jpg`
}

/**
 * 모바일 원본 사진을 백엔드에 전송할 JPEG File로 변환한다.
 * 고해상도 사진은 비율을 유지해 축소하고, 업로드 제한을 넘지 않도록 JPEG 품질과 해상도를 조정한다.
 * 반환한 File 객체는 OCR 요청과 최종 식재료 등록에 동일하게 사용된다.
 * @param {File} file 카메라 또는 앨범에서 받은 20MB 이하의 원본 이미지
 * @returns {Promise<File>} MIME이 image/jpeg이고 목표 4.5MB 이하로 압축된 새 File
 * @throws 지원하지 않는 형식·과대 용량·디코딩 또는 인코딩 실패 시 예외를 발생시킨다.
 */
export async function prepareImageForUpload(file) {
  // 원본의 20MB 제한과 형식을 먼저 검증하고, 변환 후에는 서버용 5MB 제한을 다시 검증한다.
  if (!isSupportedSourceImageFile(file)) throw new TypeError('Unsupported image type')
  if (file.size > MAX_SOURCE_IMAGE_SIZE) throw new RangeError('Source image is too large')

  const sourceImage = await decodeSourceImage(file)

  try {
    const jpegBlob = await encodeWithinTarget(sourceImage)
    if (jpegBlob.size > MAX_IMAGE_SIZE) throw new Error('Upload image is too large')

    return new File([jpegBlob], jpegFileName(file.name), {
      // 원본이 PNG나 HEIC/HEIF였더라도 백엔드 계약에 맞게 출력 MIME을 JPEG로 고정한다.
      type: 'image/jpeg',
      lastModified: file.lastModified,
    })
  } finally {
    // OCR 요청 전에 처리가 끝나면 ImageBitmap 또는 <img> Object URL을 항상 정리한다.
    sourceImage.dispose()
  }
}
