import React, { useState, useEffect, useRef, useMemo } from 'react'
import { FaSpinner } from 'react-icons/fa'

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState('forest')
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedImage, setSelectedImage] = useState('/images/1-61795_612x.jpg')
  const [quantity, setQuantity] = useState(1)
  const [showDetails, setShowDetails] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [avatarImage, setAvatarImage] = useState<string | null>(null)
  const [avatarColor, setAvatarColor] = useState<string | null>(null)
  const [modalStep, setModalStep] = useState<'upload' | 'loading' | 'result'>('upload')
  const [pregeneratedImage, setPregeneratedImage] = useState<string | null>(null)
  const [revealPercent, setRevealPercent] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [avatarCache, setAvatarCache] = useState<{ [color: string]: string }>({})
  const [revealStarted, setRevealStarted] = useState(false)
  const [colorsInProgress, setColorsInProgress] = useState<Set<string>>(new Set())

  // Use refs to track animation state
  const animationRef = useRef<NodeJS.Timeout | null>(null)
  const currentPercentRef = useRef(0)
  const avatarImageRef = useRef<string | null>(null)
  const avatarColorRef = useRef<string | null>(null)
  const currentSelectedColorRef = useRef<string>(selectedColor)

  // Update the ref whenever avatarImage changes
  useEffect(() => {
    avatarImageRef.current = avatarImage;
  }, [avatarImage]);

  // Update the ref whenever avatarColor changes
  useEffect(() => {
    avatarColorRef.current = avatarColor;
  }, [avatarColor]);

  // Update the current selected color ref
  useEffect(() => {
    currentSelectedColorRef.current = selectedColor;
  }, [selectedColor]);

  const REVEAL_STEP = 0.5; // Reveal 0.5% more each step (ultra smooth)
  const REVEAL_INTERVAL = 156.25; // Every 156.25ms (160 steps to reach 80% in 25 seconds: 25000ms / 160 = 156.25ms)
  const MAX_REVEAL = 100; // Fully revealed at 100%
  const MAX_REVEAL_DURING_LOADING = 80; // Only reveal up to 80% until swap is done
  const MAX_BLUR = 40; // px, strongest blur at the start
  const MIN_BLUR = 8;  // px, weakest blur at the top

  const colors = [
    { id: 'arcticfox', name: 'Arctic Fox', hex: '#c2aea3', image: '/images/1-61801_612x.jpg' },
    { id: 'heather', name: 'Heather Grey', hex: '#9e9e9e', image: '/images/1-61795_612x.jpg' },
    { id: 'black', name: 'Black', hex: '#1e2125', image: '/images/1-61789_612x.jpg' },
  ]

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL']

  const thumbnails = [
    { id: 1, src: '/images/1-61795_612x.jpg', alt: 'Front view' },
    { id: 2, src: '/images/3-61796_612x.jpg', alt: 'Angle view' },
    { id: 3, src: '/images/4-61797_612x.jpg', alt: 'Back view' },
    { id: 4, src: '/images/5-61798_612x.jpg', alt: 'Side view' },
    { id: 5, src: '/images/6-61799_612x.jpg', alt: 'Detail view' },
  ]

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value))
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  useEffect(() => {
    if (modalStep === 'loading' && pregeneratedImage && !revealStarted) {
      console.log('Starting animation...');
      setRevealPercent(0);
      setRevealStarted(true);
      currentPercentRef.current = 0;

      const FAST_STEP = 0.5; // 0-80 %

      const intervalId = setInterval(() => {
        const avatarReady = !!avatarImageRef.current && avatarColorRef.current === currentSelectedColorRef.current;
        console.log(`[Animation] Check - avatarImageRef: ${!!avatarImageRef.current}, avatarColor: ${avatarColorRef.current}, currentSelected: ${currentSelectedColorRef.current}, avatarReady: ${avatarReady}, currentPercent: ${currentPercentRef.current}`);

        let nextPercent = currentPercentRef.current;

        if (!avatarReady) {
          // Before head swap completes: rise only up to 80%
          if (nextPercent < MAX_REVEAL_DURING_LOADING) {
            nextPercent = Math.min(nextPercent + FAST_STEP, MAX_REVEAL_DURING_LOADING);
          }
        } else {
          // After head swap completes: continue rising to 100% at the same pace
          if (nextPercent < MAX_REVEAL) {
            nextPercent = Math.min(nextPercent + FAST_STEP, MAX_REVEAL);
          }
        }

        currentPercentRef.current = nextPercent;
        setRevealPercent(nextPercent);

        // Complete when we actually hit 100
        if (nextPercent >= MAX_REVEAL) {
          console.log('Animation complete at 100%');
          clearInterval(intervalId);
          setModalStep('result');
        }
      }, REVEAL_INTERVAL);

      // Store the interval so we can clear it on cleanup
      animationRef.current = intervalId as any;
      console.log('Animation interval started with ID:', intervalId);

      // Cleanup function to clear interval
      return () => {
        console.log('Cleaning up animation...');
        if (animationRef.current) {
          clearInterval(animationRef.current);
          animationRef.current = null;
        }
      };
    } else {
      console.log('Animation not starting because:', {
        modalStepNotLoading: modalStep !== 'loading',
        revealAlreadyStarted: revealStarted,
        noPregeneratedImage: !pregeneratedImage
      });
    }
  }, [modalStep]);

  // Separate useEffect to reset revealStarted when leaving loading state
  useEffect(() => {
    console.log('Cleanup useEffect triggered:', { modalStep });
    if (modalStep !== 'loading') {
      console.log('Resetting animation state because modalStep is not loading');
      setRevealStarted(false);
      // Clear any ongoing animation
      if (animationRef.current) {
        console.log('Clearing existing animation interval');
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
      currentPercentRef.current = 0;
      setRevealPercent(0);
    }
  }, [modalStep]);

  // Helper to get the correct pregenerated image path (relative to public directory)
  const getPregeneratedImagePath = (colorId: string, body_type: string, skin_color: string) => {
    const skinColorMap: Record<string, string> = {
      light: 'fair-light',
      medium: 'medium',
      olive: 'olive',
      brown: 'brown',
      dark: 'deep',
    };
    const mappedSkin = skinColorMap[skin_color] || skin_color;
    if (colorId === 'arcticfox') {
      return `bodytypes/headswapper/${body_type}/arcticfox_headswapper_${body_type}_${mappedSkin}_directfull.png`;
    } else if (colorId === 'black') {
      return `bodytypes/headswapper/${body_type}/black_headswapper_${body_type}_${mappedSkin}_directfull.png`;
    } else if (colorId === 'heather') {
      return `bodytypes/headswapper/${body_type}/heather_headswapper_${body_type}_${mappedSkin}_directfull.png`;
    } else {
      return `bodytypes/headswapper/${body_type}/arcticfox_headswapper_${body_type}_${mappedSkin}_directfull.png`;
    }
  };

  const handleColorSelect = async (colorId: string) => {
    if (colorId === selectedColor) return; // Prevent duplicate API calls
    console.log('Color selected:', colorId); // Add this log to always track color changes
    setSelectedColor(colorId);

    // If we have a cached avatar for this color and we're not currently loading, show it instantly
    if (avatarCache[colorId] && modalStep !== 'loading') {
      setAvatarImage(avatarCache[colorId]);
      setAvatarColor(colorId);
      setModalStep('result');
      return;
    }

    // If we're currently in loading state and switching colors, update the pregenerated image
    // but don't start a new process if we already have this color cached
    if (modalStep === 'loading' && avatarCache[colorId]) {
      // Update the pregenerated image for the new color if we have analysis results
      if (analysisResult?.metadata) {
        const { body_type, skin_color } = analysisResult.metadata;
        const referenceImagePath = getPregeneratedImagePath(colorId, body_type, skin_color);
        setPregeneratedImage(referenceImagePath);
      } else {
        // During initial loading, use average body type
        const referenceImagePath = getPregeneratedImagePath(colorId, 'average', 'fair-light');
        setPregeneratedImage(referenceImagePath);
      }
      // Set the cached avatar immediately since animation can continue
      setAvatarImage(avatarCache[colorId]);
      setAvatarColor(colorId);
      return;
    }

    // Allow color switching during loading even without analysisResult
    if (modalStep === 'loading' || analysisResult?.metadata) {
      let body_type = 'average';
      let skin_color = 'fair-light';

      if (analysisResult?.metadata) {
        body_type = analysisResult.metadata.body_type;
        skin_color = analysisResult.metadata.skin_color;
      }

      // Always update the pregenerated image for the new color
      const referenceImagePath = getPregeneratedImagePath(colorId, body_type, skin_color);
      console.log('Color selected:', colorId, 'Reference image path:', referenceImagePath); // Debug log
      setPregeneratedImage(referenceImagePath);

      // If not already loading, start loading state
      if (modalStep !== 'loading') {
        setModalStep('loading');
        setRevealPercent(0);
        setRevealStarted(false); // Reset reveal animation flag
        setAvatarImage(null);
        setAvatarColor(null);
        avatarImageRef.current = null; // Reset ref immediately
      } else {
        // If already loading, reset avatar for new color but keep animation running
        setAvatarImage(null);
        setAvatarColor(null);
        avatarImageRef.current = null; // Reset ref immediately

        // Important: If we're past 80% and switching to a color without cached avatar,
        // reset back to 80% to avoid showing wrong head
        if (currentPercentRef.current > MAX_REVEAL_DURING_LOADING && !avatarCache[colorId]) {
          console.log(`Resetting animation from ${currentPercentRef.current}% back to ${MAX_REVEAL_DURING_LOADING}% for new color: ${colorId}`);
          currentPercentRef.current = MAX_REVEAL_DURING_LOADING;
          setRevealPercent(MAX_REVEAL_DURING_LOADING);
        }
      }

      // Check if this color is already being processed
      if (colorsInProgress.has(colorId)) {
        console.log(`Skipping API call for ${colorId} - already in progress`);
        return;
      }

      // Mark this color as in progress
      setColorsInProgress(prev => new Set(prev).add(colorId));

      setLoading(true);
      try {
        const newFormData = new FormData();
        if (uploadedFile) {
          newFormData.append('image', uploadedFile);
        }
        newFormData.append('reference_image', referenceImagePath);
        const swapRes = await fetch(`${import.meta.env.VITE_API_URL}/api/swap-head`, {
          method: 'POST',
          body: newFormData,
        });
        const swapData = await swapRes.json();
        console.log(`[handleColorSelect] Swap completed for ${colorId}, currently selected: ${currentSelectedColorRef.current}, swapData:`, swapData);

        // Remove from in progress regardless of success/failure
        setColorsInProgress(prev => {
          const newSet = new Set(prev);
          newSet.delete(colorId);
          return newSet;
        });

        if (swapData.output_image) {
          // Cache the result for this color
          setAvatarCache(prev => ({ ...prev, [colorId]: swapData.output_image }));

          // Only update the displayed avatar if this color is still selected
          // Use a ref to get the current selected color to avoid stale closures
          if (currentSelectedColorRef.current === colorId) {
            console.log(`[handleColorSelect] Setting avatar for ${colorId} - match!`);
            setAvatarImage(swapData.output_image);
            setAvatarColor(colorId);
            setLoading(false);
            console.log(`[handleColorSelect] Avatar updated for ${colorId} - currently selected: ${currentSelectedColorRef.current}`);
          } else {
            console.log(`[handleColorSelect] Skipping avatar update for ${colorId} - currently selected: ${currentSelectedColorRef.current}`);
          }
        } else {
          console.log(`[handleColorSelect] No output_image for ${colorId}`);
          // Only change modal step if this color is still selected
          if (currentSelectedColorRef.current === colorId) {
            setModalStep('upload');
          }
        }
      } catch (err) {
        // Remove from in progress on error too
        setColorsInProgress(prev => {
          const newSet = new Set(prev);
          newSet.delete(colorId);
          return newSet;
        });

        alert("Error generating avatar.");
        // Only change modal step if this color is still selected
        if (currentSelectedColorRef.current === colorId) {
          setModalStep('upload');
        }
        console.error(err);
      }
    }
  };

  const handleGenerateAvatar = async () => {
    console.log('handleGenerateAvatar called');
    setLoading(true);
    setAnalysisResult(null);
    setAvatarImage(null);
    setAvatarColor(null);

    // Capture the selected color at the time of generation
    const generationColor = selectedColor;

    // Immediately show the average body type for the selected color
    const averageImagePath = getPregeneratedImagePath(selectedColor, 'average', 'fair-light');
    console.log('Setting pregeneratedImage to:', averageImagePath);
    setPregeneratedImage(averageImagePath);

    console.log('Setting revealStarted to false...');
    setRevealStarted(false); // Reset reveal animation flag
    console.log('Setting modalStep to loading...');
    setModalStep('loading');

    if (!uploadedFile) {
      setLoading(false);
      setModalStep('upload');
      alert("Please upload an image first.");
      return;
    }
    const formData = new FormData();
    formData.append('image', uploadedFile);

    // Step 1: Analyze first
    try {
      const analysisRes = await fetch(`${import.meta.env.VITE_API_URL}/api/analyze-user-image`, {
        method: 'POST',
        body: formData,
      });
      const analysisData = await analysisRes.json();
      let finalAnalysisData = null;
      if (analysisData.metadata) {
        setAnalysisResult(analysisData);
        finalAnalysisData = analysisData;
        const { body_type, skin_color } = analysisData.metadata;
        // Update to the correct body type and skin color after analysis
        // Don't reset the reveal animation - just swap the image behind the mask
        const correctImagePath = getPregeneratedImagePath(generationColor, body_type, skin_color);
        // Only update pregenerated image if the color hasn't changed
        if (currentSelectedColorRef.current === generationColor) {
          setPregeneratedImage(correctImagePath);
        }
      }

      // Step 2: Start the reveal animation, then call swap-head
      try {
        const newFormData = new FormData();
        newFormData.append('image', uploadedFile);

        // Use the fresh analysis data instead of stale state
        let body_type = 'average';
        let skin_color = 'fair-light';

        if (finalAnalysisData?.metadata) {
          body_type = finalAnalysisData.metadata.body_type;
          skin_color = finalAnalysisData.metadata.skin_color;
        }

        const referenceImagePath = getPregeneratedImagePath(generationColor, body_type, skin_color);
        newFormData.append('reference_image', referenceImagePath);

        const swapRes = await fetch(`${import.meta.env.VITE_API_URL}/api/swap-head`, {
          method: 'POST',
          body: newFormData,
        });
        const swapData = await swapRes.json();
        console.log(`[handleGenerateAvatar] Swap completed for ${generationColor}, currently selected: ${currentSelectedColorRef.current}, swapData:`, swapData);

        // Update the pregenerated image with the analyzed body type and skin color
        if (swapData.analysis?.metadata && currentSelectedColorRef.current === generationColor) {
          const analyzedBodyType = swapData.analysis.metadata.body_type || 'average';
          const analyzedSkinColor = swapData.analysis.metadata.skin_color || 'fair-light';
          const updatedPregeneratedPath = getPregeneratedImagePath(generationColor, analyzedBodyType, analyzedSkinColor);
          console.log(`[handleGenerateAvatar] Updating pregenerated image to analyzed values: ${updatedPregeneratedPath}`);
          setPregeneratedImage(updatedPregeneratedPath);
          setAnalysisResult(swapData.analysis);
        }

        if (swapData.output_image) {
          // Cache the result for this color
          setAvatarCache(prev => ({ ...prev, [generationColor]: swapData.output_image }));

          // Only update the displayed avatar if this color is still selected
          // Use a ref to get the current selected color to avoid stale closures
          if (currentSelectedColorRef.current === generationColor) {
            console.log(`[handleGenerateAvatar] Setting avatar for ${generationColor} - match!`);
            setAvatarImage(swapData.output_image);
            setAvatarColor(generationColor);
            setLoading(false);
            console.log(`[handleGenerateAvatar] Avatar updated for ${generationColor} - currently selected: ${currentSelectedColorRef.current}`);
          } else {
            console.log(`[handleGenerateAvatar] Skipping avatar update for ${generationColor} - currently selected: ${currentSelectedColorRef.current}`);
          }
        } else {
          console.log(`[handleGenerateAvatar] No output_image for ${generationColor}`);
          // Only change modal step if this color is still selected
          if (currentSelectedColorRef.current === generationColor) {
            setModalStep('upload');
          }
        }
        // Optionally update analysisResult with swapData.analysis if you want
        console.log('Swap result:', swapData);
      } catch (err) {
        alert("Error generating avatar.");
        // Only change modal step if this color is still selected
        if (currentSelectedColorRef.current === generationColor) {
          setModalStep('upload');
        }
        console.error(err);
      }
    } catch (err) {
      alert("Error analyzing image.");
      // Only change modal step if this color is still selected
      if (currentSelectedColorRef.current === generationColor) {
        setModalStep('upload');
        setLoading(false);
      }
      return;
    }
  }

  // Animated mask blur amount - starts high and reduces to 0
  const blurAmount = useMemo(() => {
    if (revealPercent >= MAX_REVEAL) return 0; // No blur when complete
    // Start with heavy blur (20px) and reduce to 0 as revealPercent increases
    const maxBlur = 20;
    const blurReduction = (revealPercent / MAX_REVEAL) * maxBlur;
    return Math.max(0, maxBlur - blurReduction);
  }, [revealPercent]);

  // Mask opacity - fades out when headswap is complete
  const maskOpacity = useMemo(() => {
    if (revealPercent >= MAX_REVEAL) return 0; // Completely transparent when done
    if (revealPercent <= MAX_REVEAL_DURING_LOADING) return 0.7; // Semi-transparent during headswap
    // Fade out after headswap completes
    const fadeRange = MAX_REVEAL - MAX_REVEAL_DURING_LOADING;
    const fadeProgress = (revealPercent - MAX_REVEAL_DURING_LOADING) / fadeRange;
    return 0.7 * (1 - fadeProgress);
  }, [revealPercent]);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center space-x-2 text-sm text-gray-500">
        <a href="/" className="hover:underline">Home</a>
        <span>/</span>
        <a href="/collections/long-sleeve-shirts" className="hover:underline">Long Sleeve Shirts</a>
        <span>/</span>
        <span>Casual Bedford Long Sleeve Shirt - Forest</span>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        {/* Product Images - Vertical gallery on the left, main image centered */}
        <div className="md:col-span-7">
          <div className="flex flex-col md:flex-row md:space-x-6">
            {/* Thumbnails - Vertical on left for desktop */}
            <div className="order-2 mt-3 grid grid-cols-4 gap-2 md:order-1 md:mt-0 md:flex md:w-24 md:flex-col md:gap-4">
              {thumbnails.map((thumb) => (
                <button
                  key={thumb.id}
                  className={`aspect-[3/4] overflow-hidden rounded-md border transition-all ${selectedImage === thumb.src ? 'border-[#253344] ring-1 ring-[#253344]' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setSelectedImage(thumb.src)}
                >
                  <img src={thumb.src} alt={thumb.alt} className="h-full w-full object-cover object-center" />
                </button>
              ))}
            </div>

            {/* Main Product Image */}
            <div className="relative order-1 overflow-hidden rounded-md border border-gray-200 md:order-2 md:flex-1">
              <img
                src={selectedImage}
                alt="Casual Bedford Long Sleeve Shirt"
                className="h-full w-full object-cover object-center"
              />
              {/* Add to Wishlist button at top right of image */}
              <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#253344] hover:text-[#1a2430]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="md:col-span-5">
          <div className="flex justify-between items-center">
            {/* Status Tags - Text only, no backgrounds */}
            <div className="mb-3">
              <div className="mb-1">
                <span className="text-sm font-medium uppercase tracking-wide text-[#253344]">
                  NEW ARRIVAL
                </span>
              </div>
              <div>
                <span className="text-sm font-medium uppercase tracking-wide text-red-600">
                  SALE
                </span>
              </div>
            </div>

            {/* Add to Wishlist Link */}
            <div>
              <button className="text-sm text-[#253344] hover:underline">
                ADD TO WISHLIST
              </button>
            </div>
          </div>

          <h1 className="mb-3 text-2xl font-normal text-[#253344]">Casual Bedford Long Sleeve Shirt</h1>

          <div className="mb-8 flex items-center">
            <span className="mr-2 text-xl font-normal text-gray-500 line-through">$109.95</span>
            <span className="text-2xl font-medium text-red-600">$79.00</span>
          </div>

          <div className="mb-8">
            <h3 className="mb-3 text-sm font-medium uppercase text-gray-700">COLOUR: <span className="text-gray-500">FOREST</span></h3>
            <div className="flex space-x-2">
              {colors.map((color) => (
                <button
                  key={color.id}
                  className={`flex h-16 w-16 items-center justify-center overflow-hidden rounded-md border ${selectedColor === color.id ? 'border-[#253344] ring-1 ring-[#253344]' : 'border-gray-300'}`}
                  onClick={() => handleColorSelect(color.id)}
                  aria-label={`Color: ${color.name}`}
                >
                  <img src={color.image} alt={color.name} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium uppercase text-gray-700">SELECT SIZE</h3>
              <button className="text-xs text-[#253344] underline hover:text-[#1a2430]">SIZE GUIDE</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`h-11 w-11 rounded-full border text-sm font-medium transition-colors
                    ${selectedSize === size
                      ? 'border-[#253344] bg-[#253344] text-white'
                      : 'border-gray-300 bg-white text-[#253344] hover:border-[#253344]'
                    }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5 text-sm text-gray-600">
            <p>Fit Tip:</p>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-sm font-medium uppercase text-gray-700">SELECT QTY</h3>
            <div className="flex space-x-3">
              <select
                value={quantity}
                onChange={handleQuantityChange}
                className="w-24 rounded-md border border-gray-300 p-3 focus:border-[#253344] focus:outline-none focus:ring-1 focus:ring-[#253344]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              <button
                className={`btn btn-primary flex-1 py-3 ${!selectedSize ? 'cursor-not-allowed opacity-60' : ''}`}
                disabled={!selectedSize}
              >
                {selectedSize ? 'ADD TO CART' : 'PICK A SIZE'}
              </button>
            </div>

            <button
              className="btn btn-secondary mt-4 w-full py-3 flex justify-center items-center"
              onClick={() => setShowAIModal(true)}
            >
              Try on with AI
            </button>
          </div>

          <div className="divider my-8"></div>

          <div className="mb-4">
            <div className="flex cursor-pointer items-center justify-between" onClick={toggleDetails}>
              <h3 className="font-medium">Product Details</h3>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform transition-transform ${showDetails ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {showDetails && (
              <div className="mt-4 pt-2">
                <p className="mb-4 text-sm leading-relaxed text-gray-600">
                  The Casual Bedford Long Sleeve Shirt is a laid-back option with a soft cotton feel. Designed in a regular fit, it features a chest pocket, removable collar stays, and back pleats for comfort. A simple, everyday shirt that pairs well with men's jeans or chinos. Available in 3 colours.
                </p>
                <h4 className="mb-2 text-sm font-medium">Product Features:</h4>
                <ul className="mb-4 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-xs">•</span>
                    Cotton
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-xs">•</span>
                    Soft touch
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-xs">•</span>
                    Removable collar stays
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-xs">•</span>
                    Chest pocket
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-xs">•</span>
                    Pinch pleats at back
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-xs">•</span>
                    Regular fit
                  </li>
                </ul>
                <p className="text-sm text-gray-600">
                  Product Code: LSHW25060-302
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Try-On Modal */}
      {showAIModal && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            onClick={() => setShowAIModal(false)}
          ></div>
          {/* Modal */}
          <div className="relative h-full w-full sm:w-1/2 lg:w-1/3 max-w-[600px] bg-white shadow-xl animate-slide-in-right flex flex-col p-8">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
              onClick={() => setShowAIModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            {modalStep === 'upload' && (
              <div className="flex flex-col items-center mt-8">
                <div className="w-[300px] h-[200px] bg-gray-100 border border-gray-300 rounded flex items-center justify-center mb-6 overflow-hidden">
                  {uploadedImage ? (
                    <img src={uploadedImage} alt="Preview" className="object-contain w-full h-full" />
                  ) : (
                    <span className="text-gray-400 text-3xl">600 × 400</span>
                  )}
                </div>
                <h2 className="text-lg font-semibold mb-2">Image Upload</h2>
                <label className="block mb-4">
                  <span className="sr-only">Choose file</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded file:border-0
                      file:text-sm file:font-semibold
                      file:bg-gray-200 file:text-gray-700
                      hover:file:bg-gray-300"
                    onChange={e => {
                      const file = e.target.files && e.target.files[0];
                      if (file) {
                        setUploadedImage(URL.createObjectURL(file));
                        setUploadedFile(file);
                        setAnalysisResult(null);
                      } else {
                        setUploadedImage(null);
                        setUploadedFile(null);
                        setAnalysisResult(null);
                      }
                    }}
                  />
                </label>
                <div className="text-xs text-gray-600 mb-4 text-center">
                  Upload images of yourself to generate an avatar<br />
                  <ul className="list-disc list-inside mt-2 text-left">
                    <li>Full face must be visible in all photos</li>
                    <li>No hats, no sunglasses</li>
                    <li>Body must be visible in at least 3 photos</li>
                  </ul>
                </div>
                <button
                  className="btn btn-primary w-full mt-2 flex items-center justify-center"
                  onClick={handleGenerateAvatar}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    "Generate Your Avatar"
                  )}
                </button>
              </div>
            )}
            {modalStep === 'loading' && (
              <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="mb-4 text-lg font-semibold">Your AI Avatar</div>
                <div className="relative w-full flex justify-center" style={{ minHeight: '70vh' }}>
                  {pregeneratedImage ? (
                    <>
                      <img
                        src={
                          // Show swapped head if animation is above 80% and avatar is ready
                          revealPercent > MAX_REVEAL_DURING_LOADING && avatarImage
                            ? avatarImage.startsWith('data:') ? avatarImage : `/images/${avatarImage}`
                            : `/images/${pregeneratedImage}`
                        }
                        alt={revealPercent > MAX_REVEAL_DURING_LOADING && avatarImage ? "AI Avatar" : "Pregenerated"}
                        className="rounded shadow w-full max-h-[70vh] object-contain"
                        style={{ background: '#f3f3f3' }}
                      />
                      {/* Unblur mask that covers the entire image */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: `rgba(255,255,255,${maskOpacity})`,
                          backdropFilter: `blur(${blurAmount}px)`,
                          WebkitBackdropFilter: `blur(${blurAmount}px)`,
                          transition: 'backdrop-filter 0.3s ease-out, background 0.3s ease-out',
                          pointerEvents: 'none',
                          borderRadius: '0.5rem',
                          opacity: revealPercent >= MAX_REVEAL ? 0 : 1,
                        }}
                      />
                    </>
                  ) : (
                    <div className="w-full h-[70vh] bg-gray-100 rounded shadow" />
                  )}
                </div>
                {/* Color swatches below the image and above the button */}
                <div className="flex space-x-2 mt-4">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border transition-all ${selectedColor === color.id
                        ? 'border-[#253344] ring-2 ring-[#253344]'
                        : 'border-gray-300'
                        }`}
                      onClick={() => handleColorSelect(color.id)}
                      aria-label={`Color: ${color.name}`}
                      type="button"
                    >
                      <img src={color.image} alt={color.name} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
                <button
                  className="btn btn-secondary mt-6"
                  onClick={() => {
                    setModalStep('upload');
                    setAnalysisResult(null);
                  }}
                >
                  Try Another Photo
                </button>
              </div>
            )}
            {modalStep === 'result' && avatarImage && (
              <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="mb-4 text-lg font-semibold">Your AI Avatar</div>
                <img
                  src={avatarImage ? (avatarImage.startsWith('data:') ? avatarImage : `/images/${avatarImage}`) : undefined}
                  alt="AI Avatar"
                  className="rounded shadow w-full max-h-[70vh] object-contain"
                  style={{ background: '#f3f3f3' }}
                />
                {/* Color swatches below the image and above the button */}
                <div className="flex space-x-2 mt-4">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border transition-all ${selectedColor === color.id
                        ? 'border-[#253344] ring-2 ring-[#253344]'
                        : 'border-gray-300'
                        }`}
                      onClick={() => handleColorSelect(color.id)}
                      aria-label={`Color: ${color.name}`}
                      type="button"
                    >
                      <img src={color.image} alt={color.name} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
                <button
                  className="btn btn-secondary mt-6"
                  onClick={() => {
                    setModalStep('upload');
                    setAnalysisResult(null);
                  }}
                >
                  Try Another Photo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail;